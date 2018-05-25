namespace DomBehind.Data {
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
