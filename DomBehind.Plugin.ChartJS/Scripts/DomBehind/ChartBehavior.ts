namespace DomBehind {

    export enum ChartType {
        Bar, Line,
    }

    class ColorGenerator {
        public Colors: Array<string>;
        constructor() {
            // デフォルト色にメトロカラー
            // https://www.colordic.org/m/ 
            this.Colors = [
                "#f39700", /* 銀座線オレンジGinza Line Orange */
                "#e60012", /* 丸の内線レッドMarunouchi Line Red */
                // "#9caeb7", /* 日比谷線シルバーHibiya Line Silver */
                "#00a7db", /* 東西線スカイTozai Line Sky */
                "#009944", /* 千代田線グリーンChiyoda Line Green */
                "#d7c447", /* 有楽町線ゴールドYurakucho Line Gold */
                "#9b7cb6", /* 半蔵門線パープルHanzomon Line Purple */
                "#00ada9", /* 南北線エメラルドNamboku Line Emerald */
                "#bb641d", /* 副都心線ブラウンFukutoshin Line Brown */
                "#e85298", /* 浅草線ローズAsakusa Line Rose */
                "#0079c2", /* 三田線ブルーMita Line Blue */
                "#6cbb5a", /* 新宿線リーフShinjuku Line Leaf */
                "#b6007a", /* 大江戸線ルビーOedo Line Ruby */
                "#e5171f", /* 御堂筋線 臙脂Midosuji Line Red */
                "#522886", /* 谷町線 京紫Tanimachi Line Purple */
                "#0078ba", /* 四つ橋線 縹Yotsubashi Line Blue */
                "#019a66", /* 中央線 緑Chuo Line Green */
                "#e44d93", /* 千日前線 紅梅Sennichimae Line Pink */
                "#814721", /* 堺筋線 マルーンSakaisuji Line Marron */
                "#a9cc51", /* 長堀鶴見緑地線 萌黄Nagahoritsurumiryokuchi Line Yellow Green */
                "#ee7b1a", /* 今里筋線 柑子Imazatosuji Line Orange */
                "#00a0de", /* 南港ポートタウン線 セルリアンブルーNanko port town Line Cerulean Blue */
            ];
        }
        protected Index: number = 0;
        public Pop(type: ChartType): { background: string, border: string } {
            let value = this.Colors[this.Index];

            if (this.Colors.length < ++this.Index) {
                this.Index = 0;
            }

            let arr = this.ParseColor(value);

            let background: string;
            let border: string;
            if (type === ChartType.Bar) {
                background = `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.5)`;
            } else {
                background = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
            }
            border = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
            return { background: background, border: border };
        }

        protected ParseColor(input: string): number[] {
            let regx = input.match(/^#([0-9a-f]{3})$/i);
            if (regx) {
                let val = regx[1];
                return [
                    parseInt(val.charAt(0), 16) * 0x11,
                    parseInt(val.charAt(1), 16) * 0x11,
                    parseInt(val.charAt(2), 16) * 0x11
                ];
            }

            regx = input.match(/^#([0-9a-f]{6})$/i);
            if (regx) {
                let val = regx[1];
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
        }
    }

    export class ChartBehavior extends Data.DataBindingBehavior {

        public static ItemsSourceProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("itemssource",
                el => {
                    // one way
                },
                (el, newValue) => {
                    let id = el.attr("id");
                    if (!id) return;

                    let chart: ChartBehavior = window[id];
                    if (!chart) return;

                    chart.ItemsSource = newValue;
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWay
            );

        public Ensure() {
            let identity = this.Element.attr("id");
            if (!identity) {
                identity = `id-${NewUid()}`;
                this.Element.attr("id", identity);
            }
            window[identity] = this;

            this.Colors = new ColorGenerator();

            super.Ensure();

            if (this.Instance) {
                this.Instance.SetValue(this);
            }
        }

        public /* override */ UpdateTarget(): void {
            super.UpdateTarget();

            if (this.Chart) {
                this.Chart.update();
            }
        }

        protected Colors: ColorGenerator;
        public Type: ChartType;
        public Option: ChartOptions;

        private _items: Data.ListCollectionView;
        public get ItemsSource(): Data.ListCollectionView {
            return this._items;
        }
        public set ItemsSource(value: Data.ListCollectionView) {
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
        }

        protected ReBuildChart() {
            let settings: ChartConfiguration = {};
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
            settings.options.tooltips = this.Tooltips;
            settings.options.hover = this.Hover;

            this.Element.empty();

            let canvas: HTMLCanvasElement = <HTMLCanvasElement>this.Element[0];
            this.Chart = new Chart(canvas.getContext("2d"), settings);
        }
        protected ParseType() {
            if (this.Type === ChartType.Bar) {
                return "bar";
            } else if (this.Type === ChartType.Line) {
                return "line";
            }
        }
        protected Labels() {
            if (this.Expression.lineLabels) {
                return this.Expression.lineLabels(this.DataContext);
            }
        }
        protected DataSets(): ChartDataSets[] {
            if (!this.ItemsSource) return null;

            let items = this.ItemsSource.ToArray();
            if (items.length === 0) return null;

            let datasets = new Array<ChartDataSets>();
            for (var i = 0; i < items.length; i++) {
                let data = items[i];
                if (Object.IsNullOrUndefined(data)) return;

                let schema: ChartDataSets = {};

                if (this.Expression.label) {
                    let label = this.Expression.label(data);
                    if (label) {
                        schema.label = label;
                    }
                }

                let color = this.Colors.Pop(this.Type);
                schema.backgroundColor = color.background;
                schema.borderColor = color.border;

                if (this.Expression.backgroundColor) {
                    let backgroundColor = this.Expression.backgroundColor(data);
                    if (backgroundColor) {
                        schema.backgroundColor = backgroundColor;
                    }
                }
                if (this.Expression.borderColor) {
                    let borderColor = this.Expression.backgroundColor(data);
                    if (borderColor) {
                        schema.borderColor = borderColor;
                    }
                }
                if (this.Expression.fill) {
                    let fill = this.Expression.fill(data);
                    if (fill) {
                        schema.fill = fill;
                    }
                } else {
                    schema.fill = false;
                }

                if (this.Expression.data) {
                    schema.data = this.Expression.data(data);
                }

                datasets.push(schema);
            }
            return datasets;
        }

        protected ParseScales(): ChartScales {
            let scales: ChartScales = {};
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
        }

        protected get DefaultOption(): ChartOptions {
            return {
                responsive: true,
                legend: {
                    position: "top",
                },
            };
        }
        public Instance: LamdaExpression;
        public Chart: Chart;
        public ChartTitle: string;
        public ChartXCaption: string;
        public ChartYCaption: string;
        public Position: string;
        public Responsive: boolean;
        public Tooltips: ChartTooltipOptions;
        public Hover: ChartHoverOptions;
        public Expression: {
            label?: (row: any) => string,
            backgroundColor?: (row: any) => ChartColor,
            borderColor?: (row: any) => ChartColor,
            borderWidth?: (row: any) => number,
            fill?: (row: any) => boolean,

            data?: (row: any) => number[] | ChartPoint[],
            labels?: (owner: any) => string,

            lineLabels?: (owner: any) => string[]
        };
    }

    export class ChartBindingBehaviorBuilder<T, TRow> extends BindingBehaviorBuilder<TRow>{

        public SetCaption(chartTitle: string): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.ChartTitle = chartTitle;
            }
            return me;
        }
        public SetCaptionPosition(position: string): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Position = position;
            }
            return me;
        }
        public SetCaptionX(xCaption: string): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.ChartXCaption = xCaption;
            }
            return me;
        }
        public SetCaptionY(yCaption: string): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.ChartYCaption = yCaption;
            }
            return me;
        }
        public SetResponsive(responsive: boolean): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Responsive = responsive;
            }
            return me;
        }

        public SetTootips(tootips?: ChartTooltipOptions): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                if (tootips) {
                    me.CurrentBehavior.Tooltips = tootips;
                } else {
                    me.CurrentBehavior.Tooltips = {
                        mode: "index",
                    };
                }
            }
            return me;
        }
        public SetHover(hover?: ChartHoverOptions): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                if (hover) {
                    me.CurrentBehavior.Hover = hover;
                } else {
                    me.CurrentBehavior.Hover = {
                        mode: "nearest",
                    };
                }
            }
            return me;
        }

        public BindingBackgroundColor(exp: (row: TRow) => ChartColor): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.backgroundColor = exp;
            }
            return me;
        }
        public BindingBorderColor(exp: (row: TRow) => ChartColor): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.borderColor = exp;
            }
            return me;
        }
        public BindingBorderWidth(exp: (row: TRow) => number): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.borderWidth = exp;
            }
            return me;
        }
        public BindingFill(exp: (row: TRow) => boolean): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.fill = exp;
            }
            return me;
        }
        public BindingValues(exp: (row: TRow) => number[] | ChartPoint[]): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.data = exp;
            }
            return me;
        }
        public BindingValueDescription(exp: (row: TRow) => string): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.labels = exp;
            }
            return me;
        }
        public BindingValueTitles(exp: (row: T) => string[]): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Expression.lineLabels = exp;
            }
            return me;
        }



        public BindingInstance(exp: (row: T) => ChartBehavior): ChartBindingBehaviorBuilder<T, TRow> {
            let me: ChartBindingBehaviorBuilder<any, any> = this;
            if (me.CurrentBehavior instanceof ChartBehavior) {
                me.CurrentBehavior.Instance = new LamdaExpression(me.Owner.DataContext, exp);
            }
            return me;
        }
    }

    export interface BindingBehaviorBuilder<T> {
        BuildChartOfLine<TRow>(itemsSource: (x: T) => any, option?: ChartOptions): ChartBindingBehaviorBuilder<T, TRow>;
    }

    BindingBehaviorBuilder.prototype.BuildChartOfLine = function (itemsSource: (x: any) => any, option?: ChartOptions) {
        let me: BindingBehaviorBuilder<any> = this;

        let behavior = me.Add(new ChartBehavior());
        behavior.Property = ChartBehavior.ItemsSourceProperty;
        behavior.PInfo = new LamdaExpression(me.Owner.DataContext, itemsSource);
        behavior.Expression = {};
        behavior.Type = ChartType.Line;
        behavior.Option = option;

        let newMe = new ChartBindingBehaviorBuilder<any, any>(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    }


}