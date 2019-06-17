namespace Gallery.WebApp.Shared {

    export class LayoutViewModel extends AppBizViewModel {
        public UserName: string;
        public Breadbrumb: DomBehind.Breadbrumb;

        Initialize() {
            this.Title = "Sample System";
            this.UserName = "Jone Do"

            this.Breadbrumb = new DomBehind.Breadbrumb("#_layout .BreadcrumbContainer");
            this.Breadbrumb.Update();


            AppMediator.SPAMoveRequest.AddHandler((sender, e) => {
                // アプリからパンくず戻す命令を受けた場合でも、明示的に宣言されたキャッシュクリアイベントを発行し
                // サブスクライブ先でキャンセルされた場合は、パンくずの移動をキャンセルする
                let cancelEvent: { canceled: boolean | JQueryPromise<boolean>, additionalInfo?: any } = {
                    canceled: false
                };

                let newUri = this.Breadbrumb.Parse(e.uri, e.title);

                this.SetUriAndTitle(newUri, e.title);

                this.Navigator.Move(newUri, false);
            });

            AppMediator.SPAPopRequest.AddHandler((sender, e) => {
                if (this.Breadbrumb) {
                    if (e) {
                        this.Breadbrumb.Pop(e);
                    } else {
                        this.Breadbrumb.Pop();
                    }
                }
            });

            this.UpdateTarget();
        }
        private SetUriAndTitle(uri, title) {
            App.Instance.LastViewTitle = title;
            App.Instance.LastViewUri = uri;
        }
        public Reload() {
            this.Navigator.Reload(true);
        }

    }
}