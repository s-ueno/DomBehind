declare namespace Biz.WebApp.Portal {
    class SideMenuViewModel extends DomBehind.BizViewModel {
        MenuList: DomBehind.Data.ListCollectionView;
        Initialize(): void;
        SideMenuAction(args: any): void;
    }
}
