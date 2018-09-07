namespace DomBehind.Web {

    export abstract class WebService<TRequest, TResponse> {

        protected abstract get Url(): string;

        public Timeout: number = 1000 * 30;

        public Execute(request: TRequest): TResponse {
            let ex: Exception;
            let option: JQueryAjaxSettings = this.DefaultPostSetting;
            option.data = request;
            option.async = false;
            option.error = (xhr, status, error) => {
                ex = new AjaxException(xhr, status, error)
            }
            var promise = $.ajax(option);
            if (ex) {
                throw ex;
            }
            return <TResponse>promise.responseJSON;
        }

        public ExecuteAjax(request: TRequest, option?: JQueryAjaxSettings): JQueryPromise<TResponse> {
            let d = $.Deferred<TResponse>();
            let p: JQueryAjaxSettings = $.extend(true, this.DefaultPostSetting, option);
            p.data = request;
            p.async = true;
            $.ajax(p).done(x => {
                d.resolve(x);
            }).fail(x => {
                d.reject(new AjaxException(x));
            });
            return d.promise();
        }

        public ExecuteAsync(request: TRequest, option?: JQueryAjaxSettings): JQueryPromise<TResponse> {
            let d = $.Deferred<TResponse>();
            let p: JQueryAjaxSettings = $.extend(true, this.DefaultPostSetting, option);
            p.data = JSON.stringify(request);
            p.async = true;
            $.ajax(p).done(x => {
                d.resolve(x);
            }).fail(x => {
                d.reject(new AjaxException(x));
            });
            return d.promise();
        }

        protected get DefaultPostSetting(): JQueryAjaxSettings {
            return {
                type: "POST",
                dataType: "json",
                cache: false,
                url: $.AbsoluteUri(this.Url),
                timeout: this.Timeout,
                traditional: true
            };
        }
    }


}