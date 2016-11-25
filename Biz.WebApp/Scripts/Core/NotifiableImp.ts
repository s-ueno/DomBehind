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

                this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(name));
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

    }

}