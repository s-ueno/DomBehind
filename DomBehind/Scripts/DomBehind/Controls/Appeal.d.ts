declare namespace DomBehind {
    class Appeal {
        static _clearTimeout: any;
        static IsEnabledProperty: Data.DependencyProperty;
        private static styleIdentity;
        static Register(behavior: Data.DataBindingBehavior): void;
        protected Behavior: Data.DataBindingBehavior;
        protected Render(newValue: boolean): void;
    }
}
