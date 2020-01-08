declare namespace DomBehind {
    export enum ChartType {
        Bar = 0,
        Line = 1,
        Radar = 2,
        Pie = 3,
        PolarArea = 4,
        Bubble = 5,
        Scatter = 6
    }
    class ColorGenerator {
        Colors: Array<string>;
        constructor();
        protected Index: number;
        Pop(type: ChartType): {
            background: string;
            border: string;
        };
        protected ParseColor(input: string): number[];
    }
    export class ChartBehavior extends Data.DataBindingBehavior {
        static ItemsSourceProperty: Data.DependencyProperty;
        Ensure(): void;
        UpdateTarget(): void;
        protected Colors: ColorGenerator;
        Type: ChartType;
        Option: ChartOptions;
        private _items;
        ItemsSource: Data.ListCollectionView;
        protected ReBuildChart(): void;
        protected ParseType(): "line" | "bar" | "radar" | "pie" | "polarArea" | "bubble" | "scatter";
        protected Labels(): string[];
        protected DataSets(): ChartDataSets[];
        protected ParseScales(): ChartScales;
        protected readonly DefaultOption: ChartOptions;
        Instance: LamdaExpression;
        Chart: Chart;
        ChartTitle: string;
        ChartXCaption: string;
        ChartYCaption: string;
        Position: string;
        Responsive: boolean;
        Tooltips: ChartTooltipOptions;
        Hover: ChartHoverOptions;
        Expression: {
            label?: (row: any) => string;
            backgroundColor?: (row: any) => ChartColor;
            borderColor?: (row: any) => ChartColor;
            borderWidth?: (row: any) => number;
            fill?: (row: any) => boolean;
            data?: (row: any) => number | ChartPoint;
        };
    }
    export class ChartBindingBehaviorBuilder<T, TRow> extends BindingBehaviorBuilder<TRow> {
        SetCaption(chartTitle: string): ChartBindingBehaviorBuilder<T, TRow>;
        SetCaptionPosition(position: string): ChartBindingBehaviorBuilder<T, TRow>;
        SetCaptionX(xCaption: string): ChartBindingBehaviorBuilder<T, TRow>;
        SetCaptionY(yCaption: string): ChartBindingBehaviorBuilder<T, TRow>;
        SetResponsive(responsive: boolean): ChartBindingBehaviorBuilder<T, TRow>;
        SetTootips(tootips?: ChartTooltipOptions): ChartBindingBehaviorBuilder<T, TRow>;
        SetHover(hover?: ChartHoverOptions): ChartBindingBehaviorBuilder<T, TRow>;
        BindingBackgroundColor(exp: (row: TRow) => ChartColor): ChartBindingBehaviorBuilder<T, TRow>;
        BindingBorderColor(exp: (row: TRow) => ChartColor): ChartBindingBehaviorBuilder<T, TRow>;
        BindingBorderWidth(exp: (row: TRow) => number): ChartBindingBehaviorBuilder<T, TRow>;
        BindingFill(exp: (row: TRow) => boolean): ChartBindingBehaviorBuilder<T, TRow>;
        BindingLabel(exp: (row: TRow) => string): ChartBindingBehaviorBuilder<T, TRow>;
        BindingValue(exp: (row: TRow) => number | ChartPoint): ChartBindingBehaviorBuilder<T, TRow>;
        BindingInstance(exp: (row: T) => ChartBehavior): ChartBindingBehaviorBuilder<T, TRow>;
    }
    export interface BindingBehaviorBuilder<T> {
        BuildChart<TRow>(itemsSource: (x: T) => any, type: ChartType, option?: ChartOptions): ChartBindingBehaviorBuilder<T, TRow>;
        BuildChartOfLine<TRow>(itemsSource: (x: T) => any, option?: ChartOptions): ChartBindingBehaviorBuilder<T, TRow>;
    }
    export {};
}