var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Tooltip = /** @class */ (function () {
            function Tooltip() {
            }
            Tooltip.TextProperty = DomBehind.Data.DependencyProperty.RegisterAttached("title", function (x) { return x.attr("title"); }, function (x, y) {
                var element = x;
                if (x.attr("type") === "checkbox") {
                    var parent_1 = x.closest("label");
                    parent_1.tooltip();
                    parent_1.attr("title", y);
                }
                else {
                    x.tooltip();
                    x.attr("title", y);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
            return Tooltip;
        }());
        Controls.Tooltip = Tooltip;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Tooltip.js.map