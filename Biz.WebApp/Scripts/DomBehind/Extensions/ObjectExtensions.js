// declare var Object: ObjectConstructor;
Object.IsNullOrUndefined = function (obj) {
    if (obj == null)
        return true;
    if (obj === null)
        return true;
    if (typeof obj === 'undefined')
        return true;
    return false;
};
Object.IsPromise = function (value) {
    if (Object.IsNullOrUndefined(value))
        return false;
    if (typeof value === 'object' && typeof value.then !== "function") {
        return false;
    }
    var promiseThenSrc = String($.Deferred().then);
    var valueThenSrc = String(value.then);
    return promiseThenSrc === valueThenSrc;
};
//# sourceMappingURL=ObjectExtensions.js.map