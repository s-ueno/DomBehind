namespace DomBehind {
    export interface IFooterOption<TViewModel> {

    }
    export interface IHeaderOption<TViewModel> {
        add?: (x: TViewModel, row: any) => any;
        edit?: (x: TViewModel, row: any) => void;
        delete?: (x: TViewModel, row: any) => void;
        save?: (x: TViewModel, row: any) => void;
    }

    export interface IGridOption<TViewModel> {
        multiSelect?: boolean;
        dragAndDropRow?: boolean;

        onSelect?: (x: TViewModel, args) => void;
        onDoubleClick?: (x: TViewModel, args) => void;
        isSpinning?: (x: TViewModel) => boolean;

        footerOption?: IFooterOption<TViewModel>;
        headerOption?: IHeaderOption<TViewModel>;
    }

    export enum FieldType {
        /* text */
        Text = 1,
        /* int */
        Int,
        /* float */
        Double,
        /* date */
        Date,
        /* hex */
        Hex,
        /* money */
        Money,
        /* currency */
        Currency,
        /* percent */
        Percent,
        /* alphanumeric */
        Alphanumeric,
        /* time */
        Time,
        /* color */
        Color,
        /* list */
        List,
        /* combo */
        Combo,
        /* check */
        Check,
        /* checkbox */
        Checkbox,
        /* select */
        Select,
    }
    export interface IColumnBinding<TRow>
        extends IColumnBindingOption, IColumnConverter {

        advancedSearch?: FieldType;
        renderType?: RenderType;
    }
    /**
     * シンプルなカスタム表示
     * */
    export enum RenderType {
        /* 三桁カンマ区切りで表示する数値表現 */
        Number = 1,
        /* 10進表示(decimal) */
        Currency,
        /* 金額表示 */
        Money,
        /* % 表示 */
        Percent,
        /* 時間 */
        Time,
        /* 日付 */
        Date,
        /* 年齢 */
        Age,
        /* トグル */
        Toggle,

        /* チェックボックス */
        CheckBox
    }

    export interface IColumnConverter {
        convertTarget?: (x: any) => any;
    }

    export interface IColumnBindingOption {
        /* column caption */
        caption?: string;
        /*  field name to map column to a record */
        field?: string;

        /* size of column in px or % */
        size?: string;
        /* minimum width of column in px */
        min?: string;
        /* maximum width of column in px */
        max?: string;

        /* indicates if column is hidden */
        hidden?: boolean;
        /* indicates if column can be hidden */
        hideable?: boolean;

        /* indicates if column is sortable */
        sortable?: boolean;
        /* indicates if column is searchable, bool/string: int,float,date,... */
        searchable?: boolean;
        /* indicates if column is resizable */
        resizable?: boolean;

        /* string that will be inside the <td ... attr> tag */
        attr?: string;
        /*
         * additional style for the td tag 
         * 
         * 例)
         *  'text-align: center'
         *  
         */
        style?: string;
        /* 
         * string or render function
         * 
         * render function 例)
         * 
            render: function (record) {
                return '<div>' + record.fname + ' ' + record.lname + '</div>';
            }
         * */
        render?: string | Function;
        /* string or function for the title property for the column cells */
        title?: string;
        /* editable object if column fields are editable */
        editable?: {
            /* text, int, money, percent, color, date, time, list, combo, select  */
            fieldType?: FieldType,
            min?: number,
            max?: number,
            precision?: number,
            itemSource?: (vm: any) => any[],
            showAll?: boolean,
        };

        /* indicates if the column is fixed to the left */
        frozen?: boolean;
        /* info bubble, can be bool/object */
        info?: any;
    }
    interface IEditable {
        type?: string,
        min?: number,
        max?: number,
        precision?: number,
        items?: any,
        showAll?: boolean,
    }
    class EditableWrapper implements IEditable {
        constructor(protected Owner: any) {
        }
        public fieldType: FieldType;
        public min: number;
        public max: number;
        public precision: number;
        public showAll: boolean;
        public itemSource?: (vm: any) => any[];
        public get items(): any {
            if (!this.itemSource) return null;
            if (!this.__items) {
                let exp = new LamdaExpression(this.Owner, this.itemSource);
                this.__items = exp.GetValue();
            }
            return this.__items;
        }
        private __items;

        public get type(): string {
            if (!this.__type) {
                this.__type = W2GridBindingBehavior.FieldTypeToString(this.fieldType);
            }
            return this.__type;
        }
        __type: string;
    }

    export class W2GridBindingBehavior extends Data.BindingBehavior {
        public static Refresh = new DomBehind.TypedEvent<any>();
        public static IsSpinningProperty = Data.DependencyProperty.RegisterAttached("w2ui.isSpinning",
            el => {
                //let value = el.attr("w2ui.isSpinning");
                //if (!value) return false;
                //return Boolean(value);
            },
            (el: JQuery, newValue: boolean) => {
                let oldValue = el.attr("w2ui.isSpinning");
                if (oldValue === "true" && newValue) return;
                if (oldValue === "false" && !newValue) return;

                el.attr("w2ui.isSpinning", String(newValue));

                let id = el.attr("id");
                let grid: W2UI.W2Grid = w2ui[id] as W2UI.W2Grid;
                if (grid) {
                    if (newValue) {
                        grid.lock("", true);
                    } else {
                        grid.unlock();
                    }
                }
            },
            Data.UpdateSourceTrigger.Explicit,
            Data.BindingMode.OneWay
        );
        public NewAdd: (value: Data.DataBindingBehavior) => Data.DataBindingBehavior;
        public ItemsSource: PropertyInfo;
        public ListCollectionView: Data.ListCollectionView;
        public GridOption: IGridOption<any>;
        public RowStyleBinding: (row: any) => any;
        public CellStyleBinding: (row: any) => any;
        public RowClassBinding: (row: any) => any;
        public Column: IColumnBinding<any>[] = [];
        protected Grid: W2UI.W2Grid;
        public RowClassBindingConverter: (obj: any) => string;
        public RowStyleBindingConverter: (obj: any) => string;
        public CellStyleBindingConverter: (obj: any) => string;
        protected get IsMultiSelect(): boolean {
            if (this.GridOption && this.GridOption.multiSelect) {
                return true;
            }
            return false;
        }

        protected GenerateRecId(): number {
            return ++this.__id;
        }
        private __id: number = 0;

        public get SelectedObject(): any {
            let ids = this.Grid.getSelection();
            if (!ids || ids.length === 0) return null;
            let rows = [];
            $.each(this.Grid.records, (i, each: any) => {
                if (ids.Any(x => x === each.recid)) {
                    rows.push(each);
                }
            });

            if (this.IsMultiSelect) {
                return rows;
            }
            return rows.FirstOrDefault();
        }

        public AddColumn(binding: IColumnBinding<any>) {
            this.Column.push(binding);
        }

        public Ensure(): void {
            let id = this.Element.attr('id');
            if (!id) {
                id = NewUid();
                this.Element.attr('id', id);
            }

            let readOnly = new Array<IColumnBinding<any>>();
            $.each(this.Column, (i, each) => {
                if (each.renderType) {
                    if (each.renderType === RenderType.CheckBox) {
                        each.editable = $.extend(true, each.editable, { fieldType: FieldType.Checkbox })

                        readOnly.push(each);
                    } else {
                        each.render = W2GridBindingBehavior.RenderTypeToString(each.renderType);
                    }

                }
                if (each.editable) {
                    each.editable = $.extend(true, new EditableWrapper(this.DataContext), each.editable);
                }
            });

            let w2GridOption: any = {
                name: id,
                columns: this.Column,
                show: {
                    selectColumn: false,
                },
                multiSelect: false,
                keyboard: true,
            };

            w2GridOption.onChange = e => {
                if (!this.Grid) return;

                let columnId = e.column;
                let column: any = this.Grid.columns[columnId];
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
            }
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

            let dp = Data.DependencyProperty.RegisterAttached("itemsSource",
                el => {
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
                }, (el: JQuery, newValue: any) => {
                    if (newValue instanceof Data.ListCollectionView) {
                        this.ListCollectionView = newValue;

                        let id = el.attr("id");
                        let grid: W2UI.W2Grid = w2ui[id] as W2UI.W2Grid;
                        if (grid) {
                            let rows = newValue.ToArray();
                            if (grid.records === rows) return;

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
                },
                Data.UpdateSourceTrigger.Explicit
            );
            let itemSource: Data.DataBindingBehavior = this.NewAdd(new Data.DataBindingBehavior());
            itemSource.Property = dp;
            itemSource.PInfo = this.ItemsSource;
            itemSource.Element = this.Element;

            W2GridBindingBehavior.Refresh.AddHandler((sender, e) => {
                try {
                    this.Grid.refresh();
                } catch (e) {
                    // error free
                }
            });
        }
        protected SuppressListCollectionViewAction(action: (lc: Data.ListCollectionView) => void) {
            // 通知イベントを落とした状態で、モデルのカレントレコードを設定する
            this.ListCollectionView.Begin();
            action(this.ListCollectionView);
            this.ListCollectionView.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.Reflected;
            this.ListCollectionView.End();
        }

        public OnSelect(sender, e) {
            if (!this.GridOption.onSelect) {
                return;
            }

            let recId = e.recid;
            let obj = this.Grid.get(recId);

            this.SuppressListCollectionViewAction(x => x.Current = obj);
            this.GridOption.onSelect(sender, obj);
        }
        public OnDoubleClick(sender, e) {
            if (this.GridOption && this.GridOption.onDoubleClick) {
                let id = this.Element.attr("id");
                let grid: W2UI.W2Grid = w2ui[id] as W2UI.W2Grid;
                if (grid) {
                    let recId = e.recid;
                    let obj = grid.get(recId);
                    this.SuppressListCollectionViewAction(x => x.Current = obj);
                    this.GridOption.onDoubleClick(sender, obj);


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
        public OnToolbarAdd(sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.add) {

                let newRow = this.GridOption.headerOption.add(sender, e);
                if (newRow)
                    this.AddRow(newRow);
            }
        }
        protected AddRow(row) {
            this.RowInjection(row);

            this.Grid.records.push(row);
            this.Grid.total = this.Grid.records.length;
            this.SuppressListCollectionViewAction(x => x.Add(row));
            this.Grid.refresh(row.recid);
            this.Grid.select(row.recid);
            this.Grid.scrollIntoView(row.recid);
        }
        public OnToolbarEdit(sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.edit) {

                let recId = e.recid;
                let row = this.Grid.get(recId);
                this.GridOption.headerOption.edit(sender, row);
            }
        }
        public OnToolbarSave(sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.save) {

                let recId = e.recid;
                let row = this.Grid.get(recId);
                this.GridOption.headerOption.save(sender, row);
            }
        }

        private _deleteTargets: any;
        public OnToolbarDelete(sender, e) {
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

        private OnCurrentChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs) {
            // プロパティ未指定の場合は、リフレッシュする
            if (String.IsNullOrWhiteSpace(e.Name)) {
                if (this.Grid) {
                    this.Grid.refresh();
                }
            } else if (e.Name === "Current") {
                // カレント行が変更されたので、選択状態とする

            }
        }

        public static FieldTypeToString(type: FieldType) {
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
        public static RenderTypeToString(type: RenderType) {
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

        private ParseCellStyles(value: string) {
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


        private RowInjection(value: any) {
            if (!value) return;

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
                    let observable = Observable.Register(value, LamdaExpression.Path(this.RowStyleBinding));
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
                let observable = Observable.Register(value, LamdaExpression.Path(this.CellStyleBinding));
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
                    let observable = Observable.Register(value, expPath);
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
                    let filedInjection = Observable.RegisterAttached(value, {
                        marks: [v.field],
                        wrapper: x => v.convertTarget(x)
                    });
                }
            });
        }

        private ParseExpressionPath(exp: any): string {
            let result: any = null;
            try {
                result = LamdaExpression.Path(exp);
            } catch (e) {
                console.trace(e);
            }
            return result;
        }
    }

    export class W2GridBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T>{
        constructor(owner: BizView) {
            super(owner);
        }

        protected get DefaultOption(): IColumnBindingOption {
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

        public ColumnBinding(title: string, binding: (row: T) => any, option?: IColumnBinding<T>): W2GridBindingBehaviorBuilder<T> {
            let op: IColumnBinding<T> = $.extend(true, this.DefaultOption, option);
            op.caption = title;
            op.field = LamdaExpression.Path(binding);

            let gridBehavior: W2GridBindingBehavior = this.CurrentBehavior as W2GridBindingBehavior;
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
        public RowStyleBinding(styleBinding: (row: T) => any, convertTarget?: (obj: any) => string): W2GridBindingBehaviorBuilder<T> {
            let gridBehavior: W2GridBindingBehavior = this.CurrentBehavior as W2GridBindingBehavior;
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
        public RowCssBinding(classBinding: (row: T) => any, convertTarget?: (obj: any) => string): W2GridBindingBehaviorBuilder<T> {
            let gridBehavior: W2GridBindingBehavior = this.CurrentBehavior as W2GridBindingBehavior;
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
        public CellStyleBinding(cellStyleBinding: (row: T) => any, convertTarget?: (obj: any) => string): W2GridBindingBehaviorBuilder<T> {
            let gridBehavior: W2GridBindingBehavior = this.CurrentBehavior as W2GridBindingBehavior;
            gridBehavior.CellStyleBindingConverter = convertTarget;
            gridBehavior.CellStyleBinding = cellStyleBinding;
            return this;
        }

    }

    export interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにw2layout機構を組み込みます。
         * 実装例：
         * 
         */
        BuildGrid<TRow>(itemSource: (x: T) => any, option?: IGridOption<T>): W2GridBindingBehaviorBuilder<TRow>;
    }

    BindingBehaviorBuilder.prototype.BuildGrid = function (itemSource: (x: any) => any, option?: IGridOption<any>) {

        option = $.extend(true, {}, option);

        let me: BindingBehaviorBuilder<any> = this;
        let behavior = me.Add(new W2GridBindingBehavior());
        behavior.NewAdd = x => me.Add(x);
        behavior.ItemsSource = new LamdaExpression(me.Owner.DataContext, itemSource);
        behavior.GridOption = option;

        if (option.isSpinning) {
            let b = me.Add(new Data.DataBindingBehavior());
            b.Property = W2GridBindingBehavior.IsSpinningProperty;
            b.PInfo = new LamdaExpression(me.Owner.DataContext, option.isSpinning);
        }

        // カレントをDataBindingBehaviorに変える
        me.CurrentBehavior = behavior;

        let newMe = new W2GridBindingBehaviorBuilder<any>(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = me.CurrentBehavior;
        return newMe;
    };
}
