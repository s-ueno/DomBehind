declare namespace DomBehind {
    /**
     * It is the code behind the view
     * to promotes component-oriented developers
     */
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
        /**
         * start the build of the binding
         */
        protected CreateBindingBuilder<T extends BizViewModel>(): BindingBehaviorBuilder<T>;
        /**
         * provides the ability to easily use behaviors
         */
        BindingBehaviors: Data.BindingBehaviorCollection;
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        UpdateTarget(mark?: string): void;
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        UpdateSource(mark?: string): void;
        Validate(mark?: string): boolean;
        ClearValidator(mark?: string): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
}
