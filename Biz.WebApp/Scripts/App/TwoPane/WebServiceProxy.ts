namespace Biz.WebApp.TwoPane {
    export interface CustomerInfo {
        CustomerId: string;
        FirstName?: string;
        LastName?: string;
        PhoneNo?: string;
        Address?: string;
        City?: string;
        ZipCode?: string;
        Notes?: string;
        UpdateDate?: string;
        Css?: string;
        CellStyle?: string;
    }


    export class FindCustomerInfoWebProxy
        extends DomBehind.Web.WebService<any, CustomerInfo[]>{
        protected Url: string = "TwoPane/FindCustomerInfo";
    }
}