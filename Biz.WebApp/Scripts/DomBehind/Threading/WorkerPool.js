var DomBehind;
(function (DomBehind) {
    var Threading;
    (function (Threading) {
        var WorkerPool = /** @class */ (function () {
            function WorkerPool() {
            }
            WorkerPool.Register = function (type, defaultPoolCount) {
                var _this = this;
                if (defaultPoolCount === void 0) { defaultPoolCount = 2; }
                $("body").ready(function (e) {
                    var factory = new DomBehind.TypedFactory(type());
                    for (var i = 0; i < defaultPoolCount; i++) {
                        var newThread = factory.CreateInstance();
                        if (newThread.PoolType & DomBehind.PoolType.PreLoad)
                            newThread.Load();
                        _this.Pool.push(newThread);
                    }
                });
            };
            WorkerPool.Do = function (type, arg) {
                var thread = null;
                var newPool = [];
                $.each(WorkerPool.Pool, function (i, value) {
                    if (thread) {
                        newPool.push(value);
                    }
                    else {
                        if (value instanceof type) {
                            thread = value;
                        }
                        else {
                            newPool.push(value);
                        }
                    }
                });
                WorkerPool.Pool = newPool;
                if (!thread) {
                    var factory = new DomBehind.TypedFactory(type);
                    thread = factory.CreateInstance();
                    thread.Load();
                }
                return thread.Do(arg).always(function () {
                    if (thread.PoolType & DomBehind.PoolType.Reload) {
                        thread.Terminate();
                        thread.Load();
                    }
                    WorkerPool.Pool.push(thread);
                });
            };
            WorkerPool.Pool = [];
            return WorkerPool;
        }());
        Threading.WorkerPool = WorkerPool;
    })(Threading = DomBehind.Threading || (DomBehind.Threading = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WorkerPool.js.map