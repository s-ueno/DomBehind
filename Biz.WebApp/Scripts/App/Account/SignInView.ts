namespace App.Account {
    import UIElement = DomBehind.Core.UIElement;

    $.RegisterViewViewModel("#SignInView", () => SignInView, () => SignInViewModel);
    export class SignInView
        extends DomBehind.Core.BizView {

        public BuildBinding(): void {
            var builder = this.CreateBindingBuilder<SignInViewModel>();

            builder.Element("#EmailInput").InputType(DomBehind.Core.InputType.Email)
                .Binding(UIElement.ValueProperty, x => x.Email)
                .Required();

            builder.Element("#PasswordInput").InputType(DomBehind.Core.InputType.Password)
                .Binding(UIElement.ValueProperty, x => x.Password)
                .Required("パスワードは必須だよ！");

            builder.Element("#RememberMeCheckbox").InputType(DomBehind.Core.InputType.Checkbox)
                .Binding(UIElement.IsCheckedProperty, x => x.AllowCachedSignInPolicy);

            builder.Element("#SignInButton").InputType(DomBehind.Core.InputType.Submit)
                .BindingAction(UIElement.ClickEvent, x => x.SignIn());

            builder.Element(this.Container)
                .BindingAction(UIElement.ModalClosingEvent, (x, e) => x.OnModalClosing(e));
        }

        public OnReceiveNotificationMessage(sender: any, e: any) {
        }
    }
}
