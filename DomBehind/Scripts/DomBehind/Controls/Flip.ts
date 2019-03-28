namespace DomBehind {


    export enum FlipAnimation {
        Flip,
        Slide
    }

    export interface IFlipOption {
        front?: JQuery;
        back?: JQuery;

        fit?: boolean;
        animation?: FlipAnimation;
    }

    export class FlipBehavior extends Data.DataBindingBehavior {
        public Option: IFlipOption;

        public static readonly IdentityKey = "flip-identity";

        public static readonly IsFlipProperty =
            Data.DependencyProperty.RegisterAttached("isflip",
                el => {
                    // oneway
                },
                (el: JQuery, newValue: boolean) => {
                    let identity = el.attr(FlipBehavior.IdentityKey);
                    let behavior = window[identity] as FlipBehavior;
                    if (behavior) {
                        behavior.SetValue(el, newValue);
                    }
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWay,
            );

        private static readonly ValueKey = "flip-value";
        protected /* virtual */ SetValue(el: JQuery, newValue: boolean) {
            let oldValue = false;

            let oldValueString = el.attr(FlipBehavior.ValueKey);
            if (!String.IsNullOrWhiteSpace(oldValueString)) {
                oldValue = String.ToBoolean(oldValueString);
            } else {
                this.Option.back.addClass("invisible");
            }

            el.attr(FlipBehavior.ValueKey, `${newValue}`);

            if (newValue === oldValue) return;

            if (newValue) {
                this.Option.front.removeClass("flip-slide-in");
                this.Option.front.addClass("invisible");

                this.Option.back.removeClass("invisible");
                this.Option.back.addClass("flip-slide-in");
            } else {
                this.Option.front.removeClass("invisible");
                this.Option.front.addClass("flip-slide-in");

                this.Option.back.removeClass("flip-slide-in");
                this.Option.back.addClass("invisible");
            }
        }

        private static readonly css = `
@keyframes kf-flip-slide-in {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.flip-slide-in {
    animation: kf-flip-slide-in 1s linear 1
}

@keyframes kf-flip-slide-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50px);
  }
}
.flip-slide-out {
    animation: kf-flip-slide-out 1s linear 1
}
`;
        private static readonly cssIdentity = `flip-style`;

        public static Register(behavior: FlipBehavior) {
            // ID for pointing to the instant of the behavior
            let identity = `id-${NewUid()}`;
            behavior.Option.front.attr(FlipBehavior.IdentityKey, identity);
            window[identity] = behavior;

            let style = $(`#${FlipBehavior.cssIdentity}`);
            if (style.length === 0) {
                let head = document.head || document.getElementsByTagName('head')[0];
                let newStyle = document.createElement('style');
                head.appendChild(newStyle);
                newStyle.type = 'text/css';
                newStyle.appendChild(document.createTextNode(FlipBehavior.css));
                newStyle.setAttribute("id", FlipBehavior.cssIdentity);
            }
        }
    }

    export class FlipBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView) {
            super(owner);
        }

        public BindingFlip(exp: (owner: T) => boolean, option?: IFlipOption): BindingBehaviorBuilder<T> {
            let me: FlipBindingBehaviorBuilder<T> = this as FlipBindingBehaviorBuilder<any>;
            let behavior = me.CurrentBehavior;
            if (behavior instanceof FlipBehavior) {
                if (option) {
                    behavior.Option = $.extend(true, behavior.Option, option);
                }

                behavior.Property = FlipBehavior.IsFlipProperty;
                behavior.PInfo = new LamdaExpression(behavior.DataContext, exp);
                behavior.Marks = [behavior.PInfo.MemberPath];
            }
            return me;
        }

    }
    export interface BindingBehaviorBuilder<T> {
        FlipElement(frontSelector: string, backSelector: string): FlipBindingBehaviorBuilder<T>
    }

    BindingBehaviorBuilder.prototype.FlipElement = function (frontSelector: string, backSelector: string) {
        let me: BindingBehaviorBuilder<any> = this;

        let frontElement = me.Owner.Container.find(frontSelector);
        if (frontElement.length === 0) {
            frontElement = $(frontSelector);
        }

        let backElement = me.Owner.Container.find(backSelector);
        if (backElement.length === 0) {
            backElement = $(backSelector);
        }

        // さしあたって、フロントを代表要素と仮置きする
        me.CurrentElement = frontElement;
        let behavior = me.Add(new FlipBehavior());
        behavior.Option = {
            front: frontElement,
            back: backElement,
        };
        FlipBehavior.Register(behavior);

        let newMe = new FlipBindingBehaviorBuilder<any>(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = me.CurrentBehavior;
        return newMe;
    }

}