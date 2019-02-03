namespace DomBehind.Data {
    export interface IExceptionHandling {
        Catch(ex: ActionPolicyExceptionEventArgs): void;
    }
}
