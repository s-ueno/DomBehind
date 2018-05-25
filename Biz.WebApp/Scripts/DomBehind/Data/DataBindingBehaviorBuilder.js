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
        var DataBindingBehaviorBuilder = /** @class */ (function (_super) {
            __extends(DataBindingBehaviorBuilder, _super);
            // #region constructor
            function DataBindingBehaviorBuilder(owner) {
                return _super.call(this, owner) || this;
            }
            Object.defineProperty(DataBindingBehaviorBuilder.prototype, "Behavior", {
                get: function () {
                    return this.CurrentBehavior;
                },
                enumerable: true,
                configurable: true
            });
            // #endregion
            /**
             * Give any of the mark to the property.
             * It is possible to perform partial updating and partial validation.
             * @param region
             */
            DataBindingBehaviorBuilder.prototype.PartialMark = function () {
                var _this = this;
                var mark = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    mark[_i] = arguments[_i];
                }
                $.each(mark, function (i, value) {
                    _this.Behavior.Marks.push(value);
                });
                return this;
            };
            /**
             *
             * @param converter
             */
            DataBindingBehaviorBuilder.prototype.Converter = function (converter) {
                this.Behavior.BindingPolicy.Converter = converter;
                return this;
            };
            DataBindingBehaviorBuilder.prototype.AddValidator = function (validator) {
                this.Behavior.BindingPolicy.Validators.add(validator);
                validator.Behavior = this.Behavior;
                return validator;
            };
            return DataBindingBehaviorBuilder;
        }(DomBehind.BindingBehaviorBuilder));
        Data.DataBindingBehaviorBuilder = DataBindingBehaviorBuilder;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DataBindingBehaviorBuilder.js.map