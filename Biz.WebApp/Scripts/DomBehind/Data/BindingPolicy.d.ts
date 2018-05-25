declare namespace DomBehind.Data {
    /**
     * policy on binding
     */
    class BindingPolicy {
        Trigger: UpdateSourceTrigger;
        Mode: BindingMode;
        Converter: IValueConverter;
        Validators: Validation.ValidatorCollection;
    }
}
