using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Utf8Json;
using Utf8Json.Formatters;

namespace Biz.WebApp.Controllers
{
    [Authorize]
    public class TwoPaneController : AppController
    {
        // GET: TwoPane
        public ActionResult Main()
        {
            return View();
        }
        public ActionResult Detail()
        {
            return View();
        }

        public ActionResult FindCustomerInfo(FindRequest request)
        {
            var list = new List<CustomerInfo>();
            var count = request?.RecordCount ?? 1000;
            for (int i = 0; i < count; i++)
            {
                list.Add(new CustomerInfo()
                {
                    CustomerId = $"ID-{i.ToString().PadLeft(7, '0')}",
                    FirstName = $"Jane(${i})",
                    LastName = $"Doe(${i})",

                    UpdateDate = DateTime.Now.AddDays(i),
                });
            }
            return ToJson(list);
        }

        [Serializable]
        public class FindRequest
        {
            public int? RecordCount { get; set; }

            public string Name { get; set; }
        }

        [Serializable]
        public class CustomerInfo
        {
            public string CustomerId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string PhoneNo { get; set; }
            public string Address { get; set; }
            public string City { get; set; }

            public string ZipCode { get; set; }
            public string Notes { get; set; }

            [JsonFormatter(typeof(DateTimeFormatter), "yyyy-MM-dd")]
            public DateTime UpdateDate { get; set; }
            public string Css { get; set; }
            public string CellStyle { get; set; }
        }
    }
}