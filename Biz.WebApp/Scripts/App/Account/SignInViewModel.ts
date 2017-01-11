namespace App.Account {
    export class SignInViewModel
        extends DomBehind.Core.BizViewModel {



        public Initialize(): void {

        }

        public Email: string;
        public Password: string;
        public AllowCachedSignInPolicy: boolean;

        public SignIn() {
            if (!this.Validate()) return;

            this.UpdateSource();

            this.LoadingAction(() => this.SignInRaw());
        }

        protected SignInRaw() {
            return $.PromiseWith(d => {
                var request = { Email: this.Email, Password: this.Password };

                let svc = new SignInWebService();
                // ExecuteAsync / ExecuteAjax
                svc.ExecuteAjax(request).done(x => {
                    this.OnSuccess(d, x);
                }).fail(ex => {
                    this.OnSignInError(d, ex);
                });
            });
        }

        public OnModalClosing(e: JQueryEventObject) {
            //e.result = false;
        }

        protected OnSuccess(deferred: JQueryDeferred<any>, response: any): void {
            deferred.resolve();
            location.href = '/Home';
        }
        protected OnSignInError(deferred: JQueryDeferred<any>, error: any): void {
            // Application Error
            if (error.AppError) {


                deferred.resolve();
            } else {
                // System Error
                deferred.reject(error);
            }
        }
    }
}
