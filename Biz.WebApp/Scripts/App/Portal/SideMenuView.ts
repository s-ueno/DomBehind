namespace Biz.WebApp.Portal {
    export class SideMenuView extends DomBehind.BizView {
        public BuildBinding(): void {
            let builder = this.CreateBindingBuilder<SideMenuViewModel>();

            builder.Element("#SideMenubar")
                .BuildSidebar(x => x.MenuList, (x, args) => x.SideMenuAction(args));
        }
    }
}