declare namespace DomBehind {
    class NotifiableImp implements IDisposable, INotifyPropertyChanged {
        PropertyChanged: TypedEvent<PropertyChangedEventArgs>;
        protected GetProperty<T>(name: string, defaultValue?: T): T;
        protected SetProperty<T>(name: string, value: T): boolean;
        protected _dic: {
            [key: string]: any;
        };
        Dispose(): void;
        protected _disposed: boolean;
        OnPropertyChanged(name: string): void;
    }
}
