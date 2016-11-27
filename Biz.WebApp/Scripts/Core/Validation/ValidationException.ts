namespace DomBehind.Core.Validation {

    export class ValidationException {
        constructor(public Message: string, public Selector: string) {
        }
    }

    export class AggregateValidationException {
        constructor(public Items: ValidationException[]) {

        }
    }


    export class ValidationExceptionHandlingActionPolicy extends Data.ActionPolicy {

        public Priority(): number {
            return this._priority;
        }
        private _priority: number = 50;

        public Begin(): void { }
        public Done(): void { }
        public Fail(ex: Data.ActionPolicyExceptionInformation): void {
            if (!this.Supported) return;

            if (ex.Data instanceof AggregateValidationException) {
                var vex = ex.Data as AggregateValidationException;
                $.each(vex.Items, (i, each) => {
                    this.SetCustomError(each);
                });
                ex.Handled = true;
            } else if (ex.Data instanceof ValidationException) {
                this.SetCustomError(ex.Data as ValidationException);
                ex.Handled = true;
            }
        }
        protected SetCustomError(vex: ValidationException): void {
            this.Owner.find(vex.Selector).SetCustomError(vex.Message);
        }
        protected get Supported(): boolean {
            if (!this.ViewModel) return false;
            if (!this.View) return false;
            if (!this.Owner) return false;
            return true;
        }
        protected get ViewModel(): BizViewModel {
            return this.Behavior.DataContext as BizViewModel;
        }
        protected get View(): BizView {
            return this.ViewModel.View as BizView;
        }
        protected get Owner(): JQuery {
            return this.View.Container as JQuery;
        }

        public Always(): void { }
    }

}