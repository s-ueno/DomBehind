var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Selector = /** @class */ (function () {
            function Selector(Behavior) {
                var _this = this;
                this.Behavior = Behavior;
                this.UpdateTargetEventHandle = function (sender, e) { return _this.OnUpdateTarget(sender, e); };
                Behavior.UpdateTargetEvent.AddHandler(this.UpdateTargetEventHandle);
                this.UpdateSourceEventHandle = function (e) { return _this.UpdateSource(e); };
                Behavior.Element.off('change', this.UpdateSourceEventHandle);
                Behavior.Element.on('change', this.UpdateSourceEventHandle);
                this.PropertyChangedEventHandle = function (sender, e) { return _this.OnDataSourcePropertyChanged(sender, e); };
                this.AddedHandle = function (sender, e) { return _this.Added(sender, e); };
                this.RemovedHandle = function (sender, e) { return _this.Removed(sender, e); };
            }
            Selector.Register = function (behavior) {
                if (!behavior.Element)
                    return;
                if (behavior.AdditionalInfo[Selector.IgnoreMark])
                    return;
                if (behavior.AdditionalInfo[Selector.InstanceMark])
                    return;
                var tagName = behavior.Element.prop("tagName");
                if (tagName !== "SELECT") {
                    behavior.AdditionalInfo[Selector.IgnoreMark] = true;
                    return;
                }
                behavior.AdditionalInfo[Selector.InstanceMark] = new Selector(behavior);
            };
            Selector.prototype.UpdateSource = function (e) {
                if (!this.Behavior.PInfo)
                    return;
                var dataSource = this.Behavior.PInfo.GetValue();
                if (dataSource instanceof DomBehind.Data.ListCollectionView) {
                    var collectionView = dataSource;
                    if (collectionView.OnCurrentChanging().Cancel) {
                        this.Select(collectionView);
                        return false;
                    }
                    var selectedItems_1 = [];
                    $.each(this.Behavior.Element.find("option"), function (i, value) {
                        if (value.selected) {
                            var uid = value.getAttribute("uuid");
                            var item = collectionView.Find(function (x) { return x.__uuid === uid; });
                            if (item) {
                                selectedItems_1.push(item);
                            }
                        }
                    });
                    dataSource.Begin();
                    if (this.Multiple) {
                        dataSource.Current = selectedItems_1;
                    }
                    else {
                        dataSource.Current = 0 < selectedItems_1.length ? selectedItems_1[0] : null;
                    }
                    dataSource.End();
                }
            };
            Selector.prototype.OnUpdateTarget = function (sender, data) {
                if (data instanceof DomBehind.Data.ListCollectionView) {
                    this.Render(data);
                }
                else if (data instanceof Array) {
                    var list = [];
                    $.each(data, function (i, value) {
                        list.push({ Value: value });
                    });
                    this.Render(new DomBehind.Data.ListCollectionView(list, "Value"));
                }
            };
            Selector.prototype.OnDataSourcePropertyChanged = function (sender, e) {
                if (e.Name === "Current") {
                    this.Select(sender);
                }
                if (!e.Name) {
                    this.Render(sender);
                }
            };
            Selector.prototype.Render = function (source) {
                var _this = this;
                if (!this.HasChanges(source))
                    return;
                this.Behavior.Element.empty();
                var arr = source.ToArray();
                if (source.Grouping) {
                    $.each(arr.GroupBy(source.Grouping), function (i, group) {
                        var optgroup = $("<optgroup>", { label: group.Key }).appendTo(_this.Behavior.Element);
                        $.each(group.Values, function (k, each) {
                            _this.RenderOption(optgroup, source, each);
                        });
                    });
                }
                else {
                    $.each(arr, function (i, value) {
                        _this.RenderOption(_this.Behavior.Element, source, value);
                    });
                }
                // this.Behavior.Element.selectpicker('refresh');
                this.Select(source);
            };
            Object.defineProperty(Selector.prototype, "Multiple", {
                get: function () {
                    return this.Behavior.Element.prop("multiple") ? true : false;
                },
                set: function (value) {
                    this.Behavior.Element.prop("multiple", value);
                },
                enumerable: true,
                configurable: true
            });
            Selector.prototype.RenderOption = function (element, source, value) {
                if (!value.__uuid)
                    value = $.extend(value, ExtendIIdentity());
                if (!value.DisplayMemberPath)
                    value = $.extend(value, this.EnsureDisplayMemberPath(source.DisplayMemberPath));
                // HACK bootstrap-select.js val method
                var option = $("<option uuid=\"" + value.__uuid + "\">" + Selector.GetDisplayValue(value, source.DisplayMemberPath) + "</option>");
                option.appendTo(element);
                value = $.extend(value, this.EnsureElement(option));
                if (value instanceof DomBehind.NotifiableImp) {
                    if (!value.__EventMarked) {
                        value.__EventMarked = true;
                        value.PropertyChanged.AddHandler(function (sender, e) {
                            var selectable = sender;
                            var text = Selector.GetDisplayValue(sender, selectable.DisplayMemberPath);
                            selectable.__Selector.val(text);
                        });
                    }
                }
            };
            Selector.prototype.EnsureDisplayMemberPath = function (path) {
                return { DisplayMemberPath: path };
            };
            Selector.prototype.EnsureElement = function (option) {
                return {
                    __Selector: option,
                    __Element: option[0],
                };
            };
            Selector.prototype.Added = function (source, obj) {
                this.Render(source);
            };
            Selector.prototype.Removed = function (source, obj) {
                this.Render(source);
            };
            Selector.prototype.Select = function (source) {
                return this.Multiple ? this.MultipleSelect(source) : this.SingleSelect(source);
            };
            Selector.prototype.SingleSelect = function (source) {
                var value = source.Current;
                if (Object.IsNullOrUndefined(value)) {
                    this.Behavior.Element.selectpicker('val', null);
                }
                else {
                    value.__Element.selected = true;
                    this.Behavior.Element.selectpicker('refresh');
                }
                source.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
            };
            Selector.prototype.MultipleSelect = function (source) {
                var value = source.Current;
                if (Object.IsNullOrUndefined(value)) {
                    this.Behavior.Element.selectpicker("deselectAll");
                }
                else {
                    $.each(value, function (i, x) {
                        var selectable = x;
                        selectable.__Element.selected = true;
                    });
                }
                this.Behavior.Element.selectpicker('refresh');
                source.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
            };
            Selector.prototype.HasChanges = function (source) {
                if (source.ViewReflected === DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected)
                    return false;
                if (source.ViewReflected === DomBehind.Data.ListCollectionView.ViewReflectedStatus.None) {
                    source.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.NoReflected;
                    source.Begin().Refresh().End();
                    this.Subscribe(source);
                }
                return true;
            };
            Selector.prototype.Subscribe = function (source) {
                this.UnSubscribe(source);
                source.Removed.AddHandler(this.RemovedHandle);
                source.Added.AddHandler(this.AddedHandle);
                source.PropertyChanged.AddHandler(this.PropertyChangedEventHandle);
            };
            Selector.prototype.UnSubscribe = function (source) {
                source.Added.RemoveHandler(this.AddedHandle);
                source.Removed.RemoveHandler(this.RemovedHandle);
                source.PropertyChanged.RemoveHandler(this.PropertyChangedEventHandle);
            };
            Selector.GetDisplayValue = function (value, displayMemberPath) {
                var displayValue = value;
                if (displayMemberPath) {
                    displayValue = new DomBehind.PropertyInfo(value, displayMemberPath).GetValue();
                }
                return displayValue;
            };
            Selector.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", null, function (x, y) { }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, function (behavior) {
                Selector.Register(behavior);
            });
            Selector.AllowMultipleProperty = DomBehind.Data.DependencyProperty.RegisterAttached("multiple", null, function (x, y) {
                var old = x.prop('multiple');
                if (old === y)
                    return;
                if (y === true) {
                    x.prop('multiple', true);
                }
                else {
                    x.prop('multiple', false);
                }
                x.selectpicker('destroy');
                x.selectpicker();
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
            Selector.IgnoreMark = "Selector.Ignore";
            Selector.InstanceMark = "Selector.Instance";
            return Selector;
        }());
        Controls.Selector = Selector;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        var Selector = DomBehind.Controls.Selector;
        Data.DataBindingBehaviorBuilder.prototype.Multiple = function (allowMultiple) {
            var me = this;
            var behavior = me.Add(new Data.DataBindingBehavior());
            behavior.Property = Selector.AllowMultipleProperty;
            behavior.Priolity = -1;
            if (allowMultiple) {
                behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, allowMultiple);
            }
            else {
                behavior.PInfo = new DomBehind.BooleanFakeExpression(true);
            }
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Selector.js.map