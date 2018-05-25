var DomBehind;
(function (DomBehind) {
    var Threading;
    (function (Threading) {
        var WorkerWrapper = /** @class */ (function () {
            function WorkerWrapper() {
                this.PoolType = DomBehind.PoolType.PreLoad;
            }
            Object.defineProperty(WorkerWrapper.prototype, "Thread", {
                get: function () { return this._thread; },
                enumerable: true,
                configurable: true
            });
            ;
            WorkerWrapper.prototype.Load = function () {
                if (!this._thread)
                    this._thread = new Worker(this.WorkerScript);
            };
            Object.defineProperty(WorkerWrapper.prototype, "WorkerScript", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            WorkerWrapper.prototype.Do = function (arg) {
                var d = $.Deferred();
                this.Thread.onmessage = function (e) {
                    d.resolve(e.data);
                };
                this.Thread.onerror = function (e) {
                    console.error(e.filename + ":(" + e.lineno + ")\n" + e.message);
                    var errorMessage;
                    var stackTrace;
                    try {
                        $.each($(e.message), function (i, value) {
                            if (value instanceof HTMLTitleElement) {
                                errorMessage = value.text;
                            }
                            if (value instanceof Comment) {
                                stackTrace = value.text;
                            }
                        });
                    }
                    catch (ex) {
                        console.error(ex.message);
                    }
                    d.reject({ ErrorMessage: errorMessage, Description: stackTrace });
                };
                this.Thread.postMessage(arg);
                return d.promise();
            };
            WorkerWrapper.prototype.Terminate = function () {
                if (this._thread) {
                    this._thread.terminate();
                    this._thread = null;
                }
            };
            return WorkerWrapper;
        }());
        Threading.WorkerWrapper = WorkerWrapper;
    })(Threading = DomBehind.Threading || (DomBehind.Threading = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WorkerWrapper.js.map