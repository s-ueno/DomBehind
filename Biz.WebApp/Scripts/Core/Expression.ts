namespace DomBehind.Core {
    export class Expression implements IDisposable {
        constructor(
            public DataContext: any,
            public MemberPath: string) {
        }
        public SetValue(value: any): void {
            var arr = this.MemberPath.split(".");
            var lastDataContext: any = this.DataContext;
            $.each(arr.slice(0, arr.length - 1), (i, source) => {
                lastDataContext = lastDataContext[source];
            });
            var path = arr[arr.length - 1]
            lastDataContext[path] = value;
        }
        public GetValue(): any {
            var arr = this.MemberPath.split(".");
            var lastDataContext: any = this.DataContext;
            $.each(arr.slice(0, arr.length - 1), (i, source) => {
                lastDataContext = lastDataContext[source];
            });
            var path = arr[arr.length - 1]
            return lastDataContext[path];
        }

        public Method(): Function {
            return this.DataContext[this.MemberPath];
        }

        public Dispose(): void {
            this.DataContext = null;
            this.MemberPath = null;
        }
    }
    export class LamdaExpression extends Expression {
        constructor(dataContext: any, public Lamda: (x) => any) {
            super(dataContext, LamdaExpression.ParsePropertyPath(Lamda));
        }
        private static ParsePropertyPath(exp: (x) => any): string {
            var path = LamdaExpression.NameOf(exp);
            return path.split(".").slice(1).join(".");
        }

        // http://stackoverflow.com/questions/29191451/get-name-of-variable-in-typescript
        private static _extractor = new RegExp("return (.*);");
        private static _extractor_Minified = new RegExp("return (.*)");
        private static NameOf(expression: any): string {
            let m = LamdaExpression._extractor_Minified.exec(expression + "");
            if (m == null) throw new Error("The function does not contain a statement matching 'return variableName;'");

            let s = m[1];
            if (s.charAt(s.length - 1) == '}') {
                m = LamdaExpression._extractor.exec(expression + "");
                s = m[1];
            }
            return s;
        }

        public Dispose(): void {
            this.Lamda = null;
            super.Dispose();
        }


        public static Path<T>(exp: (x: T) => any): string {
            return LamdaExpression.ParsePropertyPath(exp);
        }

    }

    export class BooleanExpression extends Expression {
        constructor(public Value: boolean) {
            super(null, ".");
        }
        public /* override */ SetValue(value: any): void {

        }
        public /* override */ GetValue(): any {
            return this.Value;
        }
    }
}