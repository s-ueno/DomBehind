declare namespace DomBehind {
    interface BindingBehaviorBuilder<T> {
        Scrolling(): BindingBehaviorBuilder<T>;
        SlideAnimation(): BindingBehaviorBuilder<T>;
    }
}
