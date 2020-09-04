declare namespace DomBehind.Data {
    class DependencyProperty {
        constructor(name: string);
        get PropertyName(): string;
        private _propertyName;
        get GetValue(): (jQuery: JQuery) => any;
        private _getter;
        get SetValue(): (jQuery: JQuery, value: any, caller?: any) => void;
        private _setter;
        get UpdateSourceTrigger(): UpdateSourceTrigger;
        private _updateSourceTrigger;
        get BindingMode(): BindingMode;
        private _bindingMode;
        get Ensure(): (behavior: DataBindingBehavior) => void;
        private _ensure;
        static RegisterAttached(propertyName: string, getValue: (jQuery: JQuery) => any, setValue: (jQuery: JQuery, value: any, caller?: any) => void, defaultUpdateSourceTrigger?: UpdateSourceTrigger, mode?: BindingMode, ensure?: (behavior: DataBindingBehavior) => void): DependencyProperty;
    }
}
