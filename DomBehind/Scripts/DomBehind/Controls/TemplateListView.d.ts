declare namespace DomBehind {
    interface ITemplateListViewOption<T> {
        template: string;
        columnClick?: (owner: T, e: ITemplateListViewColumnClickEventArgs) => void;
        ascClass?: string;
        descClass?: string;
    }
    interface ITemplateListViewColumn {
        templateSelector?: string;
        header?: string;
        expression?: (row: any) => any;
        expressionAction?: (owner: any, row: any) => void;
        convertTarget?: (value: any, element?: any) => any;
        attachedEvent?: IEventBuilder;
        dependencyProperty?: Data.DependencyProperty;
        mode?: Data.BindingMode;
        allowBubbling?: boolean;
    }
    interface ITemplateListViewColumnClickEventArgs {
        isAsc?: boolean;
        text?: string;
        value?: string;
        selector?: string;
        sender?: TemplateListView;
        target?: any;
    }
    class TemplateListView extends Data.DataBindingBehavior {
        static ItemsSourceProperty: Data.DependencyProperty;
        Owner: BizView;
        Option: ITemplateListViewOption<any>;
        Columns: Array<ITemplateListViewColumn>;
        LastOption: ITemplateListViewColumn;
        RowStyleExpression: (row: any) => string;
        AlternateStyle: {
            Selector: string;
            Css: string;
        };
        ItemsSource: Data.ListCollectionView;
        private FindTemplate;
        RemoveAll(): void;
        ClearSortMarks(): void;
        Ensure(): void;
        protected OnColumnClick(e: JQueryEventObject, header: string): void;
        protected readonly DefaultOption: ITemplateListViewOption<any>;
    }
    class TemplateListViewBindingBehaviorBuilder<TOwner, TRow> extends BindingBehaviorBuilder<TRow> {
        constructor(owner: BizView);
        BindingColumn(selector: string, exp: (x: TRow) => any, option?: ITemplateListViewColumn): TemplateListViewBindingBehaviorBuilder<TOwner, TRow>;
        BindingColumnAction(selector: string, exp: (x: TOwner, args: TRow) => void, option?: ITemplateListViewColumn): TemplateListViewBindingBehaviorBuilder<TOwner, TRow>;
        BindingProperty(dp: Data.DependencyProperty, selector: string, exp: (x: TRow) => any, option?: ITemplateListViewColumn): TemplateListViewBindingBehaviorBuilder<TOwner, TRow>;
        BindingEvent(ev: IEventBuilder, selector: string, exp: (x: TOwner, args: TRow) => void, option?: ITemplateListViewColumn): TemplateListViewBindingBehaviorBuilder<TOwner, TRow>;
        BindingRowStyle(exp: (x: TRow) => string): TemplateListViewBindingBehaviorBuilder<TOwner, TRow>;
        BindingAlternateRowStyle(selector: string, css: string): TemplateListViewBindingBehaviorBuilder<any, any>;
    }
    interface BindingBehaviorBuilder<T> {
        BuildTemplateItems<TRow>(itemsSource: (x: T) => any, option: ITemplateListViewOption<T>): TemplateListViewBindingBehaviorBuilder<T, TRow>;
    }
}
