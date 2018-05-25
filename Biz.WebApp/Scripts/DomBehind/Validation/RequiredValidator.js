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
    var Validation;
    (function (Validation) {
        var RequiredValidator = /** @class */ (function (_super) {
            __extends(RequiredValidator, _super);
            function RequiredValidator() {
                return _super.call(this, "required") || this;
            }
            // #region Dispose
            RequiredValidator.prototype.Dispose = function () {
                if (!this._disposed) {
                    _super.prototype.Dispose.call(this);
                }
            };
            return RequiredValidator;
        }(Validation.Validator));
        Validation.RequiredValidator = RequiredValidator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        Data.DataBindingBehaviorBuilder.prototype.Required = function (message, applyRule) {
            var me = this;
            var validator = me.AddValidator(new DomBehind.Validation.RequiredValidator());
            validator.Message = message;
            validator.AllowApply = applyRule;
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=RequiredValidator.js.map