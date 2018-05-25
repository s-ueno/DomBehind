namespace DomBehind.Data {
    export class ValidationExceptionHandlingActionPolicy extends ActionPolicy {

        public Priority(): number {
            return this._priority;
        }
        private _priority: number = 50;

        public Begin(): void { }
        public Done(): void { }
        public Fail(ex: ActionPolicyExceptionEventArgs): void {
            if (!this.Supported) return;

            if (ex.Data instanceof Validation.AggregateValidationException) {
                var vex = ex.Data as Validation.AggregateValidationException;
                $.each(vex.Items, (i, each) => {
                    this.SetCustomError(each);
                });
                ex.Handled = true;
            } else if (ex.Data instanceof Validation.ValidationException) {
                this.SetCustomError(ex.Data as Validation.ValidationException);
                ex.Handled = true;
            }
        }
        protected SetCustomError(vex: Validation.ValidationException): void {
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
