using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Authentication;
using System.Web;
using System.Web.Mvc;

namespace Biz.WebApp.Controllers
{
    public class AppController : Controller
    {
        protected ActionResult ToJson<T>(T obj)
        {
            var bytes = Utf8Json.JsonSerializer.Serialize(obj);
            this.Response.ContentType = "application/json";
            using (var writer = new BinaryWriter(this.Response.OutputStream))
            {
                writer.Write(bytes);
                writer.Flush();
            }
            // Because we write the binary directly in the response, ActonResult is empty
            return new EmptyResult();
        }

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
                httpStatus = HttpStatusCode.BadRequest;
                jsonResult.Data = new
                {
                    appError.Message,
                    InnerException = appError?.InnerException?.Message,
                };
            }
            else if (error is AuthenticationException authError) /* セッション切れなどの認証エラー */
            {
                httpStatus = HttpStatusCode.Unauthorized;
                jsonResult.Data = new
                {
                    authError.Message,
                    InnerException = authError?.InnerException?.Message,
                };
            }
            else /* 未ハンドルの例外 */
            {
                httpStatus = HttpStatusCode.InternalServerError;
                jsonResult.Data = new
                {
                    error.Message,
                    error.GetType().FullName,
                };
            };

            // httpstatusコードを設定する(500系はAjaxでのfaile、202系はエラーではなく、正常系としてdoneに来る)
            this.Response.StatusCode = (int)httpStatus;
            return jsonResult;
        }
    }
}