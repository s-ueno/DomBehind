declare namespace DomBehind.Data {
    class ActionPolicyExceptionEventArgs extends EventArgs {
        constructor(sender: any, errorData: any);
        Handled: boolean;
        Data: any;
        Sender: any;
    }
}
