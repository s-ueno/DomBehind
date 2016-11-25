namespace DomBehind.Core {


    /**
     * ViewModel
     * to promotes component-oriented developers
     */
    export abstract class BizViewModel
        extends NotifiableImp
        implements Data.IExceptionHandling {

        public NotifyMessage: Data.TypedEvent<any> = new Data.TypedEvent<any>();

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
            this.Subscribe();
        }

        // #endregion

        // #region IsWaiting


        // #endregion


        // #region Event subscribe

        protected UnSubscribe(): void {
        }
        protected Subscribe(): void {
            this.UnSubscribe();

        }

        // #endregion

        // #region Initialize

        public Initialized: boolean = false;
        /**
         * must inherits Initialize method.
         */
        public abstract Initialize(): void;

        /**
         * inherit if necessary ViewLoaded method.
         */
        public ViewLoaded(): void { }

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

        // #endregion

        // #region 

        protected LoadingAction(func: Function, image?: string): void {
            var overlayPolocy = new Data.WindowWaitingOverlayActionPolicy();
            if (image) {
                overlayPolocy.Option.Image = image;
            }
            this.SafeAction(func, overlayPolocy);
        }
        protected SafeAction(func: Function, ...policies: Data.ActionPolicy[]): void {
            var factory = new TypedFactory(Data.ActionBindingBehavior);
            var behavior = factory.CreateInstance();
            var list: Data.ActionPolicy[] = [new Data.ExceptionHandlingActionPolicy()];
            if (policies) {
                $.each(policies, (i, value) => list.push(value));
            }
            var invoker = behavior.CreateActionInvoker(list);
            invoker.Do(func);
        }

        // #endregion

        public /* virtual */ Catch(ex: Data.ActionPolicyExceptionInformation): void {

        }


        protected get ModalHelper(): IModalHelper {
            return Application.Current.ModalHelper;
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
