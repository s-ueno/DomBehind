declare namespace DomBehind.Validation {
    abstract class Validator implements IDisposable {
        constructor(attribute?: string);
        Behavior: Data.DataBindingBehavior;
        Message: any;
        AllowApply: (x: any) => boolean;
        Attribute: string;
        HasError: boolean;
        AttributeExpression: any;
        readonly AttributeValue: string | number;
        protected ParseAttributeValue(): any;
        OnValidationg(): void;
        Apply(): void;
        RemoveValidation(): void;
        AddValidation(): void;
        Validate(value: any): boolean;
        protected ValidationMessage(validity: ValidityState): string;
        Dispose(): void;
        protected _disposed: boolean;
    }
}
