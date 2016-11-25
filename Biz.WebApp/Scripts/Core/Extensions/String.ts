interface StringConstructor {
    IsNullOrEmpty(str: string): boolean;
    IsNullOrWhiteSpace(str: string): boolean;

    Split(value: string, separator: string): string[];
}
declare var String: StringConstructor;

String.IsNullOrEmpty = (str: string) => !str;
String.IsNullOrWhiteSpace = (s: string) => String.IsNullOrEmpty(s) || s.replace(/\s/g, '').length < 1;
String.Split = function (s: string, sep: string) {
    return s.split(sep);
};




enum StringSplitOptions {
    None, RemoveEmptyEntries
}

interface String {
    Split(separator: string, option?: StringSplitOptions): string[];
    Escape(): string;
    UnEscape(): string;
}
String.prototype.Split = function (separator: string, option: StringSplitOptions) {
    let me: String = this;

    if (Object.IsNullOrUndefined(option) ||
        option === StringSplitOptions.RemoveEmptyEntries)
        return me.split(separator).filter(x => !String.IsNullOrWhiteSpace(x));

    return me.split(separator);
};
String.prototype.Escape = function () {
    let me: String = this;
    return me
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};
String.prototype.UnEscape = function () {
    let me: String = this;
    return me
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
};