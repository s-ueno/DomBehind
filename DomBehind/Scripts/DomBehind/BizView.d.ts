declare namespace DomBehind {
    abstract class BizView implements IDisposable {
        Container: JQuery;
        private _container;
        DataContext: any;
        private _dataContext;
        abstract BuildBinding(): void;
        OnDataContextPropertyChanged(sender: any, e: PropertyChangedEventArgs): void;
        ViewLoaded(responseText: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): void;
        Ensure(): void;
        protected UnSubscribe(): void;
        protected Subscribe(): void;
        protected CreateBindingBuilder<T extends BizViewModel>(): BindingBehaviorBuilder<T>;
        BindingBehaviors: Data.BindingBehaviorCollection;
        UpdateTarget(mark?: string): void;
        UpdateSource(mark?: string): void;
        Validate(mark?: string): boolean;
        RemoveValidator(mark?: string): void;
        ClearValidator(mark?: string): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
}
