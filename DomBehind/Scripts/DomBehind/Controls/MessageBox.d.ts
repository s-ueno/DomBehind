declare namespace DomBehind {
    enum MessageStatus {
        Infomation = 0,
        Warning = 1,
        Error = 2
    }
    class MessaageBox {
        static ShowInfomation(message: string, title?: string): void;
        static ShowWarning(message: string, title?: string): void;
        static ShowError(message: string, title?: string): void;
        static ShowMessage(message: string, title?: string, status?: MessageStatus): void;
        static ShowYesNo(message: string, title?: string, option?: {
            status?: MessageStatus;
            yesCallback?: Function;
            noCallBack?: Function;
        }): void;
        static ShowOkCancel(message: string, title?: string, option?: {
            status?: MessageStatus;
            okCallback?: Function;
            cancelCallBack?: Function;
        }): void;
        static BuiltIn<T>(lazy: () => TypedConstructor<T>): void;
        private static _lazy;
        private static get Container();
        private static _container;
    }
    interface IMessageContainer {
        ShowMessage(message: string, title?: string, status?: MessageStatus): any;
        ShowYesNo(message: string, title?: string, option?: {
            status?: MessageStatus;
            yesCallback?: Function;
            noCallBack?: Function;
        }): any;
        ShowOkCancel(message: string, title?: string, option?: {
            status?: MessageStatus;
            okCallback?: Function;
            cancelCallBack?: Function;
        }): any;
    }
    class DefaultMessageContainer implements IMessageContainer {
        ShowMessage(message: string, title?: string, status?: MessageStatus): void;
        ShowYesNo(message: string, title?: string, option?: {
            status?: MessageStatus;
            yesCallback?: Function;
            noCallBack?: Function;
        }): void;
        ShowOkCancel(message: string, title?: string, option?: {
            status?: MessageStatus;
            okCallback?: Function;
            cancelCallBack?: Function;
        }): void;
    }
}
