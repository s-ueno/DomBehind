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
        Lamda: (x) => any;
        constructor(dataContext: any, Lamda: (x) => any);
        private static ParsePropertyPath(exp);
        private static _extractor;
        private static NameOf(expression);
        Dispose(): void;
        static Path<T>(exp: (x: T) => any): string;
        static GetValueCore(dataContext: any, lamda: (x) => any): any;
    }
    class BooleanFakeExpression extends PropertyInfo {
        Value: boolean;
        constructor(Value: boolean);
        SetValue(value: any): void;
        GetValue(): any;
    }
}
