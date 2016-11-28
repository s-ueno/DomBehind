using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Biz.WebApp
{
    public partial class BundleConfig
    {
        public static void RegisterAppBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/app.account.css").Include(App_AccountCss));
            bundles.Add(new ScriptBundle("~/bundles/app").Include(App));
            bundles.Add(new ScriptBundle("~/bundles/app.shared").Include(App_Shared));
            bundles.Add(new ScriptBundle("~/bundles/app.home").Include(App_Home));
            bundles.Add(new ScriptBundle("~/bundles/app.account").Include(App_Account));
            bundles.Add(new ScriptBundle("~/bundles/app.contact").Include(App_ContactUs));
        }
        public static readonly string[] App = new string[]
        {
            "~/Scripts/App/App.js",
            "~/Scripts/App/Startup.js",
        };
        public static readonly string[] App_Shared = new string[]
        {
            "~/Scripts/App/Shared/_LayoutView.js",
            "~/Scripts/App/Shared/_LayoutViewModel.js",
        };
        public static readonly string[] App_Home = new string[]
        {
            "~/Scripts/App/Home/HomeView.js",
            "~/Scripts/App/Home/HomeViewModel.js",
        };
        public static readonly string[] App_Account = new string[]
        {
            "~/Scripts/App/Account/SignInView.js",
            "~/Scripts/App/Account/SignInViewModel.js",
            "~/Scripts/App/Account/WebServices.js",
        };
        public static readonly string[] App_AccountCss = new string[]
        {
            "~/Content/Account/SignIn.css",
        };
        public static readonly string[] App_ContactUs = new string[]
        {
            "~/Scripts/App/ContactUs/ContactUsView.js",
            "~/Scripts/App/ContactUs/ContactUsViewModel.js",
            "~/Scripts/App/ContactUs/WebServices.js",
        };

    }
}