var DomBehind;
(function (DomBehind) {
    /**
     * define typed events
     */
    var TypedEvent = /** @class */ (function () {
        function TypedEvent() {
            // #region implements interface of IEventName
            // #endregion
            // #region implements interface of IEvent
            this.handlers = [];
            this._disposed = false;
            // #endregion
        }
        Object.defineProperty(TypedEvent.prototype, "EventName", {
            get: function () {
                return this._eventName;
            },
            set: function (value) {
                this._eventName = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Handle the defined event
         * @param handler
         */
        TypedEvent.prototype.AddHandler = function (handler) {
            this.handlers.push(handler);
        };
        /**
         * Remove the handle from the defined event
         * @param handler
         */
        TypedEvent.prototype.RemoveHandler = function (handler) {
            this.handlers = this.handlers.filter(function (h) { return h !== handler; });
        };
        /**
         * Notify all of the handle
         * @param sender
         * @param data
         */
        TypedEvent.prototype.Raise = function (sender, data) {
            this.handlers.slice(0).forEach(function (h) { return h(sender, data); });
        };
        // #endregion
        TypedEvent.prototype.Clear = function () {
            var _this = this;
            $.each(this.handlers, function (i, each) {
                _this.handlers[i] = null;
            });
            this.handlers = [];
        };
        // #region IDisposable
        TypedEvent.prototype.Dispose = function () {
            if (!this._disposed) {
                if (this.handlers) {
                    this.handlers.length = 0;
                }
            }
            this._disposed = true;
        };
        return TypedEvent;
    }());
    DomBehind.TypedEvent = TypedEvent;
    /**
     * Generate a typed event class.
     */
    var EventBuilder = /** @class */ (function () {
        function EventBuilder(eventName) {
            this._eventName = eventName;
        }
        EventBuilder.prototype.Create = function () {
            var event = new TypedEvent();
            event.EventName = this.EventName;
            return event;
        };
        Object.defineProperty(EventBuilder.prototype, "EventName", {
            /**
             * It gets the event name.
             * Event name will be used in JQuery
             */
            get: function () {
                return this._eventName;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Generate a typed event class.
         * @param eventName
         */
        EventBuilder.RegisterAttached = function (eventName) {
            var builder = new EventBuilder(eventName);
            return builder;
        };
        return EventBuilder;
    }());
    DomBehind.EventBuilder = EventBuilder;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=EventBuilder.js.map