declare namespace Biz.WebApp {
    class BizApplication extends DomBehind.Application {
        UnhandledException(error: any): void;
        readonly DefaultActionPolicy: DomBehind.Data.ActionPolicy[];
        OnBrowserBack(): void;
    }
}
