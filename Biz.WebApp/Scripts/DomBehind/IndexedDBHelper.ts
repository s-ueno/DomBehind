namespace DomBehind {

    export class IndexedDBHelper<T> {
        constructor(ctor: TypedConstructor<T>, db: string) {
            let schema: any = new ctor();

            let name: string = schema.toString();
            if (name === "[object Object]") {
                name = schema.constructor.name;
            }

            if (name === "Object") {
                throw Error("dynamic object is not supported");
            }
            this.DbName = db;
            this.TableName = name;
        }
        public DbName: string;
        public TableName: string;

        public List(): JQueryPromise<T[]> {
            let d = $.Deferred<any>();
            let db = this.Open();

            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    d.resolve([]);
                    return;
                }
                let trans = x.transaction(this.TableName, "readwrite");
                let objectStore = trans.objectStore(this.TableName);


                let dbRequest = objectStore.getAll();
                dbRequest.onsuccess = e => {
                    let result = dbRequest.result;
                    d.resolve(result);

                };
                dbRequest.onerror = e => {
                    d.reject();
                };
            }).fail(() => {
                d.reject();
            });
            return d.promise();
        }

        public Truncate() {
            let d = $.Deferred<any>();
            let db = this.Open();

            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    d.resolve([]);
                    return;
                }
                let trans = x.transaction(this.TableName, "readwrite");
                let objectStore = trans.objectStore(this.TableName);

                let dbRequest = objectStore.clear();
                dbRequest.onsuccess = e => {
                    d.resolve();
                };
                dbRequest.onerror = e => {
                    d.reject();
                };
            }).fail(() => {
                d.reject();
            });
            return d.promise();
        }

        public FindRowAsync(exp: (obj: T) => string | number, value: string | number): JQueryPromise<T> {
            let d = $.Deferred<any>();
            this.FindRowsAsync(exp, value).done(x => {
                d.resolve(x.FirstOrDefault());
            }).fail(x => {
                d.reject(x);
            });
            return d.promise();
        }
        public FindRowsAsync(exp: (obj: T) => string | number, value: string | number): JQueryPromise<T[]> {
            let path = LamdaExpression.Path(exp);
            let d = $.Deferred<any>();
            let db = this.Open();

            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    d.resolve([]);
                    return;
                }

                let trans = x.transaction(this.TableName, "readwrite");
                let objectStore = trans.objectStore(this.TableName);
                if (objectStore.keyPath === path) {
                    let dbRequest = objectStore.get(value);
                    dbRequest.onsuccess = e => {
                        let result = [dbRequest.result];
                        d.resolve(result);
                    };
                    dbRequest.onerror = e => {
                        d.reject(e);
                    };
                } else if (objectStore.indexNames.contains(path)) {
                    this.FetchCursor(objectStore.index(path), value, d);
                } else {
                    x.close();
                    this.Upgrade(x.version + 1, y => {
                        let newDb: IDBDatabase = y.target.result;
                        let newTrans: IDBTransaction = y.target.transaction;
                        let newObjectStore = newTrans.objectStore(this.TableName);
                        let indexStore = newObjectStore.createIndex(path, path, { unique: false });
                        this.FetchCursor(indexStore, value, d);
                    });
                }
            }).fail(x => {
                d.reject(x);
            });
            return d.promise();
        }

        protected FetchCursor(indexStore: IDBIndex, value: string | number, d: JQueryDeferred<any>) {
            let list = new List<T>();
            let cursorHandler = indexStore.openCursor(value);
            cursorHandler.onsuccess = (e: any) => {
                let cursor: IDBCursorWithValue = e.target.result;
                if (cursor) {
                    let value = cursor.value;
                    if (!Object.IsNullOrUndefined(value)) {
                        list.add(value);
                    }
                    cursor.continue();
                }
                else {
                    // cursor is end;
                    d.resolve(list.toArray());
                }
            };
            cursorHandler.onerror = e => {
                d.reject(e);
            };
        }

        public UpsertAsync(entity: T | Array<T>, primaryKey?: (obj: T) => string | number): JQueryPromise<any> {
            let path: string;
            if (primaryKey) {
                path = LamdaExpression.Path(primaryKey);
            }

            let d = $.Deferred<any>();
            let db = this.Open();

            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    x.close();
                    this.Upgrade(x.version + 1, y => {
                        let newDb: IDBDatabase = y.target.result;
                        let newStore: IDBObjectStore;
                        if (path) {
                            newStore = newDb.createObjectStore(this.TableName, { keyPath: path });
                        } else {
                            newStore = newDb.createObjectStore(this.TableName, { keyPath: "__identity", autoIncrement: true });
                        }
                        // 
                        newStore.transaction.oncomplete = e => {
                            newDb.close();
                            this.UpsertAsync(entity, primaryKey).done(x => d.resolve()).fail(x => d.reject(x));
                        };
                    });
                    return;
                }

                let trans = x.transaction(this.TableName, "readwrite");
                let store = trans.objectStore(this.TableName);

                if (entity instanceof Array) {
                    $.each(entity, (i, value) => {
                        store.put(value);
                    });
                } else {
                    store.put(entity);
                }

                d.resolve();
            }).fail(x => {
                d.reject(x);
            });
            return d.promise();
        }



        public DeleteAsync(entity: T | Array<T>): JQueryPromise<any> {
            let d = $.Deferred<any>();
            let db = this.Open();

            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    d.resolve();
                } else {
                    let trans = x.transaction(this.TableName, "readwrite");
                    if (trans.objectStoreNames.contains(this.TableName)) {
                        let store = trans.objectStore(this.TableName);

                        if (entity instanceof Array) {
                            $.each(entity, (i, value) => {
                                let id = value[`${store.keyPath}`];
                                store.delete(id);
                            });
                        } else {
                            let identity = entity[`${store.keyPath}`];
                            store.delete(identity);
                        }

                        d.resolve();
                    } else {
                        d.reject(`table not found. ${this.TableName}`);
                    }
                }
            }).fail(x => {
                d.reject(x);
            });
            return d.promise();
        }


        protected Open(): JQueryPromise<IDBDatabase> {
            let d = $.Deferred<any>();

            let factory = window.indexedDB;
            let openRequest = factory.open(this.DbName);

            openRequest.onsuccess = e => {
                let db: IDBDatabase = openRequest.result;
                d.resolve(db);

                db.close();
            };
            openRequest.onblocked = e => {
                d.reject(e);
            };
            openRequest.onerror = e => {
                d.reject(e);
            }

            return d.promise();
        }

        protected Upgrade(version: number, action: (db: any) => void) {
            // let d = $.Deferred<any>();
            let factory = window.indexedDB;
            let openRequest = factory.open(this.DbName, version);

            openRequest.onsuccess = e => {
                let dummy = e;
            };

            openRequest.onupgradeneeded = (e: any) => {
                let db: IDBDatabase = e.target.result;
                action(e);
                db.close();
            };
            openRequest.onerror = e => {
            };
        }
    }
}

