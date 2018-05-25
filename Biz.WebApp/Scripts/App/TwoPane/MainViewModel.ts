namespace Biz.WebApp.TwoPane {
    export class MainViewModel extends DomBehind.BizViewModel {
        public IsLoadingCustomer: boolean;
        public CustomerList: DomBehind.Data.ListCollectionView
            = new DomBehind.Data.ListCollectionView([]);
        public RecordCountList: DomBehind.Data.ListCollectionView;

        public UserName: string;
        public IsForward: boolean = true;
        public IsPartial: boolean = false;

        public ParentList: DomBehind.Data.ListCollectionView;
        public ChildList: DomBehind.Data.ListCollectionView;
        public Initialize(): void {

            this.RecordCountList = new DomBehind.Data.ListCollectionView([
                { Id: 0, Text: "1,000 record", Value: 1000 },
                { Id: 1, Text: "5,000 record", Value: 5000 },
                { Id: 2, Text: "10,000 record", Value: 10000 },
                { Id: 3, Text: "100,000 record", Value: 100000 },
            ], "Text");
            this.RecordCountList.MoveFirst();


            this.ParentList = new DomBehind.Data.ListCollectionView([
                { Id: 0, Title: "Parent - 1" },
                { Id: 1, Title: "Parent - 2" },
                { Id: 2, Title: "Parent - 3" },
            ], "Title");
            this.ParentList.MoveFirst();
            this.ParentList.CurrentChanged.AddHandler((sender, e) => this.ChildList.Refresh());

            this.ChildList = new DomBehind.Data.ListCollectionView([
                { ParentId: 0, ChildId: 0, Title: "Parent 1- Child 1" },
                { ParentId: 0, ChildId: 1, Title: "Parent 1- Child 2" },
                { ParentId: 0, ChildId: 2, Title: "Parent 1- Child 3" },
                { ParentId: 1, ChildId: 0, Title: "Parent 2- Child 1" },
                { ParentId: 1, ChildId: 1, Title: "Parent 2- Child 2" },
                { ParentId: 1, ChildId: 2, Title: "Parent 2- Child 3" },
                { ParentId: 2, ChildId: 0, Title: "Parent 3- Child 1" },
                { ParentId: 2, ChildId: 1, Title: "Parent 3- Child 2" },
                { ParentId: 2, ChildId: 2, Title: "Parent 3- Child 3" },
            ], "Title");
            this.ChildList.MoveFirst();
            this.ChildList.Filter = x => this.PredicateChildFilter(x);

            this.UpdateTarget();
        }
        protected PredicateChildFilter(obj: any): boolean {
            if (!obj) return false;

            let parent = this.ParentList.Current;
            if (!parent) return false;

            return obj.ParentId === parent.Id;
        }

        public FindCustomerAsync() {
            this.IsLoadingCustomer = true;
            this.UpdateTarget();

            var svc = new FindCustomerInfoWebProxy();
            return svc.ExecuteAjax({
                RecordCount: this.RecordCountList.Current.Value,
                Name: this.UserName,
            }).done(x => {
                this.CustomerList = new DomBehind.Data.ListCollectionView(x);
            }).always(() => {
                this.IsLoadingCustomer = false;
                this.UpdateTarget();
            });
        }

        public ClearCustomerList() {
            this.CustomerList = new DomBehind.Data.ListCollectionView([]);
            this.UpdateTarget();

            this.NotifyEvent(AppMediator.ShowHideRightMenu, false);
        }

        public OnSelectedRow(e) {
            let row: CustomerInfo = e;
            if (row) {
                this.NotifyEvent(Mediator.SelectedRowEvent, row);
            }
        }
        public OnGridDoubleClick(e) {
            this.ShowDetailContent();
        }
        protected ShowDetailContent() {
            this.NotifyEvent(AppMediator.ShowHideRightMenu, true);
        }
        public OnAdd(e) {

            let newRow: CustomerInfo = {
                CustomerId: "(New)",
                FirstName: " - ",
                LastName: " - ",
                Css: "form-twopane-rowstyle-sample",
                CellStyle: '{ "CustomerId": "color: red", "FirstName": "color: red" }',
            };
            setTimeout(() => {
                this.OnEdit(newRow);
            }, 16);
            return newRow;
        }
        public OnEdit(row: CustomerInfo) {
            this.OnSelectedRow(row);
            this.ShowDetailContent();
        }
        public OnDeleted(row: CustomerInfo) {

        }
        public OnSave(row: CustomerInfo) {

        }
    }
}