namespace DomBehind.Core.Data {

    export class ListCollectionView extends NotifiableImp {
        constructor(public Source: Array<any>,
            public DisplayMemberPath?: string) {
            super();
            this.List = new collections.LinkedList<any>();
            $.each(Source, (i, value) => {
                this.List.add(value);
            });
            this.ViewReflected = ListCollectionView.ViewReflectedStatus.None;
        }
        public List: collections.LinkedList<any>;
        private _current: any;
        public get Current(): any { return this._current; }
        public set Current(value: any) {
            if (this.OnCurrentChanging().Cancel) return;
            this._current = value;
            this.ViewReflected = ListCollectionView.ViewReflectedStatus.NoReflected;
            this.OnCurrentChanged();
        }

        protected OnCurrentChanging(): CancelEventArgs {
            var e = new CancelEventArgs();
            this.CurrentChanging.Raise(this, e);
            return e;
        }
        public CurrentChanging: TypedEvent<CancelEventArgs> = new TypedEvent<CancelEventArgs>();
        protected OnCurrentChanged(): void {
            this.CurrentChanged.Raise(this, new EventArgs());
            this.PropertyChanged.Raise(this, new PropertyChangedEventArgs("Current"));
        }
        public CurrentChanged: TypedEvent<EventArgs> = new TypedEvent<EventArgs>();


        public Find(predicate: (x) => boolean) {
            return this.List.toArray().FirstOrDefault(predicate);
        }
        public Contains(obj: any): boolean {
            return this.List.contains(obj);
        }

        public Select(obj: any): void {
            this.Current = obj;
        }
        public UnSelect(): void {
            this.Current = null;
        }
        public MoveFirst(): void {
            this.Current = this.List.first();
        }
        public MoveLast(): void {
            this.Current = this.List.last();
        }
        public Filter: (obj: any) => boolean;
        public Grouping: (obj: any) => any;
        public Refresh(): void {
            if (this.Filter) {
                this.List = new collections.LinkedList<any>();
                $.each(this.Source, (i, value) => {
                    if (this.Filter(value)) {
                        this.List.add(value);
                    }
                });

                if (this.Current) {
                    if (!this.Contains(this.Current)) {
                        this.MoveFirst();
                    }
                }
            }

            this.OnPropertyChanged();
        }
        protected OnPropertyChanged(name?: string): void {
            this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(name));
        }
        public ViewReflected: ListCollectionView.ViewReflectedStatus;
    }
}

namespace DomBehind.Core.Data.ListCollectionView {
    export enum ViewReflectedStatus {
        None,
        NoReflected,
        Reflected,
    }
}
