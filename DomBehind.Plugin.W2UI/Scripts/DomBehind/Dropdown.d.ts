declare namespace DomBehind.Controls {
    class Dropdown {
        static ItemsSourceProperty: Data.DependencyProperty;
        static Register(behavior: Data.DataBindingBehavior): void;
        static Rebuild(el: JQuery, list: Data.ListCollectionView): boolean;
        _engaged: boolean;
        Items: Data.ListCollectionView;
        Element: JQuery;
        OnCurrentChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs): void;
    }
}
