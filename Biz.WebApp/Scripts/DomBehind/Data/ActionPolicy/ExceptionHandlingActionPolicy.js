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
        var ExceptionHandlingActionPolicy = /** @class */ (function (_super) {
            __extends(ExceptionHandlingActionPolicy, _super);
            function ExceptionHandlingActionPolicy() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._priority = 1;
                return _this;
            }
            ExceptionHandlingActionPolicy.prototype.Priority = function () {
                return this._priority;
            };
            ExceptionHandlingActionPolicy.prototype.Begin = function () {
            };
            ExceptionHandlingActionPolicy.prototype.Done = function () {
            };
            ExceptionHandlingActionPolicy.prototype.Fail = function (ex) {
                if (this.Behavior.DataContext) {
                    var handlingObj = this.Behavior.DataContext;
                    if (handlingObj.Catch) {
                        handlingObj.Catch(ex);
                    }
                    if (ex.Handled)
                        return;
                }
                DomBehind.Application.Current.UnhandledException(ex.Data);
                ex.Handled = true;
            };
            ExceptionHandlingActionPolicy.prototype.Always = function () {
            };
            return ExceptionHandlingActionPolicy;
        }(Data.ActionPolicy));
        Data.ExceptionHandlingActionPolicy = ExceptionHandlingActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ExceptionHandlingActionPolicy.js.map