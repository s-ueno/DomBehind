declare namespace DomBehind {
    class PropertyInfo implements IDisposable {
        DataContext: any;
        MemberPath: string;
        constructor(DataContext: any, MemberPath: string);
        SetValue(value: any): void;
        GetValue(): any;
        Dispose(): void;
    }
    class LamdaExpression extends PropertyInfo {
        Lamda: (x: any) => any;
        constructor(dataContext: any, Lamda: (x: any) => any);
        private static ParsePropertyPath;
        private static _extractor;
        private static _extractor_Minified;
        private static NameOf;
        private static IsSupportES6;
        Dispose(): void;
        static Path<T>(exp: (x: T) => any): string;
        static GetValueCore(dataContext: any, lamda: (x: any) => any): any;
    }
    class BooleanFakeExpression extends PropertyInfo {
        Value: boolean;
        constructor(Value: boolean);
        SetValue(value: any): void;
        GetValue(): any;
    }
}
