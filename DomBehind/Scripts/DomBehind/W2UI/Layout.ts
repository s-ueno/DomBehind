//namespace DomBehind {
//    export enum W2LayoutType {
//        /* top */
//        Top,
//        /* left */
//        Left,
//        /* right */
//        Right,
//        /* main */
//        Main,
//        /* preview */
//        Preview,
//        /* bottom */
//        Bottom
//    }
//    // http://w2ui.com/web/docs/1.5/w2layout.panels
//    export interface LayoutOption {
//        size?: number;
//        resizable?: boolean;
//        style?: string;

//        /* overflow property of the panel, can have same values as similar CSS property */
//        overflow?: string;
//        /* content of the pane, can be a string or an object with .render(box) method */
//        content?: string;
//    }

//    export class W2LayoutBindingBehavior extends Data.BindingBehavior {

//        public static IsVisibleProperty: Data.DependencyProperty
//            = Data.DependencyProperty.RegisterAttached("W2LayoutBinding-IsVisible",
//                el => {
//                    return W2LayoutBindingBehavior.GetIsVisible(el);
//                },
//                (el: JQuery, newValue: any) => {
//                    W2LayoutBindingBehavior.SetIsVisible(el, newValue);
//                });

//        static GetIsVisible(el: JQuery): boolean {
//            let id = el.attr("parent-id");
//            let w2uilayout = w2ui[id];
//            if (w2uilayout) {
//                let typeString = el.attr("w2layout-type");
//                let panel = w2uilayout.get(typeString);
//                if (!panel) return null;

//                return !panel.hidden;
//            }
//            return null;
//        }
//        static SetIsVisible(el: JQuery, value: any) {
//            let id = el.attr("parent-id");
//            let typeString = el.attr("w2layout-type");
//            let w2uilayout = w2ui[id];
//            if (w2uilayout) {
//                let panel = w2uilayout.get(typeString);
//                if (!panel) return;

//                let hidden = panel.hidden;
//                if (value && hidden) {
//                    w2uilayout.show(typeString, false);
//                } else if (!value && !hidden) {
//                    w2uilayout.hide(typeString, false);
//                }
//            }
//        }

//        public static UriProperty: Data.DependencyProperty
//            = Data.DependencyProperty.RegisterAttached("W2LayoutBinding-Uri",
//                el => {
//                    return el.attr("W2LayoutBinding-Uri");
//                },
//                (el: JQuery, newValue: string) => {
//                    if (!newValue) newValue = "";

//                    let idAtt = `w2layout-uri-${newValue.Replace("/", "")}`;
//                    let id = el.attr(idAtt);
//                    if (!id) {
//                        el.attr(idAtt, id = `id-${NewUid()}`);
//                    }

//                    let div = el.find(`#${id}`);
//                    if (div.length === 0) {
//                        div = $(`<div class="parent-size"></div>`);
//                        div.attr("id", id);

//                        el.append(div);
//                    }


//                    $.each(el.children(/*直下の子要素(div)のみ*/), (i, each) => {
//                        $(each).hide();
//                    });

//                    if (!newValue) {
//                        return;
//                    }

//                    div.show();

//                    let loaded = div.attr("loaded");
//                    if (!loaded) {
//                        // Todo 常にサーバーにデータ取得するのではなく、DOMキャッシュの戦略を立てる
//                        // 非同期
//                        let ajax = $.ajax({
//                            url: newValue,
//                            async: true,
//                            type: "Get",
//                            cache: false,
//                        });

//                        ajax.done(html => {
//                            let body = $(html).filter(".body-content");
//                            div.empty();
//                            div.append(body);
//                        }).fail(ex => {
//                            //  Todo load失敗時

//                        });
//                    }

//                    div.attr("loaded", "true");
//                }
//            );

//        public Types: { [key: number]: { Uri: any, Visibility: any, Container: JQuery, Option: LayoutOption } } = {};
//        public NewAdd: (value: Data.DataBindingBehavior) => Data.DataBindingBehavior;
//        protected get DefaultOption(): LayoutOption {
//            return {
//                size: null,
//                resizable: false,
//                style: 'border: 1px solid #dfdfdf; padding: 5px;',
//            };
//        }
//        public Ensure(): void {

//            let options = [];
//            $.each(this.Types, (i: number, each: { Uri: any, Visibility: any, Container: JQuery, Option: LayoutOption }) => {
//                let option: any = $.extend(true, this.DefaultOption, each.Option);
//                let index = Number(i);

//                let typeString = "";
//                switch (index) {
//                    case W2LayoutType.Top:
//                        typeString = option.type = "top";
//                        break;
//                    case W2LayoutType.Left:
//                        typeString = option.type = "left";
//                        break;
//                    case W2LayoutType.Right:
//                        typeString = option.type = "right";
//                        break;
//                    case W2LayoutType.Main:
//                        typeString = option.type = "main";
//                        break;
//                    case W2LayoutType.Preview:
//                        typeString = option.type = "preview";
//                        break;
//                    case W2LayoutType.Bottom:
//                        typeString = option.type = "bottom";
//                        break;
//                    default:
//                }

//                option.content = each.Container;
//                options.push(option);

//                // w2layout-type
//                option.content.attr("w2layout-type", typeString);

//                // 表示・非表示オプション
//                if (each.Visibility) {
//                    let dataBehavior = this.NewAdd(new Data.DataBindingBehavior());
//                    dataBehavior.Property = W2LayoutBindingBehavior.IsVisibleProperty;
//                    dataBehavior.PInfo = new LamdaExpression(this.DataContext, each.Visibility);
//                    dataBehavior.Element = option.content;
//                }

//                // uri 
//                if (typeof each.Uri === "string") {
//                    // 非同期
//                    let ajax = $.ajax({
//                        url: each.Uri,
//                        async: true,
//                        type: "Get",
//                        cache: false,
//                    });

//                    ajax.done(html => {
//                        let body = $(html).filter(".body-content");
//                        option.content.append(body);

//                        //$.PopAnnotation();
//                    }).fail(ex => {
//                        //  Todo load失敗時

//                    });
//                } else {
//                    let dataBehavior = this.NewAdd(new Data.DataBindingBehavior());
//                    dataBehavior.Property = W2LayoutBindingBehavior.UriProperty;
//                    dataBehavior.PInfo = new LamdaExpression(this.DataContext, each.Uri);
//                    dataBehavior.Element = option.content;
//                }
//            });

//            let id = this.Element.attr("id");
//            if (!id) {
//                id = "root-" + NewUid().Replace("-", "");
//            }

//            this.Element.w2layout({
//                name: id,
//                padding: 4,
//                panels: options
//            });
//        }
//    }

//    export class W2LayoutBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T>{
//        constructor(owner: BizView) {
//            super(owner);
//        }

//        public Top(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Top(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Top(uri: any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T> {
//            this.AddLayout(W2LayoutType.Top, uri, option, bindingVisible);
//            return this;
//        }

//        public Left(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Left(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Left(uri: any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T> {
//            this.AddLayout(W2LayoutType.Left, uri, option, bindingVisible);
//            return this;
//        }

//        public Right(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Right(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Right(uri: any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T> {
//            this.AddLayout(W2LayoutType.Right, uri, option, bindingVisible);
//            return this;
//        }

//        public Main(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Main(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Main(uri: any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T> {
//            this.AddLayout(W2LayoutType.Main, uri, option, bindingVisible);
//            return this;
//        }

//        // Preview
//        public Preview(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Preview(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
//        public Preview(uri: any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T> {
//            this.AddLayout(W2LayoutType.Preview, uri, option, bindingVisible);
//            return this;
//        }

//        protected AddLayout(type: W2LayoutType, uri: any, option?: LayoutOption, bindingVisible?: (x: T) => any) {
//            let w2Behavior = this.CurrentBehavior as W2LayoutBindingBehavior;

//            let parentId = w2Behavior.Element.attr("id");
//            if (!parentId) {
//                parentId = NewUid().Replace("-", "");
//            }

//            // div確保
//            let identity = "panel-" + NewUid().Replace("-", "");
//            let div = $(`<div id="${identity}" parent-id="${parentId}" class="parent-size"></div>`)
//            //div.css("z-index", $.GenerateZIndex());

//            w2Behavior.Types[type] = { Uri: uri, Visibility: bindingVisible, Container: div, Option: option };
//        }
//    }

//    export interface BindingBehaviorBuilder<T> {
//        /**
//         * Divタグにw2layout機構を組み込みます。
//         * 実装例：
//         * 
//         */
//        BuildLayout(): W2LayoutBindingBehaviorBuilder<T>;
//    }

//    BindingBehaviorBuilder.prototype.BuildLayout = function () {
//        let me: BindingBehaviorBuilder<any> = this;
//        let behavior = me.Add(new W2LayoutBindingBehavior());
//        behavior.NewAdd = x => me.Add(x);


//        let newMe = new W2LayoutBindingBehaviorBuilder<any>(me.Owner)
//        newMe.CurrentElement = me.CurrentElement;
//        newMe.CurrentBehavior = behavior;
//        return newMe;
//    };
//}
