namespace App.Component {
    export class TabContent1ViewModel
        extends DomBehind.Core.BizViewModel {

        public get Title(): string {
            return this.GetProperty("Title", "Tab - 1");
        }
        public set Title(value: string) {
            this.SetProperty("Title", value);
        }

        public /* override */ Initialize(): void {

        }

        public UpdateTitle(): void {
            this.UpdateTarget();
        }


        public SampleAction(): void {
            this.Title = "aaa";
            this.IsEnabled = false;
        }

    }
}