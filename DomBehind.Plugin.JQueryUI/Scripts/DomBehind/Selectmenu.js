var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Selectmenu = (function () {
            function Selectmenu() {
                this._engaged = false;
            }
            Selectmenu.Register = function (behavior) {
                var el = behavior.Element;
                var value = el.data("native-menu");
                if (String.IsNullOrWhiteSpace(value)) {
                    el.data("native-menu", "false");
                }
            };
            Selectmenu.Rebuild = function (el, list) {
                var newArray = list.ToArray();
                if (newArray.SequenceEqual(list.__oldArray)) {
                    return false;
                }
                el.empty();
                var identity = el.data("menu_identity");
                if (!identity) {
                    identity = "menu_" + NewUid();
                    el.data("menu_identity", identity);
                }
                var oldArray = list.__oldArray;
                list.__oldArray = newArray;
                var index = 0;
                var items = newArray.Select(function (x) {
                    if (Object.IsNullOrUndefined(x))
                        return null;
                    x.recid = identity + "_" + ++index;
                    var text;
                    if (list.DisplayMemberPath) {
                        text = x[list.DisplayMemberPath];
                    }
                    else {
                        text = x.toString();
                    }
                    var newVal = {
                        id: x.recid,
                        text: text,
                        obj: x,
                    };
                    el.append("<option value=\"" + newVal.id + "\">" + newVal.text + "</option>");
                    return newVal;
                });
                Selectmenu.UpdateCurrent(el, list);
                return true;
            };
            Selectmenu.UpdateCurrent = function (el, list) {
                var widget = el.selectmenu();
                if (list.Current != null) {
                    var id = list.Current.recid;
                    widget.val(id);
                }
                widget.selectmenu("refresh");
            };
            Selectmenu.prototype.OnCurrentChanged = function (sender, e) {
                if (this._engaged)
                    return;
                var me = sender.__widget;
                var el = me.Element;
                if (String.IsNullOrWhiteSpace(e.Name)) {
                    Selectmenu.Rebuild(el, sender);
                }
                else if (e.Name === "Current") {
                    Selectmenu.UpdateCurrent(el, sender);
                }
            };
            Selectmenu.IsEnabledProperty = DomBehind.Data.DependencyProperty.RegisterAttached("_disabled", function (el) {
            }, function (el, newValue) {
                if (Object.IsNullOrUndefined(el))
                    return;
                var oldValueString = el.attr("selectMenu_oldIsEnabled");
                var oldValue = oldValueString === "false" ? false : true;
                try {
                    el.attr("selectMenu_oldIsEnabled", newValue);
                    el.selectmenu("option", "disabled", newValue === false);
                }
                catch (e) {
                    el.attr("_disabled", newValue === false ? "true" : "false");
                }
                if (newValue === oldValue)
                    return;
                DomBehind.UIElement.RaiseEnabledChanged(el, newValue);
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
            Selectmenu.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", function (el) {
            }, function (el, newValue) {
                if (newValue instanceof DomBehind.Data.ListCollectionView) {
                    if (!Selectmenu.Rebuild(el, newValue))
                        return;
                    var sm_1 = newValue.__widget;
                    if (!sm_1) {
                        sm_1 = newValue.__widget = new Selectmenu();
                    }
                    var disabled = false;
                    if (el.attr("_disabled") === "true") {
                        disabled = true;
                    }
                    var option = {
                        change: function (e) {
                            var recId = el.val();
                            sm_1._engaged = true;
                            try {
                                if (sm_1.Items) {
                                    if (Object.IsNullOrUndefined(recId) || recId === "undefined") {
                                        var selectedText = el.find(":selected").text();
                                        var e_1 = new DomBehind.CancelEventArgs(false);
                                        sm_1.Items.CurrentChanging.Raise(sm_1.Items, e_1);
                                        if (!e_1.Cancel) {
                                            sm_1.Items.Begin();
                                            sm_1.Items.Current = selectedText;
                                            sm_1.Items.End();
                                            sm_1.Items.CurrentChanged.Raise(sm_1.Items, new DomBehind.PropertyChangedEventArgs("Current"));
                                        }
                                    }
                                    else {
                                        var current = sm_1.Items.ToArray().FirstOrDefault(function (x) { return x.recid === recId; });
                                        sm_1.Items.Select(current);
                                    }
                                }
                            }
                            finally {
                                sm_1._engaged = false;
                            }
                        },
                        classes: {
                            "ui-selectmenu-menu": "jqueryui-highlight"
                        }
                    };
                    if (disabled) {
                        option.disabled = true;
                    }
                    sm_1.Element = el.selectmenu(option);
                    sm_1.Element.selectmenu("refresh");
                    sm_1.Items = newValue;
                    newValue.PropertyChanged.RemoveHandler(sm_1.OnCurrentChanged);
                    newValue.PropertyChanged.AddHandler(sm_1.OnCurrentChanged);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, function (behavior) {
                Selectmenu.Register(behavior);
            });
            return Selectmenu;
        }());
        Controls.Selectmenu = Selectmenu;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
