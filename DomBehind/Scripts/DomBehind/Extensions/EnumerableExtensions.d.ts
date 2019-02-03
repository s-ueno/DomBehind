interface Array<T> {
    Where(predicate: (value: T) => boolean): Array<T>;
    Select<U>(select: (value: T) => U): Array<U>;
    Any(predicate?: (value: T) => boolean): boolean;
    OrderBy(selector: (value: T) => any): Array<T>;
    OrderByDecording(selector: (value: T) => any): Array<T>;
    FirstOrDefault(predicate?: (x: T) => boolean): T;
    LastOrDefault(predicate?: (x: T) => boolean): T;
    GroupBy(selector: (value: T) => any): Array<{
        Key: any;
        Values: Array<T>;
    }>;
    SequenceEqual(target: Array<T>, predicate?: (x1: T, x2: T) => boolean): boolean;
    Sum(selector: (value: T) => number): number;
    Chunk(size: number): Array<Array<T>>;
}
