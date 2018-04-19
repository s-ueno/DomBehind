using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Biz.WebApp
{
    public partial class BundleConfig
    {
        public static void RegisterCoreBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/css").Include(Core_Css));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jquery.ui").Include("~/Scripts/jquery-ui-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include("~/Scripts/bootstrap*"));

            bundles.Add(new ScriptBundle("~/bundles/collection").Include("~/Scripts/collections.js"));

            bundles.Add(new ScriptBundle("~/bundles/core.base").Include(Core_Base));
            bundles.Add(new ScriptBundle("~/bundles/core.thread").Include(Core_Thread));
            bundles.Add(new ScriptBundle("~/bundles/core.extensions").Include(Core_Extensions));
            bundles.Add(new ScriptBundle("~/bundles/core.data").Include(Core_Data));
            bundles.Add(new ScriptBundle("~/bundles/core.actionpolicy").Include(Core_ActionPolicy));
            bundles.Add(new ScriptBundle("~/bundles/core.validation").Include(Core_Validation));
            bundles.Add(new ScriptBundle("~/bundles/core.web").Include(Core_Web));
            bundles.Add(new ScriptBundle("~/bundles/core.ui").Include(Core_UI));
            bundles.Add(new ScriptBundle("~/bundles/core").Include(Core));

        }


        public static readonly string[] Core_Css = new string[]
        {
            "~/Content/bootstrap*",
            "~/Content/themes/base/all.css",
            "~/Content/animate.css",


            "~/Content/Site.css",
            "~/Content/Navbar.css",
        };

        public static readonly string[] Core_Base = new string[]
        {
            "~/Scripts/Core/Global.js",
            "~/Scripts/Core/Extensions/DefaultPropertyDescriptor.js",


            "~/Scripts/Core/IDisposable.js",

            "~/Scripts/Core/EventArgs.js",
            "~/Scripts/Core/CancelEventArgs.js",

            "~/Scripts/Core/Exception.js",
            "~/Scripts/Core/AjaxException.js",

            "~/Scripts/Core/Data/TypedEvent.js",
            "~/Scripts/Core/TypedFactory.js",
            "~/Scripts/Core/Repository.js",

            "~/Scripts/Core/INotifyPropertyChanged.js",
            "~/Scripts/Core/NotifiableImp.js",

            "~/Scripts/Core/Expression.js",
        };

        public static readonly string[] Core_Extensions = new string[]
        {
            "~/Scripts/Core/Extensions/String.js",
            "~/Scripts/Core/Extensions/Object.js",
            "~/Scripts/Core/Extensions/Enumerable.js",
            "~/Scripts/Core/Extensions/JQueryStatic.js",
        };

        public static readonly string[] Core_Data = new string[]
        {
            "~/Scripts/Core/Data/IValueConverter.js",
            "~/Scripts/Core/Data/DependencyProperty.js",
            "~/Scripts/Core/Data/ListCollectionView.js",
            "~/Scripts/Core/Data/BindingPolicy.js",
            "~/Scripts/Core/Data/BindingBehavior.js",
            "~/Scripts/Core/Data/DataBindingBehavior.js",
            "~/Scripts/Core/Data/ActionBindingBehavior.js",
            "~/Scripts/Core/Data/ViewViewModelBindingBehavior.js",
            "~/Scripts/Core/Data/BindingBehaviorCollection.js",


            "~/Scripts/Core/BindingBehaviorBuilder.js",
            "~/Scripts/Core/DataBindingBehaviorBuilder.js",
            "~/Scripts/Core/ActionBindingBehaviorBuilder.js",
        };
        public static readonly string[] Core_ActionPolicy = new string[]
        {
            "~/Scripts/Core/Data/ActionPolicy/ActionPolicy.js",
            "~/Scripts/Core/Data/ActionPolicy/ExceptionHandlingActionPolicy.js",
            "~/Scripts/Core/Data/ActionPolicy/SuppressDuplicateActionPolicy.js",
            "~/Scripts/Core/Data/ActionPolicy/WaitingOverlayActionPolicy.js",
        };
        public static readonly string[] Core_Thread = new string[]
        {
            "~/Scripts/Core/Threading/WorkerWrapper.js",
            "~/Scripts/Core/Threading/WorkerPool.js",

            "~/Scripts/Core/Threading/TimerThread.js",
            "~/Scripts/Core/Threading/Thread.js",
        };
        public static readonly string[] Core_Web = new string[]
        {
            "~/Scripts/Core/Web/WebService.js",
            "~/Scripts/Core/Web/PlainXMLHttpRequestThread.js",
        };
        public static readonly string[] Core_Validation = new string[]
        {
            "~/Scripts/Core/Validation/Validator.js",
            "~/Scripts/Core/Validation/ValidationException.js",
            "~/Scripts/Core/Validation/RequiredValidator.js",
            "~/Scripts/Core/Validation/ValidatorCollection.js",
            "~/Scripts/Core/Validation/RegexValidator.js",
            "~/Scripts/Core/Validation/MaxLengthValidator.js",
        };
        public static readonly string[] Core_UI = new string[] {
            "~/Scripts/Core/UI/UIElement.js",
            "~/Scripts/Core/UI/IModalHelper.js",
            "~/Scripts/Core/UI/InputElement.js",
            "~/Scripts/Core/UI/NavbarElement.js",
            "~/Scripts/Core/UI/Selector.js",
            "~/Scripts/Core/UI/Tab.js",
        };
        public static readonly string[] Core = new string[] {
            "~/Scripts/Core/BizViewModel.js",
            "~/Scripts/Core/BizView.js",
            "~/Scripts/Core/Application.js",
        };
    }
}