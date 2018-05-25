declare namespace Biz.WebApp.Portal {
    class PortalViewModel extends DomBehind.BizViewModel {
        MainContentSource: string;
        BottomContentSource: string;
        RightContentSource: string;
        Initialize(): void;
        protected ShowHideRightMenu(isShow: boolean): void;
        protected ShowHideBottomMenu(isShow: boolean): void;
        IsVisibleBottomContent: boolean;
        private _isVisibleBottomContent;
        IsVisibleRightContent: boolean;
        private _isVisibleRightContent;
        OnSelectedMenu(sender: any, e: any): void;
    }
}
