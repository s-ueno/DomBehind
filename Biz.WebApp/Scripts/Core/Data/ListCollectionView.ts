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

            if (this.engaged) return;
            
            this.OnCurrentChanged();
            this.OnPropertyChanged("Current");
        }

        public OnCurrentChanging(): CancelEventArgs {
            var e = new CancelEventArgs();
            this.CurrentChanging.Raise(this, e);
            return e;
        }
        public CurrentChanging: TypedEvent<CancelEventArgs> = new TypedEvent<CancelEventArgs>();
        public OnCurrentChanged(): void {
            if (this.engaged) return;

            this.CurrentChanged.Raise(this, new EventArgs());
        }
        public CurrentChanged: TypedEvent<EventArgs> = new TypedEvent<EventArgs>();


        public Find(predicate: (x) => boolean) {
            return this.List.toArray().FirstOrDefault(predicate);
        }
        public Contains(obj: any): boolean {
            return this.List.contains(obj);
        }

        public Select(obj: any): ListCollectionView {
            this.Current = obj;
            return this;
        }
        public UnSelect(): ListCollectionView {
            this.Current = null;
            return this;
        }
        public MoveFirst(): ListCollectionView {
            this.Current = this.List.first();
            return this;
        }
        public MoveLast(): ListCollectionView {
            this.Current = this.List.last();
            return this;
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
        public OnPropertyChanged(name?: string): void {
            if (this.engaged) return;
            this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(name));
        }
        public ViewReflected: ListCollectionView.ViewReflectedStatus;

        public Begin(): ListCollectionView {
            this.engaged = true;
            return this;
        }
        public End(): ListCollectionView {
            this.engaged = false;
            return this;
        }
        private engaged: boolean = false;
    }
}

namespace DomBehind.Core.Data.ListCollectionView {
    export enum ViewReflectedStatus {
        None,
        NoReflected,
        Reflected,
    }
}
