namespace DomBehind.Core {
    export interface TypedConstructor<T> {
        new (): T;
    }
    export class TypedFactory<T> {
        constructor(private _ctor: TypedConstructor<T>) {
        }
        public CreateInstance(): T {
            return new this._ctor();
        }
    }
}




