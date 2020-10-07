var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        class Dropdown {
            constructor() {
                this._engaged = false;
            }
            static Register(behavior) {
                if (!behavior.Element)
                    return;
            }
            static Rebuild(el, list) {
                let newArray = list.ToArray();
                if (newArray.SequenceEqual(list.__oldArray)) {
                    return false;
                }
                list.__oldArray = newArray;
                $.each(newArray, (i, each) => {
                    each.recid = i;
                });
                let items = newArray.Select(x => {
                    let text = x;
                    if (list.DisplayMemberPath) {
                        text = x[list.DisplayMemberPath];
                    }
                    return {
                        id: x.recid,
                        text: text,
                        obj: x,
                    };
                });
                let options = {
                    items: items,
                    selected: {},
                };
                if (list.Current != null) {
                    let id = list.Current.recid;
                    let obj = items.FirstOrDefault(x => x.id === id);
                    options.selected = obj;
                }
                el.w2field('list', options);
                return true;
            }
            OnCurrentChanged(sender, e) {
                if (this._engaged)
                    return;
                // プログラム上(ViewModel)からの反映を、Viewへ適用する
                let dd = sender.__element;
                let el = dd.Element;
                // プロパティ未指定の場合は、リフレッシュする
                if (String.IsNullOrWhiteSpace(e.Name)) {
                    Dropdown.Rebuild(el, sender);
                    el.data('w2field').refresh();
                }
                else if (e.Name === "Current") {
                    // カレント行が変更されたので、選択状態とする
                    let list = el.data('w2field');
                    let id = sender.Current.recid;
                    let items = list.options.items;
                    if (items instanceof Array) {
                        let obj = items.FirstOrDefault(x => x.id === id);
                        el.data('selected', obj);
                        list.refresh();
                    }
                }
            }
        }
        Dropdown.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", el => {
            // UpdateSource
            // oneway なので、未実装で良い
        }, (el, newValue) => {
            // UpdaateTarget
            if (newValue instanceof DomBehind.Data.ListCollectionView) {
                if (!Dropdown.Rebuild(el, newValue))
                    return;
                // 
                let dd = newValue.__element;
                if (!dd) {
                    dd = newValue.__element = new Dropdown();
                }
                dd.Element = el;
                dd.Items = newValue;
                let list = el.data('w2field');
                list.refresh();
                list.__Dropdown = dd;
                // UI上からの変更をデータソースへ反映する
                el.off('change');
                el.on('change', e => {
                    let selectedId = el.data("selected").id;
                    dd._engaged = true;
                    try {
                        // dd.Items.Begin();
                        let current = newValue.ToArray().FirstOrDefault(x => x.recid == selectedId);
                        dd.Items.Select(current);
                        // dd.Items.End();
                    }
                    finally {
                        dd._engaged = false;
                    }
                });
                newValue.PropertyChanged.RemoveHandler(dd.OnCurrentChanged);
                newValue.PropertyChanged.AddHandler(dd.OnCurrentChanged);
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, behavior => {
            Dropdown.Register(behavior);
        });
        Controls.Dropdown = Dropdown;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Dropdown.js.map