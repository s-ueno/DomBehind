declare namespace DomBehind.Data {
    class ListCollectionView extends NotifiableImp {
        DisplayMemberPath: string;
        constructor(source: Array<any>, DisplayMemberPath?: string);
        protected Source: collections.LinkedList<any>;
        protected List: collections.LinkedList<any>;
        private _current;
        Current: any;
        OnCurrentChanging(): CancelEventArgs;
        CurrentChanging: TypedEvent<CancelEventArgs>;
        OnCurrentChanged(): void;
        CurrentChanged: TypedEvent<EventArgs>;
        Find(predicate: (x) => boolean): any;
        Contains(obj: any): boolean;
        Select(obj: any): ListCollectionView;
        UnSelect(): ListCollectionView;
        MoveFirst(): ListCollectionView;
        MoveLast(): ListCollectionView;
        Filter: (obj: any) => boolean;
        Grouping: (obj: any) => any;
        Refresh(): ListCollectionView;
        protected RefreshRaw(): void;
        OnPropertyChanged(name?: string): void;
        ViewReflected: ListCollectionView.ViewReflectedStatus;
        Begin(): ListCollectionView;
        End(): ListCollectionView;
        Add(obj: any): void;
        Added: TypedEvent<CollectionChangedEventArgs>;
        Remove(obj: any): void;
        Removed: TypedEvent<CollectionChangedEventArgs>;
        ToArray(): Array<any>;
        private engaged;
    }
}
declare namespace DomBehind.Data.ListCollectionView {
    enum ViewReflectedStatus {
        None = 0,
        NoReflected = 1,
        Reflected = 2,
    }
}
