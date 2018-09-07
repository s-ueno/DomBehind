using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Biz.WebApp.Controllers
{
    [Authorize]
    public class CalendarController : AppController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}