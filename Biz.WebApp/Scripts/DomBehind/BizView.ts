namespace DomBehind {
    /**
     * It is the code behind the view
     * to promotes component-oriented developers
     */
    export abstract class BizView implements IDisposable {

        // #region Container is HTML(JQuery)

        public get Container(): JQuery {
            return this._container;
        }
        public set Container(value: JQuery) {
            if (this._container !== value) {
                if (this._container) {
                    this._container.empty();
                    this._container = null;
                }
                this._container = value;
            }
        }
        private _container: JQuery;

        // #endregion

        // #region DataContext is ViewModel

        public get DataContext(): any {
            return this._dataContext;
        }
        private _dataContext: any;
        public set DataContext(value: any) {
            if (this._dataContext !== value) {
                this._dataContext = value;
            }
        }

        // #endregion

        // #region must inherits

        public abstract BuildBinding(): void;

        // #endregion

        // #region may be inherited

        public /* virtual */ OnDataContextPropertyChanged(sender: any, e: PropertyChangedEventArgs) {
            this.UpdateTarget(e.Name);
        }

        public ViewLoaded(responseText: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): void { }

        // #endregion

        // #region Ensure

        public Ensure(): void {
            if (!this.DataContext) return;

            var viewModel = this.DataContext as BizViewModel;
            viewModel.View = this;

            if (this.BindingBehaviors) {
                this.BindingBehaviors.Dispose();
                this.BindingBehaviors = null;
            }

            this.BindingBehaviors = new Data.BindingBehaviorCollection();
            this.BuildBinding();

            this.Subscribe();

            this.BindingBehaviors.Ensure();

            // 利用ライブラリ固有のヴァリデーション方言を吸収する
            if (this.DependencyValidateSetup) {
                this.DependencyValidateSetup();
            }

            if (!viewModel.Initialized) {
                viewModel.Initialized = true;
                this.Container.Raise(UIElement.Initialize);
            }

            this.UpdateTarget();

            this.Container.Raise(UIElement.ViewLoaded);
        }

        // #endregion

        // #region Event subscribe

        protected UnSubscribe(): void {

        }
        protected Subscribe(): void {

        }

        //#endregion

        /**
         * start the build of the binding
         */
        protected CreateBindingBuilder<T extends BizViewModel>(): BindingBehaviorBuilder<T> {
            let builder = new BindingBehaviorBuilder<T>(this);
            builder.Element(this.Container).BindingAction(UIElement.Initialize, vm => vm.Initialize());
            builder.Element(this.Container).BindingAction(UIElement.ViewLoaded, vm => vm.ViewLoaded());
            return builder;
        }

        // #region Behavior

        /**
         * provides the ability to easily use behaviors
         */
        public BindingBehaviors: Data.BindingBehaviorCollection;

        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        public UpdateTarget(mark?: string): void {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateTarget(mark);
        }
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        public UpdateSource(mark?: string): void {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateSource(mark);
        }

        // #endregion

        // #region Validate

        public Validate(mark?: string): boolean {
            let result = true;
            if (this.BindingBehaviors) {
                this.ClearValidator(mark);
                $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), (i, behavior) => {
                    if (!behavior.BindingPolicy.Validators.Validate()) {
                        result = false;
                    }
                });
                if (result) {
                    this.ClearValidator(mark);
                }
            }

            // サードパーティやNugetライブラリ拡張用
            if (this.DependencyValidate) {
                this.DependencyValidate(mark);
            }
            return result;
        }

        public ClearValidator(mark?: string): void {
            $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), (i, value) => {
                value.BindingPolicy.Validators.ClearValidator();
            });
            this.Container.ClearCustomError();

            // サードパーティやNugetライブラリ拡張用
            if (this.DependencyValidateClear) {
                this.DependencyValidateClear(mark);
            }
        }

        // #endregion

        // #region Dispose

        public Dispose(): void {
            if (!this._disposed) {
                this.UnSubscribe();
                if (this.BindingBehaviors) {
                    this.BindingBehaviors.Dispose();
                    this.BindingBehaviors = null;
                }
                if (this.DataContext) {
                    var disopsable = this.DataContext as IDisposable;
                    if (disopsable.Dispose) {
                        disopsable.Dispose();
                    }
                    this.DataContext = null;
                }
                if (this.Container) {
                    this.Container.empty();
                    this.Container = null;
                }
            }
            this._disposed = true;
        }
        protected _disposed: boolean = false;

        // #endregion

    }

}
