using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Biz.WebApp.Controllers
{
    [Authorize]
    public class ContactUsController : Controller
    {
        [HttpGet]
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Send(ContactMessage request)
        {

            return new HttpStatusCodeResult(System.Net.HttpStatusCode.OK);
        }
    }

    public class ContactMessage
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
    }
}