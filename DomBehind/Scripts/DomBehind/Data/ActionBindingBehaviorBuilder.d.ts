declare namespace DomBehind.Data {
    class ActionBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected get Behavior(): Data.ActionBindingBehavior;
        ActionPolicy(...policies: Data.ActionPolicy[]): ActionBindingBehaviorBuilder<T>;
    }
}
