declare namespace DomBehind {
    class BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        Owner: BizView;
        Element(selector: string): BindingBehaviorBuilder<T>;
        Element(uiElement: JQuery): BindingBehaviorBuilder<T>;
        CurrentElement: JQuery;
        CurrentSelector: string;
        CurrentBehavior: Data.BindingBehavior;
        SetValue(dp: Data.DependencyProperty, value: any): BindingBehaviorBuilder<T>;
        Binding<P>(property: Data.DependencyProperty, bindingExpression: (x: T) => P, mode?: Data.BindingMode, updateTrigger?: Data.UpdateSourceTrigger): Data.DataBindingBehaviorBuilder<T>;
        SetConverter(conv: IValueConverter): BindingBehaviorBuilder<T>;
        ConvertTarget(exp: (x: any) => any): BindingBehaviorBuilder<T>;
        ConvertSource(exp: (x: any) => any): BindingBehaviorBuilder<T>;
        BindingViewViewModel(view: (x: T) => BizView, viewModel: (x: T) => BizViewModel): BindingBehaviorBuilder<T>;
        BindingAction(event: IEventBuilder, action: (x: T) => any): BindingBehaviorBuilder<T>;
        BindingAction(event: IEventBuilder, action: (x: T, args: any) => void): BindingBehaviorBuilder<T>;
        Add<TBehavior extends Data.BindingBehavior>(behavior: TBehavior): TBehavior;
    }
    class SimpleConverter implements DomBehind.IValueConverter {
        Convert(value: any): any;
        ConvertHandler: (x: any) => any;
        ConvertBack(value: any): any;
        ConvertBackHandler: (x: any) => any;
    }
}
