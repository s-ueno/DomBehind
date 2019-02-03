namespace DomBehind.Data {
    // SuppressDuplicateActionPolicy is the work
    class SuppressDuplicateWorkException extends Exception {
        constructor() { super("This exception is a safe exception issued to prevent double press"); }
    }

    export class SuppressDuplicateActionPolicy extends ActionPolicy {

        public Priority(): number {
            return this._priority;
        }
        private _priority: number = 10;

        protected IsEnabled = UIElement.IsEnabledProperty;

        public Begin(): void {
            ++this.referencecount;
            if (this.engaged) {
                throw new SuppressDuplicateWorkException();
            }
            this.engaged = true;
            this.IsEnabled.SetValue(this.Behavior.Element, false);
        }
        private referencecount: number = 0;
        private engaged: boolean = false;

        public Done(): void {

        }
        public Fail(ex: ActionPolicyExceptionEventArgs): void {
            if (ex.Data instanceof SuppressDuplicateWorkException) {
                ex.Handled = true;
            }
        }
        public Always(): void {
            if (--this.referencecount === 0) {
                this.engaged = false;
                this.IsEnabled.SetValue(this.Behavior.Element, true);
            }
        }
    }
}
