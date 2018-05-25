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
    var W2ToolbarItemType;
    (function (W2ToolbarItemType) {
        // button
        W2ToolbarItemType[W2ToolbarItemType["Default"] = 0] = "Default";
        // button
        W2ToolbarItemType[W2ToolbarItemType["Button"] = 1] = "Button";
        // radio
        W2ToolbarItemType[W2ToolbarItemType["RadioButton"] = 2] = "RadioButton";
        // check
        W2ToolbarItemType[W2ToolbarItemType["Checkbox"] = 3] = "Checkbox";
        // break
        W2ToolbarItemType[W2ToolbarItemType["Separator"] = 4] = "Separator";
        // spacer
        W2ToolbarItemType[W2ToolbarItemType["Space"] = 5] = "Space";
        // menu
        W2ToolbarItemType[W2ToolbarItemType["Menu"] = 6] = "Menu";
        // menu-check
        W2ToolbarItemType[W2ToolbarItemType["CheckMenu"] = 7] = "CheckMenu";
        // menu-radio
        W2ToolbarItemType[W2ToolbarItemType["RadioMenu"] = 8] = "RadioMenu";
        // drop
        W2ToolbarItemType[W2ToolbarItemType["DropHtml"] = 9] = "DropHtml";
        // html
        W2ToolbarItemType[W2ToolbarItemType["Html"] = 10] = "Html";
    })(W2ToolbarItemType = DomBehind.W2ToolbarItemType || (DomBehind.W2ToolbarItemType = {}));
    var W2ToolBarBindingBehavior = /** @class */ (function (_super) {
        __extends(W2ToolBarBindingBehavior, _super);
        function W2ToolBarBindingBehavior() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.MenuList = new DomBehind.List();
            return _this;
        }
        W2ToolBarBindingBehavior.prototype.Ensure = function () {
            var option = {
                name: this.Name,
                items: this.MenuList.toArray(),
            };
            this.ToolBar = this.Element.w2toolbar(option);
            _super.prototype.Ensure.call(this);
        };
        return W2ToolBarBindingBehavior;
    }(DomBehind.Data.ActionBindingBehavior));
    DomBehind.W2ToolBarBindingBehavior = W2ToolBarBindingBehavior;
    var W2ToolBarBindingBehaviorBuilder = /** @class */ (function (_super) {
        __extends(W2ToolBarBindingBehaviorBuilder, _super);
        function W2ToolBarBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        W2ToolBarBindingBehaviorBuilder.prototype.AddMenuButton = function (title, option) {
            if (typeof title === "string") {
                this.AddMenu(title, W2ToolbarItemType.Button, option);
            }
            else {
                this.AddMenuBinding(title, W2ToolbarItemType.Button, option);
            }
            return this;
        };
        W2ToolBarBindingBehaviorBuilder.prototype.AddMenuCheckbox = function (title, option) {
            if (typeof title === "string") {
                this.AddMenu(title, W2ToolbarItemType.Checkbox, option);
            }
            else {
                this.AddMenuBinding(title, W2ToolbarItemType.Checkbox, option);
            }
            return this;
        };
        W2ToolBarBindingBehaviorBuilder.prototype.AddDropCheckMenubox = function (title, option) {
            if (typeof title === "string") {
                this.AddMenu(title, W2ToolbarItemType.CheckMenu, option);
            }
            else {
                this.AddMenuBinding(title, W2ToolbarItemType.CheckMenu, option);
            }
            return this;
        };
        W2ToolBarBindingBehaviorBuilder.prototype.AddMenu = function (title, type, option) {
            var _this = this;
            var w2Behavior = this.CurrentBehavior;
            var itemIdentity = NewUid();
            var menuItem = {
                /* メニューを識別するアイデンティティ */
                id: itemIdentity,
                /* 文字固定 */
                text: title,
                /* メニューのタイプ */
                type: this.TypeToString(type),
            };
            // 活性制御をバインド指定している場合
            if (option && option.EnabledBinding) {
                var enabledP = DomBehind.Data.DependencyProperty.RegisterAttached(itemIdentity, function (el) {
                    var td = $("#tb_" + w2Behavior.Name + "_item_" + itemIdentity);
                    return !td.hasClass("disabled");
                }, function (el, newValue) {
                    if (newValue) {
                        w2Behavior.ToolBar.enable(itemIdentity);
                    }
                    else {
                        w2Behavior.ToolBar.disable(itemIdentity);
                    }
                });
                var enabledBindingBehavior = this.Add(new DomBehind.Data.DataBindingBehavior());
                enabledBindingBehavior.Property = enabledP;
                enabledBindingBehavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, option.EnabledBinding);
            }
            // 個別メニュークリックをバインド指定している場合
            if (option && option.ClickAction) {
                var clickEvent_1 = new DomBehind.TypedEvent();
                clickEvent_1.EventName = itemIdentity;
                var actionBindingBehavior = this.Add(new DomBehind.Data.ActionBindingBehavior());
                actionBindingBehavior.Event = clickEvent_1;
                actionBindingBehavior.Action = option.ClickAction;
                actionBindingBehavior.ActionParameterCount = option.ClickAction.length;
                actionBindingBehavior.AllowBubbling = false;
                menuItem.onClick = function (e) {
                    clickEvent_1.Raise(_this, e);
                };
            }
            // font-awesome
            if (option && option.Icon) {
                menuItem.icon = option.Icon;
            }
            if (option && option.IsChecked) {
                var defaultCheck = DomBehind.LamdaExpression.GetValueCore(this.Owner.DataContext, option.IsChecked);
                menuItem.checked = defaultCheck;
                var newP = DomBehind.Data.DependencyProperty.RegisterAttached("checked-" + itemIdentity, function (el) {
                    return menuItem.checked;
                }, function (el, newValue) {
                    var oldValue = el.attr("checked-" + itemIdentity);
                    if (oldValue) {
                        if (newValue === Boolean(oldValue)) {
                            return;
                        }
                    }
                    el.attr("checked-" + itemIdentity, newValue);
                    menuItem.checked = newValue;
                    var w2uiToolbar = w2Behavior.ToolBar;
                    if (w2uiToolbar) {
                        if (newValue) {
                            w2uiToolbar.check(itemIdentity);
                        }
                        w2uiToolbar.refresh();
                    }
                });
                // データバインドする
                var dataBindingBehavior = this.Add(new DomBehind.Data.DataBindingBehavior());
                dataBindingBehavior.Property = newP;
                dataBindingBehavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, option.IsChecked);
            }
            if (option && option.ItemsBinding) {
                var itemsP = DomBehind.Data.DependencyProperty.RegisterAttached("menuItems", function (el) {
                }, function (el, newValue) {
                    if (menuItem.items == newValue)
                        return;
                    menuItem.items = newValue;
                    var w2uiToolbar = w2Behavior.ToolBar;
                    if (w2uiToolbar) {
                        $.each(w2uiToolbar.items, function (i, each) {
                            if (each.id === menuItem.id) {
                                each.items = newValue;
                                each.selected = newValue.Where(function (x) { return x.checked === true; }).Select(function (x) { return x.id; });
                                each.onRefresh = function (e) {
                                    var item = e.item;
                                    if (item) {
                                        var ids_1 = item.selected;
                                        $.each(newValue, function (i, node) {
                                            var isChecked = ids_1.Any(function (x) { return x === node.id; });
                                            node.onClick(isChecked);
                                        });
                                    }
                                };
                                return false;
                            }
                        });
                        w2uiToolbar.refresh(itemIdentity);
                    }
                });
                var itemsBindingBehavior = this.Add(new DomBehind.Data.DataBindingBehavior());
                itemsBindingBehavior.Property = itemsP;
                itemsBindingBehavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, option.ItemsBinding);
            }
            w2Behavior.MenuList.add(menuItem);
            // 最後にカレントを元に戻す
            this.CurrentBehavior = w2Behavior;
            return menuItem;
        };
        W2ToolBarBindingBehaviorBuilder.prototype.AddMenuBinding = function (bindingTitle, type, option) {
            var w2Behavior = this.CurrentBehavior;
            var itemIdentity = NewUid();
            // タイトルのデフォルト値を設定して、追加処理へ
            var defaultTitle = DomBehind.LamdaExpression.GetValueCore(this.Owner.DataContext, bindingTitle);
            var menuItem = this.AddMenu(defaultTitle, type, option);
            // 新しいDependencyPropertyを生成し、メニューを識別するIdentityを生やす
            var newP = DomBehind.Data.DependencyProperty.RegisterAttached("title-" + itemIdentity, function (el) {
                var cell = $("#tb_" + w2Behavior.Name + "_item_" + itemIdentity + " .w2ui-tb-caption");
                return cell.text();
            }, function (el, newValue) {
                var cell = $("#tb_" + w2Behavior.Name + "_item_" + itemIdentity + " .w2ui-tb-caption");
                cell.text(newValue);
            });
            // Captionをデータバインドする
            var dataBindingBehavior = this.Add(new DomBehind.Data.DataBindingBehavior());
            dataBindingBehavior.Property = newP;
            dataBindingBehavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, bindingTitle);
        };
        W2ToolBarBindingBehaviorBuilder.prototype.TypeToString = function (type) {
            var result = "button";
            switch (type) {
                case W2ToolbarItemType.Button:
                    result = "button";
                    break;
                case W2ToolbarItemType.Checkbox:
                    result = "check";
                    break;
                case W2ToolbarItemType.CheckMenu:
                    result = "menu-check";
                    break;
            }
            return result;
        };
        return W2ToolBarBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.W2ToolBarBindingBehaviorBuilder = W2ToolBarBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildToolBar = function (action) {
        var func = action;
        var me = this;
        var behavior = me.Add(new W2ToolBarBindingBehavior());
        behavior.AllowBubbling = false;
        if (name) {
            behavior.Name = name;
        }
        else {
            behavior.Name = NewUid();
        }
        if (action) {
            var click = DomBehind.EventBuilder.RegisterAttached("onClick");
            behavior.Event = click.Create();
            behavior.Action = func;
            behavior.ActionParameterCount = func.length;
        }
        var newMe = new W2ToolBarBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = me.CurrentBehavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Toolbar.js.map