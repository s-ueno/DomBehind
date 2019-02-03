declare namespace DomBehind.Controls {
    interface ISelectableElement extends IDisplayMemberPath {
        __Selector: JQuery;
        __Element: HTMLOptionElement;
    }
    class Selector {
        Behavior: Data.DataBindingBehavior;
        static ItemsSourceProperty: Data.DependencyProperty;
        static AllowMultipleProperty: Data.DependencyProperty;
        protected static IgnoreMark: string;
        protected static InstanceMark: string;
        static Register(behavior: Data.DataBindingBehavior): void;
        constructor(Behavior: Data.DataBindingBehavior);
        protected UpdateTargetEventHandle: (sender: any, e: any) => void;
        protected UpdateSourceEventHandle: (sender: any, e: any) => void;
        protected PropertyChangedEventHandle: (sender: any, e: any) => void;
        protected UpdateSource(e: JQueryEventObject): boolean;
        protected OnUpdateTarget(sender: Data.DataBindingBehavior, data: any): void;
        protected OnDataSourcePropertyChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs): void;
        protected Render(source: Data.ListCollectionView): void;
        protected Multiple: boolean;
        protected RenderOption(element: JQuery, source: Data.ListCollectionView, value: any): void;
        protected EnsureDisplayMemberPath(path: string): IDisplayMemberPath;
        protected EnsureElement(option: JQuery): ISelectableElement;
        private AddedHandle;
        private RemovedHandle;
        protected Added(source: Data.ListCollectionView, obj: any): void;
        protected Removed(source: Data.ListCollectionView, obj: any): void;
        protected Select(source: Data.ListCollectionView): void;
        private SingleSelect;
        private MultipleSelect;
        protected HasChanges(source: Data.ListCollectionView): boolean;
        protected Subscribe(source: Data.ListCollectionView): void;
        protected UnSubscribe(source: Data.ListCollectionView): void;
        static GetDisplayValue(value: any, displayMemberPath: string): any;
    }
}
declare namespace DomBehind.Data {
    interface DataBindingBehaviorBuilder<T> {
        Multiple(): DataBindingBehaviorBuilder<T>;
        Multiple(allowMultiple: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
}
