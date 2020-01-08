declare namespace DomBehind.Data {
    class RelativeDataBindingBehavior extends DataBindingBehavior {
        private _currentElement;
        protected CurrentElement: JQuery;
        protected Unsubscribe(value: JQuery): void;
        protected Subscribe(value: JQuery): void;
        protected Bindings: List<{
            Binding: BindingBehavior;
            Selector: string;
        }>;
        readonly LastBinding: Data.BindingBehavior;
        UpdateTarget(): void;
        UpdateSource(): void;
        AddBinding<T extends Data.BindingBehavior>(binding: T, selector: string): T;
    }
}
