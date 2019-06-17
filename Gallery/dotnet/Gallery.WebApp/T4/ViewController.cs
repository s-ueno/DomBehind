using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
namespace Gallery.WebApp.Controllers
{
    public partial class HomeController : AppController
    {
        public ActionResult Index()
        {
            this.Ensure();
            return View();
        }
    }
}
