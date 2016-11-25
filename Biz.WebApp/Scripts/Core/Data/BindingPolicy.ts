namespace DomBehind.Core.Data {
    /**
     * Describes the timing of binding source updates.
     */
    export enum UpdateSourceTrigger {
        /**
         * Updates the binding source only when you call the UpdateSource method.
         */
        Explicit,
        /**
         * Updates the binding source whenever the binding target element loses focus.
         */
        LostForcus,
        /**
         * This is for extension
         */
        PropertyChanged,
    }

    export enum BindingMode {
        TwoWay,
        OneWay, 
    }

    /**
     * policy on binding
     */
    export class BindingPolicy {
        public Trigger: UpdateSourceTrigger = UpdateSourceTrigger.Explicit;
        public Mode: BindingMode = BindingMode.TwoWay;
        public Converter: IValueConverter;
        public Validators: Validation.ValidatorCollection = new Validation.ValidatorCollection();
    }
}
