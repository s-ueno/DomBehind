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
        var ValidationExceptionHandlingActionPolicy = /** @class */ (function (_super) {
            __extends(ValidationExceptionHandlingActionPolicy, _super);
            function ValidationExceptionHandlingActionPolicy() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._priority = 50;
                return _this;
            }
            ValidationExceptionHandlingActionPolicy.prototype.Priority = function () {
                return this._priority;
            };
            ValidationExceptionHandlingActionPolicy.prototype.Begin = function () { };
            ValidationExceptionHandlingActionPolicy.prototype.Done = function () { };
            ValidationExceptionHandlingActionPolicy.prototype.Fail = function (ex) {
                var _this = this;
                if (!this.Supported)
                    return;
                if (ex.Data instanceof DomBehind.Validation.AggregateValidationException) {
                    var vex = ex.Data;
                    $.each(vex.Items, function (i, each) {
                        _this.SetCustomError(each);
                    });
                    ex.Handled = true;
                }
                else if (ex.Data instanceof DomBehind.Validation.ValidationException) {
                    this.SetCustomError(ex.Data);
                    ex.Handled = true;
                }
            };
            ValidationExceptionHandlingActionPolicy.prototype.SetCustomError = function (vex) {
                this.Owner.find(vex.Selector).SetCustomError(vex.Message);
            };
            Object.defineProperty(ValidationExceptionHandlingActionPolicy.prototype, "Supported", {
                get: function () {
                    if (!this.ViewModel)
                        return false;
                    if (!this.View)
                        return false;
                    if (!this.Owner)
                        return false;
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationExceptionHandlingActionPolicy.prototype, "ViewModel", {
                get: function () {
                    return this.Behavior.DataContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationExceptionHandlingActionPolicy.prototype, "View", {
                get: function () {
                    return this.ViewModel.View;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationExceptionHandlingActionPolicy.prototype, "Owner", {
                get: function () {
                    return this.View.Container;
                },
                enumerable: true,
                configurable: true
            });
            ValidationExceptionHandlingActionPolicy.prototype.Always = function () { };
            return ValidationExceptionHandlingActionPolicy;
        }(Data.ActionPolicy));
        Data.ValidationExceptionHandlingActionPolicy = ValidationExceptionHandlingActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ValidationExceptionHandlingActionPolicy.js.map