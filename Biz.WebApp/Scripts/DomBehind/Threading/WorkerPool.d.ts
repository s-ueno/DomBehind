declare namespace DomBehind.Threading {
    class WorkerPool {
        protected static Pool: WorkerWrapper[];
        static Register(type: () => any, defaultPoolCount?: number): void;
        static Do(type: any, arg: any): JQueryPromise<any>;
    }
}
