var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var DatePicker = (function () {
            function DatePicker() {
            }
            DatePicker.SetValue = function (el, newValue) {
                var initialized = el.attr("DateFormatted");
                if (!initialized) {
                    el.attr("DateFormatted", "true");
                    var format = el.attr("DateFormat");
                    if (!format) {
                        format = "yyyy/MM/dd";
                    }
                    el.w2field("date", { format: format });
                }
                el.val(newValue);
            };
            DatePicker.FormatProperty = DomBehind.Data.DependencyProperty.RegisterAttached("DateFormat", function (el) {
            }, function (el, newValue) {
                el.attr("DateFormat", newValue);
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
            DatePicker.ValueProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", function (el) {
                return el.val();
            }, function (el, newValue) {
                DatePicker.SetValue(el, newValue);
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
            DatePicker.DateProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", function (el) {
                var text = el.val();
                return new Date(text);
            }, function (el, newValue) {
                if (newValue instanceof Date) {
                    var oldFormat = el.attr("DateFormat");
                    if (!oldFormat || oldFormat !== "yyyy/MM/dd") {
                        el.w2field("date", { format: "yyyy/MM/dd" });
                    }
                    var year = "" + newValue.getFullYear();
                    var month = new String("" + (newValue.getMonth() + 1)).PadLeft(2, "0");
                    var day = new String("" + newValue.getDate()).PadLeft(2, "0");
                    el.val(year + "/" + month + "/" + day);
                    if (oldFormat && oldFormat !== "yyyy/MM/dd") {
                        el.w2field("date", { format: oldFormat });
                    }
                }
                else {
                    DatePicker.SetValue(el, newValue);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
            return DatePicker;
        }());
        Controls.DatePicker = DatePicker;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));

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

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var FieldType;
    (function (FieldType) {
        FieldType[FieldType["Text"] = 1] = "Text";
        FieldType[FieldType["Int"] = 2] = "Int";
        FieldType[FieldType["Double"] = 3] = "Double";
        FieldType[FieldType["Date"] = 4] = "Date";
        FieldType[FieldType["Hex"] = 5] = "Hex";
        FieldType[FieldType["Money"] = 6] = "Money";
        FieldType[FieldType["Currency"] = 7] = "Currency";
        FieldType[FieldType["Percent"] = 8] = "Percent";
        FieldType[FieldType["Alphanumeric"] = 9] = "Alphanumeric";
        FieldType[FieldType["Time"] = 10] = "Time";
        FieldType[FieldType["Color"] = 11] = "Color";
        FieldType[FieldType["List"] = 12] = "List";
        FieldType[FieldType["Combo"] = 13] = "Combo";
        FieldType[FieldType["Check"] = 14] = "Check";
        FieldType[FieldType["Checkbox"] = 15] = "Checkbox";
        FieldType[FieldType["Select"] = 16] = "Select";
    })(FieldType = DomBehind.FieldType || (DomBehind.FieldType = {}));
    var RenderType;
    (function (RenderType) {
        RenderType[RenderType["Number"] = 1] = "Number";
        RenderType[RenderType["Currency"] = 2] = "Currency";
        RenderType[RenderType["Money"] = 3] = "Money";
        RenderType[RenderType["Percent"] = 4] = "Percent";
        RenderType[RenderType["Time"] = 5] = "Time";
        RenderType[RenderType["Date"] = 6] = "Date";
        RenderType[RenderType["Age"] = 7] = "Age";
        RenderType[RenderType["Toggle"] = 8] = "Toggle";
        RenderType[RenderType["CheckBox"] = 9] = "CheckBox";
    })(RenderType = DomBehind.RenderType || (DomBehind.RenderType = {}));
    var EditableWrapper = (function () {
        function EditableWrapper(Owner) {
            this.Owner = Owner;
        }
        Object.defineProperty(EditableWrapper.prototype, "items", {
            get: function () {
                if (!this.itemSource)
                    return null;
                if (!this.__items) {
                    var exp = new DomBehind.LamdaExpression(this.Owner, this.itemSource);
                    this.__items = exp.GetValue();
                }
                return this.__items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditableWrapper.prototype, "type", {
            get: function () {
                if (!this.__type) {
                    this.__type = W2GridBindingBehavior.FieldTypeToString(this.fieldType);
                }
                return this.__type;
            },
            enumerable: true,
            configurable: true
        });
        return EditableWrapper;
    }());
    var W2GridBindingBehavior = (function (_super) {
        __extends(W2GridBindingBehavior, _super);
        function W2GridBindingBehavior() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Column = [];
            _this.__id = 0;
            return _this;
        }
        Object.defineProperty(W2GridBindingBehavior.prototype, "IsMultiSelect", {
            get: function () {
                if (this.GridOption && this.GridOption.multiSelect) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        W2GridBindingBehavior.prototype.GenerateRecId = function () {
            return ++this.__id;
        };
        Object.defineProperty(W2GridBindingBehavior.prototype, "SelectedObject", {
            get: function () {
                var ids = this.Grid.getSelection();
                if (!ids || ids.length === 0)
                    return null;
                var rows = [];
                $.each(this.Grid.records, function (i, each) {
                    if (ids.Any(function (x) { return x === each.recid; })) {
                        rows.push(each);
                    }
                });
                if (this.IsMultiSelect) {
                    return rows;
                }
                return rows.FirstOrDefault();
            },
            enumerable: true,
            configurable: true
        });
        W2GridBindingBehavior.prototype.AddColumn = function (binding) {
            this.Column.push(binding);
        };
        W2GridBindingBehavior.prototype.Ensure = function () {
            var _this = this;
            var id = this.Element.attr('id');
            if (!id) {
                id = NewUid();
                this.Element.attr('id', id);
            }
            var readOnly = new Array();
            $.each(this.Column, function (i, each) {
                if (each.renderType) {
                    if (each.renderType === RenderType.CheckBox) {
                        each.editable = $.extend(true, each.editable, { fieldType: FieldType.Checkbox });
                        readOnly.push(each);
                    }
                    else {
                        each.render = W2GridBindingBehavior.RenderTypeToString(each.renderType);
                    }
                }
                if (each.editable) {
                    each.editable = $.extend(true, new EditableWrapper(_this.DataContext), each.editable);
                }
            });
            var w2GridOption = {
                name: id,
                columns: this.Column,
                show: {
                    selectColumn: false,
                },
                multiSelect: false,
                keyboard: true,
            };
            w2GridOption.onChange = function (e) {
                if (!_this.Grid)
                    return;
                var columnId = e.column;
                var column = _this.Grid.columns[columnId];
                if (column) {
                    var field_1 = column.field;
                    var caption_1 = column.caption;
                    if (readOnly.Any(function (x) { return x.field === field_1 && x.caption === caption_1; })) {
                        e.preventDefault();
                    }
                }
            };
            w2GridOption.onDblClick = function (e) { return _this.OnDoubleClick(_this.DataContext, e); };
            if (this.GridOption.footerOption) {
                w2GridOption.show.footer = true;
            }
            if (this.GridOption.headerOption) {
                w2GridOption.show.toolbar = true;
                if (this.GridOption.headerOption.add) {
                    w2GridOption.show.toolbarAdd = true;
                    w2GridOption.onAdd = function (e) { return _this.OnToolbarAdd(_this.DataContext, e); };
                }
                if (this.GridOption.headerOption.edit) {
                    w2GridOption.show.toolbarEdit = true;
                    w2GridOption.onEdit = function (e) { return _this.OnToolbarEdit(_this.DataContext, e); };
                }
                if (this.GridOption.headerOption.save) {
                    w2GridOption.show.toolbarSave = true;
                    w2GridOption.onSave = function (e) { return _this.OnToolbarSave(_this.DataContext, e); };
                }
                if (this.GridOption.headerOption.delete) {
                    w2GridOption.show.toolbarDelete = true;
                    w2GridOption.onDelete = function (e) { return _this.OnToolbarDelete(_this.DataContext, e); };
                }
            }
            if (this.GridOption.multiSelect) {
                w2GridOption.multiSelect = true;
            }
            if (this.GridOption.dragAndDropRow) {
                w2GridOption.reorderRows = true;
            }
            var advancedColumns = this.Column.Where(function (x) { return !Object.IsNullOrUndefined(x.advancedSearch); });
            if (advancedColumns.Any()) {
                w2GridOption.multiSearch = true;
                w2GridOption.searches = advancedColumns.Select(function (x) {
                    return {
                        field: x.field,
                        caption: x.caption,
                        type: W2GridBindingBehavior.FieldTypeToString(x.advancedSearch),
                    };
                });
            }
            this.Grid = this.Element.w2grid(w2GridOption);
            var dp = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", function (el) {
                if (_this.ListCollectionView && _this.Grid) {
                    _this.ListCollectionView.Current = null;
                    var selections = _this.Grid.getSelection();
                    if (selections && selections.length == 1) {
                        var id_1 = selections[0];
                        var obj = _this.ListCollectionView.ToArray().FirstOrDefault(function (x) { return x.recid === id_1; });
                        if (obj) {
                            _this.ListCollectionView.Select(obj);
                        }
                    }
                }
                return _this.ListCollectionView;
            }, function (el, newValue) {
                if (newValue instanceof DomBehind.Data.ListCollectionView) {
                    _this.ListCollectionView = newValue;
                    var id_2 = el.attr("id");
                    var grid = w2ui[id_2];
                    if (grid) {
                        var rows = newValue.ToArray();
                        if (grid.records === rows)
                            return;
                        $.each(rows, function (i, value) {
                            _this.RowInjection(value);
                        });
                        grid.clear(true);
                        grid.records = rows;
                        grid.total = rows.length;
                        grid.refresh();
                        grid.onClick = function (ee) {
                            _this.OnSelect(_this.DataContext, ee);
                            var gridFocus = $("#grid_" + id_2 + "_focus");
                            gridFocus.focus();
                        };
                        newValue.PropertyChanged.RemoveHandler(_this.OnCurrentChanged);
                        newValue.PropertyChanged.AddHandler(_this.OnCurrentChanged);
                    }
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit);
            var itemSource = this.NewAdd(new DomBehind.Data.DataBindingBehavior());
            itemSource.Property = dp;
            itemSource.PInfo = this.ItemsSource;
            itemSource.Element = this.Element;
            W2GridBindingBehavior.Refresh.AddHandler(function (sender, e) {
                try {
                    _this.Grid.refresh();
                }
                catch (e) {
                }
            });
        };
        W2GridBindingBehavior.prototype.SuppressListCollectionViewAction = function (action) {
            this.ListCollectionView.Begin();
            action(this.ListCollectionView);
            this.ListCollectionView.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
            this.ListCollectionView.End();
        };
        W2GridBindingBehavior.prototype.OnSelect = function (sender, e) {
            if (!this.GridOption.onSelect) {
                return;
            }
            var recId = e.recid;
            var obj = this.Grid.get(recId);
            this.SuppressListCollectionViewAction(function (x) { return x.Current = obj; });
            this.GridOption.onSelect(sender, obj);
        };
        W2GridBindingBehavior.prototype.OnDoubleClick = function (sender, e) {
            if (this.GridOption && this.GridOption.onDoubleClick) {
                var id = this.Element.attr("id");
                var grid = w2ui[id];
                if (grid) {
                    var recId = e.recid;
                    var obj_1 = grid.get(recId);
                    this.SuppressListCollectionViewAction(function (x) { return x.Current = obj_1; });
                    this.GridOption.onDoubleClick(sender, obj_1);
                }
            }
        };
        W2GridBindingBehavior.prototype.OnToolbarAdd = function (sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.add) {
                var newRow = this.GridOption.headerOption.add(sender, e);
                if (newRow)
                    this.AddRow(newRow);
            }
        };
        W2GridBindingBehavior.prototype.AddRow = function (row) {
            this.RowInjection(row);
            this.Grid.records.push(row);
            this.Grid.total = this.Grid.records.length;
            this.SuppressListCollectionViewAction(function (x) { return x.Add(row); });
            this.Grid.refresh(row.recid);
            this.Grid.select(row.recid);
            this.Grid.scrollIntoView(row.recid);
        };
        W2GridBindingBehavior.prototype.OnToolbarEdit = function (sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.edit) {
                var recId = e.recid;
                var row = this.Grid.get(recId);
                this.GridOption.headerOption.edit(sender, row);
            }
        };
        W2GridBindingBehavior.prototype.OnToolbarSave = function (sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.save) {
                var recId = e.recid;
                var row = this.Grid.get(recId);
                this.GridOption.headerOption.save(sender, row);
            }
        };
        W2GridBindingBehavior.prototype.OnToolbarDelete = function (sender, e) {
            var _this = this;
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.delete) {
                if (!e.force) {
                    this._deleteTargets = this.SelectedObject;
                }
                if (e.done) {
                    e.done(function (x) {
                        _this.GridOption.headerOption.delete(sender, _this._deleteTargets);
                    });
                }
            }
        };
        W2GridBindingBehavior.prototype.OnCurrentChanged = function (sender, e) {
            if (String.IsNullOrWhiteSpace(e.Name)) {
                if (this.Grid) {
                    this.Grid.refresh();
                }
            }
            else if (e.Name === "Current") {
            }
        };
        W2GridBindingBehavior.FieldTypeToString = function (type) {
            var result = "text";
            switch (type) {
                case FieldType.Text:
                    result = "text";
                    break;
                case FieldType.Int:
                    result = "int";
                    break;
                case FieldType.Double:
                    result = "float";
                    break;
                case FieldType.Date:
                    result = "date";
                    break;
                case FieldType.Hex:
                    result = "hex";
                    break;
                case FieldType.Money:
                    result = "money";
                    break;
                case FieldType.Currency:
                    result = "currency";
                    break;
                case FieldType.Percent:
                    result = "percent";
                    break;
                case FieldType.Alphanumeric:
                    result = "alphanumeric";
                    break;
                case FieldType.Time:
                    result = "time";
                    break;
                case FieldType.Color:
                    result = "color";
                    break;
                case FieldType.List:
                    result = "list";
                    break;
                case FieldType.Combo:
                    result = "combo";
                    break;
                case FieldType.Check:
                    result = "check";
                    break;
                case FieldType.Checkbox:
                    result = "checkbox";
                    break;
                case FieldType.Select:
                    result = "select";
                    break;
            }
            return result;
        };
        W2GridBindingBehavior.RenderTypeToString = function (type) {
            var result = "";
            switch (type) {
                case RenderType.Number:
                    result = "number";
                    break;
                case RenderType.Currency:
                    result = "currency";
                    break;
                case RenderType.Money:
                    result = "money";
                    break;
                case RenderType.Percent:
                    result = "percent";
                    break;
                case RenderType.Time:
                    result = "time";
                    break;
                case RenderType.Date:
                    result = "date";
                    break;
                case RenderType.Age:
                    result = "age";
                    break;
                case RenderType.Toggle:
                    result = "toggle";
                    break;
            }
            return result;
        };
        W2GridBindingBehavior.prototype.ParseCellStyles = function (value) {
            var json = JSON.parse(value);
            var styleArray = [];
            for (var each in json) {
                for (var i = 0; i < this.Column.length; i++) {
                    var c = this.Column[i];
                    if (c.field === each) {
                        styleArray[i] = json[each];
                        break;
                    }
                }
            }
            return styleArray;
        };
        W2GridBindingBehavior.prototype.RowInjection = function (value) {
            var _this = this;
            if (!value)
                return;
            if (!value.w2ui) {
                value.w2ui = {};
            }
            value.recid = this.GenerateRecId();
            if (this.RowStyleBinding) {
                var defaultValue = this.RowStyleBinding(value);
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.style = defaultValue;
                }
                if (!value.__rowStyleObserver) {
                    var observable = DomBehind.Observable.Register(value, DomBehind.LamdaExpression.Path(this.RowStyleBinding));
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler(function (ss, ee) {
                        var id = ss.recid;
                        var style = _this.RowStyleBinding(ss);
                        value.w2ui.style = style;
                        _this.Grid.refreshRow(id);
                    });
                    value.__rowStyleObserver = observable;
                }
            }
            if (this.CellStyleBinding) {
                var defaultValue = this.CellStyleBinding(value);
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.style = this.ParseCellStyles(defaultValue);
                }
                var observable = DomBehind.Observable.Register(value, DomBehind.LamdaExpression.Path(this.CellStyleBinding));
                if (!Object.IsNullOrUndefined(observable)) {
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler(function (ss, ee) {
                        var id = ss.recid;
                        var style = _this.CellStyleBinding(ss);
                        value.w2ui.style = _this.ParseCellStyles(style);
                        _this.Grid.refreshRow(id);
                    });
                }
            }
            if (this.RowClassBinding) {
                var defaultValue = this.RowClassBinding(value);
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.class = defaultValue;
                }
                var expPath = this.ParseExpressionPath(this.RowClassBinding);
                if (!Object.IsNullOrUndefined(expPath)) {
                    var observable = DomBehind.Observable.Register(value, expPath);
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler(function (ss, ee) {
                        var id = ss.recid;
                        var style = _this.RowClassBinding(ss);
                        value.w2ui.class = style;
                        _this.Grid.refreshRow(id);
                    });
                }
            }
            $.each(this.Column, function (i, v) {
                if (v.convertTarget) {
                    var filedInjection = DomBehind.Observable.RegisterAttached(value, {
                        marks: [v.field],
                        wrapper: function (x) { return v.convertTarget(x); }
                    });
                }
            });
        };
        W2GridBindingBehavior.prototype.ParseExpressionPath = function (exp) {
            var result = null;
            try {
                result = DomBehind.LamdaExpression.Path(exp);
            }
            catch (e) {
                console.trace(e);
            }
            return result;
        };
        W2GridBindingBehavior.Refresh = new DomBehind.TypedEvent();
        W2GridBindingBehavior.IsSpinningProperty = DomBehind.Data.DependencyProperty.RegisterAttached("w2ui.isSpinning", function (el) {
        }, function (el, newValue) {
            var oldValue = el.attr("w2ui.isSpinning");
            if (oldValue === "true" && newValue)
                return;
            if (oldValue === "false" && !newValue)
                return;
            el.attr("w2ui.isSpinning", String(newValue));
            var id = el.attr("id");
            var grid = w2ui[id];
            if (grid) {
                if (newValue) {
                    grid.lock("", true);
                }
                else {
                    grid.unlock();
                }
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        return W2GridBindingBehavior;
    }(DomBehind.Data.BindingBehavior));
    DomBehind.W2GridBindingBehavior = W2GridBindingBehavior;
    var W2GridBindingBehaviorBuilder = (function (_super) {
        __extends(W2GridBindingBehaviorBuilder, _super);
        function W2GridBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        Object.defineProperty(W2GridBindingBehaviorBuilder.prototype, "DefaultOption", {
            get: function () {
                return {
                    caption: '',
                    field: '',
                    size: null,
                    min: "15",
                    max: null,
                    hidden: false,
                    hideable: true,
                    sortable: true,
                    searchable: false,
                    resizable: true,
                    attr: '',
                    style: '',
                    render: null,
                    title: null,
                    editable: null,
                    frozen: false,
                    info: null,
                };
            },
            enumerable: true,
            configurable: true
        });
        W2GridBindingBehaviorBuilder.prototype.ColumnBinding = function (title, binding, option) {
            var op = $.extend(true, this.DefaultOption, option);
            op.caption = title;
            op.field = DomBehind.LamdaExpression.Path(binding);
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.AddColumn(op);
            return this;
        };
        W2GridBindingBehaviorBuilder.prototype.RowStyleBinding = function (styleBinding) {
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.RowStyleBinding = styleBinding;
            return this;
        };
        W2GridBindingBehaviorBuilder.prototype.RowCssBinding = function (classBinding) {
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.RowClassBinding = classBinding;
            return this;
        };
        W2GridBindingBehaviorBuilder.prototype.CellStyleBinding = function (cellStyleBinding) {
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.CellStyleBinding = cellStyleBinding;
            return this;
        };
        return W2GridBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.W2GridBindingBehaviorBuilder = W2GridBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildGrid = function (itemSource, option) {
        option = $.extend(true, {}, option);
        var me = this;
        var behavior = me.Add(new W2GridBindingBehavior());
        behavior.NewAdd = function (x) { return me.Add(x); };
        behavior.ItemsSource = new DomBehind.LamdaExpression(me.Owner.DataContext, itemSource);
        behavior.GridOption = option;
        if (option.isSpinning) {
            var b = me.Add(new DomBehind.Data.DataBindingBehavior());
            b.Property = W2GridBindingBehavior.IsSpinningProperty;
            b.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, option.isSpinning);
        }
        me.CurrentBehavior = behavior;
        var newMe = new W2GridBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = me.CurrentBehavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function ShowW2alert(message, title, okCallback) {
    return w2alert(message, title, okCallback);
}
function ShowW2confirm(message, title, okCallback, cancelCallback) {
    return w2confirm(message, title, okCallback).no(function () {
        if (cancelCallback)
            cancelCallback();
    });
}
var DomBehind;
(function (DomBehind) {
    var TemplatePopup = (function (_super) {
        __extends(TemplatePopup, _super);
        function TemplatePopup() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Bindings = new DomBehind.List();
            return _this;
        }
        Object.defineProperty(TemplatePopup.prototype, "CurrentElement", {
            get: function () {
                return this._currentElement;
            },
            set: function (newValue) {
                if (this._currentElement === newValue)
                    return;
                if (this._currentElement) {
                    this.Unsubscribe(this._currentElement);
                }
                this._currentElement = newValue;
                if (newValue) {
                    this.Subscribe(newValue);
                }
            },
            enumerable: true,
            configurable: true
        });
        TemplatePopup.prototype.Unsubscribe = function (value) {
            if (!this.Bindings)
                return;
            $.each(this.Bindings.toArray(), function (i, each) {
                var binding = each.Binding;
                binding.Element.off();
                if (binding instanceof DomBehind.Data.ActionBindingBehavior) {
                    binding.Event.Clear();
                }
            });
        };
        TemplatePopup.prototype.Subscribe = function (value) {
            if (!this.Bindings)
                return;
            $.each(this.Bindings.toArray(), function (i, each) {
                var binding = each.Binding;
                var selector = each.Selector;
                var el = value.find(selector);
                if (el) {
                    binding.Element = el;
                    binding.Ensure();
                }
            });
        };
        Object.defineProperty(TemplatePopup.prototype, "LastBinding", {
            get: function () {
                var b = this.Bindings.last();
                return b ? b.Binding : null;
            },
            enumerable: true,
            configurable: true
        });
        TemplatePopup.prototype.Close = function () {
            w2popup.close();
        };
        TemplatePopup.prototype.Show = function () {
            var option = this.CreateOption();
            w2popup.open(option);
        };
        TemplatePopup.prototype.Message = function () {
            var option = this.CreateOption();
            w2popup.message(option);
        };
        TemplatePopup.prototype.CreateOption = function () {
            var template = this.Element;
            var div = this.FindTemplate(template);
            this.CurrentElement = div.clone();
            if (!this.CurrentElement)
                return;
            this.UpdateTarget();
            var option = $.extend(true, {}, this.Option);
            option.body = this.CurrentElement;
            if (this.TitleExpression) {
                option.title = this.TitleExpression.GetValue();
            }
            return option;
        };
        TemplatePopup.prototype.UpdateTarget = function () {
            if (!this.Bindings)
                return;
            $.each(this.Bindings.toArray(), function (i, value) {
                if (value.Binding instanceof DomBehind.Data.DataBindingBehavior) {
                    value.Binding.UpdateTarget();
                }
            });
        };
        TemplatePopup.prototype.UpdateSource = function () {
            if (!this.Bindings)
                return;
            $.each(this.Bindings.toArray(), function (i, value) {
                if (value.Binding instanceof DomBehind.Data.DataBindingBehavior) {
                    value.Binding.UpdateSource();
                }
            });
        };
        TemplatePopup.prototype.AddBinding = function (binding, selector) {
            this.Bindings.add({ Binding: binding, Selector: selector });
            return binding;
        };
        TemplatePopup.prototype.FindTemplate = function (jtemplate) {
            var support = ("content" in document.createElement("template"));
            if (support) {
                var temp = jtemplate[0];
                var template = $(temp.content.querySelector("div"));
                return template;
            }
            else {
                var temp = jtemplate[0];
                var template = $(temp.querySelector("div"));
                return template;
            }
        };
        return TemplatePopup;
    }(DomBehind.Data.DataBindingBehavior));
    DomBehind.TemplatePopup = TemplatePopup;
    var PopupTemplateBindingBuilder = (function (_super) {
        __extends(PopupTemplateBindingBuilder, _super);
        function PopupTemplateBindingBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PopupTemplateBindingBuilder.prototype.Element = function (value) {
            var me = this;
            me.CurrentSelector = value;
            return me;
        };
        PopupTemplateBindingBuilder.prototype.Binding = function (property, bindingExpression, mode, updateTrigger) {
            var me = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                var bkBehavior = me.CurrentBehavior;
                var bkElement = me.CurrentElement;
                var behavior = me.CurrentBehavior.AddBinding(new DomBehind.Data.DataBindingBehavior(), me.CurrentSelector);
                behavior.DataContext = me.CurrentBehavior.DataContext;
                behavior.Property = property;
                behavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, bindingExpression);
                behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
                behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;
                me.CurrentBehavior = bkBehavior;
                me.CurrentElement = bkElement;
            }
            return me;
        };
        PopupTemplateBindingBuilder.prototype.ConvertTarget = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                var lastBehavior = me.CurrentBehavior.LastBinding;
                if (lastBehavior) {
                    if (lastBehavior.BindingPolicy.Converter) {
                        throw new DomBehind.Exception("Another 'IValueConverter' has already been assigned.");
                    }
                    var conv = new DomBehind.SimpleConverter();
                    conv.ConvertHandler = exp;
                    lastBehavior.BindingPolicy.Converter = conv;
                }
            }
            return me;
        };
        PopupTemplateBindingBuilder.prototype.ConvertSource = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                var lastBehavior = me.CurrentBehavior.LastBinding;
                if (lastBehavior) {
                    if (lastBehavior.BindingPolicy.Converter) {
                        throw new DomBehind.Exception("Another 'IValueConverter' has already been assigned.");
                    }
                    var conv = new DomBehind.SimpleConverter();
                    conv.ConvertBackHandler = exp;
                    lastBehavior.BindingPolicy.Converter = conv;
                }
            }
            return me;
        };
        PopupTemplateBindingBuilder.prototype.BindingAction = function (event, action, allowBubbling) {
            if (allowBubbling === void 0) { allowBubbling = false; }
            var me = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                var newBehavior = me.CurrentBehavior.AddBinding(new DomBehind.Data.ActionBindingBehavior(), me.CurrentSelector);
                newBehavior.DataContext = me.CurrentBehavior.DataContext;
                newBehavior.Event = event.Create();
                newBehavior.Action = action;
                newBehavior.ActionParameterCount = action.length;
                newBehavior.AllowBubbling = allowBubbling;
            }
            return me;
        };
        PopupTemplateBindingBuilder.prototype.BindingPopupTitle = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                me.CurrentBehavior.TitleExpression = new DomBehind.LamdaExpression(me.CurrentBehavior.DataContext, exp);
            }
            return me;
        };
        PopupTemplateBindingBuilder.prototype.AddValidator = function (validator) {
            var me = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                var childBehavior = me.CurrentBehavior.LastBinding;
                if (childBehavior instanceof DomBehind.Data.DataBindingBehavior) {
                    validator.Behavior = childBehavior;
                    me.CurrentBehavior.BindingPolicy.Validators.add(validator);
                }
            }
            return validator;
        };
        return PopupTemplateBindingBuilder;
    }(DomBehind.Data.DataBindingBehaviorBuilder));
    DomBehind.PopupTemplateBindingBuilder = PopupTemplateBindingBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildTemplatePopup = function (controller, option) {
        var me = this;
        var behavior = me.Add(new TemplatePopup());
        behavior.Element = me.CurrentElement;
        behavior.Option = option;
        var exp = new DomBehind.LamdaExpression(me.Owner.DataContext, controller);
        exp.SetValue(behavior);
        var newMe = new PopupTemplateBindingBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));