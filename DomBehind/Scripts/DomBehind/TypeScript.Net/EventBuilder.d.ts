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
        Ensure(behavior: any): any;
    }
    class TypedEvent<T> implements IEvent {
        EventName: string;
        private _eventName;
        private handlers;
        AddHandler(handler: {
            (sender: any, data: T): void;
        }): void;
        RemoveHandler(handler: {
            (sender: any, data: T): void;
        }): void;
        Raise(sender: any, data: T): void;
        Clear(): void;
        EnsureHandler: (behavior: any) => void;
        Ensure(behavior: any): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
    interface IEventBuilder {
        Create(): IEvent;
        EventName: string;
    }
    class EventBuilder<T> implements IEventBuilder {
        constructor(eventName: string);
        Create(): IEvent;
        readonly EventName: string;
        private _eventName;
        static RegisterAttached<T>(eventName?: string, ensure?: (behavior: any) => void): IEventBuilder;
        private ensureHandler;
    }
}
