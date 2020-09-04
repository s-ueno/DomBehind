declare namespace DomBehind.Data {
    class ValidationExceptionHandlingActionPolicy extends ActionPolicy {
        Priority(): number;
        private _priority;
        Begin(): void;
        Done(): void;
        Fail(ex: ActionPolicyExceptionEventArgs): void;
        protected SetCustomError(vex: Validation.ValidationException): void;
        protected get Supported(): boolean;
        protected get ViewModel(): BizViewModel;
        protected get View(): BizView;
        protected get Owner(): JQuery;
        Always(): void;
    }
}
