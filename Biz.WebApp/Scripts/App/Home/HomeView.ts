namespace App.Home {
    $.RegisterViewViewModel("#HomeView", () => HomeView, () => HomeViewModel);
    export class HomeView
        extends DomBehind.Core.BizView {

        public BuildBinding(): void {
            var builder = this.CreateBindingBuilder<HomeViewModel>();

            builder.Element(".slideanim").SlideAnimation();

        }

        public OnReceiveNotificationMessage(sender: any, e: any) {

        }
    }
}
