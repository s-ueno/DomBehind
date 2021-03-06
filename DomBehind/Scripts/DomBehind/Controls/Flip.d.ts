declare namespace DomBehind {
    enum FlipAnimation {
        HorizontalFlip = 0,
        Slide = 1
    }
    interface IFlipOption {
        container?: JQuery;
        front?: JQuery;
        back?: JQuery;
        fit?: boolean;
        animation?: FlipAnimation;
    }
    class FlipBehavior extends Data.DataBindingBehavior {
        Option: IFlipOption;
        static readonly IdentityKey = "flip-identity";
        static readonly IsFlipProperty: Data.DependencyProperty;
        private static readonly ValueKey;
        protected SetValue(el: JQuery, newValue: boolean): void;
        protected HorizontalFlip(isBack: boolean): void;
        protected Slide(isBack: boolean): void;
        private static readonly css;
        private static readonly cssIdentity;
        static Register(behavior: FlipBehavior): void;
    }
    class FlipBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        BindingFlip(exp: (owner: T) => boolean, option?: IFlipOption): BindingBehaviorBuilder<T>;
    }
    interface BindingBehaviorBuilder<T> {
        FlipElement(containerSelector: string, frontSelector: string, backSelector: string): FlipBindingBehaviorBuilder<T>;
    }
}
