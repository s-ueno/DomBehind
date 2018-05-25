declare namespace DomBehind.Data {
    /**
     * supports the link of the view and the view model
     */
    abstract class BindingBehavior implements IDisposable {
        DataContext: any;
        Element: JQuery;
        BindingPolicy: BindingPolicy;
        Priolity: number;
        /**
         * ensure a bind
         */
        abstract Ensure(): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
}
