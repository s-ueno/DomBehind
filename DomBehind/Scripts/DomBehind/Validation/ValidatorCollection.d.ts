declare namespace DomBehind.Validation {
    class ValidatorCollection extends collections.LinkedList<Validator> implements IDisposable {
        RemoveValidator(): void;
        ClearValidator(): void;
        ApplyValidator(): void;
        Validate(): boolean;
        Dispose(): void;
        protected _disposed: boolean;
    }
}
