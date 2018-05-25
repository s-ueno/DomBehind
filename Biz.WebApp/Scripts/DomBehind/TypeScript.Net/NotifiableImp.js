var DomBehind;
(function (DomBehind) {
    var NotifiableImp = /** @class */ (function () {
        function NotifiableImp() {
            // #region INotifyPropertyChanged
            this.PropertyChanged = new DomBehind.TypedEvent();
            this._dic = {};
            this._disposed = false;
        }
        // #endregion
        // #region Property Backing Store
        NotifiableImp.prototype.GetProperty = function (name, defaultValue) {
            var obj = this._dic[name];
            return Object.IsNullOrUndefined(obj) ? defaultValue : obj;
        };
        NotifiableImp.prototype.SetProperty = function (name, value) {
            var result = false;
            var oldValue = this.GetProperty(name);
            if (value !== oldValue) {
                result = true;
                this._dic[name] = value;
                this._dic[name + "_old___"] = oldValue;
                this.OnPropertyChanged(name);
            }
            return result;
        };
        // #endregion
        // #region Dispose
        NotifiableImp.prototype.Dispose = function () {
            if (!this._disposed) {
                this._dic = null;
                if (this.PropertyChanged) {
                    this.PropertyChanged.Dispose();
                }
            }
            this._disposed = true;
        };
        // #endregion
        NotifiableImp.prototype.OnPropertyChanged = function (name) {
            this.PropertyChanged.Raise(this, new DomBehind.PropertyChangedEventArgs(name));
        };
        return NotifiableImp;
    }());
    DomBehind.NotifiableImp = NotifiableImp;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=NotifiableImp.js.map