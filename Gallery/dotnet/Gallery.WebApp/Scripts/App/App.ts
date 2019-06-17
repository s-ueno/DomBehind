namespace Gallery.WebApp {

    export class App extends DomBehind.Application {

        constructor() {
            super();
            AppMediator.ThrowAjaxException.AddHandler(
                (sender, e) => this.OnAjaxException(sender, e));
        }

        /** アプリケーション インスタンス */
        public static get Instance(): App {
            return <App>App.Current;
        }
        /** 最後に表示した Uri */
        public get LastViewUri(): string {
            return $.GetLocalStorage("LastViewUri", "");
        }
        public set LastViewUri(value: string) {
            $.SetLocalStorage("LastViewUri", value);
        }

        /** 最後に設定された画面タイトル(内部管理用) */
        public get LastViewTitle(): string {
            return $.GetLocalStorage("LastViewTitle", "");
        }
        public set LastViewTitle(value: string) {
            $.SetLocalStorage("LastViewTitle", value);
        }

        UnhandledException(error: any): void {
            let errorMessage: string = "Unknown exception";
            let statusCode: number = -1;


            if (statusCode === 0) {
                this.OnAjaxException(null, error);
                return;
            }

            // 業務例外の場合(400～499までを業務例外に利用する)
            if (400 <= statusCode && statusCode < 500) {
                toastr.warning(errorMessage);
            } else {
                // システム例外
                console.error(error);
                // エラー全文を表示すると長すぎるため、強制的に文字数を制限する（200文字）
                errorMessage = errorMessage.substr(0, Math.min(200, errorMessage.length));
                toastr.error(errorMessage);
            }
        }

        public OnAjaxException(sender: any, e: { exception: any; additionalInfo?: any; }): void {
            // 明示的に呼び出された場合
            if (sender instanceof AppBizViewModel) {
                let ex = new DomBehind.Data.ActionPolicyExceptionEventArgs(sender, e.exception);
                sender.Catch(ex);
                if (ex.Handled) {
                    return;
                } else {
                    this.UnhandledException(e.exception);
                }
            } else {
                // UnhandledException からここに来た場合（Status：0固定）
                toastr.error("通信に失敗しました。電波状況の良いところでもう一度お試しください。");
            }
        }

        public get DefaultActionPolicy(): DomBehind.Data.ActionPolicy[] {
            return [
                new DomBehind.Data.SuppressDuplicateActionPolicy(),
                new DomBehind.Data.ExceptionHandlingActionPolicy(),
                new AppBizValidationExceptionPolicy(),
            ];
        }
    }
    export class AppBizValidationExceptionPolicy extends DomBehind.Data.ValidationExceptionHandlingActionPolicy {
        public /* override */ Fail(ex: DomBehind.Data.ActionPolicyExceptionEventArgs) {
            super.Fail(ex);
            if (ex.Handled && ex.Data instanceof DomBehind.Validation.ValidationException) {
                if (!String.IsNullOrWhiteSpace(ex.Data.Message))
                    toastr.error(ex.Data.Message);
            }
        }
    }
}