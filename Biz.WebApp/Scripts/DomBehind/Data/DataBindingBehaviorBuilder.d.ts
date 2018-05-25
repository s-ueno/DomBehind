declare namespace DomBehind.Data {
    class DataBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected readonly Behavior: Data.DataBindingBehavior;
        /**
         * Give any of the mark to the property.
         * It is possible to perform partial updating and partial validation.
         * @param region
         */
        PartialMark(...mark: string[]): DataBindingBehaviorBuilder<T>;
        /**
         *
         * @param converter
         */
        Converter(converter: IValueConverter): DataBindingBehaviorBuilder<T>;
        AddValidator<T extends Validation.Validator>(validator: T): T;
    }
}
