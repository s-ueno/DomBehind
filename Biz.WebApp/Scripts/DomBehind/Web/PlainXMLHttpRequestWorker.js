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
    var Web;
    (function (Web) {
        DomBehind.Threading.WorkerPool.Register(function () { return PlainXMLHttpRequestWorker; });
        var PlainXMLHttpRequestWorker = /** @class */ (function (_super) {
            __extends(PlainXMLHttpRequestWorker, _super);
            function PlainXMLHttpRequestWorker() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(PlainXMLHttpRequestWorker.prototype, "WorkerScript", {
                get: function () {
                    return "/Scripts/DomBehind/Web/PlainXMLHttpRequest.js";
                },
                enumerable: true,
                configurable: true
            });
            return PlainXMLHttpRequestWorker;
        }(DomBehind.Threading.WorkerWrapper));
        Web.PlainXMLHttpRequestWorker = PlainXMLHttpRequestWorker;
    })(Web = DomBehind.Web || (DomBehind.Web = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=PlainXMLHttpRequestWorker.js.map