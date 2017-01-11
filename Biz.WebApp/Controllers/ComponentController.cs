using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Biz.WebApp.Controllers
{
    [Authorize]
    public class ComponentController : Controller
    {
        [HttpGet]
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        [AllowAnonymous]
        public ActionResult TabContent1()
        {
            return View();
        }
        [HttpGet]
        [AllowAnonymous]
        public ActionResult TabContent2()
        {
            return View();
        }
    }
}