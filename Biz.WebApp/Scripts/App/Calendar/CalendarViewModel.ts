namespace Biz.WebApp.Calendar {

    export class CurrenderModel {
        public Identity: string | number;
        public Title: string;
        public StartDate: Date;
        public EndDate: Date;

    }

    export class CalendarViewModel extends DomBehind.BizViewModel {

        //public MyController: DomBehind.Calendar;

        public CalendarItems: DomBehind.Data.ListCollectionView;
        public Initialize(): void {

            let list = new DomBehind.List<CurrenderModel>();


            let first = new CurrenderModel();
            first.Identity = NewUid();
            first.Title = "Launch";

            let start = new Date();
            start.setHours(12);
            first.StartDate = start;

            let end = new Date();
            end.setHours(13);
            first.EndDate = end;

            list.add(first);

            // 
            this.CalendarItems = new DomBehind.Data.ListCollectionView(list.toArray());

        }

    }

}