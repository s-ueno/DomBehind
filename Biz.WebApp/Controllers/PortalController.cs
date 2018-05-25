using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Biz.WebApp.Controllers
{
    [Authorize]
    public partial class PortalController : Controller
    {
        // GET: Portal
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult TitleBar()
        {
            return View();
        }

        public ActionResult SideMenu()
        {
            return View();
        }

    }
}