namespace DomBehind {


    export enum SuggestSource {
        Google, Amazon, Array, Custom
    }


    export class Suggest extends Data.BindingBehavior {

        constructor() {
            super();
            this.Source = SuggestSource.Google;
        }

        Ensure(): void {

            if (this.Source === SuggestSource.Google) {
                this.CustomSource = (request, response) => {
                    $.ajax({
                        url: "http://www.google.com/complete/search",
                        data: { hl: 'ja', client: 'firefox', q: request.term },
                        dataType: "jsonp",
                        type: "GET",
                        success: function (data) {
                            //alert(data);
                            response(data[1]);
                        }
                    });
                }
            } else if (this.Source === SuggestSource.Amazon) {
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
                }
            } else if (this.Source == SuggestSource.Array) {
                this.CustomSource = (request, response) => {
                    response(this.Option.array.Where(x => this.Option.customFilter(x, request.term)));
                }
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

        public Source: SuggestSource;
        public Delay: number;
        public CustomSource?: (request, response) => void
        public Option?: SuggestionOption;
        public SelectAction?: (event, ui) => any;
    }

    export interface SuggestionOption {
        minLength?: number,
        isShow?: boolean,
        array?: any,
        customSelectAction?: (x: any) => any;
        customFilter?: (item: any, inputValue: any) => boolean;
    }


    export interface BindingBehaviorBuilder<T> {
        BuildSuggest<TRow>(source?: SuggestSource, delay?: number, option?: SuggestionOption): BindingBehaviorBuilder<TRow>;
    }

    BindingBehaviorBuilder.prototype.BuildSuggest = function (source?: SuggestSource, delay?: number,
        option?: SuggestionOption) {
        let me: BindingBehaviorBuilder<any> = this;

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
    }
}