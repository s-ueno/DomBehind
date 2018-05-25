declare namespace Biz.WebApp.Home {
    class HomeViewModel extends DomBehind.BizViewModel {
        Email: string;
        Password: string;
        IsRememberMe: boolean;
        Initialize(): void;
        /**
         * Sign in process
         */
        SignIn(): void;
        /**
         * I will try to sign in to the server
         */
        protected SignInRaw(): JQueryPromise<Response>;
        ForgotPassword(): void;
    }
}
