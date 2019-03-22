declare namespace DomBehind.Data {
    abstract class BindingBehavior implements IDisposable {
        DataContext: any;
        Element: JQuery;
        BindingPolicy: BindingPolicy;
        Priolity: number;
        AdditionalInfo: collections.LinkedDictionary<string, any>;
        abstract Ensure(): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
}
