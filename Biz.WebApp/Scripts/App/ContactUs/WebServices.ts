namespace App.ContactUs {

    export class SendWebService
        extends DomBehind.Core.Web.WebService<any, any>{
        public get Url(): string {
            return "/ContactUs/Send";
        }
    }

}