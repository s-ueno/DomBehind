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
        onSelect?: (x: TViewModel, args: any) => void;
        onDoubleClick?: (x: TViewModel, args: any) => void;
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
        Combo = 13,
        Check = 14,
        Checkbox = 15,
        Select = 16
    }
    interface IColumnBinding<TRow> extends IColumnBindingOption, IColumnConverter {
        advancedSearch?: FieldType;
        renderType?: RenderType;
    }
    enum RenderType {
        Number = 1,
        Currency = 2,
        Money = 3,
        Percent = 4,
        Time = 5,
        Date = 6,
        Age = 7,
        Toggle = 8,
        CheckBox = 9
    }
    interface IColumnConverter {
        convertTarget?: (x: any) => any;
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
        static Refresh: TypedEvent<any>;
        static IsSpinningProperty: Data.DependencyProperty;
        NewAdd: (value: Data.DataBindingBehavior) => Data.DataBindingBehavior;
        ItemsSource: PropertyInfo;
        ListCollectionView: Data.ListCollectionView;
        GridOption: IGridOption<any>;
        RowStyleBinding: (row: any) => any;
        CellStyleBinding: (row: any) => any;
        RowClassBinding: (row: any) => any;
        Column: IColumnBinding<any>[];
        protected Grid: W2UI.W2Grid;
        RowClassBindingConverter: (obj: any) => string;
        RowStyleBindingConverter: (obj: any) => string;
        CellStyleBindingConverter: (obj: any) => string;
        protected get IsMultiSelect(): boolean;
        protected GenerateRecId(): number;
        private __id;
        get SelectedObject(): any;
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
        private OnCurrentChanged;
        static FieldTypeToString(type: FieldType): string;
        static RenderTypeToString(type: RenderType): string;
        private ParseCellStyles;
        private RowInjection;
        private ParseExpressionPath;
    }
    class W2GridBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected get DefaultOption(): IColumnBindingOption;
        ColumnBinding(title: string, binding: (row: T) => any, option?: IColumnBinding<T>): W2GridBindingBehaviorBuilder<T>;
        RowStyleBinding(styleBinding: (row: T) => any, convertTarget?: (obj: any) => string): W2GridBindingBehaviorBuilder<T>;
        RowCssBinding(classBinding: (row: T) => any, convertTarget?: (obj: any) => string): W2GridBindingBehaviorBuilder<T>;
        CellStyleBinding(cellStyleBinding: (row: T) => any, convertTarget?: (obj: any) => string): W2GridBindingBehaviorBuilder<T>;
    }
    interface BindingBehaviorBuilder<T> {
        BuildGrid<TRow>(itemSource: (x: T) => any, option?: IGridOption<T>): W2GridBindingBehaviorBuilder<TRow>;
    }
}
