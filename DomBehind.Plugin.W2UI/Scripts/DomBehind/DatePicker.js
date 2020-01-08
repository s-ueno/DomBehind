var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        class DatePicker {
            static SetValue(el, newValue) {
                let initialized = el.attr("DateFormatted");
                if (!initialized) {
                    el.attr("DateFormatted", "true");
                    let format = el.attr("DateFormat");
                    if (!format) {
                        format = "yyyy/MM/dd";
                    }
                    el.w2field("date", { format: format });
                }
                el.val(newValue);
            }
        }
        DatePicker.FormatProperty = DomBehind.Data.DependencyProperty.RegisterAttached("DateFormat", el => {
        }, (el, newValue) => {
            el.attr("DateFormat", newValue);
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        DatePicker.ValueProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", el => {
            return el.val();
        }, (el, newValue) => {
            DatePicker.SetValue(el, newValue);
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
        DatePicker.DateProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", el => {
            let text = el.val();
            return new Date(text);
        }, (el, newValue) => {
            if (newValue instanceof Date) {
                let oldFormat = el.attr("DateFormat");
                if (!oldFormat || oldFormat !== "yyyy/MM/dd") {
                    el.w2field("date", { format: "yyyy/MM/dd" });
                }
                let year = `${newValue.getFullYear()}`;
                let month = new String(`${newValue.getMonth() + 1}`).PadLeft(2, "0");
                let day = new String(`${newValue.getDate()}`).PadLeft(2, "0");
                el.val(`${year}/${month}/${day}`);
                if (oldFormat && oldFormat !== "yyyy/MM/dd") {
                    el.w2field("date", { format: oldFormat });
                }
            }
            else {
                DatePicker.SetValue(el, newValue);
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
        Controls.DatePicker = DatePicker;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
