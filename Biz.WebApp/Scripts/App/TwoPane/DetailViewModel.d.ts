declare namespace Biz.WebApp.TwoPane {
    class DetailViewModel extends DomBehind.BizViewModel {
        Initialize(): void;
        Row: CustomerInfo;
        protected OnSelectedRow(row: CustomerInfo): void;
        Save(): void;
        Hide(): void;
    }
}
