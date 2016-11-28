namespace DomBehind.Core.Thread {
    export class Thread {

        public static TimerAsync(tick: number): JQueryPromise<any> {
            return WorkerPool.Do(TimerThread, { Message: "Start", Duration: tick });
        }
    }
}
