namespace DomBehind.Core {
    export class ActionBindingBehaviorBuilder<T>  {

        // #region constructor

        constructor(rootBuilder: BindingBehaviorBuilder<T>) {
            this.Root = rootBuilder;
        }
        protected Root: BindingBehaviorBuilder<T>;

        protected get Behavior(): Data.ActionBindingBehavior {
            return <Data.ActionBindingBehavior>this.Root.CurrentBehavior;
        }

        // #endregion

        public ActionPolicy(...policies: Data.ActionPolicy[]): ActionBindingBehaviorBuilder<T> {
            $.each(policies, (i, x) => {
                this.Behavior.ActionPolicyCollection.push(x);
            });
            return this;
        }
    }
}