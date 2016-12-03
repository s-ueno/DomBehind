namespace DomBehind.Core.Data {
    /**
     * To communicate the View and ViewModel properties using JQuery
     */
    export class DependencyProperty {

        // #region  constructor

        constructor(name: string) {
            this._propertyName = name;
        }

        // #endregion

        // #region PropertyName

        public get PropertyName(): string {
            return this._propertyName;
        }
        private _propertyName: string;

        // #endregion

        // #region GetValue-SetValue

        /**
         * Using JQuery to get the value from the View
         */
        public get GetValue(): (jQuery: JQuery) => any {
            return this._getter;
        }
        private _getter: (jQuery: JQuery) => any;

        /**
         * Using JQuery and set the value to View
         */
        public get SetValue(): (jQuery: JQuery, value: any) => void {
            return this._setter;
        }
        private _setter: (jQuery: JQuery, value: any) => void

        // #endregion


        // #region UpdateSourceTrigger

        /**
         * Default UpdateSourceTrigger
         */
        public get UpdateSourceTrigger(): UpdateSourceTrigger {
            return this._updateSourceTrigger;
        }
        private _updateSourceTrigger: UpdateSourceTrigger;

        // #endregion

        // #region Binding Mode

        public get BindingMode(): BindingMode {
            return this._bindingMode;
        }
        private _bindingMode: BindingMode;


        // #endregion

        // #region Ensure Action

        public get Ensure(): (behavior: DataBindingBehavior) => void {
            return this._ensure;
        }
        private _ensure: (behavior: DataBindingBehavior) => void;

        // #endregion

        // #region static method

        /**
         * It defines the communication using JQuery
         * @param propertyName
         * @param getValue
         * @param setValue
         * @param updateSourceTrigger
         */
        public static RegisterAttached(
            propertyName: string,
            getValue: (jQuery: JQuery) => any,
            setValue: (jQuery: JQuery, value: any) => void,
            defaultUpdateSourceTrigger: UpdateSourceTrigger = UpdateSourceTrigger.Explicit,
            mode: BindingMode = BindingMode.TwoWay,
            ensure?: (behavior: DataBindingBehavior) => void): DependencyProperty {

            let dp = new DependencyProperty(propertyName);
            dp._getter = getValue;
            dp._setter = setValue;
            dp._updateSourceTrigger = defaultUpdateSourceTrigger;
            dp._bindingMode = mode;
            dp._ensure = ensure;
            return dp;
        }
    }
}