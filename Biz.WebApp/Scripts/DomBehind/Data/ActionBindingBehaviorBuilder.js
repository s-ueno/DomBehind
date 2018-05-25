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
        var ActionBindingBehaviorBuilder = /** @class */ (function (_super) {
            __extends(ActionBindingBehaviorBuilder, _super);
            // #region constructor
            function ActionBindingBehaviorBuilder(owner) {
                return _super.call(this, owner) || this;
            }
            Object.defineProperty(ActionBindingBehaviorBuilder.prototype, "Behavior", {
                get: function () {
                    return this.CurrentBehavior;
                },
                enumerable: true,
                configurable: true
            });
            // #endregion
            ActionBindingBehaviorBuilder.prototype.ActionPolicy = function () {
                var _this = this;
                var policies = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    policies[_i] = arguments[_i];
                }
                $.each(policies, function (i, x) {
                    _this.Behavior.ActionPolicyCollection.push(x);
                });
                return this;
            };
            return ActionBindingBehaviorBuilder;
        }(DomBehind.BindingBehaviorBuilder));
        Data.ActionBindingBehaviorBuilder = ActionBindingBehaviorBuilder;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionBindingBehaviorBuilder.js.map