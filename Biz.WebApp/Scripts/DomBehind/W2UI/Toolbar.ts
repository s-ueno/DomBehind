//namespace DomBehind {

//    // w2ui-1.4.3.js (9093行目)
//    interface W2ToolbarOption {
//        /** Name属性です。これは必須です。 */
//        name: string;

//        items: W2UI.W2Item[];
//    }

//    export enum W2ToolbarItemType {
//        // button
//        Default,

//        // button
//        Button,
//        // radio
//        RadioButton,
//        // check
//        Checkbox,
//        // break
//        Separator,
//        // spacer
//        Space,

//        // menu
//        Menu,
//        // menu-check
//        CheckMenu,
//        // menu-radio
//        RadioMenu,
//        // drop
//        DropHtml,
//        // html
//        Html,
//    }

//    export interface IToolbarMenuItem {
//        text: string;
//        id?: any;
//        // icon?: string;
//        checked?: boolean;

//        onClick?: Function;
//    }

//    export interface IToolbarOption {
//        ClickAction?: (x: any, args: any) => void;
//        EnabledBinding?: (x: any) => boolean;
//        /*
//         * Font Awesome
//         */
//        Icon?: string;

//        IsChecked?: (x: any) => any;

//        ItemsBinding?: (x: any) => IToolbarMenuItem[];
//    }


//    export class W2ToolBarBindingBehavior extends Data.ActionBindingBehavior {

//        public Name: string;
//        public MenuList: List<W2UI.W2Item> = new List<W2UI.W2Item>();
//        public ToolBar: W2UI.W2Toolbar;
//        public /* override */  Ensure(): void {

//            let option: W2ToolbarOption = {
//                name: this.Name,
//                items: this.MenuList.toArray(),
//            };

//            this.ToolBar = this.Element.w2toolbar(option);

//            super.Ensure();
//        }
//    }

//    export class W2ToolBarBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T>{
//        constructor(owner: BizView) {
//            super(owner);
//        }

//        public AddMenuButton(title: string, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
//        public AddMenuButton(bindingTitle: (x: T) => any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
//        public AddMenuButton(title: any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T> {
//            if (typeof title === "string") {
//                this.AddMenu(title, W2ToolbarItemType.Button, option);
//            } else {
//                this.AddMenuBinding(title, W2ToolbarItemType.Button, option);
//            }
//            return this;
//        }

//        public AddMenuCheckbox(title: string, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
//        public AddMenuCheckbox(bindingTitle: (x: T) => any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
//        public AddMenuCheckbox(title: any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T> {
//            if (typeof title === "string") {
//                this.AddMenu(title, W2ToolbarItemType.Checkbox, option);
//            } else {
//                this.AddMenuBinding(title, W2ToolbarItemType.Checkbox, option);
//            }
//            return this;
//        }

//        public AddDropCheckMenubox(title: string, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
//        public AddDropCheckMenubox(binding: (x: T) => any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
//        public AddDropCheckMenubox(title: any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T> {
//            if (typeof title === "string") {
//                this.AddMenu(title, W2ToolbarItemType.CheckMenu, option);
//            } else {
//                this.AddMenuBinding(title, W2ToolbarItemType.CheckMenu, option);
//            }
//            return this;
//        }


//        protected AddMenu(title: string, type: W2ToolbarItemType, option?: IToolbarOption) {
//            let w2Behavior = this.CurrentBehavior as W2ToolBarBindingBehavior;
//            let itemIdentity = NewUid();

//            let menuItem: any = {
//                /* メニューを識別するアイデンティティ */
//                id: itemIdentity,

//                /* 文字固定 */
//                text: title,

//                /* メニューのタイプ */
//                type: this.TypeToString(type),

//            };


//            // 活性制御をバインド指定している場合
//            if (option && option.EnabledBinding) {
//                let enabledP = Data.DependencyProperty.RegisterAttached(itemIdentity,
//                    el => {
//                        let td = $(`#tb_${w2Behavior.Name}_item_${itemIdentity}`);
//                        return !td.hasClass("disabled");
//                    },
//                    (el: JQuery, newValue: any) => {
//                        if (newValue) {
//                            w2Behavior.ToolBar.enable(itemIdentity);
//                        } else {
//                            w2Behavior.ToolBar.disable(itemIdentity);
//                        }
//                    }
//                );
//                let enabledBindingBehavior = this.Add(new Data.DataBindingBehavior());
//                enabledBindingBehavior.Property = enabledP;
//                enabledBindingBehavior.PInfo = new LamdaExpression(this.Owner.DataContext, option.EnabledBinding);
//            }

//            // 個別メニュークリックをバインド指定している場合
//            if (option && option.ClickAction) {
//                let clickEvent = new TypedEvent();
//                clickEvent.EventName = itemIdentity;

//                let actionBindingBehavior = this.Add(new Data.ActionBindingBehavior());
//                actionBindingBehavior.Event = clickEvent;
//                actionBindingBehavior.Action = option.ClickAction;
//                actionBindingBehavior.ActionParameterCount = option.ClickAction.length;
//                actionBindingBehavior.AllowBubbling = false;

//                menuItem.onClick = (e: any) => {
//                    clickEvent.Raise(this, e);
//                }
//            }

//            // font-awesome
//            if (option && option.Icon) {
//                menuItem.icon = option.Icon;
//            }


//            if (option && option.IsChecked) {
//                let defaultCheck: boolean = LamdaExpression.GetValueCore(this.Owner.DataContext, option.IsChecked)
//                menuItem.checked = defaultCheck;

//                let newP = Data.DependencyProperty.RegisterAttached(`checked-${itemIdentity}`,
//                    el => {
//                        return menuItem.checked;
//                    },
//                    (el: JQuery, newValue: any) => {
//                        let oldValue = el.attr(`checked-${itemIdentity}`);
//                        if (oldValue) {
//                            if (newValue === Boolean(oldValue)) {
//                                return;
//                            }
//                        }
//                        el.attr(`checked-${itemIdentity}`, newValue);
//                        menuItem.checked = newValue;

//                        let w2uiToolbar = w2Behavior.ToolBar;
//                        if (w2uiToolbar) {
//                            if (newValue) {
//                                w2uiToolbar.check(itemIdentity);
//                            }

//                            w2uiToolbar.refresh();
//                        }
//                    });
//                // データバインドする
//                let dataBindingBehavior = this.Add(new Data.DataBindingBehavior());
//                dataBindingBehavior.Property = newP;
//                dataBindingBehavior.PInfo = new LamdaExpression(this.Owner.DataContext, option.IsChecked);
//            }
//            if (option && option.ItemsBinding) {
//                let itemsP = Data.DependencyProperty.RegisterAttached("menuItems",
//                    el => {

//                    },
//                    (el: JQuery, newValue: any) => {
//                        if (menuItem.items == newValue) return;

//                        menuItem.items = newValue;
//                        let w2uiToolbar = w2Behavior.ToolBar;
//                        if (w2uiToolbar) {

//                            $.each(w2uiToolbar.items, (i, each) => {
//                                if (each.id === menuItem.id) {
//                                    each.items = newValue;
//                                    (each as any).selected = (newValue as Array<any>).Where(x => x.checked === true).Select(x => x.id);
//                                    (each as any).onRefresh = e => {

//                                        let item = e.item;
//                                        if (item) {
//                                            let ids: Array<any> = item.selected;
//                                            $.each(newValue, (i, node) => {
//                                                let isChecked: boolean = ids.Any(x => x === node.id);
//                                                node.onClick(isChecked);
//                                            });
//                                        }
//                                    };
//                                    return false;
//                                }
//                            });
//                            w2uiToolbar.refresh(itemIdentity);
//                        }
//                    }
//                );

//                let itemsBindingBehavior = this.Add(new Data.DataBindingBehavior());
//                itemsBindingBehavior.Property = itemsP;
//                itemsBindingBehavior.PInfo = new LamdaExpression(this.Owner.DataContext, option.ItemsBinding);
//            }


//            w2Behavior.MenuList.add(menuItem);
//            // 最後にカレントを元に戻す
//            this.CurrentBehavior = w2Behavior;


//            return menuItem;
//        }

//        protected AddMenuBinding(bindingTitle: (x: T) => any, type: W2ToolbarItemType, option?: IToolbarOption) {
//            let w2Behavior = this.CurrentBehavior as W2ToolBarBindingBehavior;
//            let itemIdentity = NewUid();

//            // タイトルのデフォルト値を設定して、追加処理へ
//            let defaultTitle: string = LamdaExpression.GetValueCore(this.Owner.DataContext, bindingTitle);
//            let menuItem = this.AddMenu(defaultTitle, type, option);

//            // 新しいDependencyPropertyを生成し、メニューを識別するIdentityを生やす
//            let newP = Data.DependencyProperty.RegisterAttached(`title-${itemIdentity}`,
//                el => {
//                    let cell = $(`#tb_${w2Behavior.Name}_item_${itemIdentity} .w2ui-tb-caption`);
//                    return cell.text();
//                },
//                (el: JQuery, newValue: any) => {
//                    let cell = $(`#tb_${w2Behavior.Name}_item_${itemIdentity} .w2ui-tb-caption`);
//                    cell.text(newValue);
//                }
//            );

//            // Captionをデータバインドする
//            let dataBindingBehavior = this.Add(new Data.DataBindingBehavior());
//            dataBindingBehavior.Property = newP;
//            dataBindingBehavior.PInfo = new LamdaExpression(this.Owner.DataContext, bindingTitle);

//        }

//        private TypeToString(type: W2ToolbarItemType): string {
//            let result: string = "button";
//            switch (type) {
//                case W2ToolbarItemType.Button:
//                    result = "button";
//                    break;
//                case W2ToolbarItemType.Checkbox:
//                    result = "check";
//                    break;
//                case W2ToolbarItemType.CheckMenu:
//                    result = "menu-check";
//                    break;
//            }
//            return result;
//        }
//    }

//    export interface BindingBehaviorBuilder<T> {
//        /**
//         * DivタグにW2Toolbar機構を組み込みます。
//         * 実装例：
//         * .W2ToolBar((x: XXXViewModel, args: any) => x.ToolbarAction(args))
//         * @param action メニュークリック時のアクションをバインドします。引数のargsはクリック時のイベント引数です
//         * @param name Name属性に指定します。未指定時には任意のUUIDが付与されます
//         */
//        BuildToolBar(action?: (x: T, args: any) => void, name?: string): W2ToolBarBindingBehaviorBuilder<T>;
//    }

//    BindingBehaviorBuilder.prototype.BuildToolBar = function (action: any) {
//        let func: Function = action as Function;
//        let me: BindingBehaviorBuilder<any> = this;
//        let behavior = me.Add(new W2ToolBarBindingBehavior());
//        behavior.AllowBubbling = false;
//        if (name) {
//            behavior.Name = name;
//        } else {
//            behavior.Name = NewUid();
//        }

//        if (action) {
//            let click = EventBuilder.RegisterAttached<JQueryEventObject>("onClick");
//            behavior.Event = click.Create();
//            behavior.Action = func;
//            behavior.ActionParameterCount = func.length;
//        }

//        let newMe = new W2ToolBarBindingBehaviorBuilder<any>(me.Owner);
//        newMe.CurrentElement = me.CurrentElement;
//        newMe.CurrentBehavior = me.CurrentBehavior;
//        return newMe;
//    };
//}