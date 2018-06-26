using Biz.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Biz.WebApp.Controllers
{
    [Authorize]
    public class HomeController : AppController
    {
        [HttpGet]
        [AllowAnonymous]
        public ActionResult Index()
        {
            // Store the root URI for supplementing at the time of request from the client in ViewBag
            var uri = string.Format("{0}://{1}{2}", Request.Url.Scheme, Request.Url.Authority, Url.Content("~"));
            ViewBag.RootUri = uri;

            return View();
        }


        [HttpPost]
        //[RequireHttps]
        [AllowAnonymous]
        public ActionResult SignIn(SignInRequest request)
        {
            // ajax async long running proccess
            System.Threading.Thread.Sleep(3 * 1000);

            var accountService = new AccountService();
            if (!accountService.Login(request.Email, request.Password))
            {
                throw new System.Security.Authentication.AuthenticationException("authentication error");
            }


            var ticket = new FormsAuthenticationTicket(1,
                  request.Email,
                  DateTime.Now,
                  DateTime.Now.AddMinutes(30),
                  true,
                  request.Password,
                  FormsAuthentication.FormsCookiePath);
            var encTicket = FormsAuthentication.Encrypt(ticket);
            Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, encTicket));

            return new JsonResult() { Data = new { AllowSignin = true, Message = "Welcome! To DomBehind!!" } };
        }

        public ActionResult SignOut()
        {
            FormsAuthentication.SignOut();
            // Conforms to JSON protocol of client JQueryAjaxSettings
            return new JsonResult() { Data = new object() };
            // return new EmptyResult();
        }
    }

    public class SignInRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }



    }
}
