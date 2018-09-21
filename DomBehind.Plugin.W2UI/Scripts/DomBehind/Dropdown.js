var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Dropdown = (function () {
            function Dropdown() {
                this._engaged = false;
            }
            Dropdown.Register = function (behavior) {
                if (!behavior.Element)
                    return;
            };
            Dropdown.Rebuild = function (el, list) {
                var newArray = list.ToArray();
                if (newArray.SequenceEqual(list.__oldArray)) {
                    return false;
                }
                list.__oldArray = newArray;
                $.each(newArray, function (i, each) {
                    each.recid = i;
                });
                var items = newArray.Select(function (x) {
                    var text = x;
                    if (list.DisplayMemberPath) {
                        text = x[list.DisplayMemberPath];
                    }
                    return {
                        id: x.recid,
                        text: text,
                        obj: x,
                    };
                });
                var options = {
                    items: items,
                    selected: {},
                };
                if (list.Current != null) {
                    var id_1 = list.Current.recid;
                    var obj = items.FirstOrDefault(function (x) { return x.id === id_1; });
                    options.selected = obj;
                }
                el.w2field('list', options);
                return true;
            };
            Dropdown.prototype.OnCurrentChanged = function (sender, e) {
                if (this._engaged)
                    return;
                var dd = sender.__element;
                var el = dd.Element;
                if (String.IsNullOrWhiteSpace(e.Name)) {
                    Dropdown.Rebuild(el, sender);
                    el.data('w2field').refresh();
                }
                else if (e.Name === "Current") {
                    var list = el.data('w2field');
                    var id_2 = sender.Current.recid;
                    var items = list.options.items;
                    if (items instanceof Array) {
                        var obj = items.FirstOrDefault(function (x) { return x.id === id_2; });
                        el.data('selected', obj);
                        list.refresh();
                    }
                }
            };
            Dropdown.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", function (el) {
            }, function (el, newValue) {
                if (newValue instanceof DomBehind.Data.ListCollectionView) {
                    if (!Dropdown.Rebuild(el, newValue))
                        return;
                    var dd_1 = newValue.__element;
                    if (!dd_1) {
                        dd_1 = newValue.__element = new Dropdown();
                    }
                    dd_1.Element = el;
                    dd_1.Items = newValue;
                    var list = el.data('w2field');
                    list.refresh();
                    list.__Dropdown = dd_1;
                    el.off('change');
                    el.on('change', function (e) {
                        var selectedId = el.data("selected").id;
                        dd_1._engaged = true;
                        try {
                            var current = newValue.ToArray().FirstOrDefault(function (x) { return x.recid == selectedId; });
                            dd_1.Items.Select(current);
                        }
                        finally {
                            dd_1._engaged = false;
                        }
                    });
                    newValue.PropertyChanged.RemoveHandler(dd_1.OnCurrentChanged);
                    newValue.PropertyChanged.AddHandler(dd_1.OnCurrentChanged);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, function (behavior) {
                Dropdown.Register(behavior);
            });
            return Dropdown;
        }());
        Controls.Dropdown = Dropdown;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
