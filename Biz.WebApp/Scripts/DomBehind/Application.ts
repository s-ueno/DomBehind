namespace DomBehind {
    export abstract class Application {

        public static get Current(): Application {
            return Application._app;
        }
        private static _app: Application;

        public static Resolve() {
            if (Application._app) return;

            let me: any = this;
            let appFactory = new TypedFactory(me);
            let app = appFactory.CreateInstance();
            Application._app = <Application>app;


            $(document).ready(function () {
                window.history.pushState(null, "", window.location.href);
                window.onpopstate = function () {
                    window.history.pushState(null, "", window.location.href);

                    Application.Current.OnBrowserBack();
                };
            });

        }
        //Back Button in Browser using jquery?

        protected /* virtual */ OnBrowserBack(): void { }

        public abstract UnhandledException(error: any): void;

        public /* virtual */ get DefaultActionPolicy(): Data.ActionPolicy[] {
            return [];
        }

        public /* virtual */ get Navigator(): Navigation.INavigator {
            return this._navigator;
        }
        private _navigator: Navigation.INavigator = new Navigation.DefaultNavigator();
    }
}