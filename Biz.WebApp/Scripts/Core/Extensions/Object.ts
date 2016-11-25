interface ObjectConstructor {
    IsNullOrUndefined(obj: any): boolean;
    IsPromise(obj: any): boolean;
    NameOf(name: any): string;
}
declare var Object: ObjectConstructor;

Object.IsNullOrUndefined = (obj: any) => {
    if (obj == null) return true;
    if (obj === null) return true;
    if (typeof obj === 'undefined') return true;
    return false;
};
Object.IsPromise = value => {
    if (Object.IsNullOrUndefined(value)) return false;
    if (typeof value === 'object' && typeof value.then !== "function") {
        return false;
    }
    var promiseThenSrc = String($.Deferred().then);
    var valueThenSrc = String(value.then);
    return promiseThenSrc === valueThenSrc;
};

var __extractor = new RegExp("return (.*);");
Object.NameOf = function (name: any) {
    var m = __extractor.exec(name + "");
    if (m == null) throw new Error("The function does not contain a statement matching 'return variableName;'");
    return m[1];
};



// !!! Object　は絶対に拡張しないこと！！
// !!! Ajaxで送信時にここを通る結果、不明な例外を送出する

//interface Object {
//    Is(type: any): boolean;
//}
//Object.prototype.Is = function (type: any) {
//    let me: any = this;

//    if (Object.IsNullOrUndefined(me)) return false;
//    if (Object.IsNullOrUndefined(type)) return false;

//    return (me instanceof type) ? true : false;
//};




