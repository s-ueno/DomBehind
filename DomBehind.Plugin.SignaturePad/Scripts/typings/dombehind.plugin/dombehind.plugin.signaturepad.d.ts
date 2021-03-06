declare namespace DomBehind {
    enum SignSaveImage {
        Png = 0,
        Jpeg = 1,
        Svg = 2
    }
    interface ISignOption<T> {
        image?: SignSaveImage;
        color?: string;
    }
    class Sign extends Data.RelativeDataBindingBehavior {
        static InstanceProperty: Data.DependencyProperty;
        protected Option: ISignOption<any>;
        SetOption(option: ISignOption<any>): void;
        protected get DefaultOption(): ISignOption<any>;
        Identity: string;
        protected SignaturePad: SignaturePad;
        protected Canvas: HTMLCanvasElement;
        Ensure(): void;
        CreateImageToBlob(): Blob;
        CreateImageToArray(): number[];
        protected CreateImage(isBlob: boolean): Blob | Array<number>;
        Download(fileName: string): void;
        protected ToBlob(dataURL: string): Blob;
        protected ToArray(dataURL: string): Uint8Array;
        protected DownloadRaw(fileName: string, bytes: Blob): void;
        Refresh(): void;
        protected Resize(): void;
    }
    class SignBindingBuilder<T> extends Data.DataBindingBehaviorBuilder<T> {
        Binding<P>(property: Data.DependencyProperty, bindingExpression: (x: T) => P, mode?: Data.BindingMode, updateTrigger?: Data.UpdateSourceTrigger): SignBindingBuilder<T>;
    }
    interface BindingBehaviorBuilder<T> {
        BuildSign(option?: ISignOption<T>): SignBindingBuilder<T>;
    }
}