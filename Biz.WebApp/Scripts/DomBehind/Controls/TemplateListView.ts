﻿namespace DomBehind {

    export interface ITemplateListViewOption<T> {
        template: string;
        columnClick?: (owner: T, e: ITemplateListViewColumnClickEventArgs) => void;

        ascClass?: string;
        descClass?: string;
    }
    export interface ITemplateListViewColumn {
        templateSelector?: string;
        header?: string,
        expression?: (row: any) => any;
        expressionAction?: (owner: any, row: any) => void;
        convertTarget?: (value: any) => any;
    }

    export interface ITemplateListViewColumnClickEventArgs {
        isAsc?: boolean;
        text?: string;
        value?: string;
        selector?: string;
        sender?: TemplateListView;
        target?: any;
    }

    export class TemplateListView extends Data.DataBindingBehavior {

        public static ItemsSourceProperty: Data.DependencyProperty = Data.DependencyProperty.RegisterAttached("",
            el => {

            },
            (el, newValue) => {
                let identity = el.attr("templateListView-identity");
                let template: TemplateListView = window[identity];
                if (newValue instanceof Data.ListCollectionView) {
                    template.ItemsSource = newValue;
                } else {
                    template.ItemsSource = new Data.ListCollectionView([]);
                }
            },
            Data.UpdateSourceTrigger.Explicit,
            Data.BindingMode.OneWay);

        public Owner: BizView;
        public Option: ITemplateListViewOption<any>;
        public Columns: Array<ITemplateListViewColumn>;
        public LastOption: ITemplateListViewColumn;
        public RowStyleExpression: (row: any) => string;
        public set ItemsSource(newValue: Data.ListCollectionView) {
            this.RemoveAll();




            let rowContainer = $(`<div class="templateRowContainer"></div>`);



            $.each(newValue.ToArray(), (i, value) => {




            });

            // rowを最後に追加
            this.Element.append(rowContainer);
        }

        public RemoveAll() {
            this.Element.empty();
        }

        public ClearSortMarks() {
            let view = this.Owner.Container;
            let headeArray = this.Columns.Where(x => x.header ? true : false);
            $.each(headeArray, (i, each) => {
                let column = view.find(each.header);
                if (column.length !== 0) {
                    let span = column.find("span");
                    if (span.length !== 0) {
                        span.removeClass();
                    }
                }
            });
        }

        public /* override */ Ensure() {
            super.Ensure();

            this.Option = $.extend(true, this.DefaultOption, this.Option);

            let view = this.Owner.Container;
            if (this.Option.columnClick) {
                let headeArray = this.Columns.Where(x => x.header ? true : false);
                $.each(headeArray, (i, each) => {
                    let column = view.find(each.header);
                    if (column.length !== 0) {

                        let span = column.find("span");
                        if (span.length === 0) {
                            column.append($("<span></span>"));
                        }

                        if (column.is("a") && !column.attr("href")) {
                            column.attr("href", "javascript:void(0);");
                        }
                        column.off("click");
                        column.on("click", e => this.OnColumnClick(e, each.header));
                    }
                });
            }
        }

        protected OnColumnClick(e: JQueryEventObject, header: string) {
            if (header) {
                let target = $(e.target);                
                let span = target.find("span");
                let asc = span.hasClass(this.Option.descClass);
                if (span.length !== 0) {
                    this.ClearSortMarks();
                    span.addClass(asc ? this.Option.ascClass : this.Option.descClass);
                }

                let ee: ITemplateListViewColumnClickEventArgs = {
                    selector: header,
                    sender: this,
                    target: target,
                    isAsc: asc,
                    text: target.text(),
                    value: target.val(),
                };
                Application.Current.SafeAction(() =>
                    this.Option.columnClick(this.DataContext, ee));
            }
        }

        protected get DefaultOption(): ITemplateListViewOption<any> {
            return {
                template: "",
                ascClass: "fa fa-sort-asc",
                descClass: "fa fa-sort-desc",
            };
        }

    }

    export class TemplateListViewBindingBehaviorBuilder<TOwner, TRow> extends BindingBehaviorBuilder<TRow>{
        constructor(owner: BizView) {
            super(owner);
        }

        public BindingColumn(selector: string, exp: (x: TRow) => any, option?: ITemplateListViewColumn): TemplateListViewBindingBehaviorBuilder<TOwner, TRow> {
            let me: TemplateListViewBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                option = $.extend(true, {}, option);
                option.templateSelector = selector;
                option.expression = exp;

                me.CurrentBehavior.LastOption = option;
                me.CurrentBehavior.Columns.push(option);
            }
            return me;
        }

        public BindingColumnAction(selector: string, exp: (x: TOwner, args: TRow) => void, option?: ITemplateListViewColumn): TemplateListViewBindingBehaviorBuilder<TOwner, TRow> {
            let me: TemplateListViewBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                option = $.extend(true, {}, option);
                option.templateSelector = selector;
                option.expressionAction = exp;

                me.CurrentBehavior.LastOption = option;
                me.CurrentBehavior.Columns.push(option);
            }
            return me;
        }

        public BindingRowStyle(exp: (x: TRow) => string): TemplateListViewBindingBehaviorBuilder<TOwner, TRow> {
            let me: TemplateListViewBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                me.CurrentBehavior.RowStyleExpression = exp;
            }
            return me;
        }
    }

    export interface BindingBehaviorBuilder<T> {
        BuildTemplateItems<TRow>(itemsSource: (x: T) => any, option: ITemplateListViewOption<T>): TemplateListViewBindingBehaviorBuilder<T, TRow>;
    }

    BindingBehaviorBuilder.prototype.BuildTemplateItems = function (itemsSource: (x: any) => any, option: ITemplateListViewOption<any>) {
        let me: BindingBehaviorBuilder<any> = this;

        let behavior = me.Add(new TemplateListView());
        behavior.Owner = me.Owner;
        behavior.Property = TemplateListView.ItemsSourceProperty;
        behavior.PInfo = new LamdaExpression(me.Owner.DataContext, itemsSource);
        behavior.Option = $.extend(true, {}, option);
        behavior.Columns = new Array<ITemplateListViewColumn>();

        let newMe = new TemplateListViewBindingBehaviorBuilder<any, any>(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    }

}