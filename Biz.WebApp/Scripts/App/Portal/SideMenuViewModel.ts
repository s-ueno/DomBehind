namespace Biz.WebApp.Portal {
    export class SideMenuViewModel extends DomBehind.BizViewModel {
        public MenuList: DomBehind.Data.ListCollectionView;
        public Initialize(): void {
            let menuList = new Array<DomBehind.ISidebarNode>();

            let topNodes: DomBehind.ISidebarNode = {
                Title: "Sample Forms",
                IsGroup: true,
                Children: [
                    {
                        Title: "2 pane form", Icon: "fa fa-coffee", AddtionalInfo: {
                            MainUri: "TwoPane/Main",
                            BottomUri: "",
                            RightUri: "TwoPane/Detail",
                        }
                    },
                    {
                        Title: "3 pane form", Icon: "fa fa-home", AddtionalInfo: {
                            MainUri: "",
                            BottomUri: "",
                            RightUri: "",
                        }
                    },
                ],
            };
            menuList.push(topNodes);

            let gridNodes: DomBehind.ISidebarNode = {
                Title: "Grid(W2UI)",
                IsGroup: true,
                Children: [
                    {
                        Title: "Simple Grid", Icon: "fa fa-table", AddtionalInfo: {
                            MainUri: "",
                            BottomUri: "",
                            RightUri: "",
                        }
                    },
                    {
                        Title: "Editable Grid", Icon: "fa fa-list", AddtionalInfo: {
                            MainUri: "",
                            BottomUri: "",
                            RightUri: "",
                        }
                    },
                ],
            };
            menuList.push(gridNodes);


            this.MenuList = new DomBehind.Data.ListCollectionView(menuList);
            this.MenuList.Current = topNodes.Children.FirstOrDefault();

            this.UpdateTarget();
        }

        public SideMenuAction(args: any) {
            let node: DomBehind.ISidebarNode = args;

            let portalViewModel = DomBehind.Locator.First(Portal.PortalViewModel);
            // ポータルに通知する
            portalViewModel.OnSelectedMenu(this, node.AddtionalInfo);
        }
    }
}