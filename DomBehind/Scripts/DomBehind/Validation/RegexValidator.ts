namespace DomBehind.Validation {
    export class RegexValidator
        extends Validator {

        constructor() {
            super("pattern");
        }

        public /* override */ RemoveValidation(): void {
            super.RemoveValidation();

            this.Behavior.Element.removeAttr("title");
        }
        protected /* override */ ValidationMessage(validity: ValidityState): string {
            var message = super.ValidationMessage(validity);
            if (String.IsNullOrWhiteSpace(message)) {
                this.Behavior.Element.attr("title", this.AttributeValue);
            }
            return message;
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
        Pattern(regex: string, message?: string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Pattern(regex: string, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Pattern(regex: (x: T) => string, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Pattern(regex: any, message?: any, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
    DataBindingBehaviorBuilder.prototype.Pattern = function (regex: any, message?: any, applyRule?: (x: any) => boolean) {
        let me: DataBindingBehaviorBuilder<any> = this;
        var validator = me.AddValidator(new Validation.RegexValidator());
        validator.AttributeExpression = regex;
        validator.Message = message;
        validator.AllowApply = applyRule;
        return me;
    };
}
