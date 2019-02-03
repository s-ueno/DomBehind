declare namespace DomBehind.Data {
    abstract class ActionPolicy {
        abstract Priority(): number;
        abstract Begin(): void;
        abstract Done(): void;
        abstract Fail(ex: ActionPolicyExceptionEventArgs): void;
        abstract Always(): void;
        Do(func: Function): any;
        NextPolicy: ActionPolicy;
        Behavior: ActionBindingBehavior;
    }
}
