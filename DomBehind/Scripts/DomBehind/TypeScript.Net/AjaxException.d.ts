declare namespace DomBehind {
    class AjaxException extends Exception {
        JqXHR?: JQueryXHR;
        TextStatus?: string;
        ErrorThrown?: string;
        constructor(JqXHR?: JQueryXHR, TextStatus?: string, ErrorThrown?: string);
        readonly ErrorStatus: number;
        readonly ErrorTitle: string;
        ToString(): string;
    }
}
