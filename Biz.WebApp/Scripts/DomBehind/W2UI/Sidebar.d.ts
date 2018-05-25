declare namespace DomBehind {
    interface ISidebarNode {
        Title: string;
        Icon?: string;
        Image?: string;
        Badge?: number;
        Style?: string;
        IsGroup?: boolean;
        AllowShowHideGroupNode?: boolean;
        AddtionalInfo?: any;
        Selected?: boolean;
        Expanded?: boolean;
        IsVisible?: boolean;
        Enabled?: boolean;
        OnClick?: Function;
        Id?: string;
        Children?: ISidebarNode[];
    }
    class W2SidebarBindingBehavior extends Data.BindingBehavior {
        Identity: string;
        ClickEvent: IEvent;
        AllowMenuExpand: boolean;
        static ItemsSource: Data.DependencyProperty;
        static BuildW2Node(value: ISidebarNode): any;
        static RecursiveNode(value: ISidebarNode[]): any;
        static FindModel(value: ISidebarNode[], id: string): any;
        Ensure(): void;
    }
    class W2SidebarBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
    }
    interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにw2sidebar機構を組み込みます。
         * 実装例：
         *
         */
        BuildSidebar(bindingNodes: (x: T) => any, selectedAction?: (x: T, args: any) => void, useCloseMenu?: boolean): W2SidebarBindingBehaviorBuilder<T>;
    }
}
