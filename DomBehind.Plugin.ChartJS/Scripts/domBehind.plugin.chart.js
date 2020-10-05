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
    var ChartType;
    (function (ChartType) {
        ChartType[ChartType["Bar"] = 0] = "Bar";
        ChartType[ChartType["Line"] = 1] = "Line";
        ChartType[ChartType["Radar"] = 2] = "Radar";
        ChartType[ChartType["Pie"] = 3] = "Pie";
        ChartType[ChartType["PolarArea"] = 4] = "PolarArea";
        ChartType[ChartType["Bubble"] = 5] = "Bubble";
        ChartType[ChartType["Scatter"] = 6] = "Scatter";
    })(ChartType = DomBehind.ChartType || (DomBehind.ChartType = {}));
    var ColorGenerator = /** @class */ (function () {
        function ColorGenerator() {
            this.Index = 0;
            // デフォルト色にメトロカラー
            // https://www.colordic.org/m/ 
            this.Colors = [
                "#f39700",
                "#e60012",
                // "#9caeb7", /* 日比谷線シルバーHibiya Line Silver */
                "#00a7db",
                "#009944",
                "#d7c447",
                "#9b7cb6",
                "#00ada9",
                "#bb641d",
                "#e85298",
                "#0079c2",
                "#6cbb5a",
                "#b6007a",
                "#e5171f",
                "#522886",
                "#0078ba",
                "#019a66",
                "#e44d93",
                "#814721",
                "#a9cc51",
                "#ee7b1a",
                "#00a0de",
            ];
        }
        ColorGenerator.prototype.Pop = function (type) {
            var value = this.Colors[this.Index];
            if (this.Colors.length < ++this.Index) {
                this.Index = 0;
            }
            var arr = this.ParseColor(value);
            var background;
            var border;
            if (type === ChartType.Bar) {
                background = "rgba(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ", 0.5)";
            }
            else {
                background = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            }
            border = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            return { background: background, border: border };
        };
        ColorGenerator.prototype.ParseColor = function (input) {
            var regx = input.match(/^#([0-9a-f]{3})$/i);
            if (regx) {
                var val = regx[1];
                return [
                    parseInt(val.charAt(0), 16) * 0x11,
                    parseInt(val.charAt(1), 16) * 0x11,
                    parseInt(val.charAt(2), 16) * 0x11
                ];
            }
            regx = input.match(/^#([0-9a-f]{6})$/i);
            if (regx) {
                var val = regx[1];
                return [
                    parseInt(val.substr(0, 2), 16),
                    parseInt(val.substr(2, 2), 16),
                    parseInt(val.substr(4, 2), 16)
                ];
            }
            regx = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
            if (regx) {
                return [parseInt(regx[1]), parseInt(regx[2]), parseInt(regx[3])];
            }
            return [255, 0, 0];
        };
        return ColorGenerator;
    }());
    var ChartBehavior = /** @class */ (function (_super) {
        __extends(ChartBehavior, _super);
        function ChartBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChartBehavior.prototype.Ensure = function () {
            var identity = this.Element.attr("id");
            if (!identity) {
                identity = "id-" + NewUid();
                this.Element.attr("id", identity);
            }
            window[identity] = this;
            this.Colors = new ColorGenerator();
            _super.prototype.Ensure.call(this);
            if (this.Instance) {
                this.Instance.SetValue(this);
            }
        };
        ChartBehavior.prototype.UpdateTarget = function () {
            _super.prototype.UpdateTarget.call(this);
            if (this.Chart) {
                this.Chart.update();
            }
        };
        Object.defineProperty(ChartBehavior.prototype, "ItemsSource", {
            get: function () {
                return this._items;
            },
            set: function (value) {
                if (this._items) {
                    // hack 古いインスタンスに紐つけられたデリゲードを丸ごと削除
                    this._items.CurrentChanged.Clear();
                    this._items.CurrentChanging.Clear();
                    this._items.PropertyChanged.Clear();
                    this._items.Added.Clear();
                    this._items.Removed.Clear();
                }
                this._items = value;
                this.ReBuildChart();
            },
            enumerable: false,
            configurable: true
        });
        ChartBehavior.prototype.ReBuildChart = function () {
            var settings = {};
            settings.type = this.ParseType();
            settings.data = {
                datasets: this.DataSets(),
                labels: this.Labels()
            };
            settings.options = $.extend(true, this.DefaultOption, this.Option);
            if (this.ChartTitle) {
                settings.options.title = {
                    display: true,
                    text: this.ChartTitle
                };
            }
            settings.options.scales = this.ParseScales();
            if (!Object.IsNullOrUndefined(this.Responsive)) {
                settings.options.responsive = this.Responsive;
            }
            if (!Object.IsNullOrUndefined(this.Tooltips)) {
                settings.options.tooltips = this.Tooltips;
            }
            else {
                settings.options.tooltips = {
                    mode: "index",
                };
            }
            if (!Object.IsNullOrUndefined(this.Hover)) {
                settings.options.hover = this.Hover;
            }
            else {
                settings.options.hover = {
                    mode: "nearest"
                };
            }
            this.Element.empty();
            var canvas = this.Element[0];
            this.Chart = new Chart(canvas.getContext("2d"), settings);
        };
        ChartBehavior.prototype.ParseType = function () {
            if (this.Type === ChartType.Bar) {
                return "bar";
            }
            else if (this.Type === ChartType.Line) {
                return "line";
            }
            else if (this.Type === ChartType.Radar) {
                return "radar";
            }
            else if (this.Type === ChartType.Pie) {
                return "pie";
            }
            else if (this.Type === ChartType.PolarArea) {
                return "polarArea";
            }
            else if (this.Type === ChartType.Bubble) {
                return "bubble";
            }
            else if (this.Type === ChartType.Scatter) {
                return "scatter";
            }
        };
        ChartBehavior.prototype.Labels = function () {
            var arr = new Array();
            if (this.Expression.label) {
                var items = this.ItemsSource.ToArray();
                if (items.length !== 0) {
                    for (var i = 0; i < items.length; i++) {
                        var row = items[i];
                        arr.push(this.Expression.label(row));
                    }
                }
            }
            return arr;
        };
        ChartBehavior.prototype.DataSets = function () {
            if (!this.ItemsSource)
                return null;
            var items = this.ItemsSource.ToArray();
            if (items.length === 0)
                return null;
            var datasets = new Array();
            var schema = {};
            var schemaData = new Array();
            var backgroundColorList = new Array();
            var borderColorList = new Array();
            for (var i = 0; i < items.length; i++) {
                var data = items[i];
                if (Object.IsNullOrUndefined(data))
                    return;
                if (this.Expression.data) {
                    schemaData.push(this.Expression.data(data));
                }
                var color = this.Colors.Pop(this.Type);
                if (this.Expression.backgroundColor) {
                    var backgroundColor = this.Expression.backgroundColor(data);
                    if (backgroundColor) {
                        backgroundColorList.push(backgroundColor);
                    }
                }
                else {
                    backgroundColorList.push(color.background);
                }
                if (this.Expression.borderColor) {
                    var borderColor = this.Expression.backgroundColor(data);
                    if (borderColor) {
                        borderColorList.push(borderColor);
                    }
                }
                else {
                    borderColorList.push(color.border);
                }
                if (this.Expression.fill) {
                    var fill = this.Expression.fill(data);
                    if (fill) {
                        schema.fill = fill;
                    }
                }
                else {
                    schema.fill = false;
                }
            }
            schema.data = schemaData;
            schema.backgroundColor = backgroundColorList;
            schema.borderColor = borderColorList;
            datasets.push(schema);
            return datasets;
        };
        ChartBehavior.prototype.ParseScales = function () {
            var scales = {};
            if (this.ChartXCaption) {
                scales.xAxes = [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: this.ChartXCaption,
                        }
                    }
                ];
            }
            if (this.ChartYCaption) {
                scales.yAxes = [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: this.ChartYCaption,
                        }
                    }
                ];
            }
            return scales;
        };
        Object.defineProperty(ChartBehavior.prototype, "DefaultOption", {
            get: function () {
                return {
                    responsive: true,
                    legend: {
                        position: "top",
                    },
                };
            },
            enumerable: false,
            configurable: true
        });
        ChartBehavior.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemssource", function (el) {
            // one way
        }, function (el, newValue) {
            var id = el.attr("id");
            if (!id)
                return;
            var chart = window[id];
            if (!chart)
                return;
            chart.ItemsSource = newValue;
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        return ChartBehavior;
    }(DomBehind.Data.DataBindingBehavior));
    DomBehind.ChartBehavior = ChartBehavior;
    var ChartBindingBehaviorBuilder = /** @class */ (function (_super) {
        __extends(ChartBindingBehaviorBuilder, _super);
        function ChartBindingBehaviorBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChartBindingBehaviorBuilder.prototype.SetCaption = function (chartTitle) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.ChartTitle = chartTitle;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.SetCaptionPosition = function (position) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Position = position;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.SetCaptionX = function (xCaption) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.ChartXCaption = xCaption;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.SetCaptionY = function (yCaption) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.ChartYCaption = yCaption;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.SetResponsive = function (responsive) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Responsive = responsive;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.SetTootips = function (tootips) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                if (tootips) {
                    me.CurrentBehavior.Tooltips = tootips;
                }
                else {
                    me.CurrentBehavior.Tooltips = {
                        mode: "index",
                    };
                }
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.SetHover = function (hover) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                if (hover) {
                    me.CurrentBehavior.Hover = hover;
                }
                else {
                    me.CurrentBehavior.Hover = {
                        mode: "nearest",
                    };
                }
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.BindingBackgroundColor = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.backgroundColor = exp;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.BindingBorderColor = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.borderColor = exp;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.BindingBorderWidth = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.borderWidth = exp;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.BindingFill = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.fill = exp;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.BindingLabel = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.label = exp;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.BindingValue = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.data = exp;
            }
            return me;
        };
        ChartBindingBehaviorBuilder.prototype.BindingInstance = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Instance = new DomBehind.LamdaExpression(me.Owner.DataContext, exp);
            }
            return me;
        };
        return ChartBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.ChartBindingBehaviorBuilder = ChartBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildChart = function (itemsSource, type, option) {
        var me = this;
        var behavior = me.Add(new ChartBehavior());
        behavior.Property = ChartBehavior.ItemsSourceProperty;
        behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, itemsSource);
        behavior.Expression = {};
        behavior.Type = type;
        behavior.Option = option;
        var newMe = new ChartBindingBehaviorBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
    DomBehind.BindingBehaviorBuilder.prototype.BuildChartOfLine = function (itemsSource, option) {
        var me = this;
        var behavior = me.Add(new ChartBehavior());
        behavior.Property = ChartBehavior.ItemsSourceProperty;
        behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, itemsSource);
        behavior.Expression = {};
        behavior.Type = ChartType.Line;
        behavior.Option = option;
        var newMe = new ChartBindingBehaviorBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ChartBehavior.js.map