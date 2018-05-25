namespace Biz.WebApp.Portal {
    import UIElement = DomBehind.UIElement;

    export class TitleBarView extends DomBehind.BizView {
        public BuildBinding(): void {
            let builder = this.CreateBindingBuilder<TitleBarViewModel>();

            builder.Element("#AppBrand")
                .BindingAction(UIElement.Click, x => x.BrowserReflesh());

            builder.Element("#ContactButton")
                .BindingAction(UIElement.Click, x => x.ShowContact());
            builder.Element("#SignOutButton")
                .BindingAction(UIElement.Click, x => x.SignOut());
        }
    }
}