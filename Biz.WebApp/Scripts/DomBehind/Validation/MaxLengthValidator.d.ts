declare namespace DomBehind.Validation {
    class MaxLengthValidator extends Validator {
        constructor();
        Dispose(): void;
    }
}
declare namespace DomBehind.Data {
    interface DataBindingBehaviorBuilder<T> {
        MaxLength(maxlength: number, message?: string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        MaxLength(maxlength: number, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        MaxLength(maxlength: (x: T) => number, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        MaxLength(maxlength: any, message?: any, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
}
