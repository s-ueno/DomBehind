var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var AjaxException = /** @class */ (function (_super) {
        __extends(AjaxException, _super);
        function AjaxException(JqXHR, TextStatus, ErrorThrown) {
            var _this = _super.call(this, TextStatus) || this;
            _this.JqXHR = JqXHR;
            _this.TextStatus = TextStatus;
            _this.ErrorThrown = ErrorThrown;
            return _this;
        }
        Object.defineProperty(AjaxException.prototype, "ErrorStatus", {
            get: function () {
                return (this.JqXHR) ? this.JqXHR.status : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjaxException.prototype, "ErrorTitle", {
            get: function () {
                if (this.JqXHR) {
                    // MVC Controller経由の緩いコントラクト
                    var json = this.JqXHR.responseJSON;
                    if (json.Message) {
                        return json.Message;
                    }
                    // ERROR HTMLからタイトル抜粋
                    return $(this.JqXHR.responseText).filter("title").text();
                }
                // JqueryAjax以外
                return this.TextStatus + ":" + this.ErrorThrown;
            },
            enumerable: true,
            configurable: true
        });
        AjaxException.prototype.ToString = function () {
            return "status:" + this.ErrorStatus + "\n" + this.ErrorTitle;
        };
        return AjaxException;
    }(DomBehind.Exception));
    DomBehind.AjaxException = AjaxException;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=AjaxException.js.map