declare namespace DomBehind {
    class QRCodeReader extends Data.BindingBehavior {
        constructor();
        Option: QRCodeReaderOption;
        readonly DefaultFrameRate: {
            Min: number;
            Max: number;
        };
        readonly DefaultResolution: {
            Width: number;
            Height: number;
        };
        readonly DefaultMarkColor: string;
        readonly ActiveCamera: boolean;
        private activeCamera;
        private stream?;
        Ensure(): void;
        StartCamera(): void;
        StopCamera(): void;
        private DrawLine;
    }
    interface QRCodeReaderOption {
        Mark?: {
            Enable: boolean;
            Color: string;
        };
        Resolution?: {
            Width: number;
            Height: number;
        };
        FrameRate?: {
            Min: number;
            Max: number;
        };
        OnRead?: (result: QRCodeReaderResult) => void;
    }
    interface QRCodeReaderResult {
        Data: string;
        BinaryData: number[];
        VideoSize: {
            Width: number;
            Height: number;
        };
    }
    interface BindingBehaviorBuilder<T> {
        BuildQRCodeReader<TRow>(option: QRCodeReaderOption): BindingBehaviorBuilder<TRow>;
        ActiveCamera(binding: (row: T) => BindingBehaviorBuilder<T>): any;
    }
}