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
        var ValidatorCollection = /** @class */ (function (_super) {
            __extends(ValidatorCollection, _super);
            function ValidatorCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._disposed = false;
                return _this;
                // #endregion
            }
            ValidatorCollection.prototype.ClearValidator = function () {
                $.each(this.toArray(), function (i, x) { return x.RemoveValidation(); });
            };
            ValidatorCollection.prototype.ApplyValidator = function () {
                $.each(this.toArray(), function (i, x) { return x.Apply(); });
            };
            ValidatorCollection.prototype.Validate = function () {
                var result = true;
                $.each(this.toArray(), function (i, x) {
                    x.OnValidationg();
                    if (x.HasError) {
                        result = false;
                    }
                });
                return result;
            };
            // #region Dispose
            ValidatorCollection.prototype.Dispose = function () {
                if (!this._disposed) {
                    $.each(this.toArray(), function (i, x) { return x.Dispose(); });
                    this.clear();
                }
                this._disposed = true;
            };
            return ValidatorCollection;
        }(collections.LinkedList));
        Validation.ValidatorCollection = ValidatorCollection;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ValidatorCollection.js.map