declare namespace DomBehind {
    class PropertyChangingEventArgs extends EventArgs {
        Name: string;
        OldValue: any;
        NewValue: any;
        constructor(Name?: string, OldValue?: any, NewValue?: any);
    }
    interface INotifyPropertyChanging {
        PropertyChanging: TypedEvent<PropertyChangingEventArgs>;
    }
}
