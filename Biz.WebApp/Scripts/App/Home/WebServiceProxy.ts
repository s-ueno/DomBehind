namespace Biz.WebApp.Home {
    export interface Request {
        Email: string;
        Password: string;
    }
    export interface Response {
        AllowSignin: boolean;
        Message: string;
    }
    export class SigninWebService
        extends DomBehind.Web.WebService<Request, Response> {
        protected Url: string = "Home/SignIn";
    }
    export class SignoutWebService
        extends DomBehind.Web.WebService<any, any> {
        protected Url: string = "Home/Signout";
    }
}