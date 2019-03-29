namespace DomBehind.Validation {
    export class PipelineValidator
        extends DomBehind.Validation.Validator {

        constructor() {
            super();
            this.Validators = [];
        }

        protected Validators: DomBehind.Validation.Validator[];

        /**
         * 発生したエラー
         */
        public Error: DomBehind.Validation.Validator;

        public /* override */ Validate(value: any): boolean {
            let result = true;
            let lastErrorMessage: string;
            this.Error = null;

            $.each(this.Validators, (i, x) => {

                x.OnValidationg();

                if (x.HasError) {
                    lastErrorMessage = x.Message;
                    result = false;
                    this.Error = x;
                    return false;
                }
            });

            this.Message = lastErrorMessage;
            return result;
        }

        public /* override */ Apply() {
            this.Validators.forEach(x => x.Apply());
        }

        public /* override */ RemoveValidation() {
            this.Validators.forEach(x => x.RemoveValidation());
        }

        public /* override */ ClearValidation() {
            this.Validators.forEach(x => x.ClearValidation());
        }

        public /* override */ AddValidation() {
            this.Validators.forEach(x => x.AddValidation());
        }

        public AddValidator(validator: DomBehind.Validation.Validator): void {
            validator.Behavior = this.Behavior;
            this.Validators.push(validator);
        }

        public /* override */ Dispose() {
            this.Validators.forEach(x => x.Dispose());
        }
    }
}

namespace DomBehind {
    export interface BindingBehaviorBuilder<T> {
        AddPipelineValidator(validator: Validation.Validator): BindingBehaviorBuilder<T>;
    }
    BindingBehaviorBuilder.prototype.AddPipelineValidator = function (validator: DomBehind.Validation.Validator) {
        let me: BindingBehaviorBuilder<any> = this;
        if (me.CurrentBehavior instanceof Data.DataBindingBehavior) {
            let lastValidator = me.CurrentBehavior.BindingPolicy.Validators.toArray().LastOrDefault();
            if (lastValidator && lastValidator instanceof DomBehind.Validation.PipelineValidator) {
                lastValidator.AddValidator(validator);
            } else {
                let pipelineValidator = new DomBehind.Validation.PipelineValidator();
                pipelineValidator.Behavior = me.CurrentBehavior;
                pipelineValidator.AddValidator(validator);
                me.CurrentBehavior.BindingPolicy.Validators.add(pipelineValidator);
            }
        }
        return me;
    }
}