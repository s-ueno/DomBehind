//namespace DomBehind.Controls {


//    export class Dropdown {

//        public static ItemsSourceProperty: Data.DependencyProperty
//            = Data.DependencyProperty.RegisterAttached("itemsSource",
//                el => {
//                    // UpdateSource
//                    // oneway なので、未実装で良い
//                },
//                (el, newValue) => {
//                    // UpdaateTarget

//                    if (newValue instanceof Data.ListCollectionView) {

//                        if (!Dropdown.Rebuild(el, newValue)) return;

//                        // 
//                        let dd: Dropdown = (newValue as any).__element;
//                        if (!dd) {
//                            dd = (newValue as any).__element = new Dropdown();
//                        }
//                        dd.Element = el;
//                        dd.Items = newValue;

//                        let list = el.data('w2field');
//                        list.refresh();
//                        list.__Dropdown = dd;

//                        // UI上からの変更をデータソースへ反映する
//                        el.off('change');
//                        el.on('change', e => {
//                            let selectedId = el.data("selected").id;

//                            dd._engaged = true;
//                            try {
//                                // dd.Items.Begin();
//                                let current = newValue.ToArray().FirstOrDefault(x => x.recid == selectedId);
//                                dd.Items.Select(current);
//                                // dd.Items.End();
//                            } finally {
//                                dd._engaged = false;
//                            }
//                        });

//                        newValue.PropertyChanged.RemoveHandler(dd.OnCurrentChanged);
//                        newValue.PropertyChanged.AddHandler(dd.OnCurrentChanged);
//                    }
//                },
//                Data.UpdateSourceTrigger.Explicit,
//                Data.BindingMode.OneWay,
//                behavior => {
//                    Dropdown.Register(behavior);
//                });


//        public static Register(behavior: Data.DataBindingBehavior): void {
//            if (!behavior.Element) return;

//        }
//        public static Rebuild(el: JQuery, list: Data.ListCollectionView): boolean {
//            let newArray = list.ToArray();
//            if (newArray.SequenceEqual((list as any).__oldArray)) {
//                return false;
//            }
//            (list as any).__oldArray = newArray;


//            $.each(newArray, (i, each) => {
//                each.recid = i;
//            });
//            let items = newArray.Select(x => {
//                let text = x;
//                if (list.DisplayMemberPath) {
//                    text = x[list.DisplayMemberPath];
//                }
//                return {
//                    id: x.recid,
//                    text: text,
//                    obj: x,
//                };
//            });

//            let options: any = {
//                items: items,
//                selected: {},
//            };
//            if (list.Current != null) {
//                let id = list.Current.recid;
//                let obj = items.FirstOrDefault(x => x.id === id);
//                options.selected = obj;
//            }

//            el.w2field('list', options);

//            return true;
//        }

//        _engaged: boolean = false;
//        public Items: Data.ListCollectionView;
//        public Element: JQuery;
//        public OnCurrentChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs) {
//            if (this._engaged) return;

//            // プログラム上(ViewModel)からの反映を、Viewへ適用する
//            let dd: Dropdown = (sender as any).__element;
//            let el = dd.Element;
//            // プロパティ未指定の場合は、リフレッシュする
//            if (String.IsNullOrWhiteSpace(e.Name)) {
//                Dropdown.Rebuild(el, sender);
//                el.data('w2field').refresh();
//            } else if (e.Name === "Current") {
//                // カレント行が変更されたので、選択状態とする
//                let list = el.data('w2field');
//                let id = sender.Current.recid;
//                let items = list.options.items;
//                if (items instanceof Array) {
//                    let obj = items.FirstOrDefault(x => x.id === id);
//                    el.data('selected', obj);
//                    list.refresh();
//                }
//            }
//        }
//    }

//}
