namespace Gallery.WebApp {

    export abstract class AppBizViewModel extends DomBehind.BizViewModel {

        constructor() {
            super();
            AppMediator.WindowClosing.AddHandler((sender, e) => this.OnClosing(e));
        }
        protected /* virtual */ OnClosing(e: { canceled: boolean, message: string }) {
            // e.canceled =true;
            // e.message = "編集中のデータがあります。";
        }
        protected WaitingOverlay(func: Function, handled: boolean = true, image?: string) {
            return super.WaitingOverlay(func, handled, image);
        }
        protected CreateItemsSource(source: any[], displayName: string = null, isTopBlank: boolean = false): DomBehind.Data.ListCollectionView {
            if (isTopBlank) {
                if (String.IsNullOrWhiteSpace(displayName)) {
                    source = [""].concat(source);
                } else {
                    let obj = JSON.parse(`{ "${displayName}" : " " }`);
                    source = [obj].concat(source);

                }
            }
            let list = new DomBehind.Data.ListCollectionView(source, displayName);
            list.MoveFirst();
            return list;
        }
        protected NotifyFocus<T>(exp: (vm: T) => any): void {
            let view = this.View;
            if (view instanceof AppBizView) {
                let path = DomBehind.LamdaExpression.Path(exp);
                let behaviors = view.BindingBehaviors;
                if (behaviors) {
                    $.each(behaviors.toArray(), (i, b: DomBehind.Data.DataBindingBehavior) => {
                        if (b.Element && b.PInfo && b.PInfo.MemberPath === path) {
                            b.Element.focus();
                        }
                    });
                }
            }
        }

        private static readonly __windows: Window[] = [];
        public ShowNewWindow(uri: string, useOpenedWindow: boolean = true) {
            let fullUri = $.AbsoluteUri(uri);
            if (useOpenedWindow) {
                let createdWindow = AppBizViewModel.__windows.FirstOrDefault(x => !x.closed && x.location.href === fullUri);
                if (createdWindow) {
                    createdWindow.focus();
                    return;
                }
            }
            let win = this.Navigator.NewWindow(uri, '_blank', 'fullscreen=yes,menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes');
            AppBizViewModel.__windows.push(win);
            return win;
        }

        public ShowNewTab(uri: string, useOpenedWindow: boolean = true) {
            let fullUri = $.AbsoluteUri(uri);
            if (useOpenedWindow) {
                let createdWindow = AppBizViewModel.__windows.FirstOrDefault(x => !x.closed && x.location.href === fullUri);
                if (createdWindow) {
                    createdWindow.focus();
                    return;
                }
            }

            let win = window.open("", "_blank");
            win.location.href = $.AbsoluteUri(uri);
            AppBizViewModel.__windows.push(win);
            return win;
        }


        public Move(uri: string, title: string) {
            let e: { uri: string, title: string, pms?: JQueryPromise<any> } = {
                uri: uri,
                title: title
            };

            AppMediator.SPAMoveRequest.Raise(this, e);

            return e.pms;
        }

        public ShowModal(uri: string, option?: DomBehind.Navigation.IModalHelperSettings): JQueryPromise<any>;
        public ShowModal(jquery: JQuery, option?: DomBehind.Navigation.IModalHelperSettings): JQueryPromise<any>;
        public ShowModal(obj: any, option?: DomBehind.Navigation.IModalHelperSettings): JQueryPromise<any> {

            option = $.extend(true, {
                Width: "100%",
            }, option);

            return PutbackQueryString(() => {
                if (typeof obj === "string") {
                    let arr = obj.Split("?");
                    if (1 < arr.length) {
                        $.SetQueryStrings(arr[1]);
                    }
                }
                return this.Navigator.ShowModal(obj, option);
            });
        }


    }


}