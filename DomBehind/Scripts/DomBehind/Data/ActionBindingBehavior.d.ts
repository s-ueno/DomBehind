declare namespace DomBehind.Data {
    class ActionBindingBehavior extends BindingBehavior {
        Event: IEvent;
        protected EventHandle: (sender: any, e: any) => void;
        Action: Function;
        protected ActionHandle: (e: any) => void;
        ActionParameterCount: number;
        AllowBubbling: boolean;
        Ensure(): void;
        OnTrigger(e: any): void;
        ActionPolicyCollection: ActionPolicy[];
        protected get ActionInvoker(): ActionPolicy;
        private _actionInvoker;
        CreateActionInvoker(policies: ActionPolicy[]): ActionPolicy;
        protected Do(sender: any, e: any): void;
        Dispose(): void;
    }
}
