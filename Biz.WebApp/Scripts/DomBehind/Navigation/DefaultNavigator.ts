namespace DomBehind.Navigation {
    const OnModalCloseEventName: string = "ModalClose";
    const ReferenceCountKey: string = "ReferenceCountKey";

    export class DefaultNavigator implements INavigator {
        public Move(uri: string);
        public Move(uri: string, historyBack: boolean);
        public Move(uri: any, historyBack?: any) {
            uri = $.AbsoluteUri(uri);
            if (historyBack) {
                location.href = uri;
            } else {
                location.replace(uri);
            }
        }

        protected DefaultSetting: IModalHelperSettings = {
            FadeInDuration: 100,
            FadeOutDuration: 100,
            AllowCloseByClickOverlay: true,
            ShowCloseButton: true,

            StartupLocation: ModalStartupLocation.CenterScreen,
            StartupLocationTop: null,
            StartupLocationLeft: null
        };

        public ShowModal(arg: any, option?: IModalHelperSettings) {
            var setting: IModalHelperSettings = $.extend(true, this.DefaultSetting, option);;
            var overlay = $("<div>", {
                class: "modal-overlay",
            });

            overlay.css("z-index", $.GenerateZIndex());
            $("body").css("overflow", "hidden");

            overlay
                .appendTo("body")
                .fadeIn(setting.FadeInDuration, () => {
                    $.SetDomStorage(ReferenceCountKey,
                        $.GetDomStorage(ReferenceCountKey, 0) + 1);
                });


            var container: JQuery;
            if (typeof arg === "string") {
                var ex: Exception;
                var ajax = $.ajax({
                    url: arg,
                    async: false,
                    type: "GET",
                    cache: false,
                    error: (xhr, status, error) => {
                        ex = new AjaxException(xhr, status, error)
                    },
                });

                if (ex) throw ex;

                var html = ajax.responseText;
                container = $(html);
            } else {
                container = arg;
            }
            container.find(".close").click(overlay, e => {
                e.data.trigger(OnModalCloseEventName);
            });


            if (!setting.ShowCloseButton) {
                container.find(".close").hide();
            }

            if (setting.StartupLocation === ModalStartupLocation.Manual) {
                if (Object.IsNullOrUndefined(setting.StartupLocationTop) &&
                    Object.IsNullOrUndefined(setting.StartupLocationLeft)) {

                    var buffCount = $.GetDomStorage(ReferenceCountKey, 0) + 1;
                    container.find(".modal-dialog")
                        .css("top", `${-50 + (buffCount * 5)}%`)
                        .css("left", `${-25 + (buffCount * 5)}%`);
                } else {
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
                overlay.click(overlay, e => {
                    e.data.trigger(OnModalCloseEventName);
                });
                container.click(e => {
                    e.stopPropagation();
                });
            }

            overlay.off(OnModalCloseEventName);
            overlay.on(OnModalCloseEventName, { me: overlay, option: setting, target: container }, e => {

                var eventObj = $.Event('modalClosing');
                var modalBody = e.data.target.find(".modal-body");
                $(modalBody.children()[0]).trigger(eventObj);
                if (eventObj.result === false) return;

                var eventOption = e.data.option as IModalHelperSettings;
                var me = e.data.me;
                me.off(OnModalCloseEventName);
                me.fadeOut(eventOption.FadeOutDuration, () => {
                    me.remove();
                    $.SetDomStorage(ReferenceCountKey,
                        $.GetDomStorage(ReferenceCountKey, 0) - 1);
                    if ($.GetDomStorage(ReferenceCountKey, 0) === 0) {
                        $("body").css("overflow", "auto");
                    }
                });
            });

        }
    }
}
