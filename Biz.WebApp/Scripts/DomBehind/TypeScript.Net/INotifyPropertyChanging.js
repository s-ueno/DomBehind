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
    var PropertyChangingEventArgs = /** @class */ (function (_super) {
        __extends(PropertyChangingEventArgs, _super);
        function PropertyChangingEventArgs(Name, OldValue, NewValue) {
            var _this = _super.call(this) || this;
            _this.Name = Name;
            _this.OldValue = OldValue;
            _this.NewValue = NewValue;
            return _this;
        }
        return PropertyChangingEventArgs;
    }(DomBehind.EventArgs));
    DomBehind.PropertyChangingEventArgs = PropertyChangingEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=INotifyPropertyChanging.js.map