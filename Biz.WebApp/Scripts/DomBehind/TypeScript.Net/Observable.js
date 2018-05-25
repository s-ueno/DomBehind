var DomBehind;
(function (DomBehind) {
    var Observable = /** @class */ (function () {
        // #endregion
        function Observable(source, marks) {
            this.source = source;
            this.marks = marks;
            // #region INotifyPropertyChanged
            this.PropertyChanging = new DomBehind.TypedEvent();
            this.PropertyChanged = new DomBehind.TypedEvent();
            if (source == null)
                return;
            var keys = Object.keys(source);
            var _loop_1 = function () {
                var name_1 = keys[i];
                if (String.IsNullOrWhiteSpace(name_1))
                    return "continue";
                if (marks) {
                    if (marks.Any(function (x) { return x === name_1; })) {
                        this_1.Recurcive(source, name_1, null);
                    }
                }
                else {
                    this_1.Recurcive(source, name_1, null);
                }
            };
            var this_1 = this;
            for (var i = 0; i < keys.length; i++) {
                _loop_1();
            }
        }
        Observable.Register = function (target) {
            var marks = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                marks[_i - 1] = arguments[_i];
            }
            return new Observable(target, marks);
        };
        Observable.prototype.Recurcive = function (source, name, parentName) {
            var value = source[name];
            var notifibleName = (parentName) ? parentName + "." + name : name;
            Object.defineProperty(source, name, this.CreateDescriptor(notifibleName, value));
            if (Object.IsNullOrUndefined(value))
                return;
            if (typeof value !== "object")
                return;
            var keys = Object.keys(value);
            for (var i = 0; i < keys.length; i++) {
                this.Recurcive(value, keys[i], notifibleName);
            }
        };
        Object.defineProperty(Observable.prototype, "Source", {
            get: function () {
                return this.source;
            },
            enumerable: true,
            configurable: true
        });
        Observable.prototype.CreateDescriptor = function (notifibleName, value) {
            var changing = this.PropertyChanging;
            var notifier = this.PropertyChanged;
            var e = new DomBehind.PropertyChangedEventArgs(notifibleName);
            var sender = this.source;
            return {
                get: function () {
                    return value;
                },
                set: function (v) {
                    changing.Raise(sender, new DomBehind.PropertyChangingEventArgs(e.Name, value, v));
                    value = v;
                    notifier.Raise(sender, e);
                },
                enumerable: true,
                configurable: true
            };
        };
        return Observable;
    }());
    DomBehind.Observable = Observable;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Observable.js.map