namespace DomBehind {

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
        convertTarget?: (value: any, element?: any) => any;

        attachedEvent?: IEventBuilder;
        dependencyProperty?: Data.DependencyProperty;
        mode?: Data.BindingMode;
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
        public AlternateStyle: { Selector: string, Css: string };
        public set ItemsSource(newValue: Data.ListCollectionView) {
            let jtemplate = $(document.body).find(this.Option.template);
            if (jtemplate.length === 0) return;

            let template = this.FindTemplate(jtemplate);

            this.RemoveAll();

            let dataContext = this.DataContext;
            let rowContainer = $(`<div class="templateRowContainer"></div>`);
            $.each(newValue.ToArray(), (i, value) => {
                let newRow = template.clone();

                // Make a reference to dom
                value.__element = newRow;


                let twowayMarks = new Array<{ column: ITemplateListViewColumn, element: JQuery, marks: string }>();
                $.each(this.Columns, (k, column) => {

                    let el = newRow.find(column.templateSelector);
                    if (el.length !== 0) {

                        // property binding
                        if (column.expression && column.dependencyProperty) {
                            // one time
                            let ret = column.expression(value);
                            if (column.convertTarget) {
                                ret = column.convertTarget(ret, el);
                            }
                            column.dependencyProperty.SetValue(el, ret);

                            // two way
                            if (column.mode === Data.BindingMode.TwoWay) {

                                let path = LamdaExpression.Path(column.expression);
                                twowayMarks.push({ column: column, element: el, marks: path });

                                //let observe = Observable.Register(value, path);
                                //observe.PropertyChanged.AddHandler((sender, d) => {
                                //    if (sender) {
                                //        let v = sender[d.Name];
                                //        column.dependencyProperty.SetValue(el, v);
                                //    }
                                //});
                            }
                        }

                        // event binding
                        if (column.expressionAction && column.attachedEvent) {
                            let newEvent = column.attachedEvent.Create();
                            newEvent.AddHandler((sener, e) => {
                                column.expressionAction(dataContext, value);
                            });
                            el.off(newEvent.EventName);
                            el.on(newEvent.EventName, e => {
                                newEvent.Raise(this, e);
                            });

                            // 
                            if (el.is("a") && !el.attr("href")) {
                                el.attr("href", "javascript:void(0);");
                            }
                        }

                        // alternate style
                        if (this.AlternateStyle) {
                            if (i % 2 !== 0) {
                                let el = newRow.find(this.AlternateStyle.Selector);
                                if (el.length !== 0) {
                                    el.addClass(this.AlternateStyle.Css);
                                }
                            }
                        }
                    }
                });

                if (twowayMarks.length !== 0) {
                    let observe = Observable.RegisterAttached(value, { marks: twowayMarks.Select(x => x.marks) });
                    observe.PropertyChanged.AddHandler((sender, d) => {
                        if (sender) {
                            let twowayList = twowayMarks.Where(x => x.marks === d.Name);
                            for (var i = 0; i < twowayList.length; i++) {
                                let v = sender[d.Name]; /* ループの中で、常にプロパティに再アクセスして、元の値を参照する */
                                let twoway = twowayList[i];
                                if (twoway.column.convertTarget) {
                                    v = twoway.column.convertTarget(v, twoway.element);
                                }
                                twoway.column.dependencyProperty.SetValue(twoway.element, v);
                            }
                        }
                    });
                }

                rowContainer.append(newRow);
            });
            this.Element.append(rowContainer);


            newValue.PropertyChanged.Clear();
            newValue.PropertyChanged.AddHandler((sender, e) => {
                if (!e.Name) {
                    this.ItemsSource = sender;
                }
            });
        }

        private FindTemplate(jtemplate: JQuery): JQuery {
            let support = ("content" in document.createElement("template"));
            if (support) {
                let temp: HTMLTemplateElement = (<HTMLTemplateElement>jtemplate[0]);
                let template = $(temp.content.querySelector("div"));
                return template;
            } else {
                let temp: any = jtemplate[0];
                let template = $(temp.querySelector("div"));
                return template;
            }
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

            let identity = this.Element.attr("templateListView-identity");
            if (!identity) {
                identity = `id-${NewUid()}`;
                this.Element.attr("templateListView-identity", identity);
            }
            window[identity] = this;
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
                if (this.Option.columnClick) {
                    Application.Current.SafeAction(() =>
                        this.Option.columnClick(this.DataContext, ee));
                } else {
                    let column = this.Columns.FirstOrDefault(x => x.header === header);
                    let list = this.PInfo.GetValue();
                    if (column && list instanceof Data.ListCollectionView) {
                        let exp = LamdaExpression.Path(column.expression);
                        let sorted = asc ? list.ToArray().OrderBy(x => x[exp]) : list.ToArray().OrderByDecording(x => x[exp]);
                        this.ItemsSource = this.DataContext[this.PInfo.MemberPath] = new Data.ListCollectionView(sorted);
                    }
                }
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
            return this.BindingProperty(UIElement.TextProperty, selector, exp, option);
        }
        public BindingColumnAction(selector: string, exp: (x: TOwner, args: TRow) => void, option?: ITemplateListViewColumn): TemplateListViewBindingBehaviorBuilder<TOwner, TRow> {
            return this.BindingEvent(UIElement.Click, selector, exp, option);
        }

        public BindingProperty(dp: Data.DependencyProperty, selector: string, exp: (x: TRow) => any, option?: ITemplateListViewColumn): TemplateListViewBindingBehaviorBuilder<TOwner, TRow> {
            let me: TemplateListViewBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                option = $.extend(true, {}, option);
                option.templateSelector = selector;
                option.expression = exp;
                option.dependencyProperty = dp;

                me.CurrentBehavior.LastOption = option;
                me.CurrentBehavior.Columns.push(option);
            }
            return me;
        }

        public BindingEvent(ev: IEventBuilder, selector: string, exp: (x: TOwner, args: TRow) => void, option?: ITemplateListViewColumn): TemplateListViewBindingBehaviorBuilder<TOwner, TRow> {
            let me: TemplateListViewBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                option = $.extend(true, {}, option);
                option.templateSelector = selector;
                option.expressionAction = exp;
                option.attachedEvent = ev;

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

        public BindingAlternateRowStyle(selector: string, css: string) {
            let me: TemplateListViewBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                me.CurrentBehavior.AlternateStyle = { Selector: selector, Css: css };
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