namespace DomBehind {
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
                this.CurrentSelector = value;
            } else {
                this.CurrentElement = value;
            }
            this.CurrentBehavior = null;
            return this;
        }

        //#endregion

        // #region Now is the element that is a target

        public CurrentElement: JQuery;
        public CurrentSelector: string;
        public CurrentBehavior: Data.BindingBehavior;

        // #endregion

        public SetValue(dp: Data.DependencyProperty, value: any): BindingBehaviorBuilder<T> {
            dp.SetValue(this.CurrentElement, value, this.CurrentBehavior);
            return this;
        }

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
        ): Data.DataBindingBehaviorBuilder<T> {

            let behavior = this.Add(new Data.DataBindingBehavior());
            behavior.Property = property;
            behavior.PInfo = new LamdaExpression(this.Owner.DataContext, bindingExpression);
            behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
            behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;


            let dataBindingBuilder = new Data.DataBindingBehaviorBuilder<T>(this.Owner);
            dataBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            dataBindingBuilder.CurrentElement = this.CurrentElement;
            // default PartialMark is PropertyName
            return dataBindingBuilder.PartialMark(behavior.PInfo.MemberPath);
        }

        /**
         * Assign "IValueConverter"
         * @param conv
         */
        public SetConverter(conv: IValueConverter): BindingBehaviorBuilder<T> {
            this.CurrentBehavior.BindingPolicy.Converter = conv;
            return this;
        }

        public ConvertTarget(exp: (x: any) => any): BindingBehaviorBuilder<T> {
            if (this.CurrentBehavior.BindingPolicy.Converter) {
                throw new Exception("Another 'IValueConverter' has already been assigned.");
            }
            let conv = new SimpleConverter();
            conv.ConvertHandler = exp;
            this.CurrentBehavior.BindingPolicy.Converter = conv;

            return this;
        }

        public ConvertSource(exp: (x: any) => any): BindingBehaviorBuilder<T> {
            if (this.CurrentBehavior.BindingPolicy.Converter) {
                throw new Exception("Another 'IValueConverter' has already been assigned.");
            }
            let conv = new SimpleConverter();
            conv.ConvertBackHandler = exp;
            this.CurrentBehavior.BindingPolicy.Converter = conv;

            return this;
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
        public BindingAction(event: IEventBuilder,
            action: (x: T) => any): BindingBehaviorBuilder<T>;
        /**
         * linking the action of the view and the view model
         * @param event
         * @param action
         */
        public BindingAction(event: IEventBuilder, action: (x: T, args: any) => void): BindingBehaviorBuilder<T>;
        public BindingAction(event: IEventBuilder, action: (x: T, args: any) => void, allowBubbling: boolean = false): BindingBehaviorBuilder<T> {
            let behavior = this.Add(new Data.ActionBindingBehavior());
            behavior.Event = event.Create();
            behavior.Action = action;
            behavior.ActionParameterCount = action.length;
            behavior.AllowBubbling = allowBubbling;

            let actionBindingBuilder = new Data.ActionBindingBehaviorBuilder<T>(this.Owner);
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

    export class SimpleConverter implements DomBehind.IValueConverter {
        Convert(value: any) {
            if (!this.ConvertHandler) return value;

            return this.ConvertHandler(value);
        }
        public ConvertHandler: (x: any) => any;

        ConvertBack(value: any) {
            if (!this.ConvertBackHandler) return value;

            return this.ConvertBackHandler(value);
        }
        public ConvertBackHandler: (x: any) => any;

    }
}
