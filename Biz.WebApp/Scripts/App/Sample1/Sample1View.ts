namespace Biz.WebApp.Sample1 {
    import UIElement = DomBehind.UIElement;

    export class Sample1View extends DomBehind.BizView {
        public BuildBinding(): void {

            var buider = this.CreateBindingBuilder<Sample1ViewModel>();


        }
    }
}