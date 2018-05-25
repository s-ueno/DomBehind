declare namespace DomBehind.Validation {
    class RequiredValidator extends Validator {
        constructor();
        Dispose(): void;
    }
}
declare namespace DomBehind.Data {
    interface DataBindingBehaviorBuilder<T> {
        Required(message?: string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Required(message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Required(message?: any, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
}
