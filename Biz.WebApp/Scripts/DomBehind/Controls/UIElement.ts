namespace DomBehind {

    export class UIElement {

        /**
         * Gets or sets the val attribute of the element
         */
        public static ValueProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("val",
                x => x.val(), (x, y) => x.val(y), Data.UpdateSourceTrigger.LostForcus, Data.BindingMode.TwoWay);

        public static TextProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("text",
                x => x.text(), (x, y) => x.text(y), Data.UpdateSourceTrigger.LostForcus, Data.BindingMode.TwoWay);

        public static SrcProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("src",
                x => x.attr("src"), (x, y) => x.attr("src", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);



        public static IsEnabledProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("enabled",
                null, (x, y) => {
                    let disabled = y === false ? true : false;
                    if (disabled === true) {
                        x.attr("disabled", "");
                        x.addClass("disabled");
                    } else {
                        x.removeAttr("disabled");
                        x.removeClass("disabled");
                    }
                }, Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static IsVisibleProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("display",
                x => x.attr("display") === "none" ? false : true,
                (x, y) => {
                    let visible = y ? true : false;
                    if (visible) {
                        x.attr("display", "");
                        x.show();
                    } else {
                        x.attr("display", "none");
                        x.hide();
                    }
                }, Data.UpdateSourceTrigger.Explicit, Data.BindingMode.TwoWay);

        public static PlaceHolderProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("placeholder",
                null, (x, y) => x.attr("placeholder", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static IsCheckedProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("checked",
                x => (<HTMLInputElement>x.get(0)).checked,
                (x, y) => (<HTMLInputElement>x.get(0)).checked = y,
                Data.UpdateSourceTrigger.LostForcus, Data.BindingMode.TwoWay);

        public static MaxLengthProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("maxlength",
                null, (x, y) => x.attr("maxlength", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static MaxNumericProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("maxlength",
                null, (x, y) => x.attr("max", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static MinNumericProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("maxlength",
                null, (x, y) => x.attr("min", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);


        public static HtmlSource: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("htmlSource",
                null,
                (x, y) => {
                    let p: JQueryAjaxSettings = {
                        url: y,
                        async: true,
                        type: "GET",
                        cache: true,
                    };
                    $.ajax(p).done(dom => {
                        let body = $(dom).find("#_Layout");
                        x.append($(dom));
                    }).fail(error => {
                        throw new AjaxException(error);
                    });
                }, Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);





        public static Click: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("click");

        public static Enter: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("enterKeydown", x => {
                if (x && x.Element) {
                    x.Element.keydown(e => {
                        if (e.which === 13) {
                            x.Element.trigger("enterKeydown");
                        }
                    });
                }
            });

        public static Keydown: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("keydown");

        public static LostFocus: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("focusout");

        public static Initialize: IEventBuilder
            = EventBuilder.RegisterAttached<any>("initialize");

        public static ViewLoaded: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("viewLoaded");

        public static ModalClosing: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("modalClosing");
    }
}

