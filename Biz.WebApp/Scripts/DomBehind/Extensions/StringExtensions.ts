interface StringConstructor {
    IsNullOrEmpty(str: string): boolean;
    IsNullOrWhiteSpace(str: string): boolean;

    Split(value: string, separator: string): string[];
}
// declare var String: StringConstructor;

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
    Replace(searchValue: string, replaceValue: string): string;
    Repeat(count: number): string;
    PadLeft(totalWidth: number, paddingChar: string): string;
    PadRight(totalWidth: number, paddingChar: string): string;
    SubString(start: number, length: number): string;
    StartsWith(s: string): boolean;
}

"Split".ExtendedPrototype(
    String.prototype,
    function (separator: string, option: StringSplitOptions) {
        let me: String = this;

        if (Object.IsNullOrUndefined(option) ||
            option === StringSplitOptions.RemoveEmptyEntries)
            return me.split(separator).filter(x => !String.IsNullOrWhiteSpace(x));

        return me.split(separator);
    }
);
"Escape".ExtendedPrototype(
    String.prototype,
    function () {
        let me: String = this;
        return me
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
);
"UnEscape".ExtendedPrototype(
    String.prototype,
    function () {
        let me: String = this;
        return me
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    }
);
"Replace".ExtendedPrototype(
    String.prototype,
    function (searchValue: string, replaceValue: string) {
        let me: String = this;
        return me.split(searchValue).join(replaceValue);
    }
);

"Repeat".ExtendedPrototype(
    String.prototype,
    function (count: number) {
        'use strict';
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
            return '';
        }
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (; ;) {
            if ((count & 1) == 1) {
                rpt += str;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            str += str;
        }
        return rpt;
    }
);

"PadLeft".ExtendedPrototype(
    String.prototype,
    function (totalWidth: number, paddingChar: string) {
        totalWidth = totalWidth >> 0; //truncate if number or convert non-number to 0;
        paddingChar = String((typeof paddingChar !== 'undefined' ? paddingChar : ' '));
        if (this.length > totalWidth) {
            return String(this);
        }
        else {
            totalWidth = totalWidth - this.length;
            if (totalWidth > paddingChar.length) {
                paddingChar += paddingChar.Repeat(totalWidth / paddingChar.length); //append to original to ensure we are longer than needed
            }
            return paddingChar.slice(0, totalWidth) + String(this);
        }

    }
);

"PadRight".ExtendedPrototype(
    String.prototype,
    function (totalWidth: number, paddingChar: string) {
        totalWidth = totalWidth >> 0; //floor if number or convert non-number to 0;
        paddingChar = String((typeof paddingChar !== 'undefined' ? paddingChar : ' '));
        if (this.length > totalWidth) {
            return String(this);
        }
        else {
            totalWidth = totalWidth - this.length;
            if (totalWidth > paddingChar.length) {
                paddingChar += paddingChar.Repeat(totalWidth / paddingChar.length); //append to original to ensure we are longer than needed
            }
            return String(this) + paddingChar.slice(0, totalWidth);
        }
    }
);

"SubString".ExtendedPrototype(
    String.prototype,
    function (start: number, length: number) {
        let me: String = this;
        return me.toString().substr(start, length);
    }
);

"StartsWith".ExtendedPrototype(
    String.prototype,
    function (s: string) {
        let me: any = this;
        if (!(<any>String.prototype).startsWith) {
            return this.substr(0, s.length) === s;
        } else {
            return me.startsWith(s);
        }
    }
)