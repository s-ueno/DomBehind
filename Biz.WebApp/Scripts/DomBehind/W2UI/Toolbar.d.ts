declare namespace DomBehind {
    enum W2ToolbarItemType {
        Default = 0,
        Button = 1,
        RadioButton = 2,
        Checkbox = 3,
        Separator = 4,
        Space = 5,
        Menu = 6,
        CheckMenu = 7,
        RadioMenu = 8,
        DropHtml = 9,
        Html = 10,
    }
    interface IToolbarMenuItem {
        text: string;
        id?: any;
        checked?: boolean;
        onClick?: Function;
    }
    interface IToolbarOption {
        ClickAction?: (x: any, args: any) => void;
        EnabledBinding?: (x: any) => boolean;
        Icon?: string;
        IsChecked?: (x: any) => any;
        ItemsBinding?: (x: any) => IToolbarMenuItem[];
    }
    class W2ToolBarBindingBehavior extends Data.ActionBindingBehavior {
        Name: string;
        MenuList: List<W2UI.W2Item>;
        ToolBar: W2UI.W2Toolbar;
        Ensure(): void;
    }
    class W2ToolBarBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        AddMenuButton(title: string, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddMenuButton(bindingTitle: (x: T) => any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddMenuCheckbox(title: string, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddMenuCheckbox(bindingTitle: (x: T) => any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddDropCheckMenubox(title: string, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddDropCheckMenubox(binding: (x: T) => any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        protected AddMenu(title: string, type: W2ToolbarItemType, option?: IToolbarOption): any;
        protected AddMenuBinding(bindingTitle: (x: T) => any, type: W2ToolbarItemType, option?: IToolbarOption): void;
        private TypeToString(type);
    }
    interface BindingBehaviorBuilder<T> {
        /**
         * DivタグにW2Toolbar機構を組み込みます。
         * 実装例：
         * .W2ToolBar((x: XXXViewModel, args: any) => x.ToolbarAction(args))
         * @param action メニュークリック時のアクションをバインドします。引数のargsはクリック時のイベント引数です
         * @param name Name属性に指定します。未指定時には任意のUUIDが付与されます
         */
        BuildToolBar(action?: (x: T, args: any) => void, name?: string): W2ToolBarBindingBehaviorBuilder<T>;
    }
}
