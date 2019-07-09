declare namespace DomBehind {
    class QRCodeReader extends Data.BindingBehavior {
        constructor();
        Option: QRCodeReaderOption;
        readonly DefaultFrameRate: {
            Min: number;
            Max: number;
        };
        Ensure(): void;
        private DrawLine;
    }
    interface QRCodeReaderOption {
        Mark: {
            Enable: boolean;
            Color?: string;
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
        ImageSize: {
            Width: number;
            Height: number;
        };
    }
    interface BindingBehaviorBuilder<T> {
        BuildQRCodeReader<TRow>(option: QRCodeReaderOption): BindingBehaviorBuilder<TRow>;
    }
}