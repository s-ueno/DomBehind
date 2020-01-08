var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        class Tooltip {
        }
        Tooltip.TextProperty = DomBehind.Data.DependencyProperty.RegisterAttached("title", x => x.attr("title"), (x, y) => {
            let element = x;
            if (x.attr("type") === "checkbox") {
                let parent = x.closest("label");
                parent.tooltip();
                parent.attr("title", y);
            }
            else {
                x.tooltip();
                x.attr("title", y);
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        Controls.Tooltip = Tooltip;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
