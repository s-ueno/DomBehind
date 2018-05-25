declare namespace DomBehind.Data {
    class ExceptionHandlingActionPolicy extends ActionPolicy {
        Priority(): number;
        private _priority;
        Begin(): void;
        Done(): void;
        Fail(ex: ActionPolicyExceptionEventArgs): void;
        Always(): void;
    }
}
