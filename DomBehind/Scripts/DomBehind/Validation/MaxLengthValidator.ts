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

namespace DomBehind {
    export interface BindingBehaviorBuilder<T> {
        MaxLength(maxlength: number, message?: string, applyRule?: (x: T) => boolean): BindingBehaviorBuilder<T>;
        MaxLength(maxlength: number, message?: (x: T) => string, applyRule?: (x: T) => boolean): BindingBehaviorBuilder<T>;
        MaxLength(maxlength: (x: T) => number, message?: (x: T) => string, applyRule?: (x: T) => boolean): BindingBehaviorBuilder<T>;
        MaxLength(maxlength: any, message?: any, applyRule?: (x: T) => boolean): BindingBehaviorBuilder<T>;

        MaxNumeric(max: number);
        MinNumeric(min: number);
    }
    BindingBehaviorBuilder.prototype.MaxLength = function (maxlength: any, message?: any, applyRule?: (x: any) => boolean) {
        let me: BindingBehaviorBuilder<any> = this;
        let dataBinding: Data.DataBindingBehaviorBuilder<any> = this;
        if (dataBinding.AddValidator) {
            let validator = dataBinding.AddValidator(new Validation.MaxLengthValidator());
            validator.AttributeExpression = maxlength;
            validator.Message = message;
            validator.AllowApply = applyRule;
        }

        let inputType = me.CurrentElement.attr("type");
        if (inputType == "number") {
            me.CurrentElement.off('input');
            me.CurrentElement.on('input', function (e) {
                let el = $(this);
                let value = String(el.val());
                if (value.length > maxlength) {
                    el.val(value.slice(0, maxlength));
                }
            });
        } else {
            UIElement.MaxLengthProperty.SetValue(me.CurrentElement, maxlength);
        }
        return me;
    };

    BindingBehaviorBuilder.prototype.MaxNumeric = function (max: number) {
        let me: BindingBehaviorBuilder<any> = this;

        UIElement.MaxNumericProperty.SetValue(me.CurrentElement, max);
        let length = max.toString().length;
        me.CurrentElement.off('input');
        me.CurrentElement.on('input', function (e) {
            let el = $(this);
            let maxlength = el.attr('max').length;
            let value = String(el.val());
            if (value.length > maxlength) {
                el.val(value.slice(0, maxlength));
            }
        });

        return me;
    }

    BindingBehaviorBuilder.prototype.MinNumeric = function (min: number) {
        let me: BindingBehaviorBuilder<any> = this;

        UIElement.MinNumericProperty.SetValue(me.CurrentElement, min);

        return me;
    }

}
