namespace DomBehind.Core.Data {

    export class ActionPolicyExceptionInformation {
        constructor(sender: any, errorData: any) {
            this.Data = errorData;
            this.Handled = false;
            this.Sender = sender;
        }
        public Handled: boolean;
        public Data: any;
        public Sender: any;
    }

    /**
     * Apply any of the policy to the bindable action
     */
    export abstract class ActionPolicy {

        // #region must inherits

        // Waiting for version up
        // public abstract get Priolity(): Number;
        /**
         * Return the execution priority
         */
        public abstract Priority(): number;
        public abstract Begin(): void;
        public abstract Done(): void;
        public abstract Fail(ex: ActionPolicyExceptionInformation): void;
        public abstract Always(): void;

        // #endregion

        /**
         * 
         * @param func
         */
        public Do(func: Function): any {
            let result: any;
            try {
                this.Begin();

                if (Object.IsNullOrUndefined(this.NextPolicy)) {
                    result = func();
                } else {
                    result = this.NextPolicy.Do(func);
                }

                if (!Object.IsPromise(result)) {
                    this.Done();
                    this.Always();
                } else {

                    let exception: Exception;
                    let p: JQueryPromise<any> = result;
                    p.done(() => {
                        this.Done();
                        this.Always();
                    }).fail(x => {
                        let ex = new ActionPolicyExceptionInformation(this, x);
                        this.Fail(ex);
                        this.Always();
                        if (!ex.Handled) {
                            return ex;
                        }
                    });
                    return p;
                }
            }
            catch (e) {
                let ex = new ActionPolicyExceptionInformation(this, e);
                this.Fail(ex);
                this.Always();
                if (!ex.Handled)
                    throw e;
            }
        }
        public NextPolicy: ActionPolicy;
        public Behavior: ActionBindingBehavior;
    }
}

