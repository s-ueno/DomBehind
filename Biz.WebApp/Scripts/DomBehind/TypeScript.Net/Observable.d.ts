declare namespace DomBehind {
    class Observable<T> {
        protected source: T;
        protected marks: string[];
        static Register<T>(target: T, ...marks: string[]): Observable<T>;
        PropertyChanging: TypedEvent<PropertyChangingEventArgs>;
        PropertyChanged: TypedEvent<PropertyChangedEventArgs>;
        constructor(source: T, marks?: string[]);
        protected Recurcive(source: any, name: string, parentName: string): void;
        readonly Source: T;
        protected CreateDescriptor(notifibleName: string, value: any): PropertyDescriptor;
    }
}
