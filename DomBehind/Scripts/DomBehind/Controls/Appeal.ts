namespace DomBehind {


    export class Appeal {

        static _clearTimeout;
        public static IsEnabledProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("appealEnabled",
                null,
                (x, y) => {
                    let identity = x.attr(`appeal-identity`);
                    let timeoutHandle = x.attr(`clearTimeout`);
                    let appeal: Appeal = window[identity];
                    if (appeal) {
                        if (timeoutHandle) {
                            clearTimeout(Number(timeoutHandle));
                        }
                        let value = setTimeout(() => {
                            x.attr(`clearTimeout`, "");
                            appeal.Render(!!y)
                        }, 1 * 1000);
                        x.attr(`clearTimeout`, value);
                    }
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWay,
                behavior => {
                    Appeal.Register(behavior);
                });

        private static styleIdentity: string = "appeal-style";
        private static css = `
@keyframes rippleAppeal {
    100% {
        transform: scale(2);
        border-width: 10px;
        opacity: 0;
    }
}

@keyframes rippleOut {
    100% {
        opacity: 0;
    }
}

.ripple_appeal {
    animation: rippleAppeal 3s linear 3
}
`;
        public static Register(behavior: Data.DataBindingBehavior) {
            let style = $(`#${Appeal.styleIdentity}`);
            if (style.length === 0) {
                let head = document.head || document.getElementsByTagName('head')[0];
                // https://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
                let newStyle = document.createElement('style');
                head.appendChild(newStyle);
                newStyle.type = 'text/css';
                newStyle.appendChild(document.createTextNode(Appeal.css));
                newStyle.setAttribute("id", Appeal.styleIdentity);
            }

            let identity = behavior.Element.attr(`appeal-identity`);
            if (!identity) {
                identity = `appeal-${NewUid()}`;
                behavior.Element.attr(`appeal-identity`, identity);
            }

            let appeal: Appeal = window[identity];
            if (!appeal) {
                window[identity] = appeal = new Appeal();
                appeal.Behavior = behavior;
            }
        }
        protected Behavior: Data.DataBindingBehavior;

        protected Render(newValue: boolean) {

            let el = this.Behavior.Element;

            let identity = el.attr("ripple_appeal_identity");
            if (!identity) {
                identity = `ripple-${NewUid()}`;
                el.attr("ripple_appeal_identity", identity);
            }

            let pnl = $(`#${identity}`);
            if (!newValue)
                pnl.remove();

            let oldValueString = el.attr("ripple_appeal_value");
            let oldValue = false;
            if (!String.IsNullOrWhiteSpace(oldValueString)) {
                oldValue = Boolean(oldValue);
            }
            el.attr("ripple_appeal_value", `${newValue}`);

            if (newValue === oldValue) {
                return;
            }
            if (!newValue) {
                return;
            }

            let offset = el.offset();
            let css = {
                "height": `${el.height()}px`,
                "width": `${el.width()}px`,
                "top": `${offset.top}px`,
                "left": `${offset.left}px`,
                "position": "fixed",
                "background-color": "transparent",
                "border-color": "rgba(0, 90, 255, 0.4)",
                "pointer-events": "none"
            };

            let parent = el.closest("div");
            let clone = el.clone().empty();

            if (el.is("input") || el.is("select")) {

                clone = $("<div />");
                let h = el.height();
                let w = el.width();



                if (h < w) {
                    h = w;
                } else {
                    w = h;
                }

                if (h < 50) {
                    w = h = 50;
                }

                let top = offset.top;
                let topOffset =
                    Number(el.css("margin-top").replace(/[^-\d\.]/g, '')) +
                    Number(el.css("margin-bottom").replace(/[^-\d\.]/g, ''));

                let left = offset.left;
                let leftOffset =
                    Number(el.css("margin-left").replace(/[^-\d\.]/g, '')) +
                    Number(el.css("margin-right").replace(/[^-\d\.]/g, ''));

                // jquery ui select
                if (el.is('select') && top === 0 && left === 0) {
                    let nextSpan = el.next("span");
                    if (nextSpan.length !== 0) {
                        h = w = nextSpan.height();
                        if (h < 50) {
                            w = h = 50;
                        }

                        let buffOffset = nextSpan.offset();
                        top = buffOffset.top + (nextSpan.height() / 2);
                        left = buffOffset.left + (nextSpan.width() / 2);
                    }
                }

                css = $.extend(true, css, {
                    "height": `${h}px`,
                    "width": `${w}px`,
                    "top": `${top - (el.height() + topOffset)}px`,
                    "left": `${left + leftOffset}px`,
                    "border-radius": "50%",
                    "transform": "scale(0)",
                    "background": "rgba(0, 90, 255, 0.4)",
                });
            }

            clone.attr("id", identity)
            clone.css(css);
            clone.addClass("ripple_appeal");
            parent.append(clone);

            setTimeout(() => {
                clone.remove();
                el.attr("ripple_appeal_value", `false`);
            }, 9 * 1000);
        }

    }


}