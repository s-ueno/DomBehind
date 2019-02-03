declare namespace DomBehind.Data {
    class BindingBehaviorCollection extends collections.LinkedList<Data.BindingBehavior> implements IDisposable {
        Ensure(): void;
        ListDataBindingBehavior(mark?: string): Data.DataBindingBehavior[];
        UpdateTarget(mark?: string): void;
        UpdateSource(mark?: string): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
}
