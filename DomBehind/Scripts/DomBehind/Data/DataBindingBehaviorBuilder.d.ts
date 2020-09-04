declare namespace DomBehind.Data {
    class DataBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected get Behavior(): Data.DataBindingBehavior;
        PartialMark(...mark: string[]): DataBindingBehaviorBuilder<T>;
        Converter(converter: IValueConverter): DataBindingBehaviorBuilder<T>;
        AddValidator<T extends Validation.Validator>(validator: T): T;
    }
}
