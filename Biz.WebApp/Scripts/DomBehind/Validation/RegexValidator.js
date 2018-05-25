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
        var RegexValidator = /** @class */ (function (_super) {
            __extends(RegexValidator, _super);
            function RegexValidator() {
                return _super.call(this, "pattern") || this;
            }
            RegexValidator.prototype.RemoveValidation = function () {
                _super.prototype.RemoveValidation.call(this);
                this.Behavior.Element.removeAttr("title");
            };
            RegexValidator.prototype.ValidationMessage = function (validity) {
                var message = _super.prototype.ValidationMessage.call(this, validity);
                if (String.IsNullOrWhiteSpace(message)) {
                    this.Behavior.Element.attr("title", this.AttributeValue);
                }
                return message;
            };
            // #region Dispose
            RegexValidator.prototype.Dispose = function () {
                if (!this._disposed) {
                    _super.prototype.Dispose.call(this);
                }
            };
            return RegexValidator;
        }(Validation.Validator));
        Validation.RegexValidator = RegexValidator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        Data.DataBindingBehaviorBuilder.prototype.Pattern = function (regex, message, applyRule) {
            var me = this;
            var validator = me.AddValidator(new DomBehind.Validation.RegexValidator());
            validator.AttributeExpression = regex;
            validator.Message = message;
            validator.AllowApply = applyRule;
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=RegexValidator.js.map