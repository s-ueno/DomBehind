namespace DomBehind {
    export interface BindingBehaviorBuilder<T> {
        InputType(inputType: InputType): BindingBehaviorBuilder<T>;
    }
    BindingBehaviorBuilder.prototype.InputType = function (inputType: InputType) {
        let me: BindingBehaviorBuilder<any> = this;

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
    export enum InputType {
        /**
         * hidden
         */
        Hidden,
        /**
         * text
         */
        Text,
        /**
         * search
         */
        Search,
        /**
         * tel
         */
        Tel,
        /**
         * url
         */
        Url,
        /**
         * email
         */
        Email,
        /**
         * password
         */
        Password,
        /**
         * datetime
         */
        DateTime,
        /**
         * date
         */
        Date,
        /**
         * month
         */
        Month,
        /**
         * week
         */
        Week,
        /**
         * time
         */
        Time,
        /**
         * datetime-local
         */
        DateTimeLocal,
        /**
         * number
         */
        Number,
        /**
         * range
         */
        Range,
        /**
         * color
         */
        Color,
        /**
         * checkbox
         */
        Checkbox,
        /**
         * radio
         */
        Radio,
        /**
         * file
         */
        File,
        /**
         * submit
         */
        Submit,
        /**
         * image
         */
        Image,
        /**
         * reset
         */
        Reset,
        /**
         * button
         */
        Button,
    }
}
