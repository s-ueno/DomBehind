namespace Biz.WebApp.Sample2 {
    import UIElement = DomBehind.UIElement;

    export class Sample2View extends DomBehind.BizView {
        public BuildBinding(): void {

            var buider = this.CreateBindingBuilder<Sample2ViewModel>();


        }
    }
}