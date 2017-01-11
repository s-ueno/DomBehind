namespace App.Component {
    $.RegisterViewViewModel('#TabContent2', () => TabContent2View, () => TabContent2ViewModel);
    export class TabContent2View
        extends DomBehind.Core.BizView {

        public BuildBinding(): void {
            var builder = this.CreateBindingBuilder<TabContent2ViewModel>();

        }


    }
}