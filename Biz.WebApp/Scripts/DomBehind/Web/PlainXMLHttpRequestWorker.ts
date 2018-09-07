namespace DomBehind.Web {
    Threading.WorkerPool.Register(() => PlainXMLHttpRequestWorker);
    export class PlainXMLHttpRequestWorker
        extends Threading.WorkerWrapper {
        protected get WorkerScript(): string {
            return "~/Scripts/dombehind-PlainXMLHttpRequest.js";
        }
    }
}

