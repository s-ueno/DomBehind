namespace DomBehind {

    export enum MessageStatus {
        Infomation,
        Warning,
        Error
    }

    export class MessaageBox {
        public static ShowInfomation(message: string, title?: string) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Infomation);
        }
        public static ShowWarning(message: string, title?: string) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Warning);
        }
        public static ShowError(message: string, title?: string) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Error);
        }
        public static ShowMessage(message: string, title?: string, status?: MessageStatus) {
            MessaageBox.Container.ShowMessage(message, title, status);
        }
        public static ShowYesNo(message: string, title?: string, option?: { status?: MessageStatus, yesCallback?: Function, noCallBack?: Function }) {
            MessaageBox.Container.ShowYesNo(message, title, option);
        }
        public static ShowOkCancel(message: string, title?: string, option?: { status?: MessageStatus, okCallback?: Function, cancelCallBack?: Function }) {
            MessaageBox.Container.ShowOkCancel(message, title, option);
        }



        public static BuiltIn<T>(lazy: () => TypedConstructor<T>) {
            MessaageBox._lazy = lazy;
        }
        private static _lazy: Function;;

        private static get Container(): IMessageContainer {
            if (MessaageBox._container) {
                return MessaageBox._container;
            }
            if (!MessaageBox._lazy) {
                throw new Exception("メッセージ機能をビルドインしてください");
            }

            let fac = new TypedFactory(MessaageBox._lazy());
            MessaageBox._container = fac.CreateInstance() as IMessageContainer;
            return MessaageBox._container;
        }
        private static _container: IMessageContainer;
    }

    export interface IMessageContainer {
        ShowMessage(message: string, title?: string, status?: MessageStatus);
        ShowYesNo(message: string, title?: string, option?: { status?: MessageStatus, yesCallback?: Function, noCallBack?: Function });
        ShowOkCancel(message: string, title?: string, option?: { status?: MessageStatus, okCallback?: Function, cancelCallBack?: Function });
    }

    // デフォルトのビルトイン
    MessaageBox.BuiltIn(() => DefaultMessageContainer);
    export class DefaultMessageContainer implements IMessageContainer {
        ShowMessage(message: string, title?: string, status?: MessageStatus) {
            // デフォルトのアラートメッセージ
            window.alert(message);
        }
        ShowYesNo(message: string, title?: string, option?: { status?: MessageStatus; yesCallback?: Function; noCallBack?: Function; }) {
            // window.confirm はjavascriptを止めるタイプのメッセージボックスなので、このほうが嬉しいシチュエーションの方がエンタープライズだと多いと思われる
            // 通常、JSやCSS系のFWだとjavascriptを止めないで、callbackでOK、Cancelなどを実行するが、それでも良いなら割とデザインに幅が広がる
            if (window.confirm(message)) {
                if (option && option.yesCallback) {
                    option.yesCallback();
                }
            } else {
                if (option && option.noCallBack) {
                    option.noCallBack();
                }
            }
        }
        ShowOkCancel(message: string, title?: string, option?: { status?: MessageStatus; okCallback?: Function; cancelCallBack?: Function; }) {
            // window.confirm はjavascriptを止めるタイプのメッセージボックスなので、このほうが嬉しいシチュエーションの方がエンタープライズだと多いと思われる
            // 通常、JSやCSS系のFWだとjavascriptを止めないで、callbackでOK、Cancelなどを実行するが、それでも良いなら割とデザインに幅が広がる
            if (window.confirm(message)) {
                if (option && option.okCallback) {
                    option.okCallback();
                }
            } else {
                if (option && option.cancelCallBack) {
                    option.cancelCallBack();
                }
            }
        }
    }
}
