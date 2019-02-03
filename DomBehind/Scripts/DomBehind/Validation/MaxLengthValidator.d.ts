declare namespace DomBehind.Validation {
    class MaxLengthValidator extends Validator {
        constructor();
        Dispose(): void;
    }
}
declare namespace DomBehind {
    interface BindingBehaviorBuilder<T> {
        MaxLength(maxlength: number, message?: string, applyRule?: (x: T) => boolean): BindingBehaviorBuilder<T>;
        MaxLength(maxlength: number, message?: (x: T) => string, applyRule?: (x: T) => boolean): BindingBehaviorBuilder<T>;
        MaxLength(maxlength: (x: T) => number, message?: (x: T) => string, applyRule?: (x: T) => boolean): BindingBehaviorBuilder<T>;
        MaxLength(maxlength: any, message?: any, applyRule?: (x: T) => boolean): BindingBehaviorBuilder<T>;
        MaxNumeric(max: number): any;
        MinNumeric(min: number): any;
    }
}
