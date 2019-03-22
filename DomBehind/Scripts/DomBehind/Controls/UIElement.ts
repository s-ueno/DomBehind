namespace DomBehind {

    export class UIElement {

        /**
         * Gets or sets the val attribute of the element
         */
        public static ValueProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("val",
                x => x.val(), (x, y) => x.val(y), Data.UpdateSourceTrigger.LostForcus, Data.BindingMode.TwoWay);

        public static TextProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("text",
                x => x.text(), (x, y) => x.text(y), Data.UpdateSourceTrigger.LostForcus, Data.BindingMode.TwoWay);

        public static SrcProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("src",
                x => x.attr("src"), (x, y) => x.attr("src", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static HrefProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("href",
                x => x.attr("href"), (x, y) => x.attr("href", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);


        public static IsEnabledProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("enabled",
                null, (x, y) => {
                    let disabled = y === false ? true : false;
                    let oldDisabledValue = x.hasClass("disabled");
                    if (disabled === true) {
                        x.attr("disabled", "");
                        x.addClass("disabled");
                    } else {
                        x.removeAttr("disabled");
                        x.removeClass("disabled");
                    }

                    // set an disable style on nearby label
                    if (x.is('input[type=radio]') ||
                        x.is('input[type=checkbox]')) {
                        let parent = x.closest("label");
                        if (parent) {
                            if (disabled) {
                                parent.addClass("disablecheck");
                            } else {
                                parent.removeClass("disablecheck");
                            }
                        }
                    }

                    if (disabled === oldDisabledValue) return;

                    UIElement.RaiseEnabledChanged(x, !disabled);

                }, Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static IsVisibleProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("display",
                x => x.attr("display") === "none" ? false : true,
                (x, y) => {
                    let visible = y ? true : false;
                    if (visible) {
                        x.attr("display", "");
                        try {
                            x.show();
                        } catch (e) {
                        }
                    } else {
                        x.attr("display", "none");
                        try {
                            x.hide();
                        } catch (e) {
                        }
                    }
                }, Data.UpdateSourceTrigger.Explicit, Data.BindingMode.TwoWay);
        public static OpacityProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("opacity",
                x => {
                    // OneWay
                },
                (el, newValue) => {
                    el.css("opacity", newValue);
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWay);

        public static PlaceHolderProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("placeholder",
                null, (x, y) => x.attr("placeholder", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static IsCheckedProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("checked",
                x => (<HTMLInputElement>x.get(0)).checked,
                (x, y) => {
                    let el = (<HTMLInputElement>x.get(0));
                    el.checked = y;

                    if (el.hasAttribute("readonly")) {
                        el.onclick = e => false;
                    }
                },
                Data.UpdateSourceTrigger.LostForcus, Data.BindingMode.TwoWay);

        public static MaxLengthProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("maxlength",
                null, (x, y) => x.attr("maxlength", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static MaxNumericProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("maxlength",
                null, (x, y) => x.attr("max", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static MinNumericProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("maxlength",
                null, (x, y) => x.attr("min", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static BackgroundColorProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("background-color",
                null, (x, y) => x.css("background-color", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);
        public static ColorProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("color",
                null, (x, y) => x.css("color", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);




        public static BackgroundImageProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("background-image",
                null, (x, y) => x.css("background-image", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);

        public static ClassProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("",
                x => x.attr("class"), (x, y) => x.attr("class", y), Data.UpdateSourceTrigger.Explicit, Data.BindingMode.TwoWay);


        public static HtmlSource: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("htmlSource",
                null,
                (x, y) => {
                    let p: JQueryAjaxSettings = {
                        url: y,
                        async: true,
                        type: "GET",
                        cache: true,
                    };
                    $.ajax(p).done(dom => {
                        let body = $(dom).find("#_Layout");
                        x.append($(dom));
                    }).fail(error => {
                        throw new AjaxException(error);
                    });
                }, Data.UpdateSourceTrigger.Explicit, Data.BindingMode.OneWay);





        public static Click: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("click");

        public static Enter: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("enterKeydown", x => {
                if (x && x.Element) {
                    x.Element.keydown(e => {
                        if (e.which === 13) {
                            x.Element.trigger("enterKeydown");
                        }
                    });
                }
            });

        public static Keydown: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("keydown");

        public static FocusIn: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("focusin");

        public static LostFocus: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("focusout");

        public static Initialize: IEventBuilder
            = EventBuilder.RegisterAttached<any>("initialize");

        public static Activate: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("activate");

        public static ModalClosing: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("modalClosing");

        public static EnabledChanged: IEventBuilder
            = EventBuilder.RegisterAttached<JQueryEventObject>("enabledChanged");
        public static RaiseEnabledChanged(element: JQuery, isEnabled: boolean) {
            element.Raise(UIElement.EnabledChanged, (e: any) => {
                e.isEnabled = isEnabled;
            });
        }
    }



    export interface BindingBehaviorBuilder<T> {
        ClearValueWhenDisabled(option?: { clearAction?: (owner?: T, value?: any, element?: JQuery) => any });
    }

    BindingBehaviorBuilder.prototype.ClearValueWhenDisabled = function (option?: { clearAction?: (owner?: any, value?: any, element?: JQuery) => any }) {
        let me: BindingBehaviorBuilder<any> = this;
        let lastBinding = me.CurrentBehavior;
        if (lastBinding instanceof Data.DataBindingBehavior) {
            me.BindingActionWithOption(UIElement.EnabledChanged, (x, e) => {

                let d = $.Deferred();
                setTimeout((_e: { behavior, option, sourceEvent }) => {
                    let exception: any;
                    try {
                        let lastBinding = _e.behavior as Data.DataBindingBehavior;
                        if (!lastBinding) return;

                        let sender = $(_e.sourceEvent.target);
                        let ele = lastBinding.Element;
                        if (!sender.Equals(ele)) return;

                        if (ele.is('input')) {
                            let disabled = ele.hasClass("disabled");
                            if (!disabled) return;

                            if (_e.option && _e.option.clearAction) {
                                _e.option.clearAction(lastBinding.DataContext, lastBinding.ValueCore, ele);
                            } else {
                                if (ele.is('input[type=radio]') ||
                                    ele.is('input[type=checkbox]')) {

                                    let checkEle = (<HTMLInputElement>ele.get(0));
                                    if (checkEle.checked) {
                                        checkEle.checked = false;
                                    }
                                } else {
                                    ele.val(null);
                                }
                            }
                        } else {
                            let isEnabled = _e.sourceEvent.isEnabled;
                            if (isEnabled) return;

                            if (_e.option && _e.option.clearAction) {
                                _e.option.clearAction(lastBinding.DataContext, lastBinding.ValueCore, ele);
                            } else {
                                let nowValue = lastBinding.ValueCore;
                                if (nowValue instanceof Data.ListCollectionView) {
                                    nowValue.UnSelect();
                                    nowValue.Refresh();
                                }
                            }
                        }
                    } catch (e) {
                        exception = e;
                    } finally {
                        if (exception) {
                            d.reject(exception);
                        } else {
                            d.resolve();
                        }
                    }
                }, 0, { behavior: lastBinding, option: option, sourceEvent: e });
                return d.promise();
            }, { args: lastBinding });
        }
        return me;
    }

}

