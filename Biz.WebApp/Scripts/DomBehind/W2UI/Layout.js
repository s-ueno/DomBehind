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
    var W2LayoutType;
    (function (W2LayoutType) {
        /* top */
        W2LayoutType[W2LayoutType["Top"] = 0] = "Top";
        /* left */
        W2LayoutType[W2LayoutType["Left"] = 1] = "Left";
        /* right */
        W2LayoutType[W2LayoutType["Right"] = 2] = "Right";
        /* main */
        W2LayoutType[W2LayoutType["Main"] = 3] = "Main";
        /* preview */
        W2LayoutType[W2LayoutType["Preview"] = 4] = "Preview";
        /* bottom */
        W2LayoutType[W2LayoutType["Bottom"] = 5] = "Bottom";
    })(W2LayoutType = DomBehind.W2LayoutType || (DomBehind.W2LayoutType = {}));
    var W2LayoutBindingBehavior = /** @class */ (function (_super) {
        __extends(W2LayoutBindingBehavior, _super);
        function W2LayoutBindingBehavior() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Types = {};
            return _this;
        }
        W2LayoutBindingBehavior.GetIsVisible = function (el) {
            var id = el.attr("parent-id");
            var w2uilayout = w2ui[id];
            if (w2uilayout) {
                var typeString = el.attr("w2layout-type");
                var panel = w2uilayout.get(typeString);
                if (!panel)
                    return null;
                return !panel.hidden;
            }
            return null;
        };
        W2LayoutBindingBehavior.SetIsVisible = function (el, value) {
            var id = el.attr("parent-id");
            var typeString = el.attr("w2layout-type");
            var w2uilayout = w2ui[id];
            if (w2uilayout) {
                var panel = w2uilayout.get(typeString);
                if (!panel)
                    return;
                var hidden = panel.hidden;
                if (value && hidden) {
                    w2uilayout.show(typeString, false);
                }
                else if (!value && !hidden) {
                    w2uilayout.hide(typeString, false);
                }
            }
        };
        Object.defineProperty(W2LayoutBindingBehavior.prototype, "DefaultOption", {
            get: function () {
                return {
                    size: null,
                    resizable: false,
                    style: 'border: 1px solid #dfdfdf; padding: 5px;',
                };
            },
            enumerable: true,
            configurable: true
        });
        W2LayoutBindingBehavior.prototype.Ensure = function () {
            var _this = this;
            var options = [];
            $.each(this.Types, function (i, each) {
                var option = $.extend(true, _this.DefaultOption, each.Option);
                var index = Number(i);
                var typeString = "";
                switch (index) {
                    case W2LayoutType.Top:
                        typeString = option.type = "top";
                        break;
                    case W2LayoutType.Left:
                        typeString = option.type = "left";
                        break;
                    case W2LayoutType.Right:
                        typeString = option.type = "right";
                        break;
                    case W2LayoutType.Main:
                        typeString = option.type = "main";
                        break;
                    case W2LayoutType.Preview:
                        typeString = option.type = "preview";
                        break;
                    case W2LayoutType.Bottom:
                        typeString = option.type = "bottom";
                        break;
                    default:
                }
                option.content = each.Container;
                options.push(option);
                // w2layout-type
                option.content.attr("w2layout-type", typeString);
                // 表示・非表示オプション
                if (each.Visibility) {
                    var dataBehavior = _this.NewAdd(new DomBehind.Data.DataBindingBehavior());
                    dataBehavior.Property = W2LayoutBindingBehavior.IsVisibleProperty;
                    dataBehavior.PInfo = new DomBehind.LamdaExpression(_this.DataContext, each.Visibility);
                    dataBehavior.Element = option.content;
                }
                // uri 
                if (typeof each.Uri === "string") {
                    // 非同期
                    var ajax = $.ajax({
                        url: each.Uri,
                        async: true,
                        type: "Get",
                        cache: false,
                    });
                    ajax.done(function (html) {
                        var body = $(html).filter(".body-content");
                        option.content.append(body);
                        //$.PopAnnotation();
                    }).fail(function (ex) {
                        //  Todo load失敗時
                    });
                }
                else {
                    var dataBehavior = _this.NewAdd(new DomBehind.Data.DataBindingBehavior());
                    dataBehavior.Property = W2LayoutBindingBehavior.UriProperty;
                    dataBehavior.PInfo = new DomBehind.LamdaExpression(_this.DataContext, each.Uri);
                    dataBehavior.Element = option.content;
                }
            });
            var id = this.Element.attr("id");
            if (!id) {
                id = "root-" + NewUid().Replace("-", "");
            }
            this.Element.w2layout({
                name: id,
                padding: 4,
                panels: options
            });
        };
        W2LayoutBindingBehavior.IsVisibleProperty = DomBehind.Data.DependencyProperty.RegisterAttached("W2LayoutBinding-IsVisible", function (el) {
            return W2LayoutBindingBehavior.GetIsVisible(el);
        }, function (el, newValue) {
            W2LayoutBindingBehavior.SetIsVisible(el, newValue);
        });
        W2LayoutBindingBehavior.UriProperty = DomBehind.Data.DependencyProperty.RegisterAttached("W2LayoutBinding-Uri", function (el) {
            return el.attr("W2LayoutBinding-Uri");
        }, function (el, newValue) {
            if (!newValue)
                newValue = "";
            var idAtt = "w2layout-uri-" + newValue.Replace("/", "");
            var id = el.attr(idAtt);
            if (!id) {
                el.attr(idAtt, id = "id-" + NewUid());
            }
            var div = el.find("#" + id);
            if (div.length === 0) {
                div = $("<div class=\"parent-size\"></div>");
                div.attr("id", id);
                el.append(div);
            }
            $.each(el.children(), function (i, each) {
                $(each).hide();
            });
            if (!newValue) {
                return;
            }
            div.show();
            var loaded = div.attr("loaded");
            if (!loaded) {
                // Todo 常にサーバーにデータ取得するのではなく、DOMキャッシュの戦略を立てる
                // 非同期
                var ajax = $.ajax({
                    url: newValue,
                    async: true,
                    type: "Get",
                    cache: false,
                });
                ajax.done(function (html) {
                    var body = $(html).filter(".body-content");
                    div.empty();
                    div.append(body);
                }).fail(function (ex) {
                    //  Todo load失敗時
                });
            }
            div.attr("loaded", "true");
        });
        return W2LayoutBindingBehavior;
    }(DomBehind.Data.BindingBehavior));
    DomBehind.W2LayoutBindingBehavior = W2LayoutBindingBehavior;
    var W2LayoutBindingBehaviorBuilder = /** @class */ (function (_super) {
        __extends(W2LayoutBindingBehaviorBuilder, _super);
        function W2LayoutBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        W2LayoutBindingBehaviorBuilder.prototype.Top = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Top, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.Left = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Left, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.Right = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Right, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.Main = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Main, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.Preview = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Preview, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.AddLayout = function (type, uri, option, bindingVisible) {
            var w2Behavior = this.CurrentBehavior;
            var parentId = w2Behavior.Element.attr("id");
            if (!parentId) {
                parentId = NewUid().Replace("-", "");
            }
            // div確保
            var identity = "panel-" + NewUid().Replace("-", "");
            var div = $("<div id=\"" + identity + "\" parent-id=\"" + parentId + "\" class=\"parent-size\"></div>");
            //div.css("z-index", $.GenerateZIndex());
            w2Behavior.Types[type] = { Uri: uri, Visibility: bindingVisible, Container: div, Option: option };
        };
        return W2LayoutBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.W2LayoutBindingBehaviorBuilder = W2LayoutBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildLayout = function () {
        var me = this;
        var behavior = me.Add(new W2LayoutBindingBehavior());
        behavior.NewAdd = function (x) { return me.Add(x); };
        var newMe = new W2LayoutBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = behavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Layout.js.map