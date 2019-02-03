namespace DomBehind.Controls {
    export interface ISelectableElement extends IDisplayMemberPath {
        __Selector: JQuery;
        __Element: HTMLOptionElement;
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
                    let old = x.prop('multiple');
                    if (old === y) return;

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


        protected static IgnoreMark: string = "Selector.Ignore";
        protected static InstanceMark: string = "Selector.Instance";
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

            this.AddedHandle = (sender, e) => this.Added(sender, e);
            this.RemovedHandle = (sender, e) => this.Removed(sender, e);
        }
        /** Hold the handle in order to safely remove the Event */
        protected UpdateTargetEventHandle: (sender, e) => void;
        protected UpdateSourceEventHandle: (sender, e) => void;
        protected PropertyChangedEventHandle: (sender, e) => void;
        protected UpdateSource(e: JQueryEventObject): boolean {
            if (!this.Behavior.PInfo) return;

            var dataSource = this.Behavior.PInfo.GetValue();
            if (dataSource instanceof Data.ListCollectionView) {
                var collectionView = dataSource as Data.ListCollectionView;

                if (collectionView.OnCurrentChanging().Cancel) {
                    this.Select(collectionView);
                    return false;
                }

                let selectedItems = [];
                $.each(this.Behavior.Element.find("option"), (i, value: HTMLOptionElement) => {
                    if (value.selected) {
                        var uid = value.getAttribute("uuid");
                        var item = collectionView.Find(x => (x as IIdentity).__uuid === uid);
                        if (item) {
                            selectedItems.push(item);
                        }
                    }
                });

                dataSource.Begin();
                if (this.Multiple) {
                    dataSource.Current = selectedItems;
                } else {
                    dataSource.Current = 0 < selectedItems.length ? selectedItems[0] : null;
                }
                dataSource.End();
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
            }
            if (!e.Name) {
                this.Render(sender);
            }
        }
        protected Render(source: Data.ListCollectionView) {
            if (!this.HasChanges(source)) return;

            this.Behavior.Element.empty();
            var arr = source.ToArray();
            if (source.Grouping) {
                $.each(arr.GroupBy(source.Grouping), (i, group) => {
                    let optgroup = $(`<optgroup>`, { label: group.Key }).appendTo(this.Behavior.Element);
                    $.each(group.Values, (k, each) => {
                        this.RenderOption(optgroup, source, each);
                    });
                });
            } else {
                $.each(arr, (i, value) => {
                    this.RenderOption(this.Behavior.Element, source, value);
                });
            }

            // this.Behavior.Element.selectpicker('refresh');
            this.Select(source);
        }
        protected get Multiple(): boolean {
            return this.Behavior.Element.prop("multiple") ? true : false;
        }
        protected set Multiple(value: boolean) {
            this.Behavior.Element.prop("multiple", value);
        }
        protected RenderOption(element: JQuery, source: Data.ListCollectionView, value: any): void {
            if (!(value as IIdentity).__uuid)
                value = $.extend(value, ExtendIIdentity());
            if (!(value as IDisplayMemberPath).DisplayMemberPath)
                value = $.extend(value, this.EnsureDisplayMemberPath(source.DisplayMemberPath));

            // HACK bootstrap-select.js val method
            let option = $(`<option uuid="${value.__uuid}">${Selector.GetDisplayValue(value, source.DisplayMemberPath)}</option>`);
            option.appendTo(element);
            value = $.extend(value, this.EnsureElement(option));

            if (value instanceof NotifiableImp) {
                if (!(<any>value).__EventMarked) {
                    (<any>value).__EventMarked = true;

                    (value as NotifiableImp).PropertyChanged.AddHandler((sender, e) => {
                        var selectable = sender as ISelectableElement;
                        var text = Selector.GetDisplayValue(sender, selectable.DisplayMemberPath);
                        selectable.__Selector.val(text);
                    });
                }
            }
        }

        protected EnsureDisplayMemberPath(path: string): IDisplayMemberPath {
            return { DisplayMemberPath: path };
        }
        protected EnsureElement(option: JQuery): ISelectableElement {
            return {
                __Selector: option,
                __Element: option[0] as HTMLOptionElement,
            };
        }

        private AddedHandle: (source: Data.ListCollectionView, obj: any) => void;
        private RemovedHandle: (source: Data.ListCollectionView, obj: any) => void;
        protected Added(source: Data.ListCollectionView, obj: any): void {
            this.Render(source);
        }
        protected Removed(source: Data.ListCollectionView, obj: any): void {
            this.Render(source);
        }
        protected Select(source: Data.ListCollectionView) {
            return this.Multiple ? this.MultipleSelect(source) : this.SingleSelect(source);
        }
        private SingleSelect(source: Data.ListCollectionView) {
            var value: any = source.Current;
            if (Object.IsNullOrUndefined(value)) {
                this.Behavior.Element.selectpicker('val', null);
            } else {
                (value as ISelectableElement).__Element.selected = true;
                this.Behavior.Element.selectpicker('refresh');
            }
            source.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.Reflected;
        }
        private MultipleSelect(source: Data.ListCollectionView) {
            var value: any = source.Current;
            if (Object.IsNullOrUndefined(value)) {
                this.Behavior.Element.selectpicker("deselectAll");
            } else {
                $.each(value, (i, x) => {
                    var selectable = x as ISelectableElement;
                    selectable.__Element.selected = true;
                });
            }
            this.Behavior.Element.selectpicker('refresh');
            source.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.Reflected;
        }

        protected HasChanges(source: Data.ListCollectionView): boolean {
            if (source.ViewReflected === Data.ListCollectionView.ViewReflectedStatus.Reflected) return false;
            if (source.ViewReflected === Data.ListCollectionView.ViewReflectedStatus.None) {
                source.ViewReflected = Data.ListCollectionView.ViewReflectedStatus.NoReflected;

                source.Begin().Refresh().End();

                this.Subscribe(source);
            }
            return true;
        }
        protected Subscribe(source: Data.ListCollectionView): void {
            this.UnSubscribe(source);

            source.Removed.AddHandler(this.RemovedHandle);
            source.Added.AddHandler(this.AddedHandle);
            source.PropertyChanged.AddHandler(this.PropertyChangedEventHandle);
        }
        protected UnSubscribe(source: Data.ListCollectionView): void {
            source.Added.RemoveHandler(this.AddedHandle);
            source.Removed.RemoveHandler(this.RemovedHandle);
            source.PropertyChanged.RemoveHandler(this.PropertyChangedEventHandle);
        }
        public static GetDisplayValue(value: any, displayMemberPath: string): any {
            var displayValue = value;
            if (displayMemberPath) {
                displayValue = new PropertyInfo(value, displayMemberPath).GetValue();
            }
            return displayValue;
        }
    }

}


namespace DomBehind.Data {
    import Selector = DomBehind.Controls.Selector;

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
            behavior.PInfo = new LamdaExpression(me.Owner.DataContext, allowMultiple);
        } else {
            behavior.PInfo = new BooleanFakeExpression(true);
        }
        return me;
    }
}

