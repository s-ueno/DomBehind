namespace DomBehind.Core.Data {

    // #region http://gasparesganga.com/labs/jquery-loading-overlay/

    /******************************************************************************
    LoadingOverlay - A flexible loading overlay jQuery plugin
        Author          : Gaspare Sganga
        Version         : 1.5.1
        License         : MIT
        Documentation   : http://gasparesganga.com/labs/jquery-loading-overlay/
    *******************************************************************************/
    export interface IWaitingOverlayOption {
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
    class DefaultWaitingOverlayOption implements IWaitingOverlayOption {
        Color: string = "rgba(255, 255, 255, 0.8)";
        Custom: string = "";
        Fade: any = true;
        Fontawesome: string = "";
        Image: string = null;
        ImagePosition: string = "center center";
        MaxSize: string = "100px";
        MinSize: string = "20px";
        ResizeInterval: number = 50;
        Size: any = "50%";
        ZIndex: number = 65535;
    }
    export abstract class WaitingOverlayActionPolicy extends ActionPolicy {

        constructor(option?: IWaitingOverlayOption) {
            super();
            this._option = $.extend(true, {}, new DefaultWaitingOverlayOption(), option);;
        }
        public get Option(): IWaitingOverlayOption {
            return this._option;
        }
        private _option: IWaitingOverlayOption;

        public Priority(): number {
            return this._priority;
        }
        private _priority: number = 100;

        protected abstract Container(): JQuery;
        protected abstract IsWholePage(): boolean;

        public Begin(): void {
            var container = this.Container();
            var overlay = $("<div>", {
                class: "loadingoverlay",
                css: {
                    "background-color": this.Option.Color,
                    "display": "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                    "justify-content": "center"
                }
            });

            if (this.Option.ZIndex !== undefined) overlay.css("z-index", this.Option.ZIndex);
            if (this.Option.Image) overlay.css({
                "background-image": "url(" + this.Option.Image + ")",
                "background-position": this.Option.ImagePosition,
                "background-repeat": "no-repeat"
            });
            if (this.Option.Fontawesome) $("<div>", {
                class: "loadingoverlay_fontawesome " + this.Option.Fontawesome
            }).appendTo(overlay);
            if (this.Option.Custom) $(this.Option.Custom).appendTo(overlay);
            if (this.IsWholePage()) {
                overlay.css({
                    "position": "fixed",
                    "top": 0,
                    "left": 0,
                    "width": "100%",
                    "height": "100%"
                });
            } else {
                overlay.css("position", (container.css("position") == "fixed") ? "fixed" : "absolute");
            }

            this.Resize(overlay);

            if (this.Option.ResizeInterval > 0) {
                var resizeIntervalId = setInterval(() => this.Resize(overlay), this.Option.ResizeInterval);
                container.data("LoadingOverlayResizeIntervalId", resizeIntervalId);
            }
            if (!this.Option.Fade) {
                this.Option.Fade = [0, 0];
            } else if (this.Option.Fade === true) {
                this.Option.Fade = [400, 200];
            } else if (typeof this.Option.Fade == "string" || typeof this.Option.Fade == "number") {
                this.Option.Fade = [this.Option.Fade, this.Option.Fade];
            }
            container.data({
                "LoadingOverlay": overlay,
                "LoadingOverlayFadeOutDuration": this.Option.Fade[1]
            });
            overlay
                .hide()
                .appendTo("body")
                .fadeIn(this.Option.Fade[0]);
        }

        protected /* virtual */ Resize(overlay: JQuery) {
            var container = this.Container();
            var wholePage = this.IsWholePage();
            if (!wholePage) {
                var x = (container.css("position") == "fixed") ? container.position() : container.offset();
                overlay.css({
                    top: x.top + parseInt(container.css("border-top-width"), 10),
                    left: x.left + parseInt(container.css("border-left-width"), 10),
                    width: container.innerWidth(),
                    height: container.innerHeight()
                });
            }
            var c = wholePage ? $(window) : container;
            var size: any = "auto";
            if (this.Option.Size && this.Option.Size != "auto") {
                size = Math.min(c.innerWidth(), c.innerHeight()) * parseFloat(this.Option.Size) / 100;
                if (this.Option.MaxSize && size > parseInt(this.Option.MaxSize, 10)) size = parseInt(this.Option.MaxSize, 10) + "px";
                if (this.Option.MinSize && size < parseInt(this.Option.MinSize, 10)) size = parseInt(this.Option.MinSize, 10) + "px";
            }
            overlay.css("background-size", size);
            overlay.children(".loadingoverlay_fontawesome").css("font-size", size);
        }

        public Done(): void {

        }
        public Fail(ex: ActionPolicyExceptionInformation): void {

        }
        public Always(): void {
            var container = this.Container();
            var resizeIntervalId = container.data("LoadingOverlayResizeIntervalId");
            if (resizeIntervalId) clearInterval(resizeIntervalId);
            container.data("LoadingOverlay").fadeOut(container.data("LoadingOverlayFadeOutDuration"), function () {
                $(this).remove()
            });
            container.removeData(["LoadingOverlay", "LoadingOverlayFadeOutDuration", "LoadingOverlayResizeIntervalId"]);
        }
    }

    // #endregion

    export class ElementWaitingOverlayActionPolicy extends WaitingOverlayActionPolicy {
        constructor(element: JQuery, option?: IWaitingOverlayOption) {
            super(option);
            this._container = element;
            this.Option.Image = "/Content/images/preloader_2.gif";
        }
        protected Container(): JQuery {
            return this._container;
        }
        private _container: JQuery;
        protected IsWholePage(): boolean {
            return false;
        }
    }
    export class WindowWaitingOverlayActionPolicy extends ElementWaitingOverlayActionPolicy {
        constructor(option?: IWaitingOverlayOption) {
            super($(document), option);
        }
        protected IsWholePage(): boolean {
            return true;
        }
    }
}

namespace DomBehind.Core {
    export interface ActionBindingBehaviorBuilder<T> {
        WaitingOverlay(policy?: Data.WaitingOverlayActionPolicy): ActionBindingBehaviorBuilder<T>;
    }
    ActionBindingBehaviorBuilder.prototype.WaitingOverlay = function (policy?: Data.WaitingOverlayActionPolicy) {
        let me: ActionBindingBehaviorBuilder<any> = this;
        if (!policy) {
            policy = new Data.WindowWaitingOverlayActionPolicy();
        }
        me.ActionPolicy(policy);
        return me;
    };
}
