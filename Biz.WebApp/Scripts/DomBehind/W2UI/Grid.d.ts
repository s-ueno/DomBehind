declare namespace DomBehind {
    interface IFooterOption<TViewModel> {
    }
    interface IHeaderOption<TViewModel> {
        add?: (x: TViewModel, row: any) => any;
        edit?: (x: TViewModel, row: any) => void;
        delete?: (x: TViewModel, row: any) => void;
        save?: (x: TViewModel, row: any) => void;
    }
    interface IGridOption<TViewModel> {
        multiSelect?: boolean;
        dragAndDropRow?: boolean;
        onSelect?: (x: TViewModel, args) => void;
        onDoubleClick?: (x: TViewModel, args) => void;
        isSpinning?: (x: TViewModel) => boolean;
        footerOption?: IFooterOption<TViewModel>;
        headerOption?: IHeaderOption<TViewModel>;
    }
    enum FieldType {
        Text = 1,
        Int = 2,
        Double = 3,
        Date = 4,
        Hex = 5,
        Money = 6,
        Currency = 7,
        Percent = 8,
        Alphanumeric = 9,
        Time = 10,
        Color = 11,
        List = 12,
    }
    interface IColumnBinding<TRow> extends IColumnBindingOption {
        advancedSearch?: FieldType;
        renderType?: RenderType;
    }
    /**
     * シンプルなカスタム表示
     * */
    enum RenderType {
        Number = 1,
        Currency = 2,
        Money = 3,
        Percent = 4,
        Time = 5,
        Date = 6,
        Age = 7,
        Toggle = 8,
    }
    interface IColumnBindingOption {
        caption?: string;
        field?: string;
        size?: string;
        min?: string;
        max?: string;
        hidden?: boolean;
        hideable?: boolean;
        sortable?: boolean;
        searchable?: boolean;
        resizable?: boolean;
        attr?: string;
        style?: string;
        render?: string | Function;
        title?: string;
        editable?: {
            fieldType?: FieldType;
            min?: number;
            max?: number;
            precision?: number;
            itemSource?: (vm: any) => any[];
            showAll?: boolean;
        };
        frozen?: boolean;
        info?: any;
    }
    class W2GridBindingBehavior extends Data.BindingBehavior {
        static IsSpinningProperty: Data.DependencyProperty;
        NewAdd: (value: Data.DataBindingBehavior) => Data.DataBindingBehavior;
        ItemsSource: PropertyInfo;
        ListCollectionView: Data.ListCollectionView;
        GridOption: IGridOption<any>;
        RowStyleBinding: (row: any) => string;
        CellStyleBinding: (row: any) => string;
        RowClassBinding: (row: any) => string;
        protected Column: IColumnBinding<any>[];
        protected Grid: W2UI.W2Grid;
        protected readonly IsMultiSelect: boolean;
        protected GenerateRecId(): number;
        private __id;
        readonly SelectedObject: any;
        AddColumn(binding: IColumnBinding<any>): void;
        Ensure(): void;
        protected SuppressListCollectionViewAction(action: (lc: Data.ListCollectionView) => void): void;
        OnSelect(sender: any, e: any): void;
        OnDoubleClick(sender: any, e: any): void;
        OnToolbarAdd(sender: any, e: any): void;
        protected AddRow(row: any): void;
        OnToolbarEdit(sender: any, e: any): void;
        OnToolbarSave(sender: any, e: any): void;
        private _deleteTargets;
        OnToolbarDelete(sender: any, e: any): void;
        private OnCurrentChanged(sender, e);
        static FieldTypeToString(type: FieldType): string;
        static RenderTypeToString(type: RenderType): string;
        private ParseCellStyles(value);
        private RowInjection(value);
    }
    class W2GridBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected readonly DefaultOption: IColumnBindingOption;
        ColumnBinding(title: string, binding: (row: T) => any, option?: IColumnBinding<T>): W2GridBindingBehaviorBuilder<T>;
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
        RowStyleBinding(styleBinding: (row: T) => string): W2GridBindingBehaviorBuilder<T>;
        /**
         * 任意のclass属性を行にバインドします
         *
         * @param classBinding css名の文字列を示すプロパティ先をラムダで指定します
         *
         */
        RowCssBinding(classBinding: (row: T) => string): W2GridBindingBehaviorBuilder<T>;
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
        CellStyleBinding(cellStyleBinding: (row: T) => string): W2GridBindingBehaviorBuilder<T>;
    }
    interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにw2layout機構を組み込みます。
         * 実装例：
         *
         */
        BuildGrid<TRow>(itemSource: (x: T) => any, option?: IGridOption<T>): W2GridBindingBehaviorBuilder<TRow>;
    }
}
