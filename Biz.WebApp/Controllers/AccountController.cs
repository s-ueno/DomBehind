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
    public class AccountController : Controller
    {
        [HttpGet]
        [RequireHttps]
        [AllowAnonymous]
        public ActionResult SignIn()
        {
            return View();
        }
        [HttpGet]
        [RequireHttps]
        [AllowAnonymous]
        public ActionResult SignInDialog()
        {
            return View();
        }

        [HttpPost]
        [RequireHttps]
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

            return new JsonResult() { Data = "" };
        }

        public ActionResult SignOut()
        {
            FormsAuthentication.SignOut();
            return Redirect("/Home");
        }

    }



    public class SignInRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }



    }
}
