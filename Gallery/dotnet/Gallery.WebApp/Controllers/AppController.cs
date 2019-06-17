using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Authentication;
using System.Web;
using System.Web.Mvc;
using MefRepository;

namespace Gallery.WebApp.Controllers
{
#if DEBUG
    // [RequireHttps]
#else
    [RequireHttps]
#endif
    public class AppController : Controller
    {
        protected virtual ActionResult Invoke<TWebService, TRequest, TResponse>(TRequest request) where TWebService : ICommand
        {
            this.Ensure(typeof(TWebService));
            try
            {
                var svc = Container.GetTransparentProxy<TWebService>();
                TResponse response = (TResponse)svc.Execute(request);
                return ToJson(response);
            }
            catch (Exception error)
            {
                Trace.TraceError(error.ToString());

                if (error.InnerException != null)
                    Trace.TraceError(error.InnerException.ToString());

                return ToError(error);
            }
        }

        #region Ensure

        protected virtual void Ensure(Type service = null)
        {
            ViewBag.Identity = String.Empty;
            if (Request != null)
            {
                ViewBag.QueryString = string.Empty;
                if (Request.QueryString != null)
                {
                    ViewBag.QueryString = Request.QueryString.ToString();

                }
            }
            EnsureCookie(service);
        }
        protected virtual void EnsureCookie(Type service)
        {

        }

        #endregion 

        #region ToJson

        protected ActionResult ToJson<T>(T obj)
        {
            this.Response.ContentType = "application/json";
            this.Response.Charset = "utf-8";
            Utf8Json.JsonSerializer.Serialize(this.Response.OutputStream, obj);
            // Because we write the binary directly in the response, ActonResult is empty
            return new EmptyResult();
        }

        #endregion

        #region ToError

        protected ActionResult ToError<T>(T error) where T : Exception
        {
            var httpStatus = HttpStatusCode.InternalServerError;
            var jsonResult = new JsonResult()
            {
                MaxJsonLength = int.MaxValue,
                RecursionLimit = 5 /* 自己再帰対策 */
            };

            if (error is ApplicationException appError)
            {
                // IIS と Azure WebApps でhttp status 時のレスポンス設定に差が出る（200系以外だとレスポンスの内容が自動的に上書きされる）
                // httpStatus = HttpStatusCode.BadRequest;
                httpStatus = HttpStatusCode.Accepted;
                // httpStatus = (HttpStatusCode)422; /* Unprocessable Entity */
                jsonResult.Data = new
                {
                    ErrorMessage = appError.Message,
                    ErrorStacktrace = appError.ToString(),
                    ErrorStatus = 422,
                    InnerException = appError.InnerException?.Message,
                };
            }
            else if (error is AuthenticationException authError) /* セッション切れなどの認証エラー */
            {
                httpStatus = HttpStatusCode.Unauthorized;

                // Azureだと、正常系以外はレスポンスの中身は転送されないので、書かない
                //jsonResult.Data = new
                //{
                //    authError.Message,
                //    InnerException = authError?.InnerException?.Message,
                //};
            }
            else /* 未ハンドルの例外 */
            {
                httpStatus = HttpStatusCode.InternalServerError;

                // Azureだと、正常系以外はレスポンスの中身は転送されないので、書かない
                //jsonResult.Data = new
                //{
                //    error.Message,
                //    error.GetType().FullName,
                //};
            };

            // httpstatusコードを設定する(500系はAjaxでのfaile、202系はエラーではなく、正常系としてdoneへ)
            this.Response.StatusCode = (int)httpStatus;
            return jsonResult;
        }

        #endregion

        #region　ParseRequest

        protected T ParseRequest<T>()
        {
            if (Request == null) return default(T);
            var result = default(T);
            try
            {
                var bytes = ReadFully(Request.InputStream);
                result = Utf8Json.JsonSerializer.Deserialize<T>(bytes);
            }
            catch (Exception ex)
            {
                Trace.TraceError(ex.ToString());
            }
            return result;
        }

        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        #endregion

    }
}