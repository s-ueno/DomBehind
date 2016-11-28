namespace DomBehind.Core.Thread {

    WorkerPool.Register(() => TimerThread);
    export class TimerThread
        extends WorkerWrapper {
        protected get WorkerScript(): string {
            return "/Scripts/Core/Thread/Timer.js";
        }
    }

    export class Timer {
        constructor() {
            this.TimerWorker = new TimerThread();
            this.TimerWorker.Load();
        }
        protected TimerWorker: TimerThread;
        public Start(tick: number): void {
            this.TimerWorker.Do({ Message: "", Duration: tick });
        }
    }

}
