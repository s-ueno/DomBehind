declare namespace DomBehind {
    class Observable<T> {
        protected source: T;
        static Register<T>(target: T, ...marks: string[]): Observable<T>;
        static RegisterAttached<T>(target: T, option?: {
            wrapper?: (value: any, name?: string) => any;
            marks?: string[];
        }): Observable<T>;
        PropertyChanging: TypedEvent<PropertyChangingEventArgs>;
        PropertyChanged: TypedEvent<PropertyChangedEventArgs>;
        protected Wrapper: (value: any, name: string) => any;
        constructor(source: T, option?: {
            wrapper?: (value: any, name?: string) => any;
            marks?: string[];
        });
        protected Recurcive(source: any, name: string, parentName: string): void;
        readonly Source: T;
        protected CreateDescriptor(notifibleName: string, value: any): PropertyDescriptor;
    }
}
