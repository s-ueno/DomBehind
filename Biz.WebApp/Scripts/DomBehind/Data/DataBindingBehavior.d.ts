declare namespace DomBehind.Data {
    /**
     * linking the properties of the view and the ViewModel
     */
    class DataBindingBehavior extends BindingBehavior {
        Property: Data.DependencyProperty;
        PInfo: PropertyInfo;
        private _pinfo;
        Marks: string[];
        AdditionalInfo: collections.LinkedDictionary<string, any>;
        /**
         *  ValueCore is the input value of the view that is not transferred to the ViewModel
         */
        readonly ValueCore: any;
        UpdateSourceEvent: IEvent;
        /**
         * Sends the current binding target value to the binding source property
         */
        UpdateSource(): void;
        UpdateTargetEvent: IEvent;
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         */
        UpdateTarget(): void;
        Ensure(): void;
        protected Events: string[];
        protected EventsOff(): void;
        Dispose(): void;
    }
}
