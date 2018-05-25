var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        /**
         * supports the link of the view and the view model
         */
        var BindingBehavior = /** @class */ (function () {
            function BindingBehavior() {
                // #region property
                this.BindingPolicy = new Data.BindingPolicy();
                this.Priolity = 0;
                this._disposed = false;
                // #endregion
            }
            // #endregion
            // #region Dispose
            BindingBehavior.prototype.Dispose = function () {
                if (!this._disposed) {
                    this.DataContext = null;
                    this.Element = null;
                }
                this._disposed = true;
            };
            return BindingBehavior;
        }());
        Data.BindingBehavior = BindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingBehavior.js.map