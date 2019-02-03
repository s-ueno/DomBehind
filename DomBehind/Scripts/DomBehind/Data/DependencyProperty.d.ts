declare namespace DomBehind.Data {
    class DependencyProperty {
        constructor(name: string);
        readonly PropertyName: string;
        private _propertyName;
        readonly GetValue: (jQuery: JQuery) => any;
        private _getter;
        readonly SetValue: (jQuery: JQuery, value: any, caller?: any) => void;
        private _setter;
        readonly UpdateSourceTrigger: UpdateSourceTrigger;
        private _updateSourceTrigger;
        readonly BindingMode: BindingMode;
        private _bindingMode;
        readonly Ensure: (behavior: DataBindingBehavior) => void;
        private _ensure;
        static RegisterAttached(propertyName: string, getValue: (jQuery: JQuery) => any, setValue: (jQuery: JQuery, value: any, caller?: any) => void, defaultUpdateSourceTrigger?: UpdateSourceTrigger, mode?: BindingMode, ensure?: (behavior: DataBindingBehavior) => void): DependencyProperty;
    }
}
