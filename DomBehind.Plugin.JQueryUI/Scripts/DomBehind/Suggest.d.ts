declare namespace DomBehind {
    enum SuggestSource {
        Google = 0,
        Amazon = 1,
        Custom = 2
    }
    class Suggest extends Data.BindingBehavior {
        constructor();
        Ensure(): void;
        Source: SuggestSource;
        Delay: number;
        CustomSource?: (request: any, response: any) => void;
    }
    interface BindingBehaviorBuilder<T> {
        BuildSuggest<TRow>(source?: SuggestSource, delay?: number, customSource?: (request: any, response: any) => void): BindingBehaviorBuilder<TRow>;
    }
}
