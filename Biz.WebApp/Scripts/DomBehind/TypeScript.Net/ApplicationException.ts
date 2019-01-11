namespace DomBehind {
    export class ApplicationException extends Exception {
        constructor(public Message?: string) {
            super();
            super(Message);
        }
        public /* virtual */ ToString(): string { return this.Message; }
    }

    export class ApplicationAggregateException extends Exception {
        constructor(public exceptions: Exception[]) {
            super();
        }
    }
}

