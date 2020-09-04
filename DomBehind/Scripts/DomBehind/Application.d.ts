declare namespace DomBehind {
    abstract class Application {
        static get Current(): Application;
        private static _app;
        static Resolve(): void;
        protected OnBrowserBack(): void;
        SafeAction(func: Function, context?: any, ...args: any[]): any;
        abstract UnhandledException(error: any): void;
        get DefaultActionPolicy(): Data.ActionPolicy[];
        get Navigator(): Navigation.INavigator;
        private _navigator;
    }
}
