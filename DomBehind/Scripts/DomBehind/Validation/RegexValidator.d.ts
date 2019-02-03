declare namespace DomBehind.Validation {
    class RegexValidator extends Validator {
        constructor();
        RemoveValidation(): void;
        protected ValidationMessage(validity: ValidityState): string;
        Dispose(): void;
    }
}
declare namespace DomBehind.Data {
    interface DataBindingBehaviorBuilder<T> {
        Pattern(regex: string, message?: string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Pattern(regex: string, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Pattern(regex: (x: T) => string, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Pattern(regex: any, message?: any, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
}
