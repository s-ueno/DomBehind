declare namespace DomBehind.Controls {
    class DatePicker {
        static FormatProperty: Data.DependencyProperty;
        static ValueProperty: Data.DependencyProperty;
        static DateProperty: Data.DependencyProperty;
        private static SetValue;
    }
}

declare namespace DomBehind.Controls {
    class Dropdown {
        static ItemsSourceProperty: Data.DependencyProperty;
        static Register(behavior: Data.DataBindingBehavior): void;
        static Rebuild(el: JQuery, list: Data.ListCollectionView): boolean;
        _engaged: boolean;
        Items: Data.ListCollectionView;
        Element: JQuery;
        OnCurrentChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs): void;
    }
}

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
        List = 12
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
        Toggle = 8
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
        RowStyleBinding: (row: any) => string;
        CellStyleBinding: (row: any) => string;
        RowClassBinding: (row: any) => string;
        Column: IColumnBinding<any>[];
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
        private OnCurrentChanged;
        static FieldTypeToString(type: FieldType): string;
        static RenderTypeToString(type: RenderType): string;
        private ParseCellStyles;
        private RowInjection;
    }
    class W2GridBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected readonly DefaultOption: IColumnBindingOption;
        ColumnBinding(title: string, binding: (row: T) => any, option?: IColumnBinding<T>): W2GridBindingBehaviorBuilder<T>;
        RowStyleBinding(styleBinding: (row: T) => string): W2GridBindingBehaviorBuilder<T>;
        RowCssBinding(classBinding: (row: T) => string): W2GridBindingBehaviorBuilder<T>;
        CellStyleBinding(cellStyleBinding: (row: T) => string): W2GridBindingBehaviorBuilder<T>;
    }
    interface BindingBehaviorBuilder<T> {
        BuildGrid<TRow>(itemSource: (x: T) => any, option?: IGridOption<T>): W2GridBindingBehaviorBuilder<TRow>;
    }
}