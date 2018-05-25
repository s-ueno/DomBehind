declare namespace DomBehind.Data {
    /**
     * linked the method of the View of the event and the ViewModel
     */
    class ActionBindingBehavior extends BindingBehavior {
        Event: IEvent;
        /**
         * Hold the handle in order to safely remove the Event
         */
        protected EventHandle: (sender, e) => void;
        Action: Function;
        /**
         * Hold the handle in order to safely remove the Action
         */
        protected ActionHandle: (e: any) => void;
        ActionParameterCount: number;
        AllowBubbling: boolean;
        Ensure(): void;
        OnTrigger(e: any): void;
        ActionPolicyCollection: ActionPolicy[];
        protected readonly ActionInvoker: ActionPolicy;
        private _actionInvoker;
        CreateActionInvoker(policies: ActionPolicy[]): ActionPolicy;
        /**
         * Run the linked action
         * @param sender
         * @param e
         */
        protected Do(sender: any, e: any): void;
        Dispose(): void;
    }
}
