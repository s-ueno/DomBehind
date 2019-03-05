declare namespace DomBehind {
    class IndexedDBHelper<T> {
        constructor(ctor: TypedConstructor<T>, db: string);
        DbName: string;
        TableName: string;
        Drop(): JQueryPromise<any>;
        List(): JQueryPromise<T[]>;
        Truncate(): JQueryPromise<any>;
        FindRowAsync(exp: (obj: T) => string | number, value: string | number): JQueryPromise<T>;
        FindRowsAsync(exp: (obj: T) => string | number, value: string | number): JQueryPromise<T[]>;
        protected FetchCursor(indexStore: IDBIndex, value: string | number, d: JQueryDeferred<any>): void;
        UpsertAsync(entity: T | Array<T>, primaryKey?: (obj: T) => string | number): JQueryPromise<any>;
        DeleteAsync(entity: T | Array<T>): JQueryPromise<any>;
        protected Open(): JQueryPromise<IDBDatabase>;
        protected Upgrade(version: number, action: (db: any) => void): void;
    }
}
