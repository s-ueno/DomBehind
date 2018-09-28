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

declare namespace DomBehind {
    enum SuggestSource {
        Google = 0,
        Amazon = 1,
        Custom = 2
    }
    class Suggest extends Data.BindingBehavior {
        constructor();
        Ensure(): void;
        Source: SuggestSource;
        Delay: number;
        CustomSource?: (request: any, response: any) => void;
    }
    interface BindingBehaviorBuilder<T> {
        BuildSuggest<TRow>(source?: SuggestSource, delay?: number, customSource?: (request: any, response: any) => void): BindingBehaviorBuilder<TRow>;
    }
}

declare namespace DomBehind.Controls {
    class Tooltip {
        static TextProperty: Data.DependencyProperty;
    }
}