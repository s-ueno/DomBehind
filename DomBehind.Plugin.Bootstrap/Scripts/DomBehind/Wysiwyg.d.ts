declare namespace DomBehind {
    class Wysiwyg {
        static HtmlProperty: Data.DependencyProperty;
        static TextProperty: Data.DependencyProperty;
        static readonly toolBarHtml: string;
    }
    interface BindingBehaviorBuilder<T> {
        BuildEditor(html: (x: T) => string, str?: (x: T) => string): BindingBehaviorBuilder<T>;
    }
}
