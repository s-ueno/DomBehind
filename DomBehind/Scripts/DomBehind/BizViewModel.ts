namespace DomBehind {
    /**
     * ViewModel
     * to promotes component-oriented developers
     */
    export abstract class BizViewModel
        extends NotifiableImp
        implements Data.IExceptionHandling {

        constructor() {
            super();
            Locator.Push(this);
        }

        protected NotifyEvent<TEvent>(event: TypedEvent<TEvent>, args: TEvent) {
            if (event)
                event.Raise(this, args);
        }

        public get Title(): string {
            return this._title;
        }
        public set Title(value: string) {
            this._title = value;
            document.title = value;
        }
        private _title: string;

        public get IsVisible(): boolean {
            let view = this.View;
            if (!view) return undefined;

            let container = view.Container;
            if (!container) return undefined;

            return container.css("display") !== "none";
        }
        public set IsVisible(value: boolean) {
            let view = this.View;
            if (!view) return;

            let container = view.Container;
            if (!container) return;

            container.css("display", value ? "display" : "none");
        }


        // #region View Property

        public get View(): BizView {
            return this._view;
        }
        public set View(value: BizView) {
            if (this._view !== value) {
                this._view = value;
                this.OnViewChanged();
            }
        }
        private _view: BizView;

        protected OnViewChanged(): void {
        }

        // #endregion

        // #region IsWaiting


        // #endregion


        // #region Initialize

        public Initialized: boolean = false;
        /**
         * must inherits Initialize method.
         */
        public abstract Initialize();

        /**
         * inherit if necessary View Activate method.
         */
        public Activate() { }

        // #endregion 

        // #region Update

        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        public UpdateTarget(mark?: string): void {
            if (this.View) {
                this.View.UpdateTarget(mark);
            }
        }

        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        public UpdateSource(mark?: string): void {
            if (this.View) {
                this.View.UpdateSource(mark);
            }
        }

        // #endregion

        // #region

        public Validate(mark?: string): boolean {
            let result = false;
            if (this.View) {
                result = this.View.Validate(mark);
            }
            return result;
        }

        public ClearValidation(mark?: string) {
            this.View.ClearValidator(mark);
        }

        protected LastErrors(mark?: string): string[] {
            let result = [];
            $.each(this.View.BindingBehaviors.ListDataBindingBehavior(mark), (i, behavior) => {
                if (behavior.BindingPolicy &&
                    behavior.BindingPolicy.Validators) {

                    $.each(behavior.BindingPolicy.Validators.toArray(), (x, v) => {
                        if (v.HasError && v.Message) {
                            result.push(v.Message);
                        }
                    })
                }
            });
            return result;
        }

        protected ThrownValidate(mark?: string) {
            let result = this.Validate(mark);
            if (result) return;

            let lastErrors = this.LastErrors(mark).Select(x => new ApplicationException(x));
            throw new ApplicationAggregateException(lastErrors);
        }

        // #endregion

        // #region 

        protected WaitingOverlay(func: Function, handled?: boolean, image?: string) {
            var overlayPolocy = new Data.WindowWaitingOverlayActionPolicy();
            if (image) {
                overlayPolocy.Option.Image = image;
            }
            return this.SafeAction(func, handled, overlayPolocy);
        }
        protected SafeAction(func: Function, handled?: boolean, ...policies: Data.ActionPolicy[]) {
            var behavior = new Data.ActionBindingBehavior();

            var list: Data.ActionPolicy[] = [];
            if (!handled) {
                list.push(new Data.ExceptionHandlingActionPolicy());
            }
            if (policies) {
                $.each(policies, (i, value) => list.push(value));
            }
            var invoker = behavior.CreateActionInvoker(list);
            return invoker.Do(func);
        }

        // #endregion

        // IExceptionHandling 実装
        public /* virtual */ Catch(ex: Data.ActionPolicyExceptionEventArgs): void {
            if (ex.Data instanceof AjaxException) {

            }


        }


        protected get Navigator(): Navigation.INavigator {
            return Application.Current.Navigator;
        }

        // #region IsEnabled

        public get IsEnabled(): boolean {
            return this.GetProperty("IsEnabled", true);
        }
        public set IsEnabled(value: boolean) {
            this.SetProperty("IsEnabled", value);
        }

        // #endregion 

        public ShowInfomation(message: string, title?: string) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Infomation);
        }
        public ShowWarning(message: string, title?: string) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Warning);
        }
        public ShowError(message: string, title?: string) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Error);
        }
        public ShowMessage(message: string, title?: string, status?: MessageStatus) {
            MessaageBox.ShowMessage(message, title, status);
        }
        public ShowYesNo(message: string, title?: string, option?: { status?: MessageStatus, yesCallback?: Function, noCallBack?: Function }) {
            MessaageBox.ShowYesNo(message, title, option);
        }
        public ShowOkCancel(message: string, title?: string, option?: { status?: MessageStatus, okCallback?: Function, cancelCallBack?: Function }) {
            MessaageBox.ShowOkCancel(message, title, option);
        }

        // #region Dispose

        public Dispose(): void {
            if (!this._disposed) {


                super.Dispose();
            }
        }

        // #endregion

    }
}
