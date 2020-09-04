declare namespace DomBehind {
    class AjaxException extends Exception {
        JqXHR?: JQueryXHR;
        TextStatus?: string;
        ErrorThrown?: string;
        constructor(JqXHR?: JQueryXHR, TextStatus?: string, ErrorThrown?: string);
        get ErrorStatus(): number;
        get ErrorTitle(): string;
        ToString(): string;
    }
}
