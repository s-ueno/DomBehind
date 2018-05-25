declare namespace DomBehind.Data {
    /**
     * To communicate the View and ViewModel properties using JQuery
     */
    class DependencyProperty {
        constructor(name: string);
        readonly PropertyName: string;
        private _propertyName;
        /**
         * Using JQuery to get the value from the View
         */
        readonly GetValue: (jQuery: JQuery) => any;
        private _getter;
        /**
         * Using JQuery and set the value to View
         */
        readonly SetValue: (jQuery: JQuery, value: any) => void;
        private _setter;
        /**
         * Default UpdateSourceTrigger
         */
        readonly UpdateSourceTrigger: UpdateSourceTrigger;
        private _updateSourceTrigger;
        readonly BindingMode: BindingMode;
        private _bindingMode;
        readonly Ensure: (behavior: DataBindingBehavior) => void;
        private _ensure;
        /**
         * It defines the communication using JQuery
         * @param propertyName
         * @param getValue
         * @param setValue
         * @param updateSourceTrigger
         */
        static RegisterAttached(propertyName: string, getValue: (jQuery: JQuery) => any, setValue: (jQuery: JQuery, value: any) => void, defaultUpdateSourceTrigger?: UpdateSourceTrigger, mode?: BindingMode, ensure?: (behavior: DataBindingBehavior) => void): DependencyProperty;
    }
}
