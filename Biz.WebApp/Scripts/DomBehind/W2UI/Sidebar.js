var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var __w2sidebarIdentity = "w2sidebar-id";
    var __w2sidebarDependencyPropertyAtt = "w2sidebar-dp";
    var W2SidebarBindingBehavior = /** @class */ (function (_super) {
        __extends(W2SidebarBindingBehavior, _super);
        function W2SidebarBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        W2SidebarBindingBehavior.BuildW2Node = function (value) {
            var id = value.Id;
            if (!id) {
                value.Id = id = "" + NewUid();
            }
            var node = {
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
        };
        W2SidebarBindingBehavior.RecursiveNode = function (value) {
            var w2Node = [];
            $.each(value, function (i, each) {
                w2Node.push(W2SidebarBindingBehavior.BuildW2Node(each));
            });
            return w2Node;
        };
        W2SidebarBindingBehavior.FindModel = function (value, id) {
            var result;
            $.each(value, function (i, each) {
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
        };
        W2SidebarBindingBehavior.prototype.Ensure = function () {
        };
        W2SidebarBindingBehavior.ItemsSource = DomBehind.Data.DependencyProperty.RegisterAttached(__w2sidebarDependencyPropertyAtt, function (el) {
            var key = el.attr(__w2sidebarDependencyPropertyAtt);
            return $.GetWindowDynamic(key);
        }, function (el, newValue) {
            var key = el.attr(__w2sidebarDependencyPropertyAtt);
            if (!key) {
                key = NewUid();
                el.attr(__w2sidebarDependencyPropertyAtt, key);
            }
            $.SetWindowDynamic(key, newValue);
            var id = el.attr("id");
            if (!id) {
                id = "id-" + NewUid();
                el.attr("id", id);
            }
            var behaviorId = el.attr(__w2sidebarIdentity);
            var behavior = $.GetWindowDynamic(behaviorId);
            if (newValue instanceof DomBehind.Data.ListCollectionView) {
                var viewStatus = newValue.ViewReflected;
                if (viewStatus === DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected) {
                    return;
                }
                // 反映済みのフラグを立てる
                newValue.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
                var option = {
                    name: id,
                    nodes: W2SidebarBindingBehavior.RecursiveNode(newValue.ToArray()),
                    onClick: function (e) {
                        var model = W2SidebarBindingBehavior.FindModel(newValue.ToArray(), e.target);
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
                var w2uiSb = el.w2sidebar(option);
                var current = newValue.Current;
                if (current) {
                    w2uiSb.select(current.Id);
                    behavior.ClickEvent.Raise(behavior, current);
                }
                // ListCollectionViewの変更通知を実装する
                newValue.PropertyChanged.AddHandler(function (sender, e) {
                    if (String.IsNullOrWhiteSpace(e.Name)) {
                        var obj = w2ui[id];
                        if (obj) {
                            obj.refresh();
                        }
                    }
                    else if (e.Name === "Current") {
                        var currentNode = newValue.Current;
                        w2ui[id].select(currentNode.Id);
                        behavior.ClickEvent.Raise(sender, currentNode);
                    }
                });
            }
        });
        return W2SidebarBindingBehavior;
    }(DomBehind.Data.BindingBehavior));
    DomBehind.W2SidebarBindingBehavior = W2SidebarBindingBehavior;
    var W2SidebarBindingBehaviorBuilder = /** @class */ (function (_super) {
        __extends(W2SidebarBindingBehaviorBuilder, _super);
        function W2SidebarBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        return W2SidebarBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.W2SidebarBindingBehaviorBuilder = W2SidebarBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildSidebar = function (bindingNodes, selectedAction, useCloseMenu) {
        var me = this;
        var behavior = me.Add(new W2SidebarBindingBehavior());
        // クリックイベント、ユニークキーの割り当て
        behavior.ClickEvent = new DomBehind.TypedEvent();
        behavior.ClickEvent.EventName = "NodeClick";
        behavior.Identity = NewUid();
        behavior.AllowMenuExpand = useCloseMenu;
        me.CurrentElement.attr(__w2sidebarIdentity, behavior.Identity);
        $.SetWindowDynamic(behavior.Identity, behavior);
        // nodeのリストをバインド
        var nodeBindingBehavior = me.Add(new DomBehind.Data.DataBindingBehavior());
        nodeBindingBehavior.Property = W2SidebarBindingBehavior.ItemsSource;
        nodeBindingBehavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, bindingNodes);
        // nodeのクリックイベントをバインド
        var actionBindingBehavior = this.Add(new DomBehind.Data.ActionBindingBehavior());
        actionBindingBehavior.Event = behavior.ClickEvent;
        actionBindingBehavior.Action = selectedAction;
        actionBindingBehavior.ActionParameterCount = selectedAction.length;
        actionBindingBehavior.AllowBubbling = false;
        // カレントを再設定
        this.CurrentBehavior = behavior;
        var newMe = new W2SidebarBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = behavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Sidebar.js.map