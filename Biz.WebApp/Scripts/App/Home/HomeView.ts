namespace Biz.WebApp.Home {
    import UIElement = DomBehind.UIElement;

    export class HomeView extends DomBehind.BizView {
        public BuildBinding(): void {

            var buider = this.CreateBindingBuilder<HomeViewModel>();

            // Email 
            buider.Element("#EmailInput")
                .InputType(DomBehind.InputType.Email)
                .Binding(UIElement.ValueProperty, x => x.Email)
                .Required();

            // Password
            buider.Element("#PasswordInput")
                .InputType(DomBehind.InputType.Password)
                .Binding(UIElement.ValueProperty, x => x.Password)
                .Required("Enter the password！");

            // Remember me
            buider.Element("#RememberMeCheckbox")
                .InputType(DomBehind.InputType.Checkbox)
                .Binding(UIElement.ValueProperty, x => x.IsRememberMe);

            // Sign in ボタン
            buider.Element("#SignInButton")
                .BindingAction(UIElement.Click, x => x.SignIn());

            buider.Element("#ForgotPasswordButton")
                .BindingAction(UIElement.Click, x => x.ForgotPassword());

        }
    }
}