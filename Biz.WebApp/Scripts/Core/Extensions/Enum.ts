interface EnumConstructor {
    List(e: any): (number | string)[];
    Values(e: any): number[];
    Names(e: any): string[];

}
declare var Enum: EnumConstructor;

Enum.List = function (e: any) {
    return Object.keys(e).map(k => e[k]);
};
Enum.Values = function (e: any) {
    return Enum.List(e).Where(x => typeof x === "number") as number[];
};
Enum.Names = function (e: any) {
    return Enum.List(e).Where(x => typeof x === "string") as string[];
};
