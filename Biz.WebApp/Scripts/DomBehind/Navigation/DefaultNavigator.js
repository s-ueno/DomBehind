var DomBehind;
(function (DomBehind) {
    var Navigation;
    (function (Navigation) {
        var OnModalCloseEventName = "ModalClose";
        var ReferenceCountKey = "ReferenceCountKey";
        var DefaultNavigator = /** @class */ (function () {
            function DefaultNavigator() {
                this.DefaultSetting = {
                    FadeInDuration: 100,
                    FadeOutDuration: 100,
                    AllowCloseByClickOverlay: true,
                    ShowCloseButton: true,
                    StartupLocation: Navigation.ModalStartupLocation.CenterScreen,
                    StartupLocationTop: null,
                    StartupLocationLeft: null
                };
            }
            DefaultNavigator.prototype.Move = function (uri, historyBack) {
                uri = $.AbsoluteUri(uri);
                if (historyBack) {
                    location.href = uri;
                }
                else {
                    location.replace(uri);
                }
            };
            DefaultNavigator.prototype.ShowModal = function (arg, option) {
                var setting = $.extend(true, this.DefaultSetting, option);
                ;
                var overlay = $("<div>", {
                    class: "modal-overlay",
                });
                overlay.css("z-index", $.GenerateZIndex());
                $("body").css("overflow", "hidden");
                overlay
                    .appendTo("body")
                    .fadeIn(setting.FadeInDuration, function () {
                    $.SetDomStorage(ReferenceCountKey, $.GetDomStorage(ReferenceCountKey, 0) + 1);
                });
                var container;
                if (typeof arg === "string") {
                    var ex;
                    var ajax = $.ajax({
                        url: arg,
                        async: false,
                        type: "GET",
                        cache: false,
                        error: function (xhr, status, error) {
                            ex = new DomBehind.AjaxException(xhr, status, error);
                        },
                    });
                    if (ex)
                        throw ex;
                    var html = ajax.responseText;
                    container = $(html);
                }
                else {
                    container = arg;
                }
                container.find(".close").click(overlay, function (e) {
                    e.data.trigger(OnModalCloseEventName);
                });
                if (!setting.ShowCloseButton) {
                    container.find(".close").hide();
                }
                if (setting.StartupLocation === Navigation.ModalStartupLocation.Manual) {
                    if (Object.IsNullOrUndefined(setting.StartupLocationTop) &&
                        Object.IsNullOrUndefined(setting.StartupLocationLeft)) {
                        var buffCount = $.GetDomStorage(ReferenceCountKey, 0) + 1;
                        container.find(".modal-dialog")
                            .css("top", -50 + (buffCount * 5) + "%")
                            .css("left", -25 + (buffCount * 5) + "%");
                    }
                    else {
                        container.find(".modal-dialog")
                            .css("top", setting.StartupLocationTop)
                            .css("left", setting.StartupLocationLeft);
                    }
                }
                // domに追加
                overlay.append(container);
                container.find(".modal-dialog").draggable({
                    handle: ".modal-header",
                    cursor: "move",
                });
                if (setting.AllowCloseByClickOverlay) {
                    overlay.click(overlay, function (e) {
                        e.data.trigger(OnModalCloseEventName);
                    });
                    container.click(function (e) {
                        e.stopPropagation();
                    });
                }
                overlay.off(OnModalCloseEventName);
                overlay.on(OnModalCloseEventName, { me: overlay, option: setting, target: container }, function (e) {
                    var eventObj = $.Event('modalClosing');
                    var modalBody = e.data.target.find(".modal-body");
                    $(modalBody.children()[0]).trigger(eventObj);
                    if (eventObj.result === false)
                        return;
                    var eventOption = e.data.option;
                    var me = e.data.me;
                    me.off(OnModalCloseEventName);
                    me.fadeOut(eventOption.FadeOutDuration, function () {
                        me.remove();
                        $.SetDomStorage(ReferenceCountKey, $.GetDomStorage(ReferenceCountKey, 0) - 1);
                        if ($.GetDomStorage(ReferenceCountKey, 0) === 0) {
                            $("body").css("overflow", "auto");
                        }
                    });
                });
            };
            return DefaultNavigator;
        }());
        Navigation.DefaultNavigator = DefaultNavigator;
    })(Navigation = DomBehind.Navigation || (DomBehind.Navigation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DefaultNavigator.js.map