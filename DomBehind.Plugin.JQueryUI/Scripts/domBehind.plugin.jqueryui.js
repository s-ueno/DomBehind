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

var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Tooltip = (function () {
            function Tooltip() {
            }
            Tooltip.TextProperty = DomBehind.Data.DependencyProperty.RegisterAttached("title", function (x) { return x.attr("title"); }, function (x, y) {
                var element = x;
                if (x.attr("type") === "checkbox") {
                    var parent_1 = x.closest("label");
                    parent_1.tooltip();
                    parent_1.attr("title", y);
                }
                else {
                    x.tooltip();
                    x.attr("title", y);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
            return Tooltip;
        }());
        Controls.Tooltip = Tooltip;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var SuggestSource;
    (function (SuggestSource) {
        SuggestSource[SuggestSource["Google"] = 0] = "Google";
        SuggestSource[SuggestSource["Amazon"] = 1] = "Amazon";
        SuggestSource[SuggestSource["Array"] = 2] = "Array";
        SuggestSource[SuggestSource["Custom"] = 3] = "Custom";
    })(SuggestSource = DomBehind.SuggestSource || (DomBehind.SuggestSource = {}));
    var Suggest = (function (_super) {
        __extends(Suggest, _super);
        function Suggest() {
            var _this = _super.call(this) || this;
            _this.Source = SuggestSource.Google;
            return _this;
        }
        Suggest.prototype.Ensure = function () {
            var _this = this;
            if (this.Source === SuggestSource.Google) {
                this.CustomSource = function (request, response) {
                    $.ajax({
                        url: "http://www.google.com/complete/search",
                        data: { hl: 'ja', client: 'firefox', q: request.term },
                        dataType: "jsonp",
                        type: "GET",
                        success: function (data) {
                            response(data[1]);
                        }
                    });
                };
            }
            else if (this.Source === SuggestSource.Amazon) {
                this.CustomSource = function (request, response) {
                    $.ajax({
                        url: "http://completion.amazon.co.jp/search/complete",
                        data: { mkt: '6', method: 'completion', 'search-alias': 'aps', q: request.term },
                        dataType: "jsonp",
                        type: "GET",
                        success: function (data) {
                            response(data[1]);
                        }
                    });
                };
            }
            else if (this.Source == SuggestSource.Array) {
                this.CustomSource = function (request, response) {
                    response(_this.Option.array.Where(function (x) { return _this.Option.customFilter(x, request.term); }));
                };
            }
            var option = {
                source: function (request, response) { return _this.CustomSource(request, response); },
                delay: this.Delay,
                minLength: this.Option.minLength,
            };
            if (this.Option.customSelectAction) {
                this.SelectAction = function (ev, ui) {
                    var val = _this.Option.customSelectAction(ui);
                    _this.Element.val(val);
                };
                option = $.extend(true, option, {
                    select: this.SelectAction,
                });
            }
            var suggest = this.Element.autocomplete(option);
            if (this.Option && this.Option.isShow) {
                this.Element.focusin(function () {
                    _this.Element.autocomplete('search', _this.Element.val());
                });
            }
        };
        return Suggest;
    }(DomBehind.Data.BindingBehavior));
    DomBehind.Suggest = Suggest;
    DomBehind.BindingBehaviorBuilder.prototype.BuildSuggest = function (source, delay, option) {
        var me = this;
        var behavior = me.Add(new Suggest());
        if (source) {
            behavior.Source = source;
        }
        if (delay) {
            behavior.Delay = delay;
        }
        if (option) {
            behavior.Option = option;
        }
        return me;
    };
})(DomBehind || (DomBehind = {}));