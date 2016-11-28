namespace DomBehind.Core {
    /**
     * support the construction of behavior
     */
    export class BindingBehaviorBuilder<T>  {

        // #region constructor

        constructor(owner: BizView) {
            this.Owner = owner;
        }
        public Owner: BizView;

        // #endregion

        //#region define the target element

        /**
         * define the target element
         * @param selector 
         */
        public Element(selector: string): BindingBehaviorBuilder<T>;
        public Element(uiElement: JQuery): BindingBehaviorBuilder<T>;
        public Element(value: any): BindingBehaviorBuilder<T> {
            if (typeof value === "string") {
                this.CurrentElement = this.Owner.Container.find(value);
            } else {
                this.CurrentElement = value;
            }
            this.CurrentBehavior = null;
            return this;
        }

        //#endregion

        // #region Now is the element that is a target

        public CurrentElement: JQuery;
        public CurrentBehavior: Data.BindingBehavior;

        // #endregion

        // #region Binding is linking the properties of the view and the view model

        /**
         * linking the properties of the view and the view model
         * @param property 
         * @param getter
         * @param setter 
         * @param updateTrigger is update timing of view model
         */
        public Binding<P>(property: Data.DependencyProperty,
            bindingExpression: (x: T) => P,
            mode?: Data.BindingMode,
            updateTrigger?: Data.UpdateSourceTrigger
        ): DataBindingBehaviorBuilder<T> {

            let behavior = this.Add(new Data.DataBindingBehavior());
            behavior.Property = property;
            behavior.BindingExpression = bindingExpression;
            behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
            behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;


            let dataBindingBuilder = new DataBindingBehaviorBuilder<T>(this.Owner);
            dataBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            dataBindingBuilder.CurrentElement = this.CurrentElement;
            // default PartialMark is PropertyName
            return dataBindingBuilder.PartialMark(behavior.BindingPath);
        }

        // #endregion

        // #region BindingViewModel

        public BindingViewViewModel(
            view: (x: T) => BizView,
            viewModel: (x: T) => BizViewModel): BindingBehaviorBuilder<T> {

            let behavior = this.Add(new Data.ViewViewModelBindingBehavior());
            behavior.GetView = view;
            behavior.GetViewModel = viewModel;

            return this;
        }

        // #endregion


        // #region BindingAction is linking the action of the view and the view model

        /**
         * linking the action of the view and the view model
         * @param event
         * @param action
         */
        public BindingAction(event: Data.IEventBuilder,
            action: (x: T) => any): BindingBehaviorBuilder<T>;
        /**
         * linking the action of the view and the view model
         * @param event
         * @param action
         */
        public BindingAction(event: Data.IEventBuilder,
            action: (x: T, args: any) => void): BindingBehaviorBuilder<T>;
        /**
         * linking the action of the view and the view model
         * @param event
         * @param action
         */
        public BindingAction(event: Data.IEventBuilder, action: Function, allowBubbling: boolean = false): BindingBehaviorBuilder<T> {
            let behavior = this.Add(new Data.ActionBindingBehavior());
            behavior.Event = event.Create();
            behavior.Action = action;
            behavior.ActionParameterCount = action.length;
            behavior.AllowBubbling = allowBubbling;

            let actionBindingBuilder = new ActionBindingBehaviorBuilder<T>(this.Owner);
            actionBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            actionBindingBuilder.CurrentElement = this.CurrentElement;
            return actionBindingBuilder;
        }


        // #endregion

        // #region Add

        /**
         * Register the behavior
         * @param behavior
         */
        public Add<TBehavior extends Data.BindingBehavior>(behavior: TBehavior): TBehavior {
            this.CurrentBehavior = behavior;
            behavior.DataContext = this.Owner.DataContext;
            behavior.Element = this.CurrentElement;
            this.Owner.BindingBehaviors.add(behavior);
            return behavior;
        }

        // #endregion

    }
}
