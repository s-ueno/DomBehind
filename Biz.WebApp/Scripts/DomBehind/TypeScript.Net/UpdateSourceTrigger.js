var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        /**
         * Describes the timing of binding source updates.
         */
        var UpdateSourceTrigger;
        (function (UpdateSourceTrigger) {
            /**
             * Updates the binding source only when you call the UpdateSource method.
             */
            UpdateSourceTrigger[UpdateSourceTrigger["Explicit"] = 0] = "Explicit";
            /**
             * Updates the binding source whenever the binding target element loses focus.
             */
            UpdateSourceTrigger[UpdateSourceTrigger["LostForcus"] = 1] = "LostForcus";
            /**
             * This is for extension
             */
            UpdateSourceTrigger[UpdateSourceTrigger["PropertyChanged"] = 2] = "PropertyChanged";
        })(UpdateSourceTrigger = Data.UpdateSourceTrigger || (Data.UpdateSourceTrigger = {}));
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=UpdateSourceTrigger.js.map