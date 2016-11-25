namespace DomBehind.Core {
    export class Exception {
        constructor(public Message?: string) { }
        public /* virtual */ ToString(): string { return this.Message; }
    }
}
