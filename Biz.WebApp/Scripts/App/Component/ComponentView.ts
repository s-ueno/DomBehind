namespace App.Component {
    $.RegisterViewViewModel("#ComponentView", () => ComponentView, () => ComponentViewModel);
    export class ComponentView
        extends DomBehind.Core.BizView {

        public BuildBinding(): void {
            var builder = this.CreateBindingBuilder<ComponentViewModel>();
            builder.Element("#TabSample")
                .Binding(DomBehind.Core.Tab.ItemsSourceProperty, x => x.ViewModelCollection);
        }
    }
}