namespace Biz.WebApp.Portal {

    export class PortalViewModel extends DomBehind.BizViewModel {
        public MainContentSource: string;
        public BottomContentSource: string;
        public RightContentSource: string;

        public Initialize(): void {

            AppMediator.ShowHideRightMenu.AddHandler(
                (sender, e) => this.ShowHideRightMenu(e));
            AppMediator.ShowHideBottomMenu.AddHandler(
                (sender, e) => this.ShowHideBottomMenu(e));

        }
        protected ShowHideRightMenu(isShow: boolean) {
            this.IsVisibleRightContent = isShow;
        }
        protected ShowHideBottomMenu(isShow: boolean) {
            this.IsVisibleBottomContent = isShow;
        }

        public get IsVisibleBottomContent(): boolean {
            return this._isVisibleBottomContent;
        }
        public set IsVisibleBottomContent(value: boolean) {
            if (value == this._isVisibleBottomContent) return;

            this._isVisibleBottomContent = value;
            this.UpdateTarget("IsVisibleBottomContent");
        }
        private _isVisibleBottomContent: boolean = false;


        public get IsVisibleRightContent(): boolean {
            return this._isVisibleRightContent;
        }
        public set IsVisibleRightContent(value: boolean) {
            if (value == this._isVisibleRightContent) return;

            this._isVisibleRightContent = value;
            this.UpdateTarget("IsVisibleRightContent");
        }
        private _isVisibleRightContent: boolean = false;



        public OnSelectedMenu(sender, e) {
            let uri: { MainUri, BottomUri, RightUri } = e;

            if (Object.IsNullOrUndefined(uri)) return;

            this.MainContentSource = uri.MainUri;

            this.BottomContentSource = uri.BottomUri;
            this.IsVisibleBottomContent = !String.IsNullOrWhiteSpace(uri.BottomUri);

            this.RightContentSource = uri.RightUri;
            this.IsVisibleRightContent = false;

            this.UpdateTarget()
        }
    }
}