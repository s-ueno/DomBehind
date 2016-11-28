namespace DomBehind.Core.Web {

    Threading.WorkerPool.Register(() => PlainXMLHttpRequestThread);
    export class PlainXMLHttpRequestThread
        extends Threading.WorkerWrapper {
        protected get WorkerScript(): string {
            return "/Scripts/Core/Web/PlainXMLHttpRequest.js";
        }
    }
}
