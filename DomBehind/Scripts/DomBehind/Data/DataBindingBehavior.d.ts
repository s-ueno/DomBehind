declare namespace DomBehind.Data {
    class DataBindingBehavior extends BindingBehavior {
        Property: Data.DependencyProperty;
        PInfo: PropertyInfo;
        private _pinfo;
        Marks: string[];
        AdditionalInfo: collections.LinkedDictionary<string, any>;
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
