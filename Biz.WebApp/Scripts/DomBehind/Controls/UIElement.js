var DomBehind;
(function (DomBehind) {
    var UIElement = /** @class */ (function () {
        function UIElement() {
        }
        /**
         * Gets or sets the val attribute of the element
         */
        UIElement.ValueProperty = DomBehind.Data.DependencyProperty.RegisterAttached("val", function (x) { return x.val(); }, function (x, y) { return x.val(y); }, DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
        UIElement.IsEnabledProperty = DomBehind.Data.DependencyProperty.RegisterAttached("enabled", null, function (x, y) {
            var disabled = y === false ? true : false;
            if (disabled === true) {
                x.attr("disabled", "");
                x.addClass("disabled");
            }
            else {
                x.removeAttr("disabled");
                x.removeClass("disabled");
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.PlaceHolderProperty = DomBehind.Data.DependencyProperty.RegisterAttached("placeholder", null, function (x, y) { return x.attr("placeholder", y); }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.IsCheckedProperty = DomBehind.Data.DependencyProperty.RegisterAttached("checked", function (x) { return x.get(0).checked; }, function (x, y) { return x.get(0).checked = y; }, DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
        UIElement.MaxLengthProperty = DomBehind.Data.DependencyProperty.RegisterAttached("maxlength", null, function (x, y) { return x.attr("maxlength", y); }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.HtmlSource = DomBehind.Data.DependencyProperty.RegisterAttached("htmlSource", null, function (x, y) {
            var p = {
                url: y,
                async: true,
                type: "GET",
                cache: true,
            };
            $.ajax(p).done(function (dom) {
                var body = $(dom).find("#_Layout");
                x.append($(dom));
            }).fail(function (error) {
                throw new DomBehind.AjaxException(error);
            });
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.Click = DomBehind.EventBuilder.RegisterAttached("click");
        UIElement.LostFocus = DomBehind.EventBuilder.RegisterAttached("focusout");
        UIElement.Initialize = DomBehind.EventBuilder.RegisterAttached("initialize");
        UIElement.ViewLoaded = DomBehind.EventBuilder.RegisterAttached("viewLoaded");
        UIElement.ModalClosing = DomBehind.EventBuilder.RegisterAttached("modalClosing");
        return UIElement;
    }());
    DomBehind.UIElement = UIElement;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=UIElement.js.map