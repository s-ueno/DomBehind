declare namespace DomBehind {
    enum SuggestSource {
        Google = 0,
        Amazon = 1,
        Array = 2,
        Custom = 3
    }
    class Suggest extends Data.BindingBehavior {
        constructor();
        Ensure(): void;
        Source: SuggestSource;
        Delay: number;
        CustomSource?: (request: any, response: any) => void;
        Option?: SuggestionOption;
    }
    interface SuggestionOption {
        minLength?: number;
        isShow?: boolean;
        array?: Array<string>;
    }
    interface BindingBehaviorBuilder<T> {
        BuildSuggest<TRow>(source?: SuggestSource, delay?: number, option?: SuggestionOption): BindingBehaviorBuilder<TRow>;
    }
}
