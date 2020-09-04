declare namespace DomBehind {
    abstract class BizView implements IDisposable {
        get Container(): JQuery;
        set Container(value: JQuery);
        private _container;
        get DataContext(): any;
        private _dataContext;
        set DataContext(value: any);
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
