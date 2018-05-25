var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        /**
         * To communicate the View and ViewModel properties using JQuery
         */
        var DependencyProperty = /** @class */ (function () {
            // #region  constructor
            function DependencyProperty(name) {
                this._propertyName = name;
            }
            Object.defineProperty(DependencyProperty.prototype, "PropertyName", {
                // #endregion
                // #region PropertyName
                get: function () {
                    return this._propertyName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "GetValue", {
                // #endregion
                // #region GetValue-SetValue
                /**
                 * Using JQuery to get the value from the View
                 */
                get: function () {
                    return this._getter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "SetValue", {
                /**
                 * Using JQuery and set the value to View
                 */
                get: function () {
                    return this._setter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "UpdateSourceTrigger", {
                // #endregion
                // #region UpdateSourceTrigger
                /**
                 * Default UpdateSourceTrigger
                 */
                get: function () {
                    return this._updateSourceTrigger;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "BindingMode", {
                // #endregion
                // #region Binding Mode
                get: function () {
                    return this._bindingMode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "Ensure", {
                // #endregion
                // #region Ensure Action
                get: function () {
                    return this._ensure;
                },
                enumerable: true,
                configurable: true
            });
            // #endregion
            // #region static method
            /**
             * It defines the communication using JQuery
             * @param propertyName
             * @param getValue
             * @param setValue
             * @param updateSourceTrigger
             */
            DependencyProperty.RegisterAttached = function (propertyName, getValue, setValue, defaultUpdateSourceTrigger, mode, ensure) {
                if (defaultUpdateSourceTrigger === void 0) { defaultUpdateSourceTrigger = Data.UpdateSourceTrigger.Explicit; }
                if (mode === void 0) { mode = Data.BindingMode.TwoWay; }
                var dp = new DependencyProperty(propertyName);
                dp._getter = getValue;
                dp._setter = setValue;
                dp._updateSourceTrigger = defaultUpdateSourceTrigger;
                dp._bindingMode = mode;
                dp._ensure = ensure;
                return dp;
            };
            return DependencyProperty;
        }());
        Data.DependencyProperty = DependencyProperty;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DependencyProperty.js.map