declare namespace DomBehind.Data {
    class DataBindingBehavior extends BindingBehavior {
        Property: Data.DependencyProperty;
        PInfo: PropertyInfo;
        private _pinfo;
        Marks: string[];
        readonly ValueCore: any;
        UpdateSourceEvent: IEvent;
        UpdateSource(): void;
        UpdateTargetEvent: IEvent;
        UpdateTarget(): void;
        Ensure(): void;
        protected Events: string[];
        protected EventsOff(): void;
        Dispose(): void;
    }
}
