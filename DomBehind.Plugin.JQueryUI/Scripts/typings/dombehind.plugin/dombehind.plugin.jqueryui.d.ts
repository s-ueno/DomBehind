declare namespace DomBehind {
    class FileUploader extends Data.BindingBehavior {
        constructor();
        Ensure(): void;
    }
    interface ImageFilesBindingBehaviorBuilder<T> {
    }
}

declare namespace DomBehind.Controls {
    class Selectmenu {
        static IsEnabledProperty: Data.DependencyProperty;
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
        Array = 2,
        Custom = 3
    }
    class Suggest extends Data.BindingBehavior {
        constructor();
        Ensure(): void;
        Source: SuggestSource;
        Delay: number;
        CustomSource?: (request: any, response: any) => void;
        Option?: SuggestionOption;
    }
    interface SuggestionOption {
        minLength?: number;
        isShow?: boolean;
        array?: Array<string>;
    }
    interface BindingBehaviorBuilder<T> {
        BuildSuggest<TRow>(source?: SuggestSource, delay?: number, option?: SuggestionOption): BindingBehaviorBuilder<TRow>;
    }
}

declare namespace DomBehind.Controls {
    class Tooltip {
        static TextProperty: Data.DependencyProperty;
    }
}