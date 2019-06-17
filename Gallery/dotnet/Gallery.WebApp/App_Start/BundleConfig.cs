using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace Gallery.WebApp
{
    public class BundleConfig
    {
        // バンドルの詳細については、https://go.microsoft.com/fwlink/?LinkId=301862 を参照してください
        public static void RegisterBundles(BundleCollection bundles)
        {
            // site all css bundles
            bundles.Add(new StyleBundle("~/bundles/css").Include(Css.Concat(AppBundle.AppCssFiles).ToArray()));

            // site nuget js bundles
            bundles.Add(new ScriptBundle("~/bundles/nuget-js").Include(NugetJs));

            // application js bundles
            bundles.Add(new ScriptBundle("~/bundles/app-js").Include(
                AppJs.Concat(AppBundle.AppJsFiles).Concat(AppLazyJs).ToArray()));
        }

        public static readonly string[] Css = new string[] {
             "~/Content/themes/base/theme.css",
             "~/Content/themes/base/jquery-ui.css",
             "~/Content/bootstrap*",
             "~/Content/font-awesome.css",
             "~/Content/nprogress.css",
             "~/Content/toastr.css",
             "~/Content/w2ui-1.5.rc1.css",
             "~/Content/Site.css",
             "~/Content/spa.css",
        };

        public static readonly string[] NugetJs = new string[] {            
            /* Jquery, Jquery plugin */
            "~/Scripts/jquery-{version}.js",
            "~/Scripts/jquery.validate.js",
            "~/Scripts/jquery-ui-{version}.js",

            "~/Scripts/bootstrap.js",

            /* youtube風のプログレスバー */
            "~/Scripts/nprogress.js",
            /* ブラウザ内　トースト通知 */
            "~/Scripts/toastr.js",

            /* numeralとそのlocal */
            "~/Scripts/numeral/numeral.js",
            "~/Scripts/numeral/locales.js",

            /* TypeBind依存ライブラリ */
            "~/Scripts/w2ui-1.5.rc1.js",

            "~/Scripts/moment.js",
            "~/Scripts/moment-with-locales.js",

            /* TypeBind */
            "~/Scripts/dombehind.js",
            "~/Scripts/domBehind.plugin.jqueryui.js",
            "~/Scripts/domBehind.plugin.w2ui.js",

            "~/Scripts/App/windowOnload.js",
        };

        public static readonly string[] AppJs = new string[] {
            "~/Scripts/App/AppMediator.js",
            "~/Scripts/App/App.js",
            "~/Scripts/App/Startup.js",
            "~/Scripts/App/Extensions.js",
            "~/Scripts/App/AppBizViewModel.js",
            "~/Scripts/App/AppBizView.js",
            "~/T4/EventServiceProxy.js",
            "~/T4/ViewUri.js",
            "~/T4/TSGenerator.js",
        };
        public static readonly string[] AppLazyJs = new string[]
        {
            "~/T4/TSGeneratorLazy.js",
        };

    }
}
