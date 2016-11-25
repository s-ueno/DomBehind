namespace DomBehind.Core {

    /**
     * Base class of UI support
     */
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
                } else {
                    x.removeAttr("disabled");
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

        /**
         * 
         */
        public static ClickEvent: Data.IEventBuilder
        = Data.EventBuilder.RegisterAttached<JQueryEventObject>("click");

        public static LostForcusEvent: Data.IEventBuilder
        = Data.EventBuilder.RegisterAttached<JQueryEventObject>("focusout");

        public static InitializeEvent: Data.IEventBuilder
        = Data.EventBuilder.RegisterAttached<any>("initialize");

        public static ViewLoadedEvent: Data.IEventBuilder
        = Data.EventBuilder.RegisterAttached<JQueryEventObject>("viewLoaded");

        public static ModalClosingEvent: Data.IEventBuilder
        = Data.EventBuilder.RegisterAttached<JQueryEventObject>("modalClosing");

    }
}

