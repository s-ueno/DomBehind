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
    var PropertyChangedEventArgs = /** @class */ (function (_super) {
        __extends(PropertyChangedEventArgs, _super);
        function PropertyChangedEventArgs(Name) {
            var _this = _super.call(this) || this;
            _this.Name = Name;
            return _this;
        }
        return PropertyChangedEventArgs;
    }(DomBehind.EventArgs));
    DomBehind.PropertyChangedEventArgs = PropertyChangedEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=INotifyPropertyChanged.js.map