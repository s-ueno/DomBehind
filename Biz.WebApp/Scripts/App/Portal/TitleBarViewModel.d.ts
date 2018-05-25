declare namespace Biz.WebApp.Portal {
    class TitleBarViewModel extends DomBehind.BizViewModel {
        Initialize(): void;
        BrowserReflesh(): void;
        ShowContact(): void;
        SignOut(): JQueryPromise<any>;
    }
}
