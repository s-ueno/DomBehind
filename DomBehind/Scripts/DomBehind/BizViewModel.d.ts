declare namespace DomBehind {
    abstract class BizViewModel extends NotifiableImp implements Data.IExceptionHandling {
        constructor();
        protected NotifyEvent<TEvent>(event: TypedEvent<TEvent>, args: TEvent): void;
        Title: string;
        private _title;
        IsVisible: boolean;
        View: BizView;
        private _view;
        protected OnViewChanged(): void;
        Initialized: boolean;
        abstract Initialize(): any;
        Activate(): void;
        UpdateTarget(mark?: string): void;
        UpdateSource(mark?: string): void;
        Validate(mark?: string): boolean;
        ClearValidation(mark?: string): void;
        protected LastErrors(mark?: string): string[];
        protected ThrownValidate(mark?: string): void;
        protected WaitingOverlay(func: Function, handled?: boolean, image?: string): any;
        protected SafeAction(func: Function, handled?: boolean, ...policies: Data.ActionPolicy[]): any;
        Catch(ex: Data.ActionPolicyExceptionEventArgs): void;
        protected readonly Navigator: Navigation.INavigator;
        IsEnabled: boolean;
        ShowInfomation(message: string, title?: string): void;
        ShowWarning(message: string, title?: string): void;
        ShowError(message: string, title?: string): void;
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
        Dispose(): void;
    }
}
