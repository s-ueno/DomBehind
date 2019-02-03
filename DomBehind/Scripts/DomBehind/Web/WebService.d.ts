declare namespace DomBehind.Web {
    abstract class WebService<TRequest, TResponse> {
        protected abstract readonly Url: string;
        Timeout: number;
        Execute(request?: TRequest): TResponse;
        ExecuteAsync(request?: TRequest, option?: JQueryAjaxSettings): JQueryPromise<TResponse>;
        ExecuteAjax(request?: TRequest, option?: JQueryAjaxSettings): JQueryPromise<TResponse>;
        protected readonly DefaultPostSetting: JQueryAjaxSettings;
    }
}
