namespace DomBehind.Core.Data {
    export interface IValueConverter {
        Convert(value: any): any;
        ConvertBack(value: any): any;
    }
}