declare namespace DomBehind {
    enum SignSaveImage {
        Png = 0,
        Jpeg = 1,
        Svg = 2
    }
    interface ISignOption<T> {
        image?: SignSaveImage;
        color?: string;
        showClear?: boolean;
        clearCaption?: string;
        clearStyle?: string;
        showUndo?: boolean;
        undoCaption?: string;
        undoStyle?: string;
        showDownload?: boolean;
        downloadCaption?: string;
        downloadStyle?: string;
        saveAction?: (owner: T, image: Blob) => void;
        saveCaption?: string;
        saveStyle?: string;
    }
    class Sign extends DomBehind.Data.BindingBehavior {
        protected Option: ISignOption<any>;
        SetOption(option: ISignOption<any>): void;
        protected readonly DefaultOption: ISignOption<any>;
        Identity: string;
        protected SignaturePad: SignaturePad;
        Ensure(): void;
        dataURLToBlob(dataURL: any): Blob;
    }
    interface BindingBehaviorBuilder<T> {
        BuildSign(option: ISignOption<T>): BindingBehaviorBuilder<T>;
    }
}
