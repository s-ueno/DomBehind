namespace Biz.WebApp.Shared {
    export class LayoutSPAViewModel extends DomBehind.BizViewModel {

        public MenuList: DomBehind.Data.ListCollectionView;
        public Initialize(): void {

            this.CreateMenu();

            this.UpdateTarget();
        }

        protected CreateMenu() {
            let menuList = new Array<DomBehind.ISidebarNode>();

            let topNodes: DomBehind.ISidebarNode = {
                Title: "Sample Forms",
                IsGroup: true,
                Children: [
                    {
                        Title: "2 pane form", Icon: "fa fa-coffee", AddtionalInfo: "Calendar/Index"
                    },
                    {
                        Title: "Calendar", Icon: "fa fa-calendar", AddtionalInfo: "Calendar/Index"
                    },
                ],
            };
            menuList.push(topNodes);

            this.MenuList = new DomBehind.Data.ListCollectionView(menuList);
            this.MenuList.Current = topNodes.Children.FirstOrDefault();
        }

        public SelectedMenu(args: any) {
            if (args && args.AddtionalInfo) {
                this.Navigator.Move(args.AddtionalInfo);
            }
        }

        public Reload() {
            this.Navigator.Reload();
        }

        public SignOut() {
            let svc = new Home.SignoutWebService();
            return svc.ExecuteAjax(null).always(() => {
                this.Navigator.Move("Home");
            });
        }
    }
}