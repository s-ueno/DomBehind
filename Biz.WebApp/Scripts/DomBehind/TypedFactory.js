var DomBehind;
(function (DomBehind) {
    var TypedFactory = /** @class */ (function () {
        function TypedFactory(_ctor) {
            this._ctor = _ctor;
        }
        TypedFactory.prototype.CreateInstance = function () {
            return new this._ctor();
        };
        return TypedFactory;
    }());
    DomBehind.TypedFactory = TypedFactory;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=TypedFactory.js.map