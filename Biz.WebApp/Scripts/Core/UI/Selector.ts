namespace DomBehind.Core {

    export interface DataBindingBehaviorBuilder<T> {
        Multiple(): DataBindingBehaviorBuilder<T>;
        Multiple(allowMultiple: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
    DataBindingBehaviorBuilder.prototype.Multiple = function (allowMultiple?: (x: any) => boolean) {
        let me: DataBindingBehaviorBuilder<any> = this;
        let behavior = me.Add(new Data.DataBindingBehavior());

        behavior.Property = Selector.AllowMultipleProperty;
        behavior.Priolity = -1;
        if (allowMultiple) {
            behavior.Expression = new LamdaExpression(me.Owner.DataContext, allowMultiple);
        } else {
            behavior.Expression = new BooleanExpression(true);
        }
        return me;
    }

    export class Selector {

        public static ItemsSourceProperty: Data.DependencyProperty
        = Data.DependencyProperty.RegisterAttached("itemsSource",
            null,
            (x, y) => { },
            Data.UpdateSourceTrigger.Explicit,
            Data.BindingMode.OneWay,
            behavior => {
                Selector.Register(behavior);
            });

        public static AllowMultipleProperty: Data.DependencyProperty
        = Data.DependencyProperty.RegisterAttached("multiple",
            null,
            (x, y) => {
                if (y === true) {
                    x.prop('multiple', true);
                } else {
                    x.prop('multiple', false);
                }
                x.selectpicker('destroy');
                x.selectpicker();
            },
            Data.UpdateSourceTrigger.Explicit,
            Data.BindingMode.OneWay);


        private static IgnoreMark: string = "Selector.Ignore";
        private static InstanceMark: string = "Selector.Instance";
        public static Register(behavior: Data.DataBindingBehavior): void {
            if (!behavior.Element) return;
            if (behavior.AdditionalInfo[Selector.IgnoreMark]) return;
            if (behavior.AdditionalInfo[Selector.InstanceMark]) return;

            var tagName = behavior.Element.prop("tagName");
            if (tagName !== "SELECT") {
                behavior.AdditionalInfo[Selector.IgnoreMark] = true;
                return;
            }
            behavior.AdditionalInfo[Selector.InstanceMark] = new Selector(behavior);
        }
        constructor(public Behavior: Data.DataBindingBehavior) {
            this.UpdateTargetEventHandle = (sender, e) => this.OnUpdateTarget(sender, e);
            Behavior.UpdateTargetEvent.AddHandler(this.UpdateTargetEventHandle);

            this.UpdateSourceEventHandle = e => this.UpdateSource(e);
            Behavior.Element.off('change', this.UpdateSourceEventHandle);
            Behavior.Element.on('change', this.UpdateSourceEventHandle);

            this.PropertyChangedEventHandle = (sender, e) => this.OnDataSourcePropertyChanged(sender, e);
        }
        /** Hold the handle in order to safely remove the Event */
        protected UpdateTargetEventHandle: (sender, e) => void;
        protected UpdateSourceEventHandle: (sender, e) => void;
        protected PropertyChangedEventHandle: (sender, e) => void;
        protected UpdateSource(e: JQueryEventObject): boolean {
            if (!this.Behavior.Expression) return;

            var dataSource = this.Behavior.Expression.GetValue();
            if (dataSource instanceof Data.ListCollectionView) {
                var collectionView = dataSource as Data.ListCollectionView;

                if (collectionView.OnCurrentChanging().Cancel) {
                    var value: any = collectionView.Current;
                    if (this.Multiple) {
                        var values = [];
                        if (value) {
                            $.each(value, (i, x) => {
                                values.push(this.GetDisplayValue(x, collectionView.DisplayMemberPath));
                            });
                        }
                        this.Behavior.Element.val(values);
                    } else {
                        value = this.GetDisplayValue(value, collectionView.DisplayMemberPath);
                        this.Behavior.Element.val(value);
                    }

                    this.Behavior.Element.selectpicker('refresh');
                    return false;
                }

                let selectedItems = [];
                $.each(this.Behavior.Element.find("option"), (i, value: HTMLOptionElement) => {
                    if (value.selected) {
                        var uid = value.getAttribute("uuid");
                        var item = collectionView.Find(x => x.__uuid === uid);
                        if (item) {
                            selectedItems.push(item);
                            dataSource._current = item;
                        }
                    }
                });

                if (this.Multiple) {
                    dataSource._current = selectedItems;
                } else {
                    dataSource._current = 0 < selectedItems.length ? selectedItems[0] : null;
                }
            }
        }

        protected OnUpdateTarget(sender: Data.DataBindingBehavior, data: any): void {
            if (data instanceof Data.ListCollectionView) {
                this.Render(data as Data.ListCollectionView);
            } else if (data instanceof Array) {
                var list = [];
                $.each(data, (i, value) => {
                    list.push({ Value: value });
                });
                this.Render(new Data.ListCollectionView(list, "Value"));
            }
        }
        protected OnDataSourcePropertyChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs): void {
            if (e.Name === "Current") {
                this.Select(sender);
            } else {
                this.Render(sender);
            }
        }
        protected Render(source: Data.ListCollectionView) {
            if (!this.HasChanges(source)) return;

            this.Behavior.Element.empty();
            if (source.Grouping) {
                $.each(source.List.toArray().GroupBy(source.Grouping), (i, group) => {
                    let optgroup = $(`<optgroup>`, { label: group.Key }).appendTo(this.Behavior.Element);
                    $.each(group.Values, (k, each) => {
                        this.RenderOption(optgroup, source, each);
                    });
                });
            } else {
                $.each(source.List.toArray(), (i, value) => {
                    this.RenderOption(this.Behavior.Element, source, value);
                });
            }
            if (this.Multiple) {
                this.Behavior.Element.selectpicker("deselectAll");
            } else {
                if (Object.IsNullOrUndefined(source.Current)) {
                    this.DisableThrowEvent(source, () => source.MoveFirst());
                }
            }

            this.Select(source);
        }
        protected get Multiple(): boolean {
            return this.Behavior.Element.prop("multiple") ? true : false;
        }
        protected set Multiple(value: boolean) {
            this.Behavior.Element.prop("multiple", value);
        }
        protected RenderOption(element: JQuery, source: Data.ListCollectionView, value: any): void {
            if (!value.__uuid) {
                value.__uuid = NewUid();
            }

            // HACK bootstrap-select.js val method
            $(`<option uuid="${value.__uuid}">${this.GetDisplayValue(value, source.DisplayMemberPath)}</option>`)
                .appendTo(element);
        }
        protected Select(source: Data.ListCollectionView) {
            if (!this.HasChanges(source)) return;

            if (!Object.IsNullOrUndefined(source.Current)) {
                this.Behavior.Element.val(this.GetDisplayValue(source.Current, source.DisplayMemberPath));
            }
            this.Behavior.Element.selectpicker('refresh');
            source.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.Reflected;
        }
        protected HasChanges(source: Data.ListCollectionView): boolean {
            if (source.ViewReflected === Data.ListCollectionView.ViewReflectedStatus.Reflected) return false;
            if (source.ViewReflected === Data.ListCollectionView.ViewReflectedStatus.None) {

                source.Refresh();
                source.PropertyChanged.RemoveHandler(this.PropertyChangedEventHandle);
                source.PropertyChanged.AddHandler(this.PropertyChangedEventHandle);
                source.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.NoReflected;
            }
            return true;
        }
        protected DisableThrowEvent(
            source: Data.ListCollectionView, action: () => void): void {
            source.PropertyChanged.RemoveHandler(this.PropertyChangedEventHandle);
            action();
            source.PropertyChanged.AddHandler(this.PropertyChangedEventHandle);
        }
        protected GetDisplayValue(value: any, displayMemberPath: string): any {
            var displayValue = value;
            if (displayMemberPath) {
                displayValue = new Expression(value, displayMemberPath).GetValue();
            }
            return displayValue;
        }
    }
}