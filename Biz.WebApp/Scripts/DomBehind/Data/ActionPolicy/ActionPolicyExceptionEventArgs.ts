namespace DomBehind.Data {
    export class ActionPolicyExceptionEventArgs extends EventArgs {
        constructor(sender: any, errorData: any) {
            super();

            this.Data = errorData;
            this.Handled = false;
            this.Sender = sender;
        }
        public Handled: boolean;
        public Data: any;
        public Sender: any;
    }
}
