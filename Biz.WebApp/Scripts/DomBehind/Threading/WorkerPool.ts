namespace DomBehind.Threading {

    export class WorkerPool {

        protected static Pool: WorkerWrapper[] = [];

        public static Register(type: () => any, defaultPoolCount: number = 2): void {
            $("body").ready(e => {
                let factory = new TypedFactory(type());
                for (var i = 0; i < defaultPoolCount; i++) {
                    let newThread: WorkerWrapper = factory.CreateInstance() as WorkerWrapper;
                    if (newThread.PoolType & PoolType.PreLoad)
                        newThread.Load();
                    this.Pool.push(newThread);
                }
            });
        }

        public static Do(type: any, arg: any): JQueryPromise<any> {
            let thread: WorkerWrapper = null;
            let newPool: WorkerWrapper[] = [];
            $.each(WorkerPool.Pool, (i, value) => {
                if (thread) {
                    newPool.push(value);
                } else {
                    if (value instanceof type) {
                        thread = value;
                    } else {
                        newPool.push(value);
                    }
                }
            });

            WorkerPool.Pool = newPool;

            if (!thread) {
                let factory = new TypedFactory(type);
                thread = factory.CreateInstance() as WorkerWrapper;
                thread.Load();
            }
            return thread.Do(arg).always(() => {
                if (thread.PoolType & PoolType.Reload) {
                    thread.Terminate();
                    thread.Load();
                }
                WorkerPool.Pool.push(thread);
            });
        }
    }
}
