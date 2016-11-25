namespace DomBehind.Core {

    export class PropertyChangedEventArgs
        extends EventArgs {
        constructor(public Name?: string) {
            super();
        }
    }

    export interface INotifyPropertyChanged {
        PropertyChanged: Data.TypedEvent<PropertyChangedEventArgs>;
    }

}