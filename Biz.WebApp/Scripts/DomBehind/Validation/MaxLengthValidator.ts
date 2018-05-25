namespace DomBehind.Validation {
    export class MaxLengthValidator
        extends Validator {

        constructor() {
            super("maxlength");
        }

        // #region Dispose

        public Dispose(): void {
            if (!this._disposed) {


                super.Dispose();
            }
        }

        // #endregion
    }
}

namespace DomBehind.Data {
    export interface DataBindingBehaviorBuilder<T> {
        MaxLength(maxlength: number, message?: string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        MaxLength(maxlength: number, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        MaxLength(maxlength: (x: T) => number, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        MaxLength(maxlength: any, message?: any, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
    DataBindingBehaviorBuilder.prototype.MaxLength = function (maxlength: any, message?: any, applyRule?: (x: any) => boolean) {
        let me: DataBindingBehaviorBuilder<any> = this;
        let validator = me.AddValidator(new Validation.MaxLengthValidator());
        validator.AttributeExpression = maxlength;
        validator.Message = message;
        validator.AllowApply = applyRule;
        return me;
    };
}
