using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace Biz.WebApp
{
    public class BundleConfig
    {
        // バンドルの詳細については、https://go.microsoft.com/fwlink/?LinkId=301862 を参照してください
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Nuget系 Style
            bundles.Add(new StyleBundle("~/bundles/nuget-css").Include(Nuget_Css));
            // BizApp Style
            bundles.Add(new StyleBundle("~/bundles/app-css").Include(App_Css));



            // Nuget系 JS
            bundles.Add(new ScriptBundle("~/bundles/nuget-js").Include(Nuget_JS));
            // DOM Behind JS
            bundles.Add(new ScriptBundle("~/bundles/dombehind-js").Include(DomBehind_JS));


            // BizApp JS
            bundles.Add(new ScriptBundle("~/bundles/app-js").Include(App_JS));

        }


        public static readonly string[] Nuget_Css = new string[] {
                /* bootstrap */
                "~/Content/bootstrap*",

                /* jquery ui layout */
                "~/Content/jquery.ui.layout.css",

                /* jquery ui */
                "~/Content/themes/base/all.css",

                /* full calender */
                "~/Content/fullcalendar.css",

                /* animate css */
                "~/Content/animate.css",

                /* Font Awesome */
                "~/Content/font-awesome.css", 
                /* w2ui */
                "~/Content/w2ui-1.5.rc1.css",

                /* 基盤、共通 */
                "~/Content/site.css"
        };

        public static readonly string[] App_Css = new string[] {
                /* Shared */
                "~/Content/Shared/layout.css",
                /* Home */
                "~/Content/Home/home.css",
        };

        public static readonly string[] Nuget_JS = new string[] {
            /* JQuery本体 */
            "~/Scripts/jquery-{version}.js",

            /* Jquery Validation */
            "~/Scripts/jquery.validate.js",
            //"~/Scripts/jquery.validate-vsdoc.js",
            "~/Scripts/jquery.validate.unobtrusive.js",

            /* Jquery Language */
            "~/Scripts/jquery.validate.japlugin.js",

            /* JQuery ui */
            "~/Scripts/jquery-ui-{version}.js",
            /* JQuery ui layout */
            "~/Scripts/jquery.layout.js",


            /* fullcalendar */
            "~/Scripts/moment.js",
            "~/Scripts/moment-with-locales.js",

            "~/Scripts/fullcalendar/fullcalendar.js",
            "~/Scripts/fullcalendar/gcal.js",
            "~/Scripts/fullcalendar/locale-all.js",
            "~/Scripts/fullcalendar/ja.js",


            /* bootstrap系 */
            "~/Scripts/bootstrap.js",
            "~/Scripts/bootstrap-wysiwyg.js",

            // bootstrap のドロップダウン日本語化
            // "~/Scripts/i18n/defaults-ja_JP.js",

            /* w2ui */
            "~/Scripts/w2ui-1.5.rc1.js",

            /* C#ライクなコレクションライブラリ */
            "~/Scripts/collections.js",

            "~/Scripts/ts-nameof.js",
        };

        public static readonly string[] DomBehind_JS = new string[] {
#if DEBUG
      /* DomBehind/Polyfill */
      /* "~/Scripts/DomBehind/Polyfill/cache.js", */
      "~/Scripts/DomBehind/Polyfill/template.js",

      /* DomBehind/Typescript.Net */
      "~/Scripts/DomBehind/TypeScript.Net/Global.js",
      "~/Scripts/DomBehind/TypeScript.Net/IDisposable.js",
      "~/Scripts/DomBehind/TypeScript.Net/EventArgs.js",
      "~/Scripts/DomBehind/TypeScript.Net/CancelEventArgs.js",
      "~/Scripts/DomBehind/TypeScript.Net/CollectionChangedEventArgs.js",
      "~/Scripts/DomBehind/TypeScript.Net/Exception.js",
      "~/Scripts/DomBehind/TypeScript.Net/AjaxException.js",
      "~/Scripts/DomBehind/TypeScript.Net/ValidationException.js",
      "~/Scripts/DomBehind/TypeScript.Net/EventBuilder.js",
      "~/Scripts/DomBehind/TypeScript.Net/INotifyPropertyChanged.js",
      "~/Scripts/DomBehind/TypeScript.Net/INotifyPropertyChanging.js",
      "~/Scripts/DomBehind/TypeScript.Net/NotifiableImp.js",
      "~/Scripts/DomBehind/TypeScript.Net/IValueConverter.js",
      "~/Scripts/DomBehind/TypeScript.Net/PropertyInfo.js",
      "~/Scripts/DomBehind/TypeScript.Net/ListCollectionView.js",
      "~/Scripts/DomBehind/TypeScript.Net/UpdateSourceTrigger.js",
      "~/Scripts/DomBehind/TypeScript.Net/BindingMode.js",
      "~/Scripts/DomBehind/TypeScript.Net/List.js",
      "~/Scripts/DomBehind/TypeScript.Net/Observable.js",
      "~/Scripts/DomBehind/TypeScript.Net/IDisplayMemberPath.js",

      /* DomBehind/Extensions */
      "~/Scripts/DomBehind/Extensions/PropertyDescriptorExtensions.js",
      "~/Scripts/DomBehind/Extensions/EnumerableExtensions.js",
      "~/Scripts/DomBehind/Extensions/ObjectExtensions.js",
      "~/Scripts/DomBehind/Extensions/StringExtensions.js",
      "~/Scripts/DomBehind/Extensions/JQueryExtensions.js",

      /* DomBehind(Base) */
      "~/Scripts/DomBehind/TypedFactory.js",
      "~/Scripts/DomBehind/Repository.js",

      /* DomBehind/Data */
      "~/Scripts/DomBehind/Data/DependencyProperty.js",

      "~/Scripts/DomBehind/Data/BindingPolicy.js",
      "~/Scripts/DomBehind/Data/BindingBehavior.js",
      "~/Scripts/DomBehind/Data/DataBindingBehavior.js",
      "~/Scripts/DomBehind/Data/ActionBindingBehavior.js",
      "~/Scripts/DomBehind/Data/ViewViewModelBindingBehavior.js",
      "~/Scripts/DomBehind/Data/BindingBehaviorCollection.js",

      "~/Scripts/DomBehind/Data/BindingBehaviorBuilder.js",
      "~/Scripts/DomBehind/Data/DataBindingBehaviorBuilder.js",
      "~/Scripts/DomBehind/Data/ActionBindingBehaviorBuilder.js",

      "~/Scripts/DomBehind/Data/ActionPolicy/ActionPolicy.js",
      "~/Scripts/DomBehind/Data/ActionPolicy/ActionPolicyExceptionEventArgs.js",
      "~/Scripts/DomBehind/Data/ActionPolicy/IExceptionHandling.js",
      "~/Scripts/DomBehind/Data/ActionPolicy/ExceptionHandlingActionPolicy.js",
      "~/Scripts/DomBehind/Data/ActionPolicy/ValidationExceptionHandlingActionPolicy.js",
      "~/Scripts/DomBehind/Data/ActionPolicy/WaitingOverlayActionPolicy.js",
      "~/Scripts/DomBehind/Data/ActionPolicy/SuppressDuplicateActionPolicy.js",



      /* DomBehind/Navigation */
      "~/Scripts/DomBehind/Navigation/INavigator.js",
      "~/Scripts/DomBehind/Navigation/DefaultNavigator.js",

      /* DomBehind/Validation */
      "~/Scripts/DomBehind/Validation/Validator.js",
      "~/Scripts/DomBehind/Validation/ValidatorCollection.js",
      "~/Scripts/DomBehind/Validation/MaxLengthValidator.js",
      "~/Scripts/DomBehind/Validation/RegexValidator.js",
      "~/Scripts/DomBehind/Validation/RequiredValidator.js",

      /* DomBehind/Threading */
      "~/Scripts/DomBehind/Threading/PoolType.js",
      "~/Scripts/DomBehind/Threading/WorkerPool.js",
      "~/Scripts/DomBehind/Threading/WorkerWrapper.js",

      /* DomBehind/Web */
      "~/Scripts/DomBehind/Web/PlainXMLHttpRequestWorker.js",
      "~/Scripts/DomBehind/Web/WebService.js",

      /* DomBehind/Controls */
      "~/Scripts/DomBehind/Controls/UIElement.js",
      "~/Scripts/DomBehind/Controls/InputElement.js",
      "~/Scripts/DomBehind/Controls/NavbarElement.js",
      "~/Scripts/DomBehind/Controls/Selector.js",
      "~/Scripts/DomBehind/Controls/Tab.js",
      "~/Scripts/DomBehind/Controls/MessageBox.js",
      "~/Scripts/DomBehind/Controls/ListView.js",
      "~/Scripts/DomBehind/Controls/TemplateListView.js",
      "~/Scripts/DomBehind/Controls/Breadbrumb.js",

      ///* DomBehind/JQueryUI */
      //"~/Scripts/DomBehind/JQueryUI/Tooltip.js",
      //"~/Scripts/DomBehind/JQueryUI/Selectmenu.js",

      ///* DomBehind/Calendar */
      //"~/Scripts/DomBehind/Calendar/Calendar.js",

      ///* DomBehind/bootstrap */
      //"~/Scripts/DomBehind/Bootstrap/Editor.js",


      ///* DomBehind/W2UI */
      //"~/Scripts/DomBehind/W2UI/Toolbar.js",
      //"~/Scripts/DomBehind/W2UI/Layout.js",
      //"~/Scripts/DomBehind/W2UI/Sidebar.js",
      //"~/Scripts/DomBehind/W2UI/Grid.js",
      //"~/Scripts/DomBehind/W2UI/MessageBox.js",
      //"~/Scripts/DomBehind/W2UI/Dropdown.js",

      /* DomBehind(MVVM)  */
      "~/Scripts/DomBehind/Application.js",
      "~/Scripts/DomBehind/BizView.js",
      "~/Scripts/DomBehind/BizViewModel.js",
      "~/Scripts/DomBehind/BindingAnnotation.js",
      "~/Scripts/DomBehind/Locator.js",

      /* Jquery Extension */
      "~/Scripts/DomBehind/Validation/JQueryValidationExtension.js"

#else
      "~/Scripts/dombehind.js",        
#endif
        };


        public static readonly string[] App_JS = new string[] {
            "~/Scripts/App/App.js",
            "~/Scripts/App/AppMediator.js",
            "~/Scripts/App/Startup.js",

            "~/Scripts/App/Shared/WebServiceProxy.js",
            "~/Scripts/App/Shared/LayoutViewModel.js",
            "~/Scripts/App/Shared/LayoutView.js",            
            "~/Scripts/App/Shared/LayoutSPAViewModel.js",
            "~/Scripts/App/Shared/LayoutSPAView.js",            

            "~/Scripts/App/Home/WebServiceProxy.js",
            "~/Scripts/App/Home/HomeViewModel.js",
            "~/Scripts/App/Home/HomeView.js",            

            "~/Scripts/App/TwoPane/WebServiceProxy.js",
            "~/Scripts/App/TwoPane/Mediator.js",
            "~/Scripts/App/TwoPane/MainViewModel.js",
            "~/Scripts/App/TwoPane/MainView.js",                        
            "~/Scripts/App/TwoPane/DetailViewModel.js",
            "~/Scripts/App/TwoPane/DetailView.js",

            "~/Scripts/App/Calendar/WebServiceProxy.js",
            "~/Scripts/App/Calendar/Mediator.js",
            "~/Scripts/App/Calendar/CalendarViewModel.js",
            "~/Scripts/App/Calendar/CalendarView.js",

        };
    }
}
