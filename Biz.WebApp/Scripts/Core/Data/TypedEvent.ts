namespace DomBehind.Core.Data {
    export interface IEventName {
        EventName: string;
    }
    export interface IEvent extends IEventName, IDisposable {
        AddHandler(handler: { (sender: any, data: any): void }): void;
        RemoveHandler(handler: { (sender: any, data: any): void }): void;
        Raise(sender: any, data: any): void;
    }

    /**
     * define typed events
     */
    export class TypedEvent<T>
        implements IEvent {

        // #region implements interface of IEventName

        public get EventName(): string {
            return this._eventName;
        }
        public set EventName(value: string) {
            this._eventName = value;
        }
        private _eventName: string;

        // #endregion

        // #region implements interface of IEvent

        private handlers: { (sender: any, data?: T): void; }[] = [];
        /**
         * Handle the defined event
         * @param handler
         */
        public AddHandler(handler: { (sender: any, data: T): void }): void {
            this.handlers.push(handler);
        }
        /**
         * Remove the handle from the defined event
         * @param handler
         */
        public RemoveHandler(handler: { (sender: any, data: T): void }): void {
            this.handlers = this.handlers.filter(h => h !== handler);
        }
        /**
         * Notify all of the handle
         * @param sender
         * @param data
         */
        public Raise(sender: any, data: T): void {
            this.handlers.slice(0).forEach(h => h(sender, data));
        }

        // #endregion

        // #region IDisposable

        public Dispose(): void {
            if (!this._disposed) {
                if (this.handlers) {
                    this.handlers.length = 0;
                }
            }
            this._disposed = true;
        }
        protected _disposed: boolean = false;


        // #endregion

    }



    export interface IEventBuilder {
        Create(): IEvent;
        EventName: string;
    }

    /**
     * Generate a typed event class.
     */
    export class EventBuilder<T> implements IEventBuilder {
        constructor(eventName: string) {
            this._eventName = eventName;
        }
        public Create(): IEvent {
            let event = new TypedEvent<T>();
            event.EventName = this.EventName;
            return event;
        }

        /**
         * It gets the event name.
         * Event name will be used in JQuery
         */
        public get EventName(): string {
            return this._eventName;
        }
        private _eventName: string;

        /**
         * Generate a typed event class.
         * @param eventName
         */
        public static RegisterAttached<T>(eventName?: string): IEventBuilder {
            let builder = new EventBuilder<T>(eventName);
            return builder;
        }
    }
}