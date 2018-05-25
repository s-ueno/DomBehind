namespace Biz.WebApp.TwoPane {

    export class DetailViewModel extends DomBehind.BizViewModel {
        public Initialize(): void {
            Mediator.SelectedRowEvent.AddHandler((sender, e) => this.OnSelectedRow(e));
        }


        public Row: CustomerInfo;
        protected OnSelectedRow(row: CustomerInfo) {
            this.Row = row;
            this.UpdateTarget();
        }


        public Save() {
            this.ShowMessage(`${this.Row.CustomerId} saved.`);
            this.Hide();
        }

        public Hide() {
            AppMediator.ShowHideRightMenu.Raise(this, false);
        }
    }

}