declare namespace DomBehind.Data {
    /**
     * Describes the timing of binding source updates.
     */
    enum UpdateSourceTrigger {
        /**
         * Updates the binding source only when you call the UpdateSource method.
         */
        Explicit = 0,
        /**
         * Updates the binding source whenever the binding target element loses focus.
         */
        LostForcus = 1,
        /**
         * This is for extension
         */
        PropertyChanged = 2,
    }
}
