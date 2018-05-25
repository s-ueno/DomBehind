declare namespace DomBehind.Data {
    /**
     * Apply any of the policy to the bindable action
     */
    abstract class ActionPolicy {
        /**
         * Return the execution priority
         */
        abstract Priority(): number;
        abstract Begin(): void;
        abstract Done(): void;
        abstract Fail(ex: ActionPolicyExceptionEventArgs): void;
        abstract Always(): void;
        /**
         *
         * @param func
         */
        Do(func: Function): any;
        NextPolicy: ActionPolicy;
        Behavior: ActionBindingBehavior;
    }
}
