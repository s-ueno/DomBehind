declare namespace DomBehind.Data {
    class ActionBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected readonly Behavior: Data.ActionBindingBehavior;
        ActionPolicy(...policies: Data.ActionPolicy[]): ActionBindingBehaviorBuilder<T>;
    }
}
