interface String {
    ToUriEncode(): string;
    ToUriDecode(): string;
}
"ToUriEncode".ExtendedPrototype(
    String.prototype,
    function () {
        let me: string = this;
        return encodeURIComponent(me);
    }
);

"ToUriDecode".ExtendedPrototype(
    String.prototype,
    function () {
        let s: String = this;
        s = s.replace(/\+/g, ' ');
        s = s.replace(/%([EF][0-9A-F])%([89AB][0-9A-F])%([89AB][0-9A-F])/gi,
            function (code, hex1, hex2, hex3) {
                var n1 = parseInt(hex1, 16) - 0xE0;
                var n2 = parseInt(hex2, 16) - 0x80;
                if (n1 == 0 && n2 < 32) return code;
                var n3 = parseInt(hex3, 16) - 0x80;
                var n = (n1 << 12) + (n2 << 6) + n3;
                if (n > 0xFFFF) return code;
                return String.fromCharCode(n);
            });
        s = s.replace(/%([CD][0-9A-F])%([89AB][0-9A-F])/gi,
            function (code, hex1, hex2) {
                var n1 = parseInt(hex1, 16) - 0xC0;
                if (n1 < 2) return code;
                var n2 = parseInt(hex2, 16) - 0x80;
                return String.fromCharCode((n1 << 6) + n2);
            });
        s = s.replace(/%([0-7][0-9A-F])/gi,
            function (code, hex) {
                return String.fromCharCode(parseInt(hex, 16));
            });
        return s;
    }
);

// String拡張
interface StringConstructor {
    /** C#のString.Format相当 */
    Format(format: string, ...args: any[]): string;
    ToNumber(s: String): number;
    ToUriEncode(s: string): string;
    ToUriDecode(s: string): string;
}
String.Format = function (format: string, ...args: any[]) {
    return format.replace(/\{(\d+)\}/g, (m, k) => {  // m="{0}", k="0"
        return args[k];
    });
}
String.ToNumber = function (s: String) {
    return numeral(s).value();
}
String.ToUriEncode = function (s: string) {
    if (String.IsNullOrWhiteSpace(s)) return s;
    return s.ToUriEncode();
}
String.ToUriDecode = function (s: string) {
    if (String.IsNullOrWhiteSpace(s)) return s;
    return s.ToUriDecode();
}
interface JQueryStatic {
    GetQueryStrings(): { Key: string, Value: string }[];
    SetQueryStrings(s: string);
}
$.SetQueryStrings = function (s) {
    $.SetSessionStorage("QueryString", s);
}
$.GetQueryStrings = function () {
    let enc = $.GetSessionStorage("QueryString", "");
    if (enc) {
        let dec = $('<div/>').html(enc).text();

        let array = dec.Split("&", StringSplitOptions.RemoveEmptyEntries);
        let result = [];
        $.each(array, (i, value) => {

            let split = value.Split("=", StringSplitOptions.None);
            if (split.length == 2) {
                result.push({ Key: split[0], Value: split[1] });
            }
        });
        return result;
    }
    return new Array<any>();
}

namespace DomBehind.Validation {


    export interface Validator {
        SetMark(region: string);
        ContainsMark(region: string);
    }

    Validator.prototype.SetMark = function (s) {
        let me: any = this;
        if (!me.Marks) {
            me.Marks = [];
        }
        me.Marks.push(s);
    }
    Validator.prototype.ContainsMark = function (s) {
        let me: any = this;
        let marks: string[] = me.Marks;
        if (marks) {
            return marks.Any(x => x === s);
        }
        return false;
    }
}