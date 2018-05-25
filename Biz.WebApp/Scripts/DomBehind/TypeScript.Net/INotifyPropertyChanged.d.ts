declare namespace DomBehind {
    class PropertyChangedEventArgs extends EventArgs {
        Name: string;
        constructor(Name?: string);
    }
    interface INotifyPropertyChanged {
        PropertyChanged: TypedEvent<PropertyChangedEventArgs>;
    }
}
