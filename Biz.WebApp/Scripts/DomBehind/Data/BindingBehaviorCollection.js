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
        /**
         * provides the ability to easily use behaviors
         */
        var BindingBehaviorCollection = /** @class */ (function (_super) {
            __extends(BindingBehaviorCollection, _super);
            function BindingBehaviorCollection() {
                // #region Ensure
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._disposed = false;
                return _this;
                // #endregion
            }
            /**
             * Ensure
             */
            BindingBehaviorCollection.prototype.Ensure = function () {
                var _this = this;
                var sortedList = [];
                var grouping = this.toArray().GroupBy(function (x) { return x.Element; });
                grouping.forEach(function (x) {
                    var items = x.Values.OrderBy(function (x) { return x.Priolity; });
                    items.forEach(function (y) {
                        sortedList.push(y);
                    });
                });
                this.clear();
                sortedList.forEach(function (x) {
                    _this.add(x);
                    x.Ensure();
                });
            };
            // #endregion
            // #region List
            /**
             * lists the more behaviors
             * @param mark
             */
            BindingBehaviorCollection.prototype.ListDataBindingBehavior = function (mark) {
                var list = this.toArray().filter(function (x) { return x instanceof Data.DataBindingBehavior; });
                if (!String.IsNullOrWhiteSpace(mark)) {
                    list = list.filter(function (x) { return x.Marks.some(function (y) { return y === mark; }); });
                }
                return list;
            };
            // #endregion
            // #region UpdateTarget - UpdateSource
            /**
             * Forces a data transfer from the binding source property to the binding target property.
             * @param mark
             */
            BindingBehaviorCollection.prototype.UpdateTarget = function (mark) {
                var list = this.ListDataBindingBehavior(mark);
                $.each(list, function (i, x) {
                    x.UpdateTarget();
                });
            };
            /**
             * Sends the current binding target value to the binding source property
             * @param mark
             */
            BindingBehaviorCollection.prototype.UpdateSource = function (mark) {
                var list = this.ListDataBindingBehavior(mark);
                $.each(list, function (i, x) {
                    x.UpdateSource();
                });
            };
            // #endregion
            // #region
            // #endregion
            // #region Dispose
            BindingBehaviorCollection.prototype.Dispose = function () {
                if (!this._disposed) {
                    $.each(this.toArray(), function (i, x) { return x.Dispose(); });
                    this.clear();
                }
                this._disposed = true;
            };
            return BindingBehaviorCollection;
        }(collections.LinkedList));
        Data.BindingBehaviorCollection = BindingBehaviorCollection;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingBehaviorCollection.js.map