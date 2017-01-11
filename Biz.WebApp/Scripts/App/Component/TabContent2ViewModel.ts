namespace App.Component {
    export class TabContent2ViewModel
        extends DomBehind.Core.BizViewModel {


        public Title: string;
        public /* override */ Initialize(): void {
            this.Title = "Tab - 2";
        }

    }
}