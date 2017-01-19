namespace DomBehind.Core {

    export class NotifiableImp implements IDisposable, INotifyPropertyChanged {

        // #region INotifyPropertyChanged

        public PropertyChanged: Data.TypedEvent<PropertyChangedEventArgs> = new Data.TypedEvent<PropertyChangedEventArgs>();

        // #endregion

        // #region Property Backing Store

        protected GetProperty<T>(name: string, defaultValue?: T): T {
            let obj = this._dic[name];
            return Object.IsNullOrUndefined(obj) ? defaultValue : obj;
        }
        protected SetProperty<T>(name: string, value: T): boolean {
            var result = false;
            let oldValue = this.GetProperty<T>(name);
            if (value !== oldValue) {
                result = true;
                this._dic[name] = value;
                this._dic[`${name}_old___`] = oldValue;

                this.OnPropertyChanged(name);
            }
            return result;
        }
        protected _dic: { [key: string]: any; } = {};

        // #endregion


        // #region Dispose

        public Dispose(): void {
            if (!this._disposed) {
                this._dic = null;

                if (this.PropertyChanged) {
                    this.PropertyChanged.Dispose();
                }
            }
            this._disposed = true;
        }
        protected _disposed: boolean = false;

        // #endregion

        public OnPropertyChanged(name: string): void {
            this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(name));
        }
    }


    // It is heavy, so we do not recommend it.
    export class Observable {

        public static Register(target: any, callBack: (sender, e) => void): void {
            var observer = new DomBehind.Core.Observable(target);
            observer.PropertyChanged.AddHandler(callBack);
            target.__observer = observer;
        }

        // #region INotifyPropertyChanged

        public PropertyChanged: Data.TypedEvent<PropertyChangedEventArgs> = new Data.TypedEvent<PropertyChangedEventArgs>();

        // #endregion

        constructor(protected source: any) {
            if (source == null) return;
            var keys = Object.keys(source);
            for (var i = 0; i < keys.length; i++) {
                var name = keys[i];
                Object.defineProperty(source, name, this.CreateDescriptor(name, source[name]));
            }
        }
        protected CreateDescriptor(name: string, value: any): PropertyDescriptor {
            var notifier = this.PropertyChanged;
            var sender = this.source;
            return {
                get: function () {
                    return value;
                },
                set: function (v) {
                    value = v;
                    notifier.Raise(sender, new PropertyChangedEventArgs(name));
                },
                enumerable: true,
                configurable: true
            }
        }
    }


}
