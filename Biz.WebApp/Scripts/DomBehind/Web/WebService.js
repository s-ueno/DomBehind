var DomBehind;
(function (DomBehind) {
    var Web;
    (function (Web) {
        var WebService = /** @class */ (function () {
            function WebService() {
                this.Timeout = 1000 * 30;
            }
            WebService.prototype.Execute = function (request) {
                var ex;
                var option = this.DefaultPostSetting;
                option.data = request;
                option.async = false;
                option.error = function (xhr, status, error) {
                    ex = new DomBehind.AjaxException(xhr, status, error);
                };
                var promise = $.ajax(option);
                if (ex) {
                    throw ex;
                }
                return promise.responseJSON;
            };
            WebService.prototype.ExecuteAjax = function (request, option) {
                var d = $.Deferred();
                var p = $.extend(true, this.DefaultPostSetting, option);
                p.data = request;
                p.async = true;
                $.ajax(p).done(function (x) {
                    d.resolve(x);
                }).fail(function (x) {
                    d.reject(new DomBehind.AjaxException(x));
                });
                return d.promise();
            };
            WebService.prototype.ExecuteAsync = function (request) {
                return DomBehind.Threading.WorkerPool.Do(Web.PlainXMLHttpRequestWorker, {
                    Url: $.AbsoluteUri(this.Url),
                    Request: request
                });
            };
            Object.defineProperty(WebService.prototype, "DefaultPostSetting", {
                get: function () {
                    return {
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        url: $.AbsoluteUri(this.Url),
                        timeout: this.Timeout,
                        traditional: true
                    };
                },
                enumerable: true,
                configurable: true
            });
            return WebService;
        }());
        Web.WebService = WebService;
    })(Web = DomBehind.Web || (DomBehind.Web = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WebService.js.map