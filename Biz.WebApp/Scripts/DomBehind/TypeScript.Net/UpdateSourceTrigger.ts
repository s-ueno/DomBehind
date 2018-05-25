namespace DomBehind.Data {
    /**
     * Describes the timing of binding source updates.
     */
    export enum UpdateSourceTrigger {
        /**
         * Updates the binding source only when you call the UpdateSource method.
         */
        Explicit,
        /**
         * Updates the binding source whenever the binding target element loses focus.
         */
        LostForcus,
        /**
         * This is for extension
         */
        PropertyChanged,
    }
}
