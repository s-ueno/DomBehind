namespace DomBehind.Core.Web {

    Thread.WorkerPool.Register(() => PlainXMLHttpRequestThread);
    export class PlainXMLHttpRequestThread
        extends Thread.WorkerWrapper {
        protected get WorkerScript(): string {
            return "/Scripts/Core/Web/PlainXMLHttpRequest.js";
        }
    }
}
