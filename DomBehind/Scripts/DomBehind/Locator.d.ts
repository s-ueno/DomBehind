declare namespace DomBehind {
    class Locator {
        private static _container;
        static Push(ins: any): void;
        static ToArray(): any[];
        static List<T>(typeT: new (...params: any[]) => T, predicate?: (obj: T) => boolean): T[];
        static First<T>(typeT: new (...params: any[]) => T, predicate?: (obj: T) => boolean): T;
        static Remove<T>(typeT: new (...params: any[]) => T, predicate?: (obj: T) => boolean): void;
        static Clear(): void;
    }
}
