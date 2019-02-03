declare namespace DomBehind.Validation {
    class ValidationException {
        Message: string;
        Selector: string;
        constructor(Message: string, Selector: string);
    }
    class AggregateValidationException {
        Items: ValidationException[];
        constructor(Items: ValidationException[]);
    }
}
