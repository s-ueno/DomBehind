declare namespace DomBehind {
    interface IEventName {
        EventName: string;
    }
    interface IEvent extends IEventName, IDisposable {
        AddHandler(handler: {
            (sender: any, data: any): void;
        }): void;
        RemoveHandler(handler: {
            (sender: any, data: any): void;
        }): void;
        Clear(): any;
        Raise(sender: any, data: any): void;
    }
    /**
     * define typed events
     */
    class TypedEvent<T> implements IEvent {
        EventName: string;
        private _eventName;
        private handlers;
        /**
         * Handle the defined event
         * @param handler
         */
        AddHandler(handler: {
            (sender: any, data: T): void;
        }): void;
        /**
         * Remove the handle from the defined event
         * @param handler
         */
        RemoveHandler(handler: {
            (sender: any, data: T): void;
        }): void;
        /**
         * Notify all of the handle
         * @param sender
         * @param data
         */
        Raise(sender: any, data: T): void;
        Clear(): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
    interface IEventBuilder {
        Create(): IEvent;
        EventName: string;
    }
    /**
     * Generate a typed event class.
     */
    class EventBuilder<T> implements IEventBuilder {
        constructor(eventName: string);
        Create(): IEvent;
        /**
         * It gets the event name.
         * Event name will be used in JQuery
         */
        readonly EventName: string;
        private _eventName;
        /**
         * Generate a typed event class.
         * @param eventName
         */
        static RegisterAttached<T>(eventName?: string): IEventBuilder;
    }
}
