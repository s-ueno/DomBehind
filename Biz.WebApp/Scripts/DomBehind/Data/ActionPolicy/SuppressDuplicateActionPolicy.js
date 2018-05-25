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
        // SuppressDuplicateActionPolicy is the work
        var SuppressDuplicateWorkException = /** @class */ (function (_super) {
            __extends(SuppressDuplicateWorkException, _super);
            function SuppressDuplicateWorkException() {
                return _super.call(this, "This exception is a safe exception issued to prevent double press") || this;
            }
            return SuppressDuplicateWorkException;
        }(DomBehind.Exception));
        var SuppressDuplicateActionPolicy = /** @class */ (function (_super) {
            __extends(SuppressDuplicateActionPolicy, _super);
            function SuppressDuplicateActionPolicy() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._priority = 10;
                _this.IsEnabled = DomBehind.UIElement.IsEnabledProperty;
                _this.referencecount = 0;
                _this.engaged = false;
                return _this;
            }
            SuppressDuplicateActionPolicy.prototype.Priority = function () {
                return this._priority;
            };
            SuppressDuplicateActionPolicy.prototype.Begin = function () {
                ++this.referencecount;
                if (this.engaged) {
                    throw new SuppressDuplicateWorkException();
                }
                this.engaged = true;
                this.IsEnabled.SetValue(this.Behavior.Element, false);
            };
            SuppressDuplicateActionPolicy.prototype.Done = function () {
            };
            SuppressDuplicateActionPolicy.prototype.Fail = function (ex) {
                if (ex.Data instanceof SuppressDuplicateWorkException) {
                    ex.Handled = true;
                }
            };
            SuppressDuplicateActionPolicy.prototype.Always = function () {
                if (--this.referencecount === 0) {
                    this.engaged = false;
                    this.IsEnabled.SetValue(this.Behavior.Element, true);
                }
            };
            return SuppressDuplicateActionPolicy;
        }(Data.ActionPolicy));
        Data.SuppressDuplicateActionPolicy = SuppressDuplicateActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=SuppressDuplicateActionPolicy.js.map