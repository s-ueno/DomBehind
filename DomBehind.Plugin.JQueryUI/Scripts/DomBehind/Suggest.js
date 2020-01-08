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
