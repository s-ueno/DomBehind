declare namespace DomBehind.Data {
    interface IExceptionHandling {
        Catch(ex: ActionPolicyExceptionEventArgs): void;
    }
}
