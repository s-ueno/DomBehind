namespace Biz.WebApp.Shared {
    import UIElement = DomBehind.UIElement;

    export class LayoutSPAView extends DomBehind.BizView {

        constructor() {
            super();
            let layout = $("body").layout({
                north: {
                    resizable: false,
                    closable: false,
                    spacing_open: 0,
                    size: 50,
                },
                east: {
                    size: 300
                }
            });
            layout.hide("east");
            layout.hide("south");

            AppMediator.ShowHideRightMenu.AddHandler((sender, e) => {
                if (e) {
                    layout.show("east", true);
                } else {
                    layout.hide("east");
                }
            });

            AppMediator.ShowHideBottomMenu.AddHandler((sender, e) => {
                if (e) {
                    layout.show("south", true);
                } else {
                    layout.hide("south");
                }
            });
        }


        public BuildBinding(): void {
            let builder = this.CreateBindingBuilder<LayoutSPAViewModel>();

            builder.Element("#SharedSidemenu")
                .BuildSidebar(x => x.MenuList, (x, args) => x.SelectedMenu(args));

            builder.Element("#AppBrand")
                .BindingAction(UIElement.Click, x => x.Reload());

            builder.Element("#SignOutButton")
                .BindingAction(UIElement.Click, x => x.SignOut());
        }
    }
}