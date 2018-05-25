declare namespace DomBehind {
    /**
     * support the construction of behavior
     */
    class BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        Owner: BizView;
        /**
         * define the target element
         * @param selector
         */
        Element(selector: string): BindingBehaviorBuilder<T>;
        Element(uiElement: JQuery): BindingBehaviorBuilder<T>;
        CurrentElement: JQuery;
        CurrentSelector: string;
        CurrentBehavior: Data.BindingBehavior;
        /**
         * linking the properties of the view and the view model
         * @param property
         * @param getter
         * @param setter
         * @param updateTrigger is update timing of view model
         */
        Binding<P>(property: Data.DependencyProperty, bindingExpression: (x: T) => P, mode?: Data.BindingMode, updateTrigger?: Data.UpdateSourceTrigger): Data.DataBindingBehaviorBuilder<T>;
        BindingViewViewModel(view: (x: T) => BizView, viewModel: (x: T) => BizViewModel): BindingBehaviorBuilder<T>;
        /**
         * linking the action of the view and the view model
         * @param event
         * @param action
         */
        BindingAction(event: IEventBuilder, action: (x: T) => any): BindingBehaviorBuilder<T>;
        /**
         * linking the action of the view and the view model
         * @param event
         * @param action
         */
        BindingAction(event: IEventBuilder, action: (x: T, args: any) => void): BindingBehaviorBuilder<T>;
        /**
         * Register the behavior
         * @param behavior
         */
        Add<TBehavior extends Data.BindingBehavior>(behavior: TBehavior): TBehavior;
    }
}
