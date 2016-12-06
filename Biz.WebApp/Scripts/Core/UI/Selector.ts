namespace DomBehind.Core {

    export interface DataBindingBehaviorBuilder<T> {
        Multiple(): DataBindingBehaviorBuilder<T>;
        Multiple(allowMultiple: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
    DataBindingBehaviorBuilder.prototype.Multiple = function (allowMultiple?: (x: any) => boolean) {
        let me: DataBindingBehaviorBuilder<any> = this;
        let behavior = me.Add(new Data.DataBindingBehavior());

        behavior.Property = Selector.AllowMultipleProperty;
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
                    x.attr("multiple", 'true');
                } else {
                    x.removeAttr("multiple");
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

            Behavior.Element.off(UIElement.LostFocusEvent.EventName);
            Behavior.Element.on(UIElement.LostFocusEvent.EventName, e => this.UpdateSource());
        }
        /** Hold the handle in order to safely remove the Event */
        protected UpdateTargetEventHandle: (sender, e) => void;

        protected UpdateSource(): void {
            if (!this.Behavior.Expression) return;
            var dataSource = this.Behavior.Expression.GetValue();
            if (dataSource instanceof Data.ListCollectionView) {
                var collectionView = dataSource as Data.ListCollectionView;

                $.each(this.Behavior.Element.find("option"), (i, value: HTMLOptionElement) => {
                    if (value.selected) {
                        var uid = value.getAttribute("uuid");
                        var item = collectionView.Find(x => x.__uuid === uid);
                        if (item) {
                            dataSource._current = item;
                        }
                    }
                });
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
            this.Select(source);
        }
        protected RenderOption(element: JQuery, source: Data.ListCollectionView, value: any): void {
            if (!value.__uuid) {
                value.__uuid = NewUid();
            }

            var displayValue = value;
            if (source.DisplayMemberPath) {
                displayValue = new Expression(value, source.DisplayMemberPath).GetValue();
            }

            // HACK bootstrap-select.js val method
            $(`<option uuid="${value.__uuid}">${displayValue}</option>`).appendTo(element);
        }
        protected Select(source: Data.ListCollectionView) {
            if (!this.HasChanges(source)) return;

            this.Behavior.Element.removeAttr("option:selected").removeAttr("selected");
            if (!Object.IsNullOrUndefined(source.Current)) {
                var displayValue = source.Current;
                if (source.DisplayMemberPath) {
                    displayValue = new Expression(source.Current, source.DisplayMemberPath).GetValue();
                }
                this.Behavior.Element.val(displayValue);
            }
            this.Behavior.Element.selectpicker('refresh');
            source.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.Reflected;
        }
        protected HasChanges(source: Data.ListCollectionView): boolean {
            if (source.ViewReflected === Data.ListCollectionView.ViewReflectedStatus.Reflected) return false;
            if (source.ViewReflected === Data.ListCollectionView.ViewReflectedStatus.None) {

                source.Refresh();

                this.PropertyChangedEventHandle = (sender, e) => this.OnDataSourcePropertyChanged(sender, e);
                source.PropertyChanged.AddHandler(this.PropertyChangedEventHandle);
                source.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.NoReflected;
            }
            return true;
        }
        /** Hold the handle in order to safely remove the Event */
        protected PropertyChangedEventHandle: (sender, e) => void;

    }
}