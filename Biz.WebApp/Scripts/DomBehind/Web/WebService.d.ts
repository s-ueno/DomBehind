declare namespace DomBehind.Web {
    abstract class WebService<TRequest, TResponse> {
        protected readonly abstract Url: string;
        Timeout: number;
        Execute(request: TRequest): TResponse;
        ExecuteAjax(request: TRequest, option?: JQueryAjaxSettings): JQueryPromise<TResponse>;
        ExecuteAsync(request: TRequest): JQueryPromise<TResponse>;
        protected readonly DefaultPostSetting: JQueryAjaxSettings;
    }
}
