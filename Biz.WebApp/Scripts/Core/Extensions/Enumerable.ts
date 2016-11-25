interface Array<T> {
    Where(predicate: (value: T) => boolean): Array<T>;
    Select<U>(select: (value: T) => U): Array<U>;
    Any(predicate: (value: T) => boolean): boolean;
    OrderBy(selector: (value: T) => any): Array<T>;
    OrderByDecording(selector: (value: T) => any): Array<T>;
    FirstOrDefault(): T;
}

Array.prototype.Where = function (predicate: (value: any) => boolean) {
    let me: Array<any> = this;
    return me.filter(value => predicate(value));
}
Array.prototype.Select = function (select: (value: any) => any) {
    let me: Array<any> = this;
    return me.map(x => select(x));
}
Array.prototype.Any = function (predicate: (value: any) => boolean) {
    let me: Array<any> = this;
    return me.some(x => predicate(x));
}
Array.prototype.OrderBy = function (selector: (value: any) => any) {
    let me: Array<any> = this;
    return me.sort((x, y) => selector(x) - selector(y));
}
Array.prototype.OrderByDecording = function (selector: (value: any) => any) {
    let me: Array<any> = this;
    return me.sort((x, y) => selector(y) - selector(x));
}
Array.prototype.FirstOrDefault = function () {
    let me: Array<any> = this;
    return 0 < me.length ? me[0] : null;
}