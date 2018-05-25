var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        /**
         * policy on binding
         */
        var BindingPolicy = /** @class */ (function () {
            function BindingPolicy() {
                this.Trigger = Data.UpdateSourceTrigger.Explicit;
                this.Mode = Data.BindingMode.TwoWay;
                this.Validators = new DomBehind.Validation.ValidatorCollection();
            }
            return BindingPolicy;
        }());
        Data.BindingPolicy = BindingPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingPolicy.js.map