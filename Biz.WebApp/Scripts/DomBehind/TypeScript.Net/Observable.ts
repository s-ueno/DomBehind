namespace DomBehind {
    export class Observable<T> {

        public static Register<T>(target: T, ...marks: string[]): Observable<T> {
            return new Observable(target, marks);
        }

        // #region INotifyPropertyChanged

        public PropertyChanging: TypedEvent<PropertyChangingEventArgs> = new TypedEvent<PropertyChangingEventArgs>();
        public PropertyChanged: TypedEvent<PropertyChangedEventArgs> = new TypedEvent<PropertyChangedEventArgs>();

        // #endregion

        constructor(protected source: T, protected marks?: string[]) {
            if (source == null) return;

            let keys = Object.keys(source);
            for (var i = 0; i < keys.length; i++) {
                let name = keys[i];
                if (String.IsNullOrWhiteSpace(name)) continue;

                if (marks) {
                    if (marks.Any(x => x === name)) {
                        this.Recurcive(source, name, null);
                    }
                } else {
                    this.Recurcive(source, name, null);
                }
            }
        }

        protected Recurcive(source: any, name: string, parentName: string) {
            var value = source[name];
            var notifibleName = (parentName) ? `${parentName}.${name}` : name;
            Object.defineProperty(source, name,
                this.CreateDescriptor(notifibleName, value));

            if (Object.IsNullOrUndefined(value)) return;
            if (typeof value !== "object") return;

            var keys = Object.keys(value);
            for (var i = 0; i < keys.length; i++) {
                this.Recurcive(value, keys[i], notifibleName);
            }
        }
        public get Source(): T {
            return this.source;
        }
        protected CreateDescriptor(notifibleName: string, value: any): PropertyDescriptor {
            var changing = this.PropertyChanging;
            var notifier = this.PropertyChanged;
            let e = new PropertyChangedEventArgs(notifibleName);
            var sender = this.source;
            return {
                get: function () {
                    return value;
                },
                set: function (v) {
                    changing.Raise(sender, new PropertyChangingEventArgs(e.Name, value, v));
                    value = v;
                    notifier.Raise(sender, e);
                },
                enumerable: true,
                configurable: true
            }
        }
    }
}
