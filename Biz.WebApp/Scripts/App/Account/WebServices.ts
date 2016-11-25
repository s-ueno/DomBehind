namespace App.Account {

    export class SignInWebService
        extends DomBehind.Core.Web.WebService<any, any>{
        public get Url(): string {
            return "/Account/SignIn";
        }
    }

}