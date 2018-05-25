namespace DomBehind {
    export class PropertyChangedEventArgs
        extends EventArgs {
        constructor(public Name?: string) {
            super();
        }
    }

    export interface INotifyPropertyChanged {
        PropertyChanged: TypedEvent<PropertyChangedEventArgs>;
    }
}

