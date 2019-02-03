declare namespace DomBehind.Data {
    class SuppressDuplicateActionPolicy extends ActionPolicy {
        Priority(): number;
        private _priority;
        protected IsEnabled: DependencyProperty;
        Begin(): void;
        private referencecount;
        private engaged;
        Done(): void;
        Fail(ex: ActionPolicyExceptionEventArgs): void;
        Always(): void;
    }
}
