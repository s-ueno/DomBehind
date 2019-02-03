namespace DomBehind {
    export interface IEventName {
        EventName: string;
    }
    export interface IEvent extends IEventName, IDisposable {
        AddHandler(handler: { (sender: any, data: any): void }): void;
        RemoveHandler(handler: { (sender: any, data: any): void }): void;
        Clear();
        Raise(sender: any, data: any): void;
        Ensure(behavior /* : Data.ActionBindingBehavior */);
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

        public Clear() {
            $.each(this.handlers, (i, each) => {
                this.handlers[i] = null;
            });
            this.handlers = [];
        }

        public EnsureHandler: (behavior /*: Data.ActionBindingBehavior */) => void;
        public Ensure(behavior /*: Data.ActionBindingBehavior */) {
            if (this.EnsureHandler) {
                this.EnsureHandler(behavior);
            }
        }

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
            event.EnsureHandler = this.ensureHandler;
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
        public static RegisterAttached<T>(eventName?: string, ensure?: (behavior /* : Data.ActionBindingBehavior */) => void): IEventBuilder {
            let builder = new EventBuilder<T>(eventName);
            builder.ensureHandler = ensure;
            return builder;
        }
        private ensureHandler: (behavior /* :Data.ActionBindingBehavior */) => void;
    }
}

