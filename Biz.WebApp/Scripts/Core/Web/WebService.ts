namespace DomBehind.Core.Web {
    export abstract class WebService<TRequest, TResponse> {

        public Url: string;
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

        public ExecuteAjax(request: TRequest): JQueryPromise<TResponse> {
            let d = $.Deferred<TResponse>();
            let option: JQueryAjaxSettings = this.DefaultPostSetting;
            option.data = request;
            option.async = true;
            $.ajax(option).done(x => {
                d.resolve(x);
            }).fail(x => {
                d.reject(new AjaxException(x));
            });
            return d.promise();
        }

        public ExecuteAsync(request: TRequest): JQueryPromise<TResponse> {
            return Thread.WorkerPool.Do(PlainXMLHttpRequestThread,
                {
                    Url : this.Url,
                    Request: request,
                });
        }

        protected get DefaultPostSetting(): JQueryAjaxSettings {
            return {
                type: "POST",
                dataType: "json",
                cache: false,
                url: this.Url,
                timeout: this.Timeout,
                traditional: true,
            };
        }
    }

}

