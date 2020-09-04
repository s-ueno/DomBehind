declare namespace DomBehind.Threading {
    abstract class WorkerWrapper {
        protected get Thread(): Worker;
        private _thread;
        Load(): void;
        protected get WorkerScript(): string;
        PoolType: PoolType;
        Do(arg: any): JQueryPromise<any>;
        Terminate(): void;
    }
}
