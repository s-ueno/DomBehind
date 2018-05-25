declare namespace DomBehind.Data {
    /**
     * provides the ability to easily use behaviors
     */
    class BindingBehaviorCollection extends collections.LinkedList<Data.BindingBehavior> implements IDisposable {
        /**
         * Ensure
         */
        Ensure(): void;
        /**
         * lists the more behaviors
         * @param mark
         */
        ListDataBindingBehavior(mark?: string): Data.DataBindingBehavior[];
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
        Dispose(): void;
        protected _disposed: boolean;
    }
}
