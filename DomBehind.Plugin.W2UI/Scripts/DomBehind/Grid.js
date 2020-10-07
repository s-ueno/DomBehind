var DomBehind;
(function (DomBehind) {
    let FieldType;
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
    let RenderType;
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
    class EditableWrapper {
        constructor(Owner) {
            this.Owner = Owner;
        }
        get items() {
            if (!this.itemSource)
                return null;
            if (!this.__items) {
                let exp = new DomBehind.LamdaExpression(this.Owner, this.itemSource);
                this.__items = exp.GetValue();
            }
            return this.__items;
        }
        get type() {
            if (!this.__type) {
                this.__type = W2GridBindingBehavior.FieldTypeToString(this.fieldType);
            }
            return this.__type;
        }
    }
    class W2GridBindingBehavior extends DomBehind.Data.BindingBehavior {
        constructor() {
            super(...arguments);
            this.Column = [];
            this.__id = 0;
        }
        get IsMultiSelect() {
            if (this.GridOption && this.GridOption.multiSelect) {
                return true;
            }
            return false;
        }
        GenerateRecId() {
            return ++this.__id;
        }
        get SelectedObject() {
            let ids = this.Grid.getSelection();
            if (!ids || ids.length === 0)
                return null;
            let rows = [];
            $.each(this.Grid.records, (i, each) => {
                if (ids.Any(x => x === each.recid)) {
                    rows.push(each);
                }
            });
            if (this.IsMultiSelect) {
                return rows;
            }
            return rows.FirstOrDefault();
        }
        AddColumn(binding) {
            this.Column.push(binding);
        }
        Ensure() {
            let id = this.Element.attr('id');
            if (!id) {
                id = NewUid();
                this.Element.attr('id', id);
            }
            let readOnly = new Array();
            $.each(this.Column, (i, each) => {
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
                    each.editable = $.extend(true, new EditableWrapper(this.DataContext), each.editable);
                }
            });
            let w2GridOption = {
                name: id,
                columns: this.Column,
                show: {
                    selectColumn: false,
                },
                multiSelect: false,
                keyboard: true,
            };
            w2GridOption.onChange = e => {
                if (!this.Grid)
                    return;
                let columnId = e.column;
                let column = this.Grid.columns[columnId];
                if (column) {
                    let field = column.field;
                    let caption = column.caption;
                    if (readOnly.Any(x => x.field === field && x.caption === caption)) {
                        e.preventDefault();
                    }
                }
            };
            w2GridOption.onDblClick = e => {
                this.OnDoubleClick(this.DataContext, e);
            };
            if (this.GridOption.footerOption) {
                w2GridOption.show.footer = true;
            }
            if (this.GridOption.headerOption) {
                w2GridOption.show.toolbar = true;
                // add
                if (this.GridOption.headerOption.add) {
                    w2GridOption.show.toolbarAdd = true;
                    w2GridOption.onAdd = e => this.OnToolbarAdd(this.DataContext, e);
                }
                // edit
                if (this.GridOption.headerOption.edit) {
                    w2GridOption.show.toolbarEdit = true;
                    w2GridOption.onEdit = e => this.OnToolbarEdit(this.DataContext, e);
                }
                // save
                if (this.GridOption.headerOption.save) {
                    w2GridOption.show.toolbarSave = true;
                    w2GridOption.onSave = e => this.OnToolbarSave(this.DataContext, e);
                }
                // delete
                if (this.GridOption.headerOption.delete) {
                    w2GridOption.show.toolbarDelete = true;
                    w2GridOption.onDelete = e => this.OnToolbarDelete(this.DataContext, e);
                }
            }
            if (this.GridOption.multiSelect) {
                w2GridOption.multiSelect = true;
            }
            if (this.GridOption.dragAndDropRow) {
                w2GridOption.reorderRows = true;
            }
            let advancedColumns = this.Column.Where(x => !Object.IsNullOrUndefined(x.advancedSearch));
            if (advancedColumns.Any()) {
                w2GridOption.multiSearch = true;
                w2GridOption.searches = advancedColumns.Select(x => {
                    return {
                        field: x.field,
                        caption: x.caption,
                        type: W2GridBindingBehavior.FieldTypeToString(x.advancedSearch),
                    };
                });
            }
            // hack
            this.Grid = this.Element.w2grid(w2GridOption);
            let dp = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", el => {
                // UpdateSourceで選択状態を更新する
                if (this.ListCollectionView && this.Grid) {
                    // 選択状態を解除
                    this.ListCollectionView.Current = null;
                    let selections = this.Grid.getSelection();
                    if (selections && selections.length == 1) {
                        let id = selections[0];
                        let obj = this.ListCollectionView.ToArray().FirstOrDefault(x => x.recid === id);
                        if (obj) {
                            this.ListCollectionView.Select(obj);
                        }
                    }
                }
                // 
                return this.ListCollectionView;
            }, (el, newValue) => {
                if (newValue instanceof DomBehind.Data.ListCollectionView) {
                    this.ListCollectionView = newValue;
                    let id = el.attr("id");
                    let grid = w2ui[id];
                    if (grid) {
                        let rows = newValue.ToArray();
                        if (grid.records === rows)
                            return;
                        $.each(rows, (i, value) => {
                            this.RowInjection(value);
                        });
                        grid.clear(true);
                        grid.records = rows;
                        grid.total = rows.length;
                        grid.refresh();
                        grid.onClick = ee => {
                            this.OnSelect(this.DataContext, ee);
                            // フォーカス用オブジェに合わせる
                            let gridFocus = $(`#grid_${id}_focus`);
                            gridFocus.focus();
                        };
                        newValue.PropertyChanged.RemoveHandler(this.OnCurrentChanged);
                        newValue.PropertyChanged.AddHandler(this.OnCurrentChanged);
                    }
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit);
            let itemSource = this.NewAdd(new DomBehind.Data.DataBindingBehavior());
            itemSource.Property = dp;
            itemSource.PInfo = this.ItemsSource;
            itemSource.Element = this.Element;
            W2GridBindingBehavior.Refresh.AddHandler((sender, e) => {
                try {
                    this.Grid.refresh();
                }
                catch (e) {
                    // error free
                }
            });
        }
        SuppressListCollectionViewAction(action) {
            // 通知イベントを落とした状態で、モデルのカレントレコードを設定する
            this.ListCollectionView.Begin();
            action(this.ListCollectionView);
            this.ListCollectionView.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
            this.ListCollectionView.End();
        }
        OnSelect(sender, e) {
            if (!this.GridOption.onSelect) {
                return;
            }
            let recId = e.recid;
            let obj = this.Grid.get(recId);
            this.SuppressListCollectionViewAction(x => x.Current = obj);
            this.GridOption.onSelect(sender, obj, e);
        }
        OnDoubleClick(sender, e) {
            if (this.GridOption && this.GridOption.onDoubleClick) {
                let id = this.Element.attr("id");
                let grid = w2ui[id];
                if (grid) {
                    let recId = e.recid;
                    let obj = grid.get(recId);
                    this.SuppressListCollectionViewAction(x => x.Current = obj);
                    this.GridOption.onDoubleClick(sender, obj, e);
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
        }
        OnToolbarAdd(sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.add) {
                let newRow = this.GridOption.headerOption.add(sender, e);
                if (newRow)
                    this.AddRow(newRow);
            }
        }
        AddRow(row) {
            this.RowInjection(row);
            this.Grid.records.push(row);
            this.Grid.total = this.Grid.records.length;
            this.SuppressListCollectionViewAction(x => x.Add(row));
            this.Grid.refresh(row.recid);
            this.Grid.select(row.recid);
            this.Grid.scrollIntoView(row.recid);
        }
        OnToolbarEdit(sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.edit) {
                let recId = e.recid;
                let row = this.Grid.get(recId);
                this.GridOption.headerOption.edit(sender, row);
            }
        }
        OnToolbarSave(sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.save) {
                let recId = e.recid;
                let row = this.Grid.get(recId);
                this.GridOption.headerOption.save(sender, row);
            }
        }
        OnToolbarDelete(sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.delete) {
                // 消す直前に来る処理でバックアップを取得する
                if (!e.force) {
                    this._deleteTargets = this.SelectedObject;
                }
                if (e.done) {
                    e.done(x => {
                        this.GridOption.headerOption.delete(sender, this._deleteTargets);
                    });
                }
            }
        }
        OnCurrentChanged(sender, e) {
            // プロパティ未指定の場合は、リフレッシュする
            if (String.IsNullOrWhiteSpace(e.Name)) {
                if (this.Grid) {
                    this.Grid.refresh();
                }
            }
            else if (e.Name === "Current") {
                // カレント行が変更されたので、選択状態とする
            }
        }
        static FieldTypeToString(type) {
            let result = "text";
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
        }
        static RenderTypeToString(type) {
            let result = "";
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
        }
        ParseCellStyles(value) {
            let json = JSON.parse(value);
            let styleArray = [];
            for (var each in json) {
                for (var i = 0; i < this.Column.length; i++) {
                    let c = this.Column[i];
                    // フィールド名が一致
                    if (c.field === each) {
                        styleArray[i] = json[each];
                        break;
                    }
                }
            }
            return styleArray;
        }
        RowInjection(value) {
            if (!value)
                return;
            if (!value.w2ui) {
                value.w2ui = {};
            }
            value.recid = this.GenerateRecId();
            // Row Style Binding
            if (this.RowStyleBinding) {
                // defaultStyle
                let defaultValue = this.RowStyleBinding(value);
                if (this.RowStyleBindingConverter) {
                    defaultValue = this.RowStyleBindingConverter(defaultValue);
                }
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.style = defaultValue;
                }
                // build bind
                if (!value.__rowStyleObserver) {
                    let observable = DomBehind.Observable.Register(value, DomBehind.LamdaExpression.Path(this.RowStyleBinding));
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler((ss, ee) => {
                        let id = ss.recid;
                        let style = this.RowStyleBinding(ss);
                        if (this.RowStyleBindingConverter) {
                            style = this.RowStyleBindingConverter(style);
                        }
                        value.w2ui.style = style;
                        this.Grid.refreshRow(id);
                    });
                    value.__rowStyleObserver = observable;
                }
            }
            // Cell Style Binding
            if (this.CellStyleBinding) {
                // defaultStyle
                let defaultValue = this.CellStyleBinding(value);
                if (this.CellStyleBindingConverter) {
                    defaultValue = this.CellStyleBindingConverter(defaultValue);
                }
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.style = this.ParseCellStyles(defaultValue);
                }
                // build bind
                let observable = DomBehind.Observable.Register(value, DomBehind.LamdaExpression.Path(this.CellStyleBinding));
                if (!Object.IsNullOrUndefined(observable)) {
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler((ss, ee) => {
                        let id = ss.recid;
                        let style = this.CellStyleBinding(ss);
                        if (this.CellStyleBindingConverter) {
                            style = this.CellStyleBindingConverter(style);
                        }
                        value.w2ui.style = this.ParseCellStyles(style);
                        this.Grid.refreshRow(id);
                    });
                }
            }
            // css of record binding
            if (this.RowClassBinding) {
                // default style
                let defaultValue = this.RowClassBinding(value);
                if (this.RowClassBindingConverter) {
                    defaultValue = this.RowClassBindingConverter(defaultValue);
                }
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.class = defaultValue;
                }
                // build bind
                let expPath = this.ParseExpressionPath(this.RowClassBinding);
                if (!Object.IsNullOrUndefined(expPath)) {
                    let observable = DomBehind.Observable.Register(value, expPath);
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler((ss, ee) => {
                        let id = ss.recid;
                        let style = this.RowClassBinding(ss);
                        if (this.RowClassBindingConverter) {
                            style = this.RowClassBindingConverter(style);
                        }
                        value.w2ui.class = style;
                        this.Grid.refreshRow(id);
                    });
                }
            }
            $.each(this.Column, (i, v) => {
                if (v.convertTarget) {
                    let filedInjection = DomBehind.Observable.RegisterAttached(value, {
                        marks: [v.field],
                        wrapper: x => v.convertTarget(x)
                    });
                }
            });
        }
        ParseExpressionPath(exp) {
            let result = null;
            try {
                result = DomBehind.LamdaExpression.Path(exp);
            }
            catch (e) {
                console.trace(e);
            }
            return result;
        }
    }
    W2GridBindingBehavior.Refresh = new DomBehind.TypedEvent();
    W2GridBindingBehavior.IsSpinningProperty = DomBehind.Data.DependencyProperty.RegisterAttached("w2ui.isSpinning", el => {
        //let value = el.attr("w2ui.isSpinning");
        //if (!value) return false;
        //return Boolean(value);
    }, (el, newValue) => {
        let oldValue = el.attr("w2ui.isSpinning");
        if (oldValue === "true" && newValue)
            return;
        if (oldValue === "false" && !newValue)
            return;
        el.attr("w2ui.isSpinning", String(newValue));
        let id = el.attr("id");
        let grid = w2ui[id];
        if (grid) {
            if (newValue) {
                grid.lock("", true);
            }
            else {
                grid.unlock();
            }
        }
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    DomBehind.W2GridBindingBehavior = W2GridBindingBehavior;
    class W2GridBindingBehaviorBuilder extends DomBehind.BindingBehaviorBuilder {
        constructor(owner) {
            super(owner);
        }
        get DefaultOption() {
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
        }
        ColumnBinding(title, binding, option) {
            let op = $.extend(true, this.DefaultOption, option);
            op.caption = title;
            op.field = DomBehind.LamdaExpression.Path(binding);
            let gridBehavior = this.CurrentBehavior;
            gridBehavior.AddColumn(op);
            return this;
        }
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
        RowStyleBinding(styleBinding, convertTarget) {
            let gridBehavior = this.CurrentBehavior;
            gridBehavior.RowStyleBindingConverter = convertTarget;
            gridBehavior.RowStyleBinding = styleBinding;
            return this;
        }
        /**
         * 任意のclass属性を行にバインドします
         *
         * @param classBinding css名の文字列を示すプロパティ先をラムダで指定します
         *
         */
        RowCssBinding(classBinding, convertTarget) {
            let gridBehavior = this.CurrentBehavior;
            gridBehavior.RowClassBinding = classBinding;
            gridBehavior.RowClassBindingConverter = convertTarget;
            return this;
        }
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
        CellStyleBinding(cellStyleBinding, convertTarget) {
            let gridBehavior = this.CurrentBehavior;
            gridBehavior.CellStyleBindingConverter = convertTarget;
            gridBehavior.CellStyleBinding = cellStyleBinding;
            return this;
        }
    }
    DomBehind.W2GridBindingBehaviorBuilder = W2GridBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildGrid = function (itemSource, option) {
        option = $.extend(true, {}, option);
        let me = this;
        let behavior = me.Add(new W2GridBindingBehavior());
        behavior.NewAdd = x => me.Add(x);
        behavior.ItemsSource = new DomBehind.LamdaExpression(me.Owner.DataContext, itemSource);
        behavior.GridOption = option;
        if (option.isSpinning) {
            let b = me.Add(new DomBehind.Data.DataBindingBehavior());
            b.Property = W2GridBindingBehavior.IsSpinningProperty;
            b.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, option.isSpinning);
        }
        // カレントをDataBindingBehaviorに変える
        me.CurrentBehavior = behavior;
        let newMe = new W2GridBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = me.CurrentBehavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Grid.js.map