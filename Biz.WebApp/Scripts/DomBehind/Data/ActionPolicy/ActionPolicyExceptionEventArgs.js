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
        var ActionPolicyExceptionEventArgs = /** @class */ (function (_super) {
            __extends(ActionPolicyExceptionEventArgs, _super);
            function ActionPolicyExceptionEventArgs(sender, errorData) {
                var _this = _super.call(this) || this;
                _this.Data = errorData;
                _this.Handled = false;
                _this.Sender = sender;
                return _this;
            }
            return ActionPolicyExceptionEventArgs;
        }(DomBehind.EventArgs));
        Data.ActionPolicyExceptionEventArgs = ActionPolicyExceptionEventArgs;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionPolicyExceptionEventArgs.js.map