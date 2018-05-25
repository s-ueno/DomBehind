var DomBehind;
(function (DomBehind) {
    var Application = /** @class */ (function () {
        function Application() {
            this._navigator = new DomBehind.Navigation.DefaultNavigator();
        }
        Object.defineProperty(Application, "Current", {
            get: function () {
                return Application._app;
            },
            enumerable: true,
            configurable: true
        });
        Application.Resolve = function () {
            if (Application._app)
                return;
            var me = this;
            var appFactory = new DomBehind.TypedFactory(me);
            var app = appFactory.CreateInstance();
            Application._app = app;
            $(document).ready(function () {
                window.history.pushState(null, "", window.location.href);
                window.onpopstate = function () {
                    window.history.pushState(null, "", window.location.href);
                    Application.Current.OnBrowserBack();
                };
            });
        };
        //Back Button in Browser using jquery?
        Application.prototype.OnBrowserBack = function () { };
        Object.defineProperty(Application.prototype, "DefaultActionPolicy", {
            get: function () {
                return [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "Navigator", {
            get: function () {
                return this._navigator;
            },
            enumerable: true,
            configurable: true
        });
        return Application;
    }());
    DomBehind.Application = Application;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Application.js.map