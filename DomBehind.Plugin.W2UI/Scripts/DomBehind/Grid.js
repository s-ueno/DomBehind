var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
        /* text */
        FieldType[FieldType["Text"] = 1] = "Text";
        /* int */
        FieldType[FieldType["Int"] = 2] = "Int";
        /* float */
        FieldType[FieldType["Double"] = 3] = "Double";
        /* date */
        FieldType[FieldType["Date"] = 4] = "Date";
        /* hex */
        FieldType[FieldType["Hex"] = 5] = "Hex";
        /* money */
        FieldType[FieldType["Money"] = 6] = "Money";
        /* currency */
        FieldType[FieldType["Currency"] = 7] = "Currency";
        /* percent */
        FieldType[FieldType["Percent"] = 8] = "Percent";
        /* alphanumeric */
        FieldType[FieldType["Alphanumeric"] = 9] = "Alphanumeric";
        /* time */
        FieldType[FieldType["Time"] = 10] = "Time";
        /* color */
        FieldType[FieldType["Color"] = 11] = "Color";
        /* list */
        FieldType[FieldType["List"] = 12] = "List";
        /* combo */
        FieldType[FieldType["Combo"] = 13] = "Combo";
        /* check */
        FieldType[FieldType["Check"] = 14] = "Check";
        /* checkbox */
        FieldType[FieldType["Checkbox"] = 15] = "Checkbox";
        /* select */
        FieldType[FieldType["Select"] = 16] = "Select";
    })(FieldType = DomBehind.FieldType || (DomBehind.FieldType = {}));
    /**
     * シンプルなカスタム表示
     * */
    var RenderType;
    (function (RenderType) {
        /* 三桁カンマ区切りで表示する数値表現 */
        RenderType[RenderType["Number"] = 1] = "Number";
        /* 10進表示(decimal) */
        RenderType[RenderType["Currency"] = 2] = "Currency";
        /* 金額表示 */
        RenderType[RenderType["Money"] = 3] = "Money";
        /* % 表示 */
        RenderType[RenderType["Percent"] = 4] = "Percent";
        /* 時間 */
        RenderType[RenderType["Time"] = 5] = "Time";
        /* 日付 */
        RenderType[RenderType["Date"] = 6] = "Date";
        /* 年齢 */
        RenderType[RenderType["Age"] = 7] = "Age";
        /* トグル */
        RenderType[RenderType["Toggle"] = 8] = "Toggle";
        /* チェックボックス */
        RenderType[RenderType["CheckBox"] = 9] = "CheckBox";
    })(RenderType = DomBehind.RenderType || (DomBehind.RenderType = {}));
    var EditableWrapper = /** @class */ (function () {
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EditableWrapper.prototype, "type", {
            get: function () {
                if (!this.__type) {
                    this.__type = W2GridBindingBehavior.FieldTypeToString(this.fieldType);
                }
                return this.__type;
            },
            enumerable: false,
            configurable: true
        });
        return EditableWrapper;
    }());
    var W2GridBindingBehavior = /** @class */ (function (_super) {
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
            enumerable: false,
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
            enumerable: false,
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
            w2GridOption.onDblClick = function (e) {
                _this.OnDoubleClick(_this.DataContext, e);
            };
            if (this.GridOption.footerOption) {
                w2GridOption.show.footer = true;
            }
            if (this.GridOption.headerOption) {
                w2GridOption.show.toolbar = true;
                // add
                if (this.GridOption.headerOption.add) {
                    w2GridOption.show.toolbarAdd = true;
                    w2GridOption.onAdd = function (e) { return _this.OnToolbarAdd(_this.DataContext, e); };
                }
                // edit
                if (this.GridOption.headerOption.edit) {
                    w2GridOption.show.toolbarEdit = true;
                    w2GridOption.onEdit = function (e) { return _this.OnToolbarEdit(_this.DataContext, e); };
                }
                // save
                if (this.GridOption.headerOption.save) {
                    w2GridOption.show.toolbarSave = true;
                    w2GridOption.onSave = function (e) { return _this.OnToolbarSave(_this.DataContext, e); };
                }
                // delete
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
            // hack
            this.Grid = this.Element.w2grid(w2GridOption);
            var dp = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", function (el) {
                // UpdateSourceで選択状態を更新する
                if (_this.ListCollectionView && _this.Grid) {
                    // 選択状態を解除
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
                // 
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
                            // フォーカス用オブジェに合わせる
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
                    // error free
                }
            });
        };
        W2GridBindingBehavior.prototype.SuppressListCollectionViewAction = function (action) {
            // 通知イベントを落とした状態で、モデルのカレントレコードを設定する
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
                    //if (!Object.IsNullOrUndefined(recId)) {
                    //    let selectedRows = grid.getSelection();
                    //    // TODO  
                    //    // let obj = grid.get(recId);
                    //    // this.SuppressListCollectionViewAction(x => x.Current = obj);
                    //    // this.GridOption.onDoubleClick(sender, obj);
                    //} else {
                    //    let obj = grid.get(recId);
                    //    this.SuppressListCollectionViewAction(x => x.Current = obj);
                    //    this.GridOption.onDoubleClick(sender, obj);
                    //}
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
                // 消す直前に来る処理でバックアップを取得する
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
            // プロパティ未指定の場合は、リフレッシュする
            if (String.IsNullOrWhiteSpace(e.Name)) {
                if (this.Grid) {
                    this.Grid.refresh();
                }
            }
            else if (e.Name === "Current") {
                // カレント行が変更されたので、選択状態とする
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
                    // フィールド名が一致
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
            // Row Style Binding
            if (this.RowStyleBinding) {
                // defaultStyle
                var defaultValue = this.RowStyleBinding(value);
                if (this.RowStyleBindingConverter) {
                    defaultValue = this.RowStyleBindingConverter(defaultValue);
                }
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.style = defaultValue;
                }
                // build bind
                if (!value.__rowStyleObserver) {
                    var observable = DomBehind.Observable.Register(value, DomBehind.LamdaExpression.Path(this.RowStyleBinding));
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler(function (ss, ee) {
                        var id = ss.recid;
                        var style = _this.RowStyleBinding(ss);
                        if (_this.RowStyleBindingConverter) {
                            style = _this.RowStyleBindingConverter(style);
                        }
                        value.w2ui.style = style;
                        _this.Grid.refreshRow(id);
                    });
                    value.__rowStyleObserver = observable;
                }
            }
            // Cell Style Binding
            if (this.CellStyleBinding) {
                // defaultStyle
                var defaultValue = this.CellStyleBinding(value);
                if (this.CellStyleBindingConverter) {
                    defaultValue = this.CellStyleBindingConverter(defaultValue);
                }
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.style = this.ParseCellStyles(defaultValue);
                }
                // build bind
                var observable = DomBehind.Observable.Register(value, DomBehind.LamdaExpression.Path(this.CellStyleBinding));
                if (!Object.IsNullOrUndefined(observable)) {
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler(function (ss, ee) {
                        var id = ss.recid;
                        var style = _this.CellStyleBinding(ss);
                        if (_this.CellStyleBindingConverter) {
                            style = _this.CellStyleBindingConverter(style);
                        }
                        value.w2ui.style = _this.ParseCellStyles(style);
                        _this.Grid.refreshRow(id);
                    });
                }
            }
            // css of record binding
            if (this.RowClassBinding) {
                // default style
                var defaultValue = this.RowClassBinding(value);
                if (this.RowClassBindingConverter) {
                    defaultValue = this.RowClassBindingConverter(defaultValue);
                }
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.class = defaultValue;
                }
                // build bind
                var expPath = this.ParseExpressionPath(this.RowClassBinding);
                if (!Object.IsNullOrUndefined(expPath)) {
                    var observable = DomBehind.Observable.Register(value, expPath);
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler(function (ss, ee) {
                        var id = ss.recid;
                        var style = _this.RowClassBinding(ss);
                        if (_this.RowClassBindingConverter) {
                            style = _this.RowClassBindingConverter(style);
                        }
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
            //let value = el.attr("w2ui.isSpinning");
            //if (!value) return false;
            //return Boolean(value);
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
    var W2GridBindingBehaviorBuilder = /** @class */ (function (_super) {
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
            enumerable: false,
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
        /**
         * 行スタイルをバインドします。
         *
         * ラムダで指定されたプロパティに格納する例：
         *  "background-color: #FBFEC0"
         *
         *  注意点として、RowStyleBindingとCellStyleBindingはどちらかしか利用できません。
         *  Rowのスタイル適用　+　Cellに個別スタイルを適用する場合は、CellStyleBinding + RowCssBinding を利用してください。
         *
         * @param styleBinding　style属性値の文字列を示すプロパティ先をラムダで指定します。
         *
         */
        W2GridBindingBehaviorBuilder.prototype.RowStyleBinding = function (styleBinding, convertTarget) {
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.RowStyleBindingConverter = convertTarget;
            gridBehavior.RowStyleBinding = styleBinding;
            return this;
        };
        /**
         * 任意のclass属性を行にバインドします
         *
         * @param classBinding css名の文字列を示すプロパティ先をラムダで指定します
         *
         */
        W2GridBindingBehaviorBuilder.prototype.RowCssBinding = function (classBinding, convertTarget) {
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.RowClassBinding = classBinding;
            gridBehavior.RowClassBindingConverter = convertTarget;
            return this;
        };
        /**
         * セルスタイルをバインドします。
         *
         * ラムダで指定されたプロパティに格納する例（SampleIDフィールド、SampleNameフィールドがあるとして）：
         *  '{ "SampleID": "background-color: #FBFEC0; color: red", "SampleName": "background-color: #FBFEC0" }'
         *
         *  注意点として、RowStyleBindingとCellStyleBindingはどちらかしか利用できません。
         *  Rowのスタイル適用　+　Cellに個別スタイルを適用する場合は、CellStyleBinding + RowCssBinding を利用してください。
         *
         * @param cellStyleBinding style属性値の文字列を示すプロパティ先をラムダで指定します。ただし、列を示すJSON形式です
         */
        W2GridBindingBehaviorBuilder.prototype.CellStyleBinding = function (cellStyleBinding, convertTarget) {
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.CellStyleBindingConverter = convertTarget;
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
        // カレントをDataBindingBehaviorに変える
        me.CurrentBehavior = behavior;
        var newMe = new W2GridBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = me.CurrentBehavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Grid.js.map