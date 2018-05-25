declare namespace DomBehind {
    /**
     * ViewModel
     * to promotes component-oriented developers
     */
    abstract class BizViewModel extends NotifiableImp implements Data.IExceptionHandling {
        constructor();
        protected NotifyEvent<TEvent>(event: TypedEvent<TEvent>, args: TEvent): void;
        Title: string;
        private _title;
        View: BizView;
        private _view;
        protected OnViewChanged(): void;
        Initialized: boolean;
        /**
         * must inherits Initialize method.
         */
        abstract Initialize(): void;
        /**
         * inherit if necessary ViewLoaded method.
         */
        ViewLoaded(): void;
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        UpdateTarget(mark?: string): void;
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        UpdateSource(mark?: string): void;
        Validate(mark?: string): boolean;
        protected WaitingOverlay(func: Function, image?: string): void;
        protected SafeAction(func: Function, ...policies: Data.ActionPolicy[]): void;
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
        ShowModal(uri: string, option?: Navigation.IModalHelperSettings): any;
        ShowModal(jquery: JQuery, option?: Navigation.IModalHelperSettings): any;
        Dispose(): void;
    }
}
