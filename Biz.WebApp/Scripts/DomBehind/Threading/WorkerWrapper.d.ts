declare namespace DomBehind.Threading {
    abstract class WorkerWrapper {
        protected readonly Thread: Worker;
        private _thread;
        Load(): void;
        protected readonly WorkerScript: string;
        PoolType: PoolType;
        Do(arg: any): JQueryPromise<any>;
        Terminate(): void;
    }
}
