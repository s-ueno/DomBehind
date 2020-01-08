var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        class Selectmenu {
            constructor() {
                this._engaged = false;
            }
            static Register(behavior) {
                let el = behavior.Element;
                let value = el.data("native-menu");
                if (String.IsNullOrWhiteSpace(value)) {
                    el.data("native-menu", "false");
                }
            }
            static Rebuild(el, list) {
                let newArray = list.ToArray();
                if (newArray.SequenceEqual(list.__oldArray)) {
                    return false;
                }
                el.empty();
                let identity = el.data("menu_identity");
                if (!identity) {
                    identity = `menu_${NewUid()}`;
                    el.data("menu_identity", identity);
                }
                let oldArray = list.__oldArray;
                list.__oldArray = newArray;
                let index = 0;
                let items = newArray.Select(x => {
                    if (Object.IsNullOrUndefined(x))
                        return null;
                    x.recid = `${identity}_${++index}`;
                    let text;
                    if (list.DisplayMemberPath) {
                        text = x[list.DisplayMemberPath];
                    }
                    else {
                        text = x.toString();
                    }
                    let newVal = {
                        id: x.recid,
                        text: text,
                        obj: x,
                    };
                    el.append(`<option value="${newVal.id}">${newVal.text}</option>`);
                    return newVal;
                });
                Selectmenu.UpdateCurrent(el, list);
                return true;
            }
            static UpdateCurrent(el, list) {
                let widget = el.selectmenu();
                if (list.Current != null) {
                    let id = list.Current.recid;
                    widget.val(id);
                }
                widget.selectmenu("refresh");
            }
            OnCurrentChanged(sender, e) {
                if (this._engaged)
                    return;
                let me = sender.__widget;
                let el = me.Element;
                if (String.IsNullOrWhiteSpace(e.Name)) {
                    Selectmenu.Rebuild(el, sender);
                }
                else if (e.Name === "Current") {
                    Selectmenu.UpdateCurrent(el, sender);
                }
            }
        }
        Selectmenu.IsEnabledProperty = DomBehind.Data.DependencyProperty.RegisterAttached("_disabled", el => {
        }, (el, newValue) => {
            if (Object.IsNullOrUndefined(el))
                return;
            let oldValueString = el.attr("selectMenu_oldIsEnabled");
            let oldValue = oldValueString === "false" ? false : true;
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
        Selectmenu.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", el => {
        }, (el, newValue) => {
            if (newValue instanceof DomBehind.Data.ListCollectionView) {
                if (!Selectmenu.Rebuild(el, newValue))
                    return;
                let sm = newValue.__widget;
                if (!sm) {
                    sm = newValue.__widget = new Selectmenu();
                }
                let disabled = false;
                if (el.attr("_disabled") === "true") {
                    disabled = true;
                }
                let option = {
                    change: e => {
                        let recId = el.val();
                        sm._engaged = true;
                        try {
                            if (sm.Items) {
                                if (Object.IsNullOrUndefined(recId) || recId === "undefined") {
                                    let selectedText = el.find(":selected").text();
                                    let e = new DomBehind.CancelEventArgs(false);
                                    sm.Items.CurrentChanging.Raise(sm.Items, e);
                                    if (!e.Cancel) {
                                        sm.Items.Begin();
                                        sm.Items.Current = selectedText;
                                        sm.Items.End();
                                        sm.Items.CurrentChanged.Raise(sm.Items, new DomBehind.PropertyChangedEventArgs("Current"));
                                    }
                                }
                                else {
                                    let current = sm.Items.ToArray().FirstOrDefault(x => x.recid === recId);
                                    sm.Items.Select(current);
                                }
                            }
                        }
                        finally {
                            sm._engaged = false;
                        }
                    },
                    classes: {
                        "ui-selectmenu-menu": "jqueryui-highlight"
                    }
                };
                if (disabled) {
                    option.disabled = true;
                }
                sm.Element = el.selectmenu(option);
                sm.Element.selectmenu("refresh");
                sm.Items = newValue;
                newValue.PropertyChanged.RemoveHandler(sm.OnCurrentChanged);
                newValue.PropertyChanged.AddHandler(sm.OnCurrentChanged);
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, behavior => {
            Selectmenu.Register(behavior);
        });
        Controls.Selectmenu = Selectmenu;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));

var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        class Tooltip {
        }
        Tooltip.TextProperty = DomBehind.Data.DependencyProperty.RegisterAttached("title", x => x.attr("title"), (x, y) => {
            let element = x;
            if (x.attr("type") === "checkbox") {
                let parent = x.closest("label");
                parent.tooltip();
                parent.attr("title", y);
            }
            else {
                x.tooltip();
                x.attr("title", y);
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        Controls.Tooltip = Tooltip;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));

var DomBehind;
(function (DomBehind) {
    let SuggestSource;
    (function (SuggestSource) {
        SuggestSource[SuggestSource["Google"] = 0] = "Google";
        SuggestSource[SuggestSource["Amazon"] = 1] = "Amazon";
        SuggestSource[SuggestSource["Array"] = 2] = "Array";
        SuggestSource[SuggestSource["Custom"] = 3] = "Custom";
    })(SuggestSource = DomBehind.SuggestSource || (DomBehind.SuggestSource = {}));
    class Suggest extends DomBehind.Data.BindingBehavior {
        constructor() {
            super();
            this.Source = SuggestSource.Google;
        }
        Ensure() {
            if (this.Source === SuggestSource.Google) {
                this.CustomSource = (request, response) => {
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
                this.CustomSource = (request, response) => {
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
                this.CustomSource = (request, response) => {
                    response(this.Option.array.Where(x => this.Option.customFilter(x, request.term)));
                };
            }
            let option = {
                source: (request, response) => this.CustomSource(request, response),
                delay: this.Delay,
                minLength: this.Option.minLength,
            };
            if (this.Option.customSelectAction) {
                this.SelectAction = (ev, ui) => {
                    let val = this.Option.customSelectAction(ui);
                    this.Element.val(val);
                };
                option = $.extend(true, option, {
                    select: this.SelectAction,
                });
            }
            let suggest = this.Element.autocomplete(option);
            if (this.Option && this.Option.isShow) {
                this.Element.focusin(() => {
                    this.Element.autocomplete('search', this.Element.val());
                });
            }
        }
    }
    DomBehind.Suggest = Suggest;
    DomBehind.BindingBehaviorBuilder.prototype.BuildSuggest = function (source, delay, option) {
        let me = this;
        let behavior = me.Add(new Suggest());
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