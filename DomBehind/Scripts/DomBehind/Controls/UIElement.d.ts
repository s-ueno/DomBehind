declare namespace DomBehind {
    class UIElement {
        static ValueProperty: Data.DependencyProperty;
        static TextProperty: Data.DependencyProperty;
        static SrcProperty: Data.DependencyProperty;
        static HrefProperty: Data.DependencyProperty;
        static IsEnabledProperty: Data.DependencyProperty;
        static IsVisibleProperty: Data.DependencyProperty;
        static OpacityProperty: Data.DependencyProperty;
        static PlaceHolderProperty: Data.DependencyProperty;
        static IsCheckedProperty: Data.DependencyProperty;
        static MaxLengthProperty: Data.DependencyProperty;
        static MaxNumericProperty: Data.DependencyProperty;
        static MinNumericProperty: Data.DependencyProperty;
        static BackgroundColorProperty: Data.DependencyProperty;
        static ColorProperty: Data.DependencyProperty;
        static BackgroundImageProperty: Data.DependencyProperty;
        static ClassProperty: Data.DependencyProperty;
        static HtmlSource: Data.DependencyProperty;
        static Click: IEventBuilder;
        static Enter: IEventBuilder;
        static Keydown: IEventBuilder;
        static FocusIn: IEventBuilder;
        static LostFocus: IEventBuilder;
        static Initialize: IEventBuilder;
        static Activate: IEventBuilder;
        static ModalClosing: IEventBuilder;
        static EnabledChanged: IEventBuilder;
        static RaiseEnabledChanged(element: JQuery, isEnabled: boolean): void;
    }
    interface BindingBehaviorBuilder<T> {
        ClearValueWhenDisabled(option?: {
            clearAction?: (owner?: T, value?: any, element?: JQuery) => any;
        }): any;
    }
}
