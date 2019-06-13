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
        SelectAction?: (event: any, ui: any) => any;
    }
    interface SuggestionOption {
        minLength?: number;
        isShow?: boolean;
        array?: any;
        customSelectAction?: (x: any) => any;
        customFilter?: (item: any, inputValue: any) => boolean;
    }
    interface BindingBehaviorBuilder<T> {
        BuildSuggest<TRow>(source?: SuggestSource, delay?: number, option?: SuggestionOption): BindingBehaviorBuilder<TRow>;
    }
}
