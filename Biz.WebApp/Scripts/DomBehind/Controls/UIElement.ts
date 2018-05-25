﻿namespace DomBehind {

    export class UIElement {

        /**
         * Gets or sets the val attribute of the element
         */
        public static ValueProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("val",
                x => x.val(), (x, y) => x.val(y), Data.UpdateSourceTrigger.LostForcus, Data.BindingMode.TwoWay);

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
