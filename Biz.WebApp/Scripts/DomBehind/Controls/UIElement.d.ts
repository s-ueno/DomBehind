declare namespace DomBehind {
    class UIElement {
        /**
         * Gets or sets the val attribute of the element
         */
        static ValueProperty: Data.DependencyProperty;
        static IsEnabledProperty: Data.DependencyProperty;
        static PlaceHolderProperty: Data.DependencyProperty;
        static IsCheckedProperty: Data.DependencyProperty;
        static MaxLengthProperty: Data.DependencyProperty;
        static HtmlSource: Data.DependencyProperty;
        static Click: IEventBuilder;
        static LostFocus: IEventBuilder;
        static Initialize: IEventBuilder;
        static ViewLoaded: IEventBuilder;
        static ModalClosing: IEventBuilder;
    }
}
