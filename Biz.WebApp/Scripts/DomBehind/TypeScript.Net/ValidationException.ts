namespace DomBehind.Validation {
    export class ValidationException {
        constructor(public Message: string, public Selector: string) {
        }
    }

    export class AggregateValidationException {
        constructor(public Items: ValidationException[]) {

        }
    }

}
