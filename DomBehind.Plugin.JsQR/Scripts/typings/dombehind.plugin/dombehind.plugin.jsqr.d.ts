interface Chunk {
    type: Mode;
    text: string;
}
interface ByteChunk {
    type: Mode.Byte | Mode.Kanji;
    bytes: number[];
}
interface ECIChunk {
    type: Mode.ECI;
    assignmentNumber: number;
}
declare type Chunks = Array<Chunk | ByteChunk | ECIChunk>;
interface DecodedQR {
    text: string;
    bytes: number[];
    chunks: Chunks;
}
declare enum Mode {
    Numeric = "numeric",
    Alphanumeric = "alphanumeric",
    Byte = "byte",
    Kanji = "kanji",
    ECI = "eci",
}
declare function decode(data: Uint8ClampedArray, version: number): DecodedQR;


interface Point {
    x: number;
    y: number;
}
interface QRCode {
    binaryData: number[];
    data: string;
    chunks: Chunks;
    location: {
        topRightCorner: Point;
        topLeftCorner: Point;
        bottomRightCorner: Point;
        bottomLeftCorner: Point;
        topRightFinderPattern: Point;
        topLeftFinderPattern: Point;
        bottomLeftFinderPattern: Point;
        bottomRightAlignmentPattern?: Point;
    };
}
interface Options {
    inversionAttempts?: "dontInvert" | "onlyInvert" | "attemptBoth" | "invertFirst";
}

interface jsQRStatic {
    (): any;
    (data: Uint8ClampedArray, width: number, height: number, providedOptions?: Options): QRCode | null;
}
declare var jsQR: jsQRStatic

declare namespace DomBehind {
    class QRCodeReader extends Data.BindingBehavior {
        Option: QRCodeReaderOption;
        /**
         * フレームレートのデフォルト値
         */
        readonly DefaultFrameRate: {
            Min: number;
            Max: number;
        };
        /**
         * カメラ解像度のデフォルト値
         */
        readonly DefaultResolution: {
            Width: number;
            Height: number;
        };
        /**
         * マークのデフォルト色
         */
        readonly DefaultMarkColor: string;
        /**
         * カメラが起動中かどうかを表します
         */
        readonly ActiveCamera: boolean;
        private activeCamera;
        /**
         * カメラ映像の取得元ストリーム
         * ※ カメラ停止中はnullが入るので、Nullチェックした上で使うこと。
         */
        private stream?;
        Ensure(): void;
        /**
         * カメラを起動します
         */
        StartCamera(): void;
        /**
         * カメラを停止します
         */
        StopCamera(): void;
        /**
         * Canvasに直線を描画します
         * @param canvasCtx Canvas描画コンテキスト(2D)
         * @param begin 開始地点
         * @param end 終了地点
         * @param color 直線の色
         */
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