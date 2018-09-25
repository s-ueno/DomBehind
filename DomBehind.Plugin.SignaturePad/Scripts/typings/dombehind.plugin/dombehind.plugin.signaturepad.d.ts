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
    class Sign extends DomBehind.Data.BindingBehavior {
        static InstanceProperty: Data.DependencyProperty;
        protected Option: ISignOption<any>;
        SetOption(option: ISignOption<any>): void;
        protected readonly DefaultOption: ISignOption<any>;
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
    interface BindingBehaviorBuilder<T> {
        BuildSign(option?: ISignOption<T>): BindingBehaviorBuilder<T>;
    }
}