var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        /**
         * Apply any of the policy to the bindable action
         */
        var ActionPolicy = /** @class */ (function () {
            function ActionPolicy() {
            }
            // #endregion
            /**
             *
             * @param func
             */
            ActionPolicy.prototype.Do = function (func) {
                var _this = this;
                var result;
                try {
                    this.Begin();
                    if (Object.IsNullOrUndefined(this.NextPolicy)) {
                        result = func();
                    }
                    else {
                        result = this.NextPolicy.Do(func);
                    }
                    if (!Object.IsPromise(result)) {
                        this.Done();
                        this.Always();
                    }
                    else {
                        var exception = void 0;
                        var p = result;
                        p.done(function () {
                            _this.Done();
                            _this.Always();
                        }).fail(function (x) {
                            var ex = new Data.ActionPolicyExceptionEventArgs(_this, x);
                            _this.Fail(ex);
                            _this.Always();
                            if (!ex.Handled) {
                                return ex;
                            }
                        });
                        return p;
                    }
                }
                catch (e) {
                    var ex = new Data.ActionPolicyExceptionEventArgs(this, e);
                    this.Fail(ex);
                    this.Always();
                    if (!ex.Handled)
                        throw e;
                }
            };
            return ActionPolicy;
        }());
        Data.ActionPolicy = ActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionPolicy.js.map