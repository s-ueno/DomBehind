var DomBehind;
(function (DomBehind) {
    /**
     * support the construction of behavior
     */
    var BindingBehaviorBuilder = /** @class */ (function () {
        // #region constructor
        function BindingBehaviorBuilder(owner) {
            this.Owner = owner;
        }
        BindingBehaviorBuilder.prototype.Element = function (value) {
            if (typeof value === "string") {
                this.CurrentElement = this.Owner.Container.find(value);
                this.CurrentSelector = value;
            }
            else {
                this.CurrentElement = value;
            }
            this.CurrentBehavior = null;
            return this;
        };
        // #endregion
        // #region Binding is linking the properties of the view and the view model
        /**
         * linking the properties of the view and the view model
         * @param property
         * @param getter
         * @param setter
         * @param updateTrigger is update timing of view model
         */
        BindingBehaviorBuilder.prototype.Binding = function (property, bindingExpression, mode, updateTrigger) {
            var behavior = this.Add(new DomBehind.Data.DataBindingBehavior());
            behavior.Property = property;
            behavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, bindingExpression);
            behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
            behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;
            var dataBindingBuilder = new DomBehind.Data.DataBindingBehaviorBuilder(this.Owner);
            dataBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            dataBindingBuilder.CurrentElement = this.CurrentElement;
            // default PartialMark is PropertyName
            return dataBindingBuilder.PartialMark(behavior.PInfo.MemberPath);
        };
        // #endregion
        // #region BindingViewModel
        BindingBehaviorBuilder.prototype.BindingViewViewModel = function (view, viewModel) {
            var behavior = this.Add(new DomBehind.Data.ViewViewModelBindingBehavior());
            behavior.GetView = view;
            behavior.GetViewModel = viewModel;
            return this;
        };
        /**
         * linking the action of the view and the view model
         * @param event
         * @param action
         */
        BindingBehaviorBuilder.prototype.BindingAction = function (event, action, allowBubbling) {
            if (allowBubbling === void 0) { allowBubbling = false; }
            var behavior = this.Add(new DomBehind.Data.ActionBindingBehavior());
            behavior.Event = event.Create();
            behavior.Action = action;
            behavior.ActionParameterCount = action.length;
            behavior.AllowBubbling = allowBubbling;
            var actionBindingBuilder = new DomBehind.Data.ActionBindingBehaviorBuilder(this.Owner);
            actionBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            actionBindingBuilder.CurrentElement = this.CurrentElement;
            return actionBindingBuilder;
        };
        // #endregion
        // #region Add
        /**
         * Register the behavior
         * @param behavior
         */
        BindingBehaviorBuilder.prototype.Add = function (behavior) {
            this.CurrentBehavior = behavior;
            behavior.DataContext = this.Owner.DataContext;
            behavior.Element = this.CurrentElement;
            this.Owner.BindingBehaviors.add(behavior);
            return behavior;
        };
        return BindingBehaviorBuilder;
    }());
    DomBehind.BindingBehaviorBuilder = BindingBehaviorBuilder;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingBehaviorBuilder.js.map