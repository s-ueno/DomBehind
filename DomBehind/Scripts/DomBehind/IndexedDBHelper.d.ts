declare namespace DomBehind {
    class IndexedDBHelper<T> {
        constructor(ctor: TypedConstructor<T>, db: string);
        DbName: string;
        TableName: string;
        Drop(): JQueryPromise<any>;
        DropAsync(): Promise<any>;
        List(): JQueryPromise<T[]>;
        ListAsync(): Promise<T[]>;
        Truncate(): JQueryPromise<any>;
        TruncateAsync(): Promise<any>;
        FindRow(exp: (obj: T) => string | number, value: string | number): JQueryPromise<T>;
        FindRowAsync(exp: (obj: T) => string | number, value: string | number): Promise<T>;
        FindRows(exp: (obj: T) => string | number, value: string | number): JQueryPromise<T[]>;
        FindRowsAsync(exp: (obj: T) => string | number, value: string | number): Promise<T[]>;
        protected FetchCursor(indexStore: IDBIndex, value: string | number, d: JQueryDeferred<any>): void;
        Upsert(entity: T | Array<T>, primaryKey?: (obj: T) => string | number): JQueryPromise<any>;
        UpsertAsync(entity: T | Array<T>, primaryKey?: (obj: T) => string | number): Promise<any>;
        Delete(entity: T | Array<T>): JQueryPromise<any>;
        DeleteAsync(entity: T | Array<T>): Promise<any>;
        protected Open(): JQueryPromise<IDBDatabase>;
        protected OpenAsync(): Promise<IDBDatabase>;
        protected Upgrade(version: number, action: (db: any) => void): void;
    }
}
