namespace App.Shared {
    $.BindViewViewModelWithLoading("#_Layout", () => _LayoutView, () => _LayoutViewModel);
    export class _LayoutView
        extends DomBehind.Core.BizView {



        public BuildBinding(): void {
            var builder = this.CreateBindingBuilder<_LayoutViewModel>();

            builder.Element(".scrolling").Scrolling();
            builder.Element("#SignInLink")
                .BindingAction(DomBehind.Core.UIElement.ClickEvent, x => x.ShowSignIn());

        }


        public OnReceiveNotificationMessage(sender: any, e: any) {

        }
    }
}


