namespace DomBehind {
    export class PropertyChangingEventArgs
        extends EventArgs {
        constructor(public Name?: string, public OldValue?: any, public NewValue?: any) {
            super();
        }
    }

    export interface INotifyPropertyChanging {
        PropertyChanging: TypedEvent<PropertyChangingEventArgs>;
    }
}
