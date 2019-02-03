declare namespace DomBehind {
    interface IValueConverter {
        Convert(value: any): any;
        ConvertBack(value: any): any;
    }
}
