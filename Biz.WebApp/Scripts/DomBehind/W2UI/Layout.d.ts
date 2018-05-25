declare namespace DomBehind {
    enum W2LayoutType {
        Top = 0,
        Left = 1,
        Right = 2,
        Main = 3,
        Preview = 4,
        Bottom = 5,
    }
    interface LayoutOption {
        size?: number;
        resizable?: boolean;
        style?: string;
        overflow?: string;
        content?: string;
    }
    class W2LayoutBindingBehavior extends Data.BindingBehavior {
        static IsVisibleProperty: Data.DependencyProperty;
        static GetIsVisible(el: JQuery): boolean;
        static SetIsVisible(el: JQuery, value: any): void;
        static UriProperty: Data.DependencyProperty;
        Types: {
            [key: number]: {
                Uri: any;
                Visibility: any;
                Container: JQuery;
                Option: LayoutOption;
            };
        };
        NewAdd: (value: Data.DataBindingBehavior) => Data.DataBindingBehavior;
        protected readonly DefaultOption: LayoutOption;
        Ensure(): void;
    }
    class W2LayoutBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        Top(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Top(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Left(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Left(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Right(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Right(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Main(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Main(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Preview(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Preview(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        protected AddLayout(type: W2LayoutType, uri: any, option?: LayoutOption, bindingVisible?: (x: T) => any): void;
    }
    interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにw2layout機構を組み込みます。
         * 実装例：
         *
         */
        BuildLayout(): W2LayoutBindingBehaviorBuilder<T>;
    }
}
