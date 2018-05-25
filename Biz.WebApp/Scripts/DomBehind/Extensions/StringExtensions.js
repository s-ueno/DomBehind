// declare var String: StringConstructor;
String.IsNullOrEmpty = function (str) { return !str; };
String.IsNullOrWhiteSpace = function (s) { return String.IsNullOrEmpty(s) || s.replace(/\s/g, '').length < 1; };
String.Split = function (s, sep) {
    return s.split(sep);
};
var StringSplitOptions;
(function (StringSplitOptions) {
    StringSplitOptions[StringSplitOptions["None"] = 0] = "None";
    StringSplitOptions[StringSplitOptions["RemoveEmptyEntries"] = 1] = "RemoveEmptyEntries";
})(StringSplitOptions || (StringSplitOptions = {}));
"Split".ExtendedPrototype(String.prototype, function (separator, option) {
    var me = this;
    if (Object.IsNullOrUndefined(option) ||
        option === StringSplitOptions.RemoveEmptyEntries)
        return me.split(separator).filter(function (x) { return !String.IsNullOrWhiteSpace(x); });
    return me.split(separator);
});
"Escape".ExtendedPrototype(String.prototype, function () {
    var me = this;
    return me
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
});
"UnEscape".ExtendedPrototype(String.prototype, function () {
    var me = this;
    return me
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
});
"Replace".ExtendedPrototype(String.prototype, function (searchValue, replaceValue) {
    var me = this;
    return me.split(searchValue).join(replaceValue);
});
//# sourceMappingURL=StringExtensions.js.map