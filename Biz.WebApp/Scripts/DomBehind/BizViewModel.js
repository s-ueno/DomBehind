var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    /**
     * ViewModel
     * to promotes component-oriented developers
     */
    var BizViewModel = /** @class */ (function (_super) {
        __extends(BizViewModel, _super);
        function BizViewModel() {
            var _this = _super.call(this) || this;
            // #endregion
            // #region IsWaiting
            // #endregion
            // #region Initialize
            _this.Initialized = false;
            DomBehind.Locator.Push(_this);
            return _this;
        }
        BizViewModel.prototype.NotifyEvent = function (event, args) {
            if (event)
                event.Raise(this, args);
        };
        Object.defineProperty(BizViewModel.prototype, "Title", {
            get: function () {
                return this._title;
            },
            set: function (value) {
                this._title = value;
                document.title = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BizViewModel.prototype, "View", {
            // #region View Property
            get: function () {
                return this._view;
            },
            set: function (value) {
                if (this._view !== value) {
                    this._view = value;
                    this.OnViewChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        BizViewModel.prototype.OnViewChanged = function () {
        };
        /**
         * inherit if necessary ViewLoaded method.
         */
        BizViewModel.prototype.ViewLoaded = function () { };
        // #endregion 
        // #region Update
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        BizViewModel.prototype.UpdateTarget = function (mark) {
            if (this.View) {
                this.View.UpdateTarget(mark);
            }
        };
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        BizViewModel.prototype.UpdateSource = function (mark) {
            if (this.View) {
                this.View.UpdateSource(mark);
            }
        };
        // #endregion
        // #region
        BizViewModel.prototype.Validate = function (mark) {
            var result = false;
            if (this.View) {
                result = this.View.Validate(mark);
            }
            return result;
        };
        // #endregion
        // #region 
        BizViewModel.prototype.WaitingOverlay = function (func, image) {
            var overlayPolocy = new DomBehind.Data.WindowWaitingOverlayActionPolicy();
            if (image) {
                overlayPolocy.Option.Image = image;
            }
            this.SafeAction(func, overlayPolocy);
        };
        BizViewModel.prototype.SafeAction = function (func) {
            var policies = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                policies[_i - 1] = arguments[_i];
            }
            var behavior = new DomBehind.Data.ActionBindingBehavior();
            var list = [new DomBehind.Data.ExceptionHandlingActionPolicy()];
            if (policies) {
                $.each(policies, function (i, value) { return list.push(value); });
            }
            var invoker = behavior.CreateActionInvoker(list);
            invoker.Do(func);
        };
        // #endregion
        // IExceptionHandling 実装
        BizViewModel.prototype.Catch = function (ex) {
            if (ex.Data instanceof DomBehind.AjaxException) {
            }
        };
        Object.defineProperty(BizViewModel.prototype, "Navigator", {
            get: function () {
                return DomBehind.Application.Current.Navigator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BizViewModel.prototype, "IsEnabled", {
            // #region IsEnabled
            get: function () {
                return this.GetProperty("IsEnabled", true);
            },
            set: function (value) {
                this.SetProperty("IsEnabled", value);
            },
            enumerable: true,
            configurable: true
        });
        // #endregion 
        BizViewModel.prototype.ShowInfomation = function (message, title) {
            DomBehind.MessaageBox.ShowMessage(message, title, DomBehind.MessageStatus.Infomation);
        };
        BizViewModel.prototype.ShowWarning = function (message, title) {
            DomBehind.MessaageBox.ShowMessage(message, title, DomBehind.MessageStatus.Warning);
        };
        BizViewModel.prototype.ShowError = function (message, title) {
            DomBehind.MessaageBox.ShowMessage(message, title, DomBehind.MessageStatus.Error);
        };
        BizViewModel.prototype.ShowMessage = function (message, title, status) {
            DomBehind.MessaageBox.ShowMessage(message, title, status);
        };
        BizViewModel.prototype.ShowYesNo = function (message, title, option) {
            DomBehind.MessaageBox.ShowYesNo(message, title, option);
        };
        BizViewModel.prototype.ShowOkCancel = function (message, title, option) {
            DomBehind.MessaageBox.ShowOkCancel(message, title, option);
        };
        BizViewModel.prototype.ShowModal = function (obj, option) {
            // あまりに重い場合は、個別に画面でオーバレイ出してもらう
            this.Navigator.ShowModal(obj, option);
            //this.WaitingOverlay(() => {
            //    this.Navigator.ShowModal(obj, option);
            //});
        };
        // #region Dispose
        BizViewModel.prototype.Dispose = function () {
            if (!this._disposed) {
                _super.prototype.Dispose.call(this);
            }
        };
        return BizViewModel;
    }(DomBehind.NotifiableImp));
    DomBehind.BizViewModel = BizViewModel;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BizViewModel.js.map