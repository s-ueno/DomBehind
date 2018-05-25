declare namespace DomBehind {
    interface BindingBehaviorBuilder<T> {
        InputType(inputType: InputType): BindingBehaviorBuilder<T>;
    }
    /**
     * HTML5
     */
    enum InputType {
        /**
         * hidden
         */
        Hidden = 0,
        /**
         * text
         */
        Text = 1,
        /**
         * search
         */
        Search = 2,
        /**
         * tel
         */
        Tel = 3,
        /**
         * url
         */
        Url = 4,
        /**
         * email
         */
        Email = 5,
        /**
         * password
         */
        Password = 6,
        /**
         * datetime
         */
        DateTime = 7,
        /**
         * date
         */
        Date = 8,
        /**
         * month
         */
        Month = 9,
        /**
         * week
         */
        Week = 10,
        /**
         * time
         */
        Time = 11,
        /**
         * datetime-local
         */
        DateTimeLocal = 12,
        /**
         * number
         */
        Number = 13,
        /**
         * range
         */
        Range = 14,
        /**
         * color
         */
        Color = 15,
        /**
         * checkbox
         */
        Checkbox = 16,
        /**
         * radio
         */
        Radio = 17,
        /**
         * file
         */
        File = 18,
        /**
         * submit
         */
        Submit = 19,
        /**
         * image
         */
        Image = 20,
        /**
         * reset
         */
        Reset = 21,
        /**
         * button
         */
        Button = 22,
    }
}
