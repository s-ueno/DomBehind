namespace DomBehind {
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
                // MVC Controller経由の緩いコントラクト
                let json = this.JqXHR.responseJSON;
                if (json && json.Message) {
                    return json.Message;
                }
                // ERROR HTMLからタイトル抜粋
                return $(this.JqXHR.responseText).filter("title").text();
            }
            // JqueryAjax以外
            return `${this.TextStatus}:${this.ErrorThrown}`;
        }

        public /* override */ ToString(): string {
            return `status:${this.ErrorStatus}\n${this.ErrorTitle}`;
        }
    }
}

