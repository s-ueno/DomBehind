declare namespace Biz.WebApp.Home {
    interface Request {
        Email: string;
        Password: string;
    }
    interface Response {
        AllowSignin: boolean;
        Message: string;
    }
    class SigninWebService extends DomBehind.Web.WebService<Request, Response> {
        protected Url: string;
    }
    class SignoutWebService extends DomBehind.Web.WebService<any, any> {
        protected Url: string;
    }
}
