namespace DomBehind.Core.Validation {

    export class RequiredValidator
        extends Validator {

        constructor() {
            super("required");
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


namespace DomBehind.Core {
    export interface DataBindingBehaviorBuilder<T> {
        Required(message?: string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Required(message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Required(message?: any, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
    DataBindingBehaviorBuilder.prototype.Required = function (message?: any, applyRule?: (x: any) => boolean) {
        let me: DataBindingBehaviorBuilder<any> = this;
        var validator = me.AddValidator(new Validation.RequiredValidator());
        validator.Message = message;
        validator.AllowApply = applyRule;
        return me;
    };
}