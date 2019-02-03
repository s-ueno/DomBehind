declare namespace DomBehind.Data {
    class BindingPolicy {
        Trigger: UpdateSourceTrigger;
        Mode: BindingMode;
        Converter: IValueConverter;
        Validators: Validation.ValidatorCollection;
    }
}
