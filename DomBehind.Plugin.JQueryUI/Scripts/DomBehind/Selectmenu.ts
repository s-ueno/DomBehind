namespace DomBehind.Controls {

    export class Selectmenu {

        public static IsEnabledProperty =
            Data.DependencyProperty.RegisterAttached("_disabled",
                el => {
                    // oneway
                },
                (el, newValue) => {
                    if (Object.IsNullOrUndefined(el)) return;

                    let oldValueString = el.attr("selectMenu_oldIsEnabled");
                    let oldValue = oldValueString === "false" ? false : true;
                    try {
                        el.attr("selectMenu_oldIsEnabled", newValue);
                        el.selectmenu("option", "disabled", newValue === false);
                    } catch (e) {
                        // selectmenu before initilize
                        el.attr("_disabled", newValue === false ? "true" : "false");
                    }

                    if (newValue === oldValue) return;

                    UIElement.RaiseEnabledChanged(el, newValue);
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWay
            );


        public static ItemsSourceProperty =
            Data.DependencyProperty.RegisterAttached("itemsSource",
                el => {

                },
                (el, newValue) => {
                    if (newValue instanceof Data.ListCollectionView) {
                        if (!Selectmenu.Rebuild(el, newValue)) return;

                        // 
                        let sm: Selectmenu = (newValue as any).__widget;
                        if (!sm) {
                            sm = (<any>newValue).__widget = new Selectmenu();
                        }

                        let disabled = false;
                        if (el.attr("_disabled") === "true") {
                            disabled = true;
                        }

                        let option: any = {
                            change: e => {
                                let recId = el.val();
                                sm._engaged = true;
                                try {
                                    if (sm.Items) {

                                        // IDがない　＝　文字配列直バインドでも、カレント変更通知イベントを飛ばす
                                        if (Object.IsNullOrUndefined(recId) || recId === "undefined") {
                                            // 文字を取得
                                            let selectedText = el.find(":selected").text();

                                            let e = new CancelEventArgs(false);
                                            sm.Items.CurrentChanging.Raise(sm.Items, e);
                                            // キャンセルしない
                                            if (!e.Cancel) {
                                                sm.Items.Begin();
                                                sm.Items.Current = selectedText;
                                                sm.Items.End();
                                                sm.Items.CurrentChanged.Raise(sm.Items, new PropertyChangedEventArgs("Current"));
                                            }
                                        } else {
                                            let current = sm.Items.ToArray().FirstOrDefault(x => x.recid === recId);
                                            sm.Items.Select(current);
                                        }
                                    }
                                } finally {
                                    sm._engaged = false;
                                }
                            },
                            classes: {
                                "ui-selectmenu-menu": "jqueryui-highlight"
                            }
                        };

                        // ドロップダウン構築前にdisable設定ある場合
                        if (disabled) {
                            option.disabled = true;
                        }

                        sm.Element = el.selectmenu(option);
                        sm.Element.selectmenu("refresh");
                        sm.Items = newValue;

                        newValue.PropertyChanged.RemoveHandler(sm.OnCurrentChanged);
                        newValue.PropertyChanged.AddHandler(sm.OnCurrentChanged);
                    }
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWay,
                behavior => {
                    Selectmenu.Register(behavior);
                });



        public static Register(behavior: Data.DataBindingBehavior) {
            let el = behavior.Element;
            let value = el.data("native-menu");
            if (String.IsNullOrWhiteSpace(value)) {
                el.data("native-menu", "false");
            }
        }
        public static Rebuild(el: JQuery, list: Data.ListCollectionView): boolean {
            let newArray = list.ToArray();
            if (newArray.SequenceEqual((list as any).__oldArray)) {
                return false;
            }
            el.empty();

            let identity = el.data("menu_identity");
            if (!identity) {
                identity = `menu_${NewUid()}`;
                el.data("menu_identity", identity);
            }


            let oldArray = (list as any).__oldArray;
            (list as any).__oldArray = newArray;


            let index: number = 0;
            let items = newArray.Select(x => {
                if (Object.IsNullOrUndefined(x)) return null;


                x.recid = `${identity}_${++index}`;
                let text: string;
                if (list.DisplayMemberPath) {
                    text = x[list.DisplayMemberPath];
                } else {
                    text = x.toString();
                }

                let newVal = {
                    id: x.recid,
                    text: text,
                    obj: x,
                };

                el.append(`<option value="${newVal.id}">${newVal.text}</option>`);
                return newVal;
            });

            Selectmenu.UpdateCurrent(el, list);
            return true;
        }

        _engaged: boolean = false;
        public Items: Data.ListCollectionView;
        public Element: JQuery;
        private static UpdateCurrent(el: JQuery, list: Data.ListCollectionView) {
            let widget = el.selectmenu();
            if (list.Current != null) {
                let id = list.Current.recid;
                widget.val(id);
            }
            widget.selectmenu("refresh");
        }

        public OnCurrentChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs) {
            // ES6 で this がそのままトランスパイルされた結果、実行時コンテキストがES5から変わった。
            // if (this._engaged) return;

            let me: Selectmenu = (<any>sender).__widget
            if (me && me._engaged) {
                return;
            }

            let el = me.Element;
            // プロパティ未指定の場合は、リフレッシュする
            if (String.IsNullOrWhiteSpace(e.Name)) {
                Selectmenu.Rebuild(el, sender);
            } else if (e.Name === "Current") {
                Selectmenu.UpdateCurrent(el, sender);
            }
        }
    }
}
