declare namespace DomBehind.Controls {
    class Selectmenu {
        static ItemsSourceProperty: Data.DependencyProperty;
        static Register(behavior: Data.DataBindingBehavior): void;
        static Rebuild(el: JQuery, list: Data.ListCollectionView): boolean;
        _engaged: boolean;
        Items: Data.ListCollectionView;
        Element: JQuery;
        private static UpdateCurrent;
        OnCurrentChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs): void;
    }
}
