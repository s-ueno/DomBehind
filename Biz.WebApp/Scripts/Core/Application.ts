namespace DomBehind.Core {
    export abstract class Application {

        public static get Current(): Application {
            return Application._app;
        }
        private static _app: Application;

        public static Resolve() {
            if (Application._app) return;

            let me: any = this;
            let appFactory = new DomBehind.Core.TypedFactory(me);
            let app = appFactory.CreateInstance();
            Application._app = <Application>app;
        }

        public abstract UnhandledException(error: any): void;

        public /* virtual */ get DefaultActionPolicy(): DomBehind.Core.Data.ActionPolicy[] {
            return [];
        }

        public /* virtual */ get ModalHelper(): IModalHelper {
            return this.modalHelper;
        }
        private modalHelper: IModalHelper = new RazorTemplateLayoutModalHelper();
    }
}
