var DomBehind;
(function (DomBehind) {
    var Exception = /** @class */ (function () {
        function Exception(Message) {
            this.Message = Message;
        }
        Exception.prototype.ToString = function () { return this.Message; };
        return Exception;
    }());
    DomBehind.Exception = Exception;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Exception.js.map