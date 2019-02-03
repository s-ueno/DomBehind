declare namespace DomBehind {
    class ApplicationException extends Exception {
        Message?: string;
        constructor(Message?: string);
        ToString(): string;
    }
    class ApplicationAggregateException extends Exception {
        exceptions: Exception[];
        constructor(exceptions: Exception[]);
    }
}
