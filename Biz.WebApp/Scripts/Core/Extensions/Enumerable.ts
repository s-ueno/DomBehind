interface Array<T> {
    Where(predicate: (value: T) => boolean): Array<T>;
    Select<U>(select: (value: T) => U): Array<U>;
    Any(predicate: (value: T) => boolean): boolean;
    OrderBy(selector: (value: T) => any): Array<T>;
    OrderByDecording(selector: (value: T) => any): Array<T>;
    FirstOrDefault(predicate?: (x: T) => boolean): T;
    LastOrDefault(predicate?: (x: T) => boolean): T;
    GroupBy(selector: (value: T) => any): Array<{ Key: any, Values: Array<T> }>;
}
"Where".ExtendedPrototype(
    Array.prototype,
    function (predicate: (value: any) => boolean) {
        let me: Array<any> = this;
        return me.filter(value => predicate(value));
    }
);
"Select".ExtendedPrototype(
    Array.prototype,
    function (select: (value: any) => any) {
        let me: Array<any> = this;
        return me.map(x => select(x));
    }
);
"Any".ExtendedPrototype(
    Array.prototype,
    function (predicate: (value: any) => boolean) {
        let me: Array<any> = this;
        return me.some(x => predicate(x));
    }
);
"OrderBy".ExtendedPrototype(
    Array.prototype,
    function (selector: (value: any) => any) {
        let me: Array<any> = this;
        return me.sort((x, y) => selector(x) - selector(y));
    }
);
"OrderByDecording".ExtendedPrototype(
    Array.prototype,
    function (selector: (value: any) => any) {
        let me: Array<any> = this;
        return me.sort((x, y) => selector(y) - selector(x));
    }
);
"FirstOrDefault".ExtendedPrototype(
    Array.prototype,
    function (predicate?: (x: any) => boolean) {
        let me: Array<any> = this;

        if (predicate) {
            me = me.filter(x => predicate(x));
        }
        return 0 < me.length ? me[0] : null;
    }
);
"LastOrDefault".ExtendedPrototype(
    Array.prototype,
    function (predicate?: (x: any) => boolean) {
        let me: Array<any> = this;

        if (predicate) {
            me = me.filter(x => predicate(x));
        }
        return 0 < me.length ? me[me.length - 1] : null;
    }
);
"GroupBy".ExtendedPrototype(
    Array.prototype,
    function (selector: (value: any) => any) {
        let me: Array<any> = this;
        let result = new Array<{ Key: any, Values: Array<any> }>()
        $.each(me, (i, value) => {
            let groupKey = selector(value);

            if (!result.some(x => x.Key === groupKey)) {
                result.push({ Key: groupKey, Values: new Array<any>() });
            }
            let item = result.FirstOrDefault(x => x.Key === groupKey);
            item.Values.push(value);
        });
        return result;
    }
);


