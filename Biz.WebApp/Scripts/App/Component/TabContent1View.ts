namespace App.Component {
    $.BindViewViewModelWithLoading('#TabContent1', () => TabContent1View, () => TabContent1ViewModel);
    export class TabContent1View
        extends DomBehind.Core.BizView {

        public BuildBinding(): void {
            var builder = this.CreateBindingBuilder<TabContent1ViewModel>();
            builder.Element("#SampleButton")
                .BindingAction(DomBehind.Core.UIElement.ClickEvent, x => x.SampleAction());

        }


    }
}