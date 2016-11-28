namespace DomBehind.Core.Threading {

    WorkerPool.Register(() => TimerThread);
    export class TimerThread extends WorkerWrapper {
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
        protected CallBack: Function;
        protected Duration: number;
        public Start(tick: number, callBack: () => void): void {
            this.Duration = tick;
            this.CallBack = callBack;
            this.TimerWorker.Do(tick).done(x => this.CallBack());
        }
        public Abort(): void {
            this.TimerWorker.Terminate();
            this.TimerWorker.Load();
        }
        public Reset(): void {
            this.Abort();
            this.TimerWorker.Do(this.Duration).done(x => this.CallBack());
        }
    }

}
