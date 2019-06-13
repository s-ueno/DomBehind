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
    var SuggestSource;
    (function (SuggestSource) {
        SuggestSource[SuggestSource["Google"] = 0] = "Google";
        SuggestSource[SuggestSource["Amazon"] = 1] = "Amazon";
        SuggestSource[SuggestSource["Array"] = 2] = "Array";
        SuggestSource[SuggestSource["Custom"] = 3] = "Custom";
    })(SuggestSource = DomBehind.SuggestSource || (DomBehind.SuggestSource = {}));
    var Suggest = (function (_super) {
        __extends(Suggest, _super);
        function Suggest() {
            var _this = _super.call(this) || this;
            _this.Source = SuggestSource.Google;
            return _this;
        }
        Suggest.prototype.Ensure = function () {
            var _this = this;
            if (this.Source === SuggestSource.Google) {
                this.CustomSource = function (request, response) {
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
                this.CustomSource = function (request, response) {
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
                this.CustomSource = function (request, response) {
                    response(_this.Option.array.Where(function (x) { return _this.Option.customFilter(x, request.term); }));
                };
            }
            var option = {
                source: function (request, response) { return _this.CustomSource(request, response); },
                delay: this.Delay,
                minLength: this.Option.minLength,
            };
            if (this.Option.customSelectAction) {
                this.SelectAction = function (ev, ui) {
                    var val = _this.Option.customSelectAction(ui);
                    _this.Element.val(val);
                };
                option = $.extend(true, option, {
                    select: this.SelectAction,
                });
            }
            var suggest = this.Element.autocomplete(option);
            if (this.Option && this.Option.isShow) {
                this.Element.focusin(function () {
                    _this.Element.autocomplete('search', _this.Element.val());
                });
            }
        };
        return Suggest;
    }(DomBehind.Data.BindingBehavior));
    DomBehind.Suggest = Suggest;
    DomBehind.BindingBehaviorBuilder.prototype.BuildSuggest = function (source, delay, option) {
        var me = this;
        var behavior = me.Add(new Suggest());
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
