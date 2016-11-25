namespace DomBehind.Core.Data {

    export interface IExceptionHandling {
        Catch(ex: ActionPolicyExceptionInformation): void;
    }

    export class ExceptionHandlingActionPolicy extends ActionPolicy {

        public Priority(): number {
            return this._priority;
        }
        private _priority: number = 1;

        public Begin(): void {

        }
        public Done(): void {

        }
        public Fail(ex: ActionPolicyExceptionInformation): void {

            if (this.Behavior.DataContext) {
                var handlingObj = this.Behavior.DataContext as IExceptionHandling;
                if (handlingObj.Catch) {
                    handlingObj.Catch(ex);
                }
                if (ex.Handled) return;
            }

            Application.Current.UnhandledException(ex.Data);
            ex.Handled = true;
        }
        public Always(): void {

        }
    }
}