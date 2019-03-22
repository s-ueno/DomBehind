namespace DomBehind.Data {
    /**
     * linked the method of the View of the event and the ViewModel
     */
    export class ActionBindingBehavior
        extends BindingBehavior {

        // #region Event property

        public Event: IEvent;
        /**
         * Hold the handle in order to safely remove the Event
         */
        protected EventHandle: (sender, e) => void;

        // #endregion

        // #region Action property

        public Action: Function;
        /**
         * Hold the handle in order to safely remove the Action
         */
        protected ActionHandle: (e: any) => void;

        // #endregion

        public ActionParameterCount: number;
        public AllowBubbling: boolean;

        // #region Ensure

        public Ensure(): void {
            this.ActionHandle = x => this.OnTrigger(x);

            if (this.Event && this.Event) {
                this.Event.Ensure(this);
            }

            if (this.Event && !String.IsNullOrWhiteSpace(this.Event.EventName)) {
                this.Element.on(this.Event.EventName, e => this.ActionHandle(e));
            }

            this.EventHandle = (sender, data) => this.Do(sender, data);

            if (this.Event) {
                this.Event.AddHandler(this.EventHandle);
            }

            if (this.Element.is("a") && !this.Element.attr("href")) {
                this.Element.attr("href", "javascript:void(0);");
            }
        }
        public OnTrigger(e: any): void {
            this.Event.Raise(this, e);
        }

        // #endregion

        // #region ActionPolicy


        public ActionPolicyCollection: ActionPolicy[] = [];
        protected get ActionInvoker(): ActionPolicy {
            if (!this._actionInvoker) {
                var defaultPolicies = Application.Current.DefaultActionPolicy;
                var list = this.ActionPolicyCollection.concat(defaultPolicies);
                this._actionInvoker = this.CreateActionInvoker(list);
            }
            return this._actionInvoker;
        }
        private _actionInvoker: ActionPolicy;

        public CreateActionInvoker(policies: ActionPolicy[]): ActionPolicy {
            var list: ActionPolicy[] = [];
            if (policies) {
                list = list.concat(policies);
            }
            list = list.OrderBy(x => x.Priority());
            $.each(list, (i, value) => {
                var nextIndex = i + 1;
                if (nextIndex < list.length) {
                    value.NextPolicy = list[nextIndex];
                }
                value.Behavior = this;
            });
            return list[0];
        }

        // #endregion

        // #region Do

        /**
         * Run the linked action
         * @param sender
         * @param e
         */
        protected Do(sender: any, e: any): void {
            if (!this.AllowBubbling) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
            }
            this.ActionInvoker.Do(() => {
                let result: any;
                if (this.Action) {
                    if (this.ActionParameterCount === 1) {
                        result = this.Action(this.DataContext);
                    }
                    else if (this.ActionParameterCount === 2) {
                        e.AdditionalInfo = this.AdditionalInfo;
                        e.Args = this.AdditionalInfo["Args"];
                        result = this.Action(this.DataContext, e);
                    }
                    else {
                        result = this.Action(this.DataContext);
                    }
                }
                return result;
            });
        }

        // #endregion

        // #region Dispose

        public Dispose(): void {
            if (!this._disposed) {

                if (!Object.IsNullOrUndefined(this.Element)) {
                    if (!Object.IsNullOrUndefined(this.Event)) {
                        if (!String.IsNullOrWhiteSpace(this.Event.EventName)) {
                            this.Element.off(this.Event.EventName, this.ActionHandle);
                        }
                        this.ActionHandle = null;
                        this.Action = null;

                        this.Event.RemoveHandler(this.EventHandle);
                        this.EventHandle = null;
                        this.Event = null;
                    }
                    this.Element = null;
                }

                this.ActionParameterCount = null;
                super.Dispose();
            }
        }

        // #endregion
    }
}
