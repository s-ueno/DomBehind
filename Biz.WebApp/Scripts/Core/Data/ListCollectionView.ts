namespace DomBehind.Core.Data {

    export class ListCollectionView extends NotifiableImp {
        constructor(source: Array<any>,
            public DisplayMemberPath?: string) {
            super();

            this.Source = new collections.LinkedList<any>();
            this.List = new collections.LinkedList<any>();
            $.each(source, (i, value) => {
                this.Source.add(value);
                this.List.add(value);
            });
            this.ViewReflected = ListCollectionView.ViewReflectedStatus.None;
        }
        protected Source: collections.LinkedList<any>;
        protected List: collections.LinkedList<any>;
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
            if (obj instanceof Array) {
                var contains = true;
                $.each(obj, (i, value) => {
                    if (!this.List.contains(value)) {
                        contains = false;
                        return false;
                    }
                });
                return contains;
            }
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

            this.RefreshRaw();
       
            this.OnPropertyChanged();
        }
        protected RefreshRaw(): void {
            this.List = new collections.LinkedList<any>();
            $.each(this.Source.toArray(), (i, value) => {
                if (this.Filter) {
                    if (this.Filter(value)) {
                        this.List.add(value);
                    }
                } else {
                    this.List.add(value);
                }
            });

            if (this.Current) {
                if (!this.Contains(this.Current)) {
                    this.MoveFirst();
                }
            }
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

        public Add(obj: any): void {
            this.Source.add(obj);
            this.RefreshRaw();
            this.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.NoReflected;

            var e = new CollectionChangedEventArgs();
            e.Item = obj;
            this.Added.Raise(this, e);

            this.OnPropertyChanged("Source - Add");
        }
        public Added: TypedEvent<CollectionChangedEventArgs>
        = new TypedEvent<CollectionChangedEventArgs>();


        public Remove(obj: any): void {
            this.Source.remove(obj);
            this.RefreshRaw();
            this.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.NoReflected;

            var e = new CollectionChangedEventArgs();
            e.Item = obj;
            this.Removed.Raise(this, e);

            this.OnPropertyChanged("Source - Remove");
        }
        public Removed: TypedEvent<CollectionChangedEventArgs>
        = new TypedEvent<CollectionChangedEventArgs>();


        public ToArray(): Array<any> {
            return (this.Filter) ?
                this.List.toArray().Where(x => this.Filter(x)) :
                this.List.toArray();
        }
        private engaged: boolean = false;
    }


    export class CollectionChangedEventArgs extends EventArgs {
        public Item: any;
    }

}

namespace DomBehind.Core.Data.ListCollectionView {
    export enum ViewReflectedStatus {
        None,
        NoReflected,
        Reflected,
    }
}
