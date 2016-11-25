namespace DomBehind.Core {
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

        public /* virtual */ OnReceiveNotificationMessage(sender: any, e: any) {

        }
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

            this.BindingBehaviors = new BindingBehaviorCollection();
            this.BuildBinding();

            this.Subscribe();

            this.BindingBehaviors.Ensure();

            if (!viewModel.Initialized) {
                viewModel.Initialized = true;
                this.Container.Raise(UIElement.InitializeEvent);
            }

            this.UpdateTarget();

            this.Container.Raise(UIElement.ViewLoadedEvent);
        }

        // #endregion

        // #region Event subscribe

        protected UnSubscribe(): void {
            if (Object.IsNullOrUndefined(this.DataContext)) return;

            if (this.DataContext instanceof BizViewModel) {
                var viewModel = this.DataContext as BizViewModel;
                viewModel.NotifyMessage.RemoveHandler((sender, e) => this.OnReceiveNotificationMessage(sender, e));
            }

            if (this.DataContext instanceof NotifiableImp) {
                var notifiable = this.DataContext as NotifiableImp;
                notifiable.PropertyChanged.RemoveHandler((sender, e) => this.OnDataContextPropertyChanged(sender, e));
            }
        }
        protected Subscribe(): void {
            if (Object.IsNullOrUndefined(this.DataContext)) return;

            this.UnSubscribe();

            if (this.DataContext instanceof BizViewModel) {
                var viewModel = this.DataContext as BizViewModel;
                viewModel.NotifyMessage.AddHandler((sender, e) => this.OnReceiveNotificationMessage(sender, e));
            }

            if (this.DataContext instanceof NotifiableImp) {
                var notifiable = this.DataContext as NotifiableImp;
                notifiable.PropertyChanged.AddHandler((sender, e) => this.OnDataContextPropertyChanged(sender, e));
            }
        }

        //#endregion

        /**
         * start the build of the binding
         */
        protected CreateBindingBuilder<T extends BizViewModel>(): BindingBehaviorBuilder<T> {
            let builder = new BindingBehaviorBuilder<T>(this);
            builder.Element(this.Container).BindingAction(UIElement.InitializeEvent, vm => vm.Initialize());
            builder.Element(this.Container).BindingAction(UIElement.ViewLoadedEvent, vm => vm.ViewLoaded());
            return builder;
        }

        // #region Behavior

        /**
         * provides the ability to easily use behaviors
         */
        public BindingBehaviors: BindingBehaviorCollection;

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
            return result;
        }

        public ApplyValidator(): void {
            if (this.BindingBehaviors) {
                let allBehaviors = this.BindingBehaviors.ListDataBindingBehavior();
                $.each(allBehaviors, (i, behavior) => {
                    behavior.BindingPolicy.Validators.ClearValidator();
                    behavior.BindingPolicy.Validators.ApplyValidator();
                });
            }
        }

        public ClearValidator(mark?: string): void {
            $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), (i, value) => {
                value.BindingPolicy.Validators.ClearValidator();
            });
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