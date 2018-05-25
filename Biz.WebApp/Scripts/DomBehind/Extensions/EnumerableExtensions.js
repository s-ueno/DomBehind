"Where".ExtendedPrototype(Array.prototype, function (predicate) {
    var me = this;
    return me.filter(function (value) { return predicate(value); });
});
"Select".ExtendedPrototype(Array.prototype, function (select) {
    var me = this;
    return me.map(function (x) { return select(x); });
});
"Any".ExtendedPrototype(Array.prototype, function (predicate) {
    var me = this;
    if (!predicate) {
        return me.length !== 0;
    }
    return me.some(function (x) { return predicate(x); });
});
"OrderBy".ExtendedPrototype(Array.prototype, function (selector) {
    var me = this;
    return me.sort(function (x, y) { return selector(x) - selector(y); });
});
"OrderByDecording".ExtendedPrototype(Array.prototype, function (selector) {
    var me = this;
    return me.sort(function (x, y) { return selector(y) - selector(x); });
});
"FirstOrDefault".ExtendedPrototype(Array.prototype, function (predicate) {
    var me = this;
    if (predicate) {
        me = me.filter(function (x) { return predicate(x); });
    }
    return 0 < me.length ? me[0] : null;
});
"LastOrDefault".ExtendedPrototype(Array.prototype, function (predicate) {
    var me = this;
    if (predicate) {
        me = me.filter(function (x) { return predicate(x); });
    }
    return 0 < me.length ? me[me.length - 1] : null;
});
"GroupBy".ExtendedPrototype(Array.prototype, function (selector) {
    var me = this;
    var result = new Array();
    $.each(me, function (i, value) {
        var groupKey = selector(value);
        if (!result.some(function (x) { return x.Key === groupKey; })) {
            result.push({ Key: groupKey, Values: new Array() });
        }
        var item = result.FirstOrDefault(function (x) { return x.Key === groupKey; });
        item.Values.push(value);
    });
    return result;
});
"SequenceEqual".ExtendedPrototype(Array.prototype, function (target, predicate) {
    var me = this;
    if (Object.IsNullOrUndefined(me) ||
        Object.IsNullOrUndefined(target)) {
        return false;
    }
    if (me.length !== target.length)
        return false;
    var result = true;
    for (var i = 0; i < me.length; i++) {
        var x = me[i];
        var y = target[i];
        if (predicate) {
            if (!predicate(x, y)) {
                result = false;
                break;
            }
        }
        else {
            if (x !== y) {
                result = false;
                break;
            }
        }
    }
    return result;
});
//# sourceMappingURL=EnumerableExtensions.js.map