declare namespace DomBehind.Controls {
    class Tab extends Selector {
        static ItemsSourceProperty: Data.DependencyProperty;
        protected static IgnoreMark: string;
        protected static InstanceMark: string;
        static Register(behavior: Data.DataBindingBehavior): void;
        protected Render(source: Data.ListCollectionView): void;
        HeaderContainer: JQuery;
        ContentContainer: JQuery;
        protected NewAdd(source: Data.ListCollectionView, option: Tab.UriOption, isActive?: boolean): Tab.BindingOption;
        protected Options: Tab.BindingOption[];
        protected Added(source: Data.ListCollectionView, obj: any): void;
        protected Removed(source: Data.ListCollectionView, obj: Tab.UriOption): void;
    }
    namespace Tab {
        interface OptionInternal extends IIdentity, IDisplayMemberPath {
            __header?: JQuery;
            __content?: JQuery;
            View?: BizView;
            ViewModel?: BizViewModel;
        }
        interface UriOption extends OptionInternal {
            Uri: string;
        }
        class BindingOption {
            protected Parent: Tab;
            constructor(Parent: Tab);
            readonly HeaderContainer: JQuery;
            Header: JQuery;
            readonly ContentContainer: JQuery;
            Content: JQuery;
            Option: OptionInternal;
            Source: Data.ListCollectionView;
            IsActive: boolean;
            Ensure(): void;
            protected PropertyChangedSafeHandle: (sender: any, e: PropertyChangedEventArgs) => void;
            protected OnRecievePropertyChanged(e: PropertyChangedEventArgs): void;
        }
    }
}
