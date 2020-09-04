declare namespace DomBehind.Data {
    class DataBindingBehavior extends BindingBehavior {
        Property: Data.DependencyProperty;
        get PInfo(): PropertyInfo;
        set PInfo(newValue: PropertyInfo);
        private _pinfo;
        Marks: string[];
        get ValueCore(): any;
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
