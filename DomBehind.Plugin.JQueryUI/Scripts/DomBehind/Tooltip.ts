namespace DomBehind.Controls {
    export class Tooltip {

        public static TextProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("title",
                x => x.attr("title"),
                (x, y) => {
                    let element = x;
                    if (x.attr("type") === "checkbox") {
                        let parent = x.closest("label");
                        parent.tooltip();
                        parent.attr("title", y);
                    } else {
                        x.tooltip();
                        x.attr("title", y);
                    }                    
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWay);
    }
    


}