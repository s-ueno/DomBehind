var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var DatePicker = (function () {
            function DatePicker() {
            }
            DatePicker.SetValue = function (el, newValue) {
                var initialized = el.attr("DateFormatted");
                if (!initialized) {
                    el.attr("DateFormatted", "true");
                    var format = el.attr("DateFormat");
                    if (!format) {
                        format = "yyyy/MM/dd";
                    }
                    el.w2field("date", { format: format });
                }
                el.val(newValue);
            };
            DatePicker.FormatProperty = DomBehind.Data.DependencyProperty.RegisterAttached("DateFormat", function (el) {
            }, function (el, newValue) {
                el.attr("DateFormat", newValue);
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
            DatePicker.ValueProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", function (el) {
                return el.val();
            }, function (el, newValue) {
                DatePicker.SetValue(el, newValue);
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
            DatePicker.DateProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", function (el) {
                var text = el.val();
                return new Date(text);
            }, function (el, newValue) {
                if (newValue instanceof Date) {
                    var oldFormat = el.attr("DateFormat");
                    if (!oldFormat || oldFormat !== "yyyy/MM/dd") {
                        el.w2field("date", { format: "yyyy/MM/dd" });
                    }
                    var year = "" + newValue.getFullYear();
                    var month = new String("" + (newValue.getMonth() + 1)).PadLeft(2, "0");
                    var day = new String("" + newValue.getDate()).PadLeft(2, "0");
                    el.val(year + "/" + month + "/" + day);
                    if (oldFormat && oldFormat !== "yyyy/MM/dd") {
                        el.w2field("date", { format: oldFormat });
                    }
                }
                else {
                    DatePicker.SetValue(el, newValue);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
            return DatePicker;
        }());
        Controls.DatePicker = DatePicker;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
