declare namespace DomBehind.Validation {
    class PipelineValidator extends DomBehind.Validation.Validator {
        constructor();
        protected Validators: DomBehind.Validation.Validator[];
        Error: DomBehind.Validation.Validator;
        Validate(value: any): boolean;
        Apply(): void;
        RemoveValidation(): void;
        ClearValidation(): void;
        AddValidation(): void;
        AddValidator(validator: DomBehind.Validation.Validator): void;
        Dispose(): void;
    }
}
declare namespace DomBehind {
    interface BindingBehaviorBuilder<T> {
        AddPipelineValidator(validator: Validation.Validator): BindingBehaviorBuilder<T>;
    }
}
