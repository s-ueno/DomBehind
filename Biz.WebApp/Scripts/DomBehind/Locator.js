var DomBehind;
(function (DomBehind) {
    var Locator = /** @class */ (function () {
        function Locator() {
        }
        Locator.Push = function (ins) {
            Locator._container.push(ins);
        };
        Locator.List = function (typeT, predicate) {
            var array = [];
            $.each(Locator._container, function (i, each) {
                if (each instanceof typeT) {
                    if (!predicate) {
                        array.push(each);
                    }
                    else if (predicate(each)) {
                        array.push(each);
                    }
                }
            });
            return array;
        };
        Locator.First = function (typeT, predicate) {
            var result;
            $.each(Locator._container, function (i, each) {
                if (each instanceof typeT) {
                    if (!predicate) {
                        result = each;
                        return false;
                    }
                    else if (predicate(each)) {
                        result = each;
                        return false;
                    }
                }
            });
            return result;
        };
        Locator.Remove = function (typeT, predicate) {
            var array = [];
            $.each(Locator._container, function (i, each) {
                if (each instanceof typeT) {
                    if (!(!predicate || predicate(each))) {
                        array.push(each);
                    }
                }
                else {
                    array.push(each);
                }
            });
            Locator._container = array;
        };
        Locator.Clear = function () {
            Locator._container = [];
        };
        Locator._container = [];
        return Locator;
    }());
    DomBehind.Locator = Locator;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Locator.js.map