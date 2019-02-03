declare namespace DomBehind {
    interface TypedConstructor<T> {
        new (): T;
    }
    class TypedFactory<T> {
        private _ctor;
        constructor(_ctor: TypedConstructor<T>);
        CreateInstance(): T;
    }
}
