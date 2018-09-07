namespace DomBehind {
    export abstract class Application {

        public static get Current(): Application {
            return Application._app;
        }
        private static _app: Application;

        public static Resolve() {
            if (Application._app) return;

            //let me: any = this;
            //let appFactory = new TypedFactory(me);
            //let app = appFactory.CreateInstance();
            //Application._app = <Application>app;

            let me: any = this;
            $(document).ready(function () {
                let appFactory = new TypedFactory(me);
                let app = appFactory.CreateInstance();
                Application._app = <Application>app;

                window.history.pushState(null, "", window.location.href);
                window.onpopstate = function () {
                    window.history.pushState(null, "", window.location.href);

                    Application.Current.OnBrowserBack();
                };
            });

        }
        //Back Button in Browser using jquery?

        protected /* virtual */ OnBrowserBack(): void { }

        public SafeAction(func: Function, context?: any, ...args: any[]): any {
            try {
                if (context) {
                    return $.proxy(func, context, args);
                } else {
                    return func();
                }
            } catch (e) {
                this.UnhandledException(e);
            }
        }

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