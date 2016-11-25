namespace DomBehind.Core {
    export class AjaxException extends Exception {
        constructor(
            public JqXHR?: JQueryXHR,
            public TextStatus?: string,
            public ErrorThrown?: string) {
            super(TextStatus);
        }

        public get ErrorStatus(): number {
            return (this.JqXHR) ? this.JqXHR.status : null;
        }
        public get ErrorTitle(): string {
            if (this.JqXHR) {
                return $(this.JqXHR.responseText).filter("title").text();
            }
            return `${this.TextStatus}:${this.ErrorThrown}`;
        }

        public /* override */ ToString(): string {
            return `status:${this.ErrorStatus}\n${this.ErrorTitle}`;
        }
    }
}
