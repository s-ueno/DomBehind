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
    var PropertyInfo = /** @class */ (function () {
        function PropertyInfo(DataContext, MemberPath) {
            this.DataContext = DataContext;
            this.MemberPath = MemberPath;
        }
        PropertyInfo.prototype.SetValue = function (value) {
            var arr = this.MemberPath.split(".");
            var lastDataContext = this.DataContext;
            $.each(arr.slice(0, arr.length - 1), function (i, source) {
                if (Object.IsNullOrUndefined(lastDataContext)) {
                    return false;
                }
                lastDataContext = lastDataContext[source];
            });
            if (Object.IsNullOrUndefined(lastDataContext)) {
                return null;
            }
            var path = arr[arr.length - 1];
            lastDataContext[path] = value;
        };
        PropertyInfo.prototype.GetValue = function () {
            var arr = this.MemberPath.split(".");
            var lastDataContext = this.DataContext;
            $.each(arr.slice(0, arr.length - 1), function (i, source) {
                if (Object.IsNullOrUndefined(lastDataContext)) {
                    return false;
                }
                lastDataContext = lastDataContext[source];
            });
            if (Object.IsNullOrUndefined(lastDataContext)) {
                return null;
            }
            var path = arr[arr.length - 1];
            return lastDataContext[path];
        };
        PropertyInfo.prototype.Dispose = function () {
            this.DataContext = null;
            this.MemberPath = null;
        };
        return PropertyInfo;
    }());
    DomBehind.PropertyInfo = PropertyInfo;
    var LamdaExpression = /** @class */ (function (_super) {
        __extends(LamdaExpression, _super);
        function LamdaExpression(dataContext, Lamda) {
            var _this = _super.call(this, dataContext, LamdaExpression.ParsePropertyPath(Lamda)) || this;
            _this.Lamda = Lamda;
            return _this;
        }
        LamdaExpression.ParsePropertyPath = function (exp) {
            var path = LamdaExpression.NameOf(exp);
            return path.split(".").slice(1).join(".");
        };
        LamdaExpression.NameOf = function (expression) {
            var m = LamdaExpression._extractor.exec(expression + "");
            if (m == null)
                throw new Error("The function does not contain a statement matching 'return variableName;'");
            return m[1];
        };
        LamdaExpression.prototype.Dispose = function () {
            this.Lamda = null;
            _super.prototype.Dispose.call(this);
        };
        LamdaExpression.Path = function (exp) {
            return LamdaExpression.ParsePropertyPath(exp);
        };
        LamdaExpression.GetValueCore = function (dataContext, lamda) {
            var exp = new LamdaExpression(dataContext, lamda);
            return exp.GetValue();
        };
        // http://stackoverflow.com/questions/29191451/get-name-of-variable-in-typescript
        LamdaExpression._extractor = new RegExp("return (.*);");
        return LamdaExpression;
    }(PropertyInfo));
    DomBehind.LamdaExpression = LamdaExpression;
    var BooleanFakeExpression = /** @class */ (function (_super) {
        __extends(BooleanFakeExpression, _super);
        function BooleanFakeExpression(Value) {
            var _this = _super.call(this, null, ".") || this;
            _this.Value = Value;
            return _this;
        }
        BooleanFakeExpression.prototype.SetValue = function (value) {
        };
        BooleanFakeExpression.prototype.GetValue = function () {
            return this.Value;
        };
        return BooleanFakeExpression;
    }(PropertyInfo));
    DomBehind.BooleanFakeExpression = BooleanFakeExpression;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=PropertyInfo.js.map