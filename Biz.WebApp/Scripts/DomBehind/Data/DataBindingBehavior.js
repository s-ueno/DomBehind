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
         * linking the properties of the view and the ViewModel
         */
        var DataBindingBehavior = /** @class */ (function (_super) {
            __extends(DataBindingBehavior, _super);
            function DataBindingBehavior() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Marks = [];
                _this.AdditionalInfo = new collections.LinkedDictionary();
                _this.UpdateSourceEvent = new DomBehind.TypedEvent();
                _this.UpdateTargetEvent = new DomBehind.TypedEvent();
                _this.Events = [];
                return _this;
                // #endregion
            }
            Object.defineProperty(DataBindingBehavior.prototype, "PInfo", {
                get: function () {
                    return this._pinfo;
                },
                set: function (newValue) {
                    if (this._pinfo === newValue)
                        return;
                    this._pinfo = newValue;
                    if (newValue) {
                        this.Marks.push(newValue.MemberPath);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBindingBehavior.prototype, "ValueCore", {
                // #region UpdateSource - UpdateTarget
                /**
                 *  ValueCore is the input value of the view that is not transferred to the ViewModel
                 */
                get: function () {
                    var value = this.Property.GetValue(this.Element);
                    if (!Object.IsNullOrUndefined(this.BindingPolicy.Converter)) {
                        value = this.BindingPolicy.Converter.ConvertBack(value);
                    }
                    return value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Sends the current binding target value to the binding source property
             */
            DataBindingBehavior.prototype.UpdateSource = function () {
                if (this.BindingPolicy.Mode === Data.BindingMode.OneWay)
                    return;
                if (Object.IsNullOrUndefined(this.Property))
                    return;
                if (Object.IsNullOrUndefined(this.Property.GetValue))
                    return;
                this.PInfo.SetValue(this.ValueCore);
                this.UpdateSourceEvent.Raise(this, this.ValueCore);
                if (this.DataContext instanceof DomBehind.NotifiableImp) {
                    var e = new DomBehind.PropertyChangedEventArgs(this.PInfo.MemberPath);
                    this.DataContext.PropertyChanged.Raise(this, e);
                }
            };
            /**
             * Forces a data transfer from the binding source property to the binding target property.
             */
            DataBindingBehavior.prototype.UpdateTarget = function () {
                if (Object.IsNullOrUndefined(this.Property))
                    return;
                if (Object.IsNullOrUndefined(this.Property.SetValue))
                    return;
                var value = this.PInfo.GetValue();
                if (!Object.IsNullOrUndefined(this.BindingPolicy.Converter)) {
                    value = this.BindingPolicy.Converter.Convert(value);
                }
                this.Property.SetValue(this.Element, value);
                this.UpdateTargetEvent.Raise(this, value);
            };
            // #endregion
            // #region Ensure
            DataBindingBehavior.prototype.Ensure = function () {
                var _this = this;
                if (this.BindingPolicy.Trigger === Data.UpdateSourceTrigger.LostForcus) {
                    var event_1 = 'focusout';
                    this.Events.push(event_1);
                    this.Element.off(event_1);
                    this.Element.on(event_1, function (e) {
                        _this.UpdateSource();
                    });
                }
                if ((this.Property) && (this.Property.Ensure)) {
                    this.Property.Ensure(this);
                }
            };
            DataBindingBehavior.prototype.EventsOff = function () {
                var _this = this;
                if (Object.IsNullOrUndefined(this.Element))
                    return;
                if (Object.IsNullOrUndefined(this.Events))
                    return;
                $.each(this.Events, function (i, value) {
                    if (!String.IsNullOrEmpty(value)) {
                        _this.Element.off(value);
                    }
                });
            };
            // #endregion
            // #region Dispose
            DataBindingBehavior.prototype.Dispose = function () {
                if (!this._disposed) {
                    this.EventsOff();
                    this.Property = null;
                    if (this.PInfo)
                        this.PInfo.Dispose();
                    this.PInfo = null;
                    this.Marks.length = 0;
                    _super.prototype.Dispose.call(this);
                }
            };
            return DataBindingBehavior;
        }(Data.BindingBehavior));
        Data.DataBindingBehavior = DataBindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DataBindingBehavior.js.map