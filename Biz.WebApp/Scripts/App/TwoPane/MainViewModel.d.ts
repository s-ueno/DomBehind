declare namespace Biz.WebApp.TwoPane {
    class MainViewModel extends DomBehind.BizViewModel {
        IsLoadingCustomer: boolean;
        CustomerList: DomBehind.Data.ListCollectionView;
        RecordCountList: DomBehind.Data.ListCollectionView;
        UserName: string;
        IsForward: boolean;
        IsPartial: boolean;
        ParentList: DomBehind.Data.ListCollectionView;
        ChildList: DomBehind.Data.ListCollectionView;
        Initialize(): void;
        protected PredicateChildFilter(obj: any): boolean;
        FindCustomerAsync(): JQueryPromise<CustomerInfo[]>;
        ClearCustomerList(): void;
        OnSelectedRow(e: any): void;
        OnGridDoubleClick(e: any): void;
        protected ShowDetailContent(): void;
        OnAdd(e: any): CustomerInfo;
        OnEdit(row: CustomerInfo): void;
        OnDeleted(row: CustomerInfo): void;
        OnSave(row: CustomerInfo): void;
    }
}
