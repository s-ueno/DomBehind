namespace DomBehind.Data {


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
        public abstract Fail(ex: ActionPolicyExceptionEventArgs): void;
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
                        let ex = new ActionPolicyExceptionEventArgs(this, x);
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
                let ex = new ActionPolicyExceptionEventArgs(this, e);
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

