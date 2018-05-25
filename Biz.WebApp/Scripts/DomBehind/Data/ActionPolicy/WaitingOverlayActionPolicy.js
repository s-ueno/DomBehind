var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        // #region http://gasparesganga.com/labs/jquery-loading-overlay/
        var DefaultWaitingOverlayOption = /** @class */ (function () {
            function DefaultWaitingOverlayOption() {
                this.Color = "rgba(255, 255, 255, 0.8)";
                this.Custom = "";
                this.Fade = true;
                this.Fontawesome = "";
                this.Image = null;
                this.ImagePosition = "center center";
                this.MaxSize = "100px";
                this.MinSize = "20px";
                this.ResizeInterval = 50;
                this.Size = "50%";
                this.ZIndex = 65535;
            }
            return DefaultWaitingOverlayOption;
        }());
        var WaitingOverlayActionPolicy = /** @class */ (function (_super) {
            __extends(WaitingOverlayActionPolicy, _super);
            function WaitingOverlayActionPolicy(option) {
                var _this = _super.call(this) || this;
                _this._priority = 100;
                _this._option = $.extend(true, {}, new DefaultWaitingOverlayOption(), option);
                ;
                return _this;
            }
            Object.defineProperty(WaitingOverlayActionPolicy.prototype, "Option", {
                get: function () {
                    return this._option;
                },
                enumerable: true,
                configurable: true
            });
            WaitingOverlayActionPolicy.prototype.Priority = function () {
                return this._priority;
            };
            WaitingOverlayActionPolicy.prototype.Begin = function () {
                var _this = this;
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
                if (this.Option.ZIndex !== undefined)
                    overlay.css("z-index", this.Option.ZIndex);
                if (this.Option.Image)
                    overlay.css({
                        "background-image": "url(" + this.Option.Image + ")",
                        "background-position": this.Option.ImagePosition,
                        "background-repeat": "no-repeat"
                    });
                if (this.Option.Fontawesome)
                    $("<div>", {
                        class: "loadingoverlay_fontawesome " + this.Option.Fontawesome
                    }).appendTo(overlay);
                if (this.Option.Custom)
                    $(this.Option.Custom).appendTo(overlay);
                if (this.IsWholePage()) {
                    overlay.css({
                        "position": "fixed",
                        "top": 0,
                        "left": 0,
                        "width": "100%",
                        "height": "100%"
                    });
                }
                else {
                    overlay.css("position", (container.css("position") == "fixed") ? "fixed" : "absolute");
                }
                this.Resize(overlay);
                if (this.Option.ResizeInterval > 0) {
                    var resizeIntervalId = setInterval(function () { return _this.Resize(overlay); }, this.Option.ResizeInterval);
                    container.data("LoadingOverlayResizeIntervalId", resizeIntervalId);
                }
                if (!this.Option.Fade) {
                    this.Option.Fade = [0, 0];
                }
                else if (this.Option.Fade === true) {
                    this.Option.Fade = [400, 200];
                }
                else if (typeof this.Option.Fade == "string" || typeof this.Option.Fade == "number") {
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
            };
            WaitingOverlayActionPolicy.prototype.Resize = function (overlay) {
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
                var size = "auto";
                if (this.Option.Size && this.Option.Size != "auto") {
                    size = Math.min(c.innerWidth(), c.innerHeight()) * parseFloat(this.Option.Size) / 100;
                    if (this.Option.MaxSize && size > parseInt(this.Option.MaxSize, 10))
                        size = parseInt(this.Option.MaxSize, 10) + "px";
                    if (this.Option.MinSize && size < parseInt(this.Option.MinSize, 10))
                        size = parseInt(this.Option.MinSize, 10) + "px";
                }
                overlay.css("background-size", size);
                overlay.children(".loadingoverlay_fontawesome").css("font-size", size);
            };
            WaitingOverlayActionPolicy.prototype.Done = function () {
            };
            WaitingOverlayActionPolicy.prototype.Fail = function (ex) {
            };
            WaitingOverlayActionPolicy.prototype.Always = function () {
                var container = this.Container();
                var resizeIntervalId = container.data("LoadingOverlayResizeIntervalId");
                if (resizeIntervalId)
                    clearInterval(resizeIntervalId);
                container.data("LoadingOverlay").fadeOut(container.data("LoadingOverlayFadeOutDuration"), function () {
                    $(this).remove();
                });
                container.removeData(["LoadingOverlay", "LoadingOverlayFadeOutDuration", "LoadingOverlayResizeIntervalId"]);
            };
            return WaitingOverlayActionPolicy;
        }(Data.ActionPolicy));
        Data.WaitingOverlayActionPolicy = WaitingOverlayActionPolicy;
        // #endregion
        var ElementWaitingOverlayActionPolicy = /** @class */ (function (_super) {
            __extends(ElementWaitingOverlayActionPolicy, _super);
            function ElementWaitingOverlayActionPolicy(element, option) {
                var _this = _super.call(this, option) || this;
                _this._container = element;
                _this.Option.Image = "/Content/images/preloader.gif";
                return _this;
            }
            ElementWaitingOverlayActionPolicy.prototype.Container = function () {
                return this._container;
            };
            ElementWaitingOverlayActionPolicy.prototype.IsWholePage = function () {
                return false;
            };
            return ElementWaitingOverlayActionPolicy;
        }(WaitingOverlayActionPolicy));
        Data.ElementWaitingOverlayActionPolicy = ElementWaitingOverlayActionPolicy;
        var WindowWaitingOverlayActionPolicy = /** @class */ (function (_super) {
            __extends(WindowWaitingOverlayActionPolicy, _super);
            function WindowWaitingOverlayActionPolicy(option) {
                return _super.call(this, $(document), option) || this;
            }
            WindowWaitingOverlayActionPolicy.prototype.IsWholePage = function () {
                return true;
            };
            return WindowWaitingOverlayActionPolicy;
        }(ElementWaitingOverlayActionPolicy));
        Data.WindowWaitingOverlayActionPolicy = WindowWaitingOverlayActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        Data.ActionBindingBehaviorBuilder.prototype.WaitingOverlay = function (policy) {
            var me = this;
            if (!policy) {
                policy = new Data.WindowWaitingOverlayActionPolicy();
            }
            me.ActionPolicy(policy);
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WaitingOverlayActionPolicy.js.map