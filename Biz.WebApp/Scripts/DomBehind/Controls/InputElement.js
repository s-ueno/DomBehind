var DomBehind;
(function (DomBehind) {
    DomBehind.BindingBehaviorBuilder.prototype.InputType = function (inputType) {
        var me = this;
        var typeName = InputType[inputType];
        if (inputType === InputType.DateTimeLocal) {
            typeName = "DateTime-Local";
        }
        typeName = typeName.toLowerCase();
        me.CurrentElement.removeAttr("type");
        me.CurrentElement.attr("type", typeName);
        return me;
    };
    /**
     * HTML5
     */
    var InputType;
    (function (InputType) {
        /**
         * hidden
         */
        InputType[InputType["Hidden"] = 0] = "Hidden";
        /**
         * text
         */
        InputType[InputType["Text"] = 1] = "Text";
        /**
         * search
         */
        InputType[InputType["Search"] = 2] = "Search";
        /**
         * tel
         */
        InputType[InputType["Tel"] = 3] = "Tel";
        /**
         * url
         */
        InputType[InputType["Url"] = 4] = "Url";
        /**
         * email
         */
        InputType[InputType["Email"] = 5] = "Email";
        /**
         * password
         */
        InputType[InputType["Password"] = 6] = "Password";
        /**
         * datetime
         */
        InputType[InputType["DateTime"] = 7] = "DateTime";
        /**
         * date
         */
        InputType[InputType["Date"] = 8] = "Date";
        /**
         * month
         */
        InputType[InputType["Month"] = 9] = "Month";
        /**
         * week
         */
        InputType[InputType["Week"] = 10] = "Week";
        /**
         * time
         */
        InputType[InputType["Time"] = 11] = "Time";
        /**
         * datetime-local
         */
        InputType[InputType["DateTimeLocal"] = 12] = "DateTimeLocal";
        /**
         * number
         */
        InputType[InputType["Number"] = 13] = "Number";
        /**
         * range
         */
        InputType[InputType["Range"] = 14] = "Range";
        /**
         * color
         */
        InputType[InputType["Color"] = 15] = "Color";
        /**
         * checkbox
         */
        InputType[InputType["Checkbox"] = 16] = "Checkbox";
        /**
         * radio
         */
        InputType[InputType["Radio"] = 17] = "Radio";
        /**
         * file
         */
        InputType[InputType["File"] = 18] = "File";
        /**
         * submit
         */
        InputType[InputType["Submit"] = 19] = "Submit";
        /**
         * image
         */
        InputType[InputType["Image"] = 20] = "Image";
        /**
         * reset
         */
        InputType[InputType["Reset"] = 21] = "Reset";
        /**
         * button
         */
        InputType[InputType["Button"] = 22] = "Button";
    })(InputType = DomBehind.InputType || (DomBehind.InputType = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=InputElement.js.map