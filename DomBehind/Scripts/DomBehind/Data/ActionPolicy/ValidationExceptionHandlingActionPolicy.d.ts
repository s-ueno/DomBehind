declare namespace DomBehind.Data {
    class ValidationExceptionHandlingActionPolicy extends ActionPolicy {
        Priority(): number;
        private _priority;
        Begin(): void;
        Done(): void;
        Fail(ex: ActionPolicyExceptionEventArgs): void;
        protected SetCustomError(vex: Validation.ValidationException): void;
        protected readonly Supported: boolean;
        protected readonly ViewModel: BizViewModel;
        protected readonly View: BizView;
        protected readonly Owner: JQuery;
        Always(): void;
    }
}
