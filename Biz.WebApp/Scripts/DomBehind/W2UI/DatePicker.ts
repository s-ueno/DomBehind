namespace DomBehind.Controls {

    export class DatePicker {


        public static FormatProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("DateFormat",
                el => {
                },
                (el, newValue) => {
                    el.attr("DateFormat", newValue);
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWay)

        public static ValueProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("",
                el => {

                    return el.val();

                },
                (el, newValue) => {

                    let initialized = el.attr("DateFormatted");
                    if (!initialized) {
                        el.attr("DateFormatted", "true");

                        let format = el.attr("DateFormat");
                        if (!format) {
                            format = "yyyy/MM/dd"
                        }

                        el.w2field("date", { format: format });
                    }


                    el.val(newValue);

                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.TwoWay);

    }

}