namespace DomBehind.Core {
    export class ActionBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T>  {

        // #region constructor

        constructor(owner: BizView) {
            super(owner);
        }

        protected get Behavior(): Data.ActionBindingBehavior {
            return <Data.ActionBindingBehavior>this.CurrentBehavior;
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