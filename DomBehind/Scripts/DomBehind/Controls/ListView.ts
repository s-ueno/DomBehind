namespace DomBehind {


    export interface ITableOption {
        class?: string;

        isHover?: boolean;
        isStriped?: boolean;
        isBordered?: boolean;
    }

    export interface ITableHeaderBodyOption {
        caption?: string;
        width?: string;

        value?: (x: any) => any;
        convertTarget?: (x: any) => any;

        headerClass?: string;
        cellClass?: (x: any) => any;
    }

    export class ListView extends Data.DataBindingBehavior {
        public static ItemsSourceProperty: Data.DependencyProperty = Data.DependencyProperty.RegisterAttached("",
            el => {

            },
            (el, newValue) => {
                let identity = el.attr("listview-identity");
                let me: ListView = window[identity];
                if (newValue instanceof Data.ListCollectionView) {
                    me.ItemsSource = newValue;
                } else {
                    me.ItemsSource = new Data.ListCollectionView([]);
                }
            },
            Data.UpdateSourceTrigger.Explicit,
            Data.BindingMode.OneWay);

        public set ItemsSource(newValue: Data.ListCollectionView) {
            if (Object.IsNullOrUndefined(newValue)) {
                this.Clear();
                this._items = newValue;
                return;
            }

            let newItems = newValue.ToArray();

            if (!Object.IsNullOrUndefined(this._items) &&
                newItems.SequenceEqual(this._items.ToArray())) {
                return;
            }

            this.Clear();

            let body = this.Element.find(`#${this.BodyId}`);
            $.each(newItems, (i, value) => {
                let tr = $("<tr></tr>");

                $.each(this.Columns, (k, column) => {

                    let td = $(`<td></td>`);
                    if (column.cellClass) {
                        td.addClass(column.cellClass);
                    }

                    let cellValue = column.value(value);
                    if (column.convertTarget) {
                        cellValue = column.convertTarget(cellValue);
                    }
                    td.text(cellValue);
                    tr.append(td);
                });
                body.append(tr);
            });
        }

        public Clear() {
            let body = this.Element.find(`#${this.BodyId}`);
            body.empty();
        }

        public get ItemsSource(): Data.ListCollectionView {
            return this._items;
        }
        private _items: Data.ListCollectionView;

        public TableOption: ITableOption;

        protected get DefaultTableOption(): ITableOption {
            return {
                class: "",
            };
        }


        public /* override */  Ensure(): void {
            super.Ensure();

            this.Element.empty();

            if (!this.Element.hasClass("table-responsive")) {
                this.Element.addClass("table-responsive");
            }

            let identity = `lv-${NewUid()}`;
            this.Element.attr("listview-identity", identity);
            window[identity] = this;


            this.TableId = `tb-${NewUid()}`;
            this.HeaderId = `th-${NewUid()}`;
            this.BodyId = `tr-${NewUid()}`;


            let table = $(`<table id="${this.TableId}" class="table"></table>`);
            if (this.TableOption.isHover) {
                table.addClass("table-hover");
            }
            if (this.TableOption.isBordered) {
                table.addClass("table-bordered");
            }
            if (this.TableOption.isStriped) {
                table.addClass("table-striped");
            }
            if (this.TableOption.class) {
                table.addClass(this.TableOption.class);
            }

            let header = $(`<thead id="${this.HeaderId}"></thead>`);
            let headerRow = $(`<tr></tr>`);

            $.each(this.Columns, (i, value) => {
                let th = $(`<th>${value.caption}</th>`);
                if (value.width) {
                    th.css('width', value.width);
                }
                if (value.headerClass) {
                    th.addClass(value.headerClass);
                }
                headerRow.append(th);
            });
            header.append(headerRow);
            table.append(header);

            let body = $(`<tbody id="${this.BodyId}"></tbody>`);
            table.append(body);

            this.Element.append(table);
        }

        protected TableId: string;
        protected HeaderId: string;
        protected BodyId: string;


        public AddColumn(option: ITableHeaderBodyOption) {
            if (!this.Columns) {
                this.Columns = new Array<ITableHeaderBodyOption>();
            }
            this.Columns.push(option);
        }
        public Columns: Array<ITableHeaderBodyOption>;

    }

    export class TableBindingBehaviorBuilder<TRow> extends BindingBehaviorBuilder<TRow>  {
        constructor(owner: BizView) {
            super(owner);
        }

        public ColumnBinding(title: string, binding: (row: TRow) => any, option?: ITableHeaderBodyOption): TableBindingBehaviorBuilder<TRow> {
            if (this.CurrentBehavior instanceof ListView) {
                let op: ITableHeaderBodyOption = $.extend(true, {}, option);
                op.value = binding;
                op.caption = title;

                this.CurrentBehavior.AddColumn(op);
            }
            return this;
        }

    }

    export interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにテーブルタグを生成します
         * 実装例：
         * 
         */
        BuildListView<TRow>(itemSource: (x: T) => any, option?: ITableOption): TableBindingBehaviorBuilder<TRow>;
    }

    BindingBehaviorBuilder.prototype.BuildListView = function (itemSource: (x: any) => any, option?: ITableOption) {
        let me: BindingBehaviorBuilder<any> = this;
        let behavior = me.Add(new ListView());

        behavior.Property = ListView.ItemsSourceProperty;
        behavior.PInfo = new LamdaExpression(me.Owner.DataContext, itemSource);
        behavior.TableOption = option;

        let newMe = new TableBindingBehaviorBuilder<any>(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    }

}