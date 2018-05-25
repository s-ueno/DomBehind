declare namespace DomBehind.Data {
    /******************************************************************************
    LoadingOverlay - A flexible loading overlay jQuery plugin
        Author          : Gaspare Sganga
        Version         : 1.5.1
        License         : MIT
        Documentation   : http://gasparesganga.com/labs/jquery-loading-overlay/
    *******************************************************************************/
    interface IWaitingOverlayOption {
        Color: string;
        Custom: string;
        Fade: any;
        Fontawesome: string;
        Image: string;
        ImagePosition: string;
        MaxSize: string;
        MinSize: string;
        ResizeInterval: number;
        Size: any;
        ZIndex: number;
    }
    abstract class WaitingOverlayActionPolicy extends ActionPolicy {
        constructor(option?: IWaitingOverlayOption);
        readonly Option: IWaitingOverlayOption;
        private _option;
        Priority(): number;
        private _priority;
        protected abstract Container(): JQuery;
        protected abstract IsWholePage(): boolean;
        Begin(): void;
        protected Resize(overlay: JQuery): void;
        Done(): void;
        Fail(ex: ActionPolicyExceptionEventArgs): void;
        Always(): void;
    }
    class ElementWaitingOverlayActionPolicy extends WaitingOverlayActionPolicy {
        constructor(element: JQuery, option?: IWaitingOverlayOption);
        protected Container(): JQuery;
        private _container;
        protected IsWholePage(): boolean;
    }
    class WindowWaitingOverlayActionPolicy extends ElementWaitingOverlayActionPolicy {
        constructor(option?: IWaitingOverlayOption);
        protected IsWholePage(): boolean;
    }
}
declare namespace DomBehind.Data {
    interface ActionBindingBehaviorBuilder<T> {
        WaitingOverlay(policy?: Data.WaitingOverlayActionPolicy): ActionBindingBehaviorBuilder<T>;
    }
}
