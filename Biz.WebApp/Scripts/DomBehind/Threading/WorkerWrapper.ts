namespace DomBehind.Threading {
    export abstract class WorkerWrapper {
        protected get Thread(): Worker { return this._thread; };
        private _thread: Worker;

        public Load(): void {
            if (!this._thread)
                this._thread = new Worker(this.WorkerScript);
        }
        protected /* abstract */ get WorkerScript(): string { return null; }

        public PoolType: PoolType = PoolType.Reload;

        public Do(arg: any): JQueryPromise<any> {
            let d = $.Deferred();
            this.Thread.onmessage = e => {
                d.resolve(e.data);
            };
            this.Thread.onerror = (e: ErrorEvent) => {
                console.error(`${e.filename}:(${e.lineno})\n${e.message}`);
                var errorMessage: string;
                var stackTrace: string;
                try {
                    $.each($(e.message), (i, value) => {
                        if (value instanceof HTMLTitleElement) {
                            errorMessage = (value as HTMLTitleElement).text;
                        }
                        if (value instanceof Comment) {
                            stackTrace = (value as Comment).text;
                        }
                    });
                } catch (ex) {
                    console.error(ex.message);
                }
                d.reject({ ErrorMessage: errorMessage, Description: stackTrace });
            }
            this.Thread.postMessage(arg);
            return d.promise();
        }

        public Terminate(): void {
            if (this._thread) {
                this._thread.terminate();
                this._thread = null;
            }
        }
    }
}
