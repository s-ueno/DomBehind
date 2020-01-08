﻿namespace DomBehind {
    export class Observable<T> {

        public static Register<T>(target: T, ...marks: string[]): Observable<T> {
            return new Observable(target, { marks: marks });
        }
        public static RegisterAttached<T>(target: T, option?: {
            wrapper?: (value: any, name?: string) => any
            marks?: string[],
        }): Observable<T> {
            return new Observable(target, option);
        }

        // #region INotifyPropertyChanged

        public PropertyChanging: TypedEvent<PropertyChangingEventArgs> = new TypedEvent<PropertyChangingEventArgs>();
        public PropertyChanged: TypedEvent<PropertyChangedEventArgs> = new TypedEvent<PropertyChangedEventArgs>();
        protected Wrapper: (value: any, name: string) => any;

        // #endregion

        constructor(protected source: T, option?: {
            wrapper?: (value: any, name?: string) => any
            marks?: string[],
        }) {
            if (source == null) return;

            let keys = Object.keys(<any>source);
            for (var i = 0; i < keys.length; i++) {
                let name = keys[i];
                if (String.IsNullOrWhiteSpace(name)) continue;

                if (option) {
                    this.Wrapper = option.wrapper;
                    if (option.marks) {
                        $.each(option.marks, (i, value) => {
                            let buff = value.Split(".");
                            let parentName: string = "";
                            $.each(buff, (k, each) => {
                                this.Recurcive(source, each, parentName);

                                if (parentName) {
                                    parentName = `${parentName}.${each}`
                                } else {
                                    parentName = each;
                                }
                            });
                        });
                    } else {
                        this.Recurcive(source, name, null);
                    }
                } else {
                    this.Recurcive(source, name, null);
                }
            }
        }

        protected Recurcive(source: any, name: string, parentName: string) {
            let value = source[name];
            let notifibleName = (parentName) ? `${parentName}.${name}` : name;
            Object.defineProperty(source, name,
                this.CreateDescriptor(notifibleName, value));

            if (Object.IsNullOrUndefined(value)) return;
            if (typeof value !== "object") return;

            let keys = Object.keys(value);
            for (var i = 0; i < keys.length; i++) {
                this.Recurcive(value, keys[i], notifibleName);
            }
        }
        public get Source(): T {
            return this.source;
        }
        protected CreateDescriptor(notifibleName: string, value: any): PropertyDescriptor {
            let changing = this.PropertyChanging;
            let notifier = this.PropertyChanged;
            let wrapper = this.Wrapper;
            let e = new PropertyChangedEventArgs(notifibleName);
            let sender = this.source;
            return {
                get: function () {
                    if (wrapper)
                        return wrapper(value, notifibleName);
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
