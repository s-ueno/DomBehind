interface Array<T> {
    Where(predicate: (value: T) => boolean): Array<T>;
    Select<U>(select: (value: T) => U): Array<U>;
    Any(predicate?: (value: T) => boolean): boolean;
    OrderBy(selector: (value: T) => any): Array<T>;
    OrderByDecording(selector: (value: T) => any): Array<T>;
    FirstOrDefault(predicate?: (x: T) => boolean): T;
    LastOrDefault(predicate?: (x: T) => boolean): T;
    GroupBy(selector: (value: T) => any): Array<{ Key: any, Values: Array<T> }>;
    SequenceEqual(target: Array<T>, predicate?: (x1: T, x2: T) => boolean): boolean;
    Sum(selector: (value: T) => number): number;
    Chunk(size: number): Array<Array<T>>;
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
    function (predicate?: (value: any) => boolean) {
        let me: Array<any> = this;
        if (!predicate) {
            return me.length !== 0;
        }
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

"SequenceEqual".ExtendedPrototype(
    Array.prototype,
    function (target: Array<any>, predicate?: (x1: any, x2: any) => boolean) {
        let me: Array<any> = this;

        if (Object.IsNullOrUndefined(me) ||
            Object.IsNullOrUndefined(target)
        ) {
            return false;
        }

        if (me.length !== target.length) return false;

        let result = true;
        for (var i = 0; i < me.length; i++) {
            let x = me[i];
            let y = target[i];

            if (predicate) {
                if (!predicate(x, y)) {
                    result = false;
                    break;
                }
            } else {
                if (x !== y) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    }
);
"Sum".ExtendedPrototype(
    Array.prototype,
    function (selector: (value: any) => number) {
        let me: Array<any> = this;
        let value: number = 0;
        me.forEach(x => {
            value += selector(x);
        });
        return value;
    }
);

"Chunk".ExtendedPrototype(
    Array.prototype,
    function (size: number) {
        let arr: Array<any> = this;
        if (!size) {
            size = 1;
        }
        return arr.reduce((chunks, el, i) => {
            if (i % size === 0) {
                chunks.push([el])
            } else {
                chunks[chunks.length - 1].push(el)
            }
            return chunks
        }, [])
    }
)