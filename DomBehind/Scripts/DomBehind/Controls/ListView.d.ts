declare namespace DomBehind {
    interface ITableOption {
        class?: string;
        isHover?: boolean;
        isStriped?: boolean;
        isBordered?: boolean;
    }
    interface ITableHeaderBodyOption {
        caption?: string;
        width?: string;
        value?: (x: any) => any;
        convertTarget?: (x: any) => any;
        headerClass?: string;
        cellClass?: (x: any) => any;
    }
    class ListView extends Data.DataBindingBehavior {
        static ItemsSourceProperty: Data.DependencyProperty;
        ItemsSource: Data.ListCollectionView;
        Clear(): void;
        private _items;
        TableOption: ITableOption;
        protected readonly DefaultTableOption: ITableOption;
        Ensure(): void;
        protected TableId: string;
        protected HeaderId: string;
        protected BodyId: string;
        AddColumn(option: ITableHeaderBodyOption): void;
        Columns: Array<ITableHeaderBodyOption>;
    }
    class TableBindingBehaviorBuilder<TRow> extends BindingBehaviorBuilder<TRow> {
        constructor(owner: BizView);
        ColumnBinding(title: string, binding: (row: TRow) => any, option?: ITableHeaderBodyOption): TableBindingBehaviorBuilder<TRow>;
    }
    interface BindingBehaviorBuilder<T> {
        BuildListView<TRow>(itemSource: (x: T) => any, option?: ITableOption): TableBindingBehaviorBuilder<TRow>;
    }
}
