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
    var Data;
    (function (Data) {
        /**
         * linked the method of the View of the event and the ViewModel
         */
        var ActionBindingBehavior = /** @class */ (function (_super) {
            __extends(ActionBindingBehavior, _super);
            function ActionBindingBehavior() {
                // #region Event property
                var _this = _super !== null && _super.apply(this, arguments) || this;
                // #endregion
                // #region ActionPolicy
                _this.ActionPolicyCollection = [];
                return _this;
                // #endregion
            }
            // #region Ensure
            ActionBindingBehavior.prototype.Ensure = function () {
                var _this = this;
                this.ActionHandle = function (x) { return _this.OnTrigger(x); };
                if (this.Event && !String.IsNullOrWhiteSpace(this.Event.EventName)) {
                    this.Element.on(this.Event.EventName, function (e) { return _this.ActionHandle(e); });
                }
                this.EventHandle = function (sender, data) { return _this.Do(sender, data); };
                if (this.Event) {
                    this.Event.AddHandler(this.EventHandle);
                }
                if (this.Element.is("a") && !this.Element.attr("href")) {
                    this.Element.attr("href", "javascript:void(0);");
                }
            };
            ActionBindingBehavior.prototype.OnTrigger = function (e) {
                this.Event.Raise(this, e);
            };
            Object.defineProperty(ActionBindingBehavior.prototype, "ActionInvoker", {
                get: function () {
                    if (!this._actionInvoker) {
                        var defaultPolicies = DomBehind.Application.Current.DefaultActionPolicy;
                        var list = this.ActionPolicyCollection.concat(defaultPolicies);
                        this._actionInvoker = this.CreateActionInvoker(list);
                    }
                    return this._actionInvoker;
                },
                enumerable: true,
                configurable: true
            });
            ActionBindingBehavior.prototype.CreateActionInvoker = function (policies) {
                var _this = this;
                var list = [];
                if (policies) {
                    list = list.concat(policies);
                }
                list = list.OrderBy(function (x) { return x.Priority(); });
                $.each(list, function (i, value) {
                    var nextIndex = i + 1;
                    if (nextIndex < list.length) {
                        value.NextPolicy = list[nextIndex];
                    }
                    value.Behavior = _this;
                });
                return list[0];
            };
            // #endregion
            // #region Do
            /**
             * Run the linked action
             * @param sender
             * @param e
             */
            ActionBindingBehavior.prototype.Do = function (sender, e) {
                var _this = this;
                if (!this.AllowBubbling) {
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                }
                this.ActionInvoker.Do(function () {
                    var result;
                    if (_this.Action) {
                        if (_this.ActionParameterCount === 1) {
                            result = _this.Action(_this.DataContext);
                        }
                        else if (_this.ActionParameterCount === 2) {
                            result = _this.Action(_this.DataContext, e);
                        }
                        else {
                            result = _this.Action(_this.DataContext);
                        }
                    }
                    return result;
                });
            };
            // #endregion
            // #region Dispose
            ActionBindingBehavior.prototype.Dispose = function () {
                if (!this._disposed) {
                    if (!Object.IsNullOrUndefined(this.Element)) {
                        if (!Object.IsNullOrUndefined(this.Event)) {
                            if (!String.IsNullOrWhiteSpace(this.Event.EventName)) {
                                this.Element.off(this.Event.EventName, this.ActionHandle);
                            }
                            this.ActionHandle = null;
                            this.Action = null;
                            this.Event.RemoveHandler(this.EventHandle);
                            this.EventHandle = null;
                            this.Event = null;
                        }
                        this.Element = null;
                    }
                    this.ActionParameterCount = null;
                    _super.prototype.Dispose.call(this);
                }
            };
            return ActionBindingBehavior;
        }(Data.BindingBehavior));
        Data.ActionBindingBehavior = ActionBindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionBindingBehavior.js.map