var DomBehind;
(function (DomBehind) {
    /**
     * It is the code behind the view
     * to promotes component-oriented developers
     */
    var BizView = /** @class */ (function () {
        function BizView() {
            // #region Container is HTML(JQuery)
            this._disposed = false;
            // #endregion
        }
        Object.defineProperty(BizView.prototype, "Container", {
            get: function () {
                return this._container;
            },
            set: function (value) {
                if (this._container !== value) {
                    if (this._container) {
                        this._container.empty();
                        this._container = null;
                    }
                    this._container = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BizView.prototype, "DataContext", {
            // #endregion
            // #region DataContext is ViewModel
            get: function () {
                return this._dataContext;
            },
            set: function (value) {
                if (this._dataContext !== value) {
                    this._dataContext = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        // #endregion
        // #region may be inherited
        BizView.prototype.OnDataContextPropertyChanged = function (sender, e) {
            this.UpdateTarget(e.Name);
        };
        BizView.prototype.ViewLoaded = function (responseText, textStatus, XMLHttpRequest) { };
        // #endregion
        // #region Ensure
        BizView.prototype.Ensure = function () {
            if (!this.DataContext)
                return;
            var viewModel = this.DataContext;
            viewModel.View = this;
            if (this.BindingBehaviors) {
                this.BindingBehaviors.Dispose();
                this.BindingBehaviors = null;
            }
            this.BindingBehaviors = new DomBehind.Data.BindingBehaviorCollection();
            this.BuildBinding();
            this.Subscribe();
            this.BindingBehaviors.Ensure();
            // 利用ライブラリ固有のヴァリデーション方言を吸収する
            if (this.DependencyValidateSetup) {
                this.DependencyValidateSetup();
            }
            if (!viewModel.Initialized) {
                viewModel.Initialized = true;
                this.Container.Raise(DomBehind.UIElement.Initialize);
            }
            this.UpdateTarget();
            this.Container.Raise(DomBehind.UIElement.ViewLoaded);
        };
        // #endregion
        // #region Event subscribe
        BizView.prototype.UnSubscribe = function () {
        };
        BizView.prototype.Subscribe = function () {
        };
        //#endregion
        /**
         * start the build of the binding
         */
        BizView.prototype.CreateBindingBuilder = function () {
            var builder = new DomBehind.BindingBehaviorBuilder(this);
            builder.Element(this.Container).BindingAction(DomBehind.UIElement.Initialize, function (vm) { return vm.Initialize(); });
            builder.Element(this.Container).BindingAction(DomBehind.UIElement.ViewLoaded, function (vm) { return vm.ViewLoaded(); });
            return builder;
        };
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        BizView.prototype.UpdateTarget = function (mark) {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateTarget(mark);
        };
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        BizView.prototype.UpdateSource = function (mark) {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateSource(mark);
        };
        // #endregion
        // #region Validate
        BizView.prototype.Validate = function (mark) {
            var result = true;
            if (this.BindingBehaviors) {
                this.ClearValidator(mark);
                $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), function (i, behavior) {
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
        };
        BizView.prototype.ClearValidator = function (mark) {
            $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), function (i, value) {
                value.BindingPolicy.Validators.ClearValidator();
            });
            this.Container.ClearCustomError();
            // サードパーティやNugetライブラリ拡張用
            if (this.DependencyValidateClear) {
                this.DependencyValidateClear(mark);
            }
        };
        // #endregion
        // #region Dispose
        BizView.prototype.Dispose = function () {
            if (!this._disposed) {
                this.UnSubscribe();
                if (this.BindingBehaviors) {
                    this.BindingBehaviors.Dispose();
                    this.BindingBehaviors = null;
                }
                if (this.DataContext) {
                    var disopsable = this.DataContext;
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
        };
        return BizView;
    }());
    DomBehind.BizView = BizView;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BizView.js.map