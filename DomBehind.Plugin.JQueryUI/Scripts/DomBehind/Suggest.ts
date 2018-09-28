namespace DomBehind {


    export enum SuggestSource {
        Google, Amazon, Custom
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
            }

            let suggest = this.Element.autocomplete({
                source: (request, response) => this.CustomSource(request, response),
                delay: this.Delay,
            });
        }
        public Source: SuggestSource;
        public Delay: number;
        public CustomSource?: (request, response) => void
    }



    export interface BindingBehaviorBuilder<T> {
        BuildSuggest<TRow>(source?: SuggestSource, delay?: number, customSource?: (request, response) => void): BindingBehaviorBuilder<TRow>;
    }

    BindingBehaviorBuilder.prototype.BuildSuggest = function (source?: SuggestSource, delay?: number, customSource?: (request, response) => void) {
        let me: BindingBehaviorBuilder<any> = this;

        let behavior = me.Add(new Suggest());
        if (source) {
            behavior.Source = source;
        }
        if (delay) {
            behavior.Delay = delay;
        }
        if (customSource) {
            behavior.CustomSource = customSource;
        }
        return me;
    }
}