namespace DomBehind {


    export interface ISidebarNode {
        /* (必須項目) 表示項目名です */
        Title: string;
        /* FontAwesomeのcss指定を示します */
        Icon?: string;
        /* FontAwesomeで表現しきれないものをCSS経由でbackgroungにURI指定の画像を設定します */
        Image?: string
        /* ノードにバッジ件数を表示する場合に指定します */
        Badge?: number;
        /* nodeに個別スタイルを指定します */
        Style?: string;
        /* このノードがグループノードのヘッダーかどうかを示します */
        IsGroup?: boolean
        /* このノードがグループノードの場合、Show/hide可能かどうかを示します */
        AllowShowHideGroupNode?: boolean
        /* 任意の値を格納します */
        AddtionalInfo?: any

        /* 選択状態を示します */
        Selected?: boolean;
        /* 選択状態を示します */
        Expanded?: boolean;
        /* 表示・非表示状態を示します */
        IsVisible?: boolean
        /* 活性、非活性状態を示します */
        Enabled?: boolean
        /* ノードごとに個別のクリック時アクションが必要な場合に実装します */
        OnClick?: Function

        /* ユニークキー。未指定時は基盤が採番します */
        Id?: string;
        /* hierarcal items */
        Children?: ISidebarNode[];
    }

    const __w2sidebarIdentity: string = "w2sidebar-id";
    const __w2sidebarDependencyPropertyAtt: string = "w2sidebar-dp";
    export class W2SidebarBindingBehavior extends Data.BindingBehavior {

        public Identity: string;
        public ClickEvent: IEvent;
        public AllowMenuExpand: boolean;
        public static ItemsSource: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached(__w2sidebarDependencyPropertyAtt,
                el => {
                    let key = el.attr(__w2sidebarDependencyPropertyAtt);
                    return $.GetWindowDynamic(key);
                },
                (el: JQuery, newValue: any) => {
                    let key = el.attr(__w2sidebarDependencyPropertyAtt);
                    if (!key) {
                        key = NewUid();
                        el.attr(__w2sidebarDependencyPropertyAtt, key);
                    }
                    $.SetWindowDynamic(key, newValue);

                    let id = el.attr("id");
                    if (!id) {
                        id = `id-${NewUid()}`;
                        el.attr("id", id);
                    }

                    let behaviorId = el.attr(__w2sidebarIdentity);
                    let behavior: W2SidebarBindingBehavior = $.GetWindowDynamic(behaviorId);


                    if (newValue instanceof Data.ListCollectionView) {
                        let viewStatus: Data.ListCollectionView.ViewReflectedStatus
                            = newValue.ViewReflected;
                        if (viewStatus === Data.ListCollectionView.ViewReflectedStatus.Reflected) {
                            return;
                        }
                        // 反映済みのフラグを立てる
                        newValue.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.Reflected;


                        let option: any = {
                            name: id,
                            nodes: W2SidebarBindingBehavior.RecursiveNode(newValue.ToArray()),
                            onClick: function (e) {
                                let model: any = W2SidebarBindingBehavior.FindModel(newValue.ToArray(), e.target);
                                if (model) {
                                    model.__nativeEvent = e;
                                }
                                behavior.ClickEvent.Raise(this, model);
                            },
                        };

                        if (behavior.AllowMenuExpand) {
                            option.flatButton = true;
                            option.onFlat = function (e) {
                                // サイドメニュー最小化
                                behavior.Element.css('width', (e.goFlat ? '35px' : '200px'));
                            };
                        }

                        let w2uiSb = el.w2sidebar(option);
                        let current: ISidebarNode = newValue.Current;
                        if (current) {
                            w2uiSb.select(current.Id);
                            behavior.ClickEvent.Raise(behavior, current);
                        }

                        // ListCollectionViewの変更通知を実装する
                        newValue.PropertyChanged.AddHandler((sender, e) => {
                            if (String.IsNullOrWhiteSpace(e.Name)) {
                                let obj: W2UI.W2Sidebar = w2ui[id];
                                if (obj) {
                                    obj.refresh();
                                }
                            } else if (e.Name === "Current") {
                                let currentNode: ISidebarNode = newValue.Current;

                                w2ui[id].select(currentNode.Id);
                                behavior.ClickEvent.Raise(sender, currentNode);
                            }
                        });

                    }
                }
            );

        static BuildW2Node(value: ISidebarNode) {
            let id = value.Id;
            if (!id) {
                value.Id = id = `${NewUid()}`;
            }

            let node: any = {
                id: id,
                text: value.Title,
            };

            if (value.Image) {
                node.img = value.Image;
            }
            if (value.Icon) {
                node.icon = value.Icon;
            }
            if (value.Badge) {
                node.count;
            }
            if (value.Style) {
                node.style;
            }
            if (value.IsGroup) {
                node.group = value.IsGroup;
                node.expanded = true;
                node.collapsible = false;

                if (value.AllowShowHideGroupNode) {
                    node.groupShowHide = value.AllowShowHideGroupNode;
                }
            }

            if (value.Children) {
                node.nodes = W2SidebarBindingBehavior.RecursiveNode(value.Children);
            }
            return node;
        }
        static RecursiveNode(value: ISidebarNode[]) {
            let w2Node: any = [];
            $.each(value, (i, each) => {
                w2Node.push(W2SidebarBindingBehavior.BuildW2Node(each))
            });
            return w2Node;
        }

        static FindModel(value: ISidebarNode[], id: string) {
            let result: any;
            $.each(value, (i, each) => {
                if (each.Id === id) {
                    result = each;
                    return false;
                }
                if (each.Children) {
                    result = W2SidebarBindingBehavior.FindModel(each.Children, id);
                    if (result) {
                        return false;
                    }
                }
            });
            return result;
        }


        public Ensure(): void {

        }

    }

    export class W2SidebarBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T>{
        constructor(owner: BizView) {
            super(owner);
        }
    }


    export interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにw2sidebar機構を組み込みます。
         * 実装例：
         * 
         */
        BuildSidebar(bindingNodes: (x: T) => any, selectedAction?: (x: T, args: any) => void, useCloseMenu?: boolean): W2SidebarBindingBehaviorBuilder<T>;
    }

    BindingBehaviorBuilder.prototype.BuildSidebar = function (bindingNodes: (x: any) => any, selectedAction?: (x: any, args: any) => void, useCloseMenu?: boolean) {
        let me: BindingBehaviorBuilder<any> = this;
        let behavior = me.Add(new W2SidebarBindingBehavior());
        // クリックイベント、ユニークキーの割り当て
        behavior.ClickEvent = new TypedEvent();
        behavior.ClickEvent.EventName = "NodeClick";
        behavior.Identity = NewUid();
        behavior.AllowMenuExpand = useCloseMenu;

        me.CurrentElement.attr(__w2sidebarIdentity, behavior.Identity);
        $.SetWindowDynamic(behavior.Identity, behavior);

        // nodeのリストをバインド
        let nodeBindingBehavior = me.Add(new Data.DataBindingBehavior());
        nodeBindingBehavior.Property = W2SidebarBindingBehavior.ItemsSource;
        nodeBindingBehavior.PInfo = new LamdaExpression(me.Owner.DataContext, bindingNodes);

        // nodeのクリックイベントをバインド
        let actionBindingBehavior = this.Add(new Data.ActionBindingBehavior());
        actionBindingBehavior.Event = behavior.ClickEvent;
        actionBindingBehavior.Action = selectedAction;
        actionBindingBehavior.ActionParameterCount = selectedAction.length;
        actionBindingBehavior.AllowBubbling = false;

        // カレントを再設定
        this.CurrentBehavior = behavior;

        let newMe = new W2SidebarBindingBehaviorBuilder<any>(me.Owner)
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = behavior;
        return newMe;
    }

}
