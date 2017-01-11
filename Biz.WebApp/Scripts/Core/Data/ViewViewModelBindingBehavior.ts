namespace DomBehind.Core.Data {

    export class ViewViewModelBindingBehavior
        extends BindingBehavior {

        public GetView: (x: any) => BizView;
        public GetViewModel: (x: any) => BizViewModel;

        public View: BizView;
        public ViewModel: BizViewModel;

        public Ensure(): void {
            this.View = this.GetView(this.DataContext);
            this.ViewModel = this.GetViewModel(this.DataContext);

            this.View.Container = this.Element;
            this.View.DataContext = this.ViewModel;
            this.View.Ensure();
        }


        public Dispose(): void {
            if (!this._disposed) {

                if (!Object.IsNullOrUndefined(this.View)) {
                    this.View.Dispose();
                    this.View = null;
                }
                if (!Object.IsNullOrUndefined(this.ViewModel)) {
                    this.ViewModel.Dispose();
                    this.ViewModel = null;
                }

                this.GetView = null;
                this.GetViewModel = null;

                super.Dispose();
            }
        }
    }
}