namespace DomBehind.Data {

    export class DataBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T>  {

        // #region constructor

        constructor(owner: BizView) {
            super(owner);
        }

        protected get Behavior(): Data.DataBindingBehavior {
            return <Data.DataBindingBehavior>this.CurrentBehavior;
        }

        // #endregion


        /**
         * Give any of the mark to the property.
         * It is possible to perform partial updating and partial validation.
         * @param region
         */
        public PartialMark(...mark: string[]): DataBindingBehaviorBuilder<T> {
            $.each(mark, (i, value) => {
                this.Behavior.Marks.push(value);
            });
            return this;
        }

        /**
         * 
         * @param converter
         */
        public Converter(converter: IValueConverter): DataBindingBehaviorBuilder<T> {
            this.Behavior.BindingPolicy.Converter = converter;
            return this;
        }

        public AddValidator<T extends Validation.Validator>(validator: T): T {
            this.Behavior.BindingPolicy.Validators.add(validator);
            validator.Behavior = this.Behavior;
            return validator;
        }
    }
}

