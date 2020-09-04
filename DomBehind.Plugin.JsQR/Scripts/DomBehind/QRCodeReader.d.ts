declare namespace DomBehind {
    class QRCodeReader extends Data.BindingBehavior {
        Option: QRCodeReaderOption;
        /**
         * フレームレートのデフォルト値
         */
        get DefaultFrameRate(): {
            Min: number;
            Max: number;
        };
        /**
         * カメラ解像度のデフォルト値
         */
        get DefaultResolution(): {
            Width: number;
            Height: number;
        };
        /**
         * マークのデフォルト色
         */
        get DefaultMarkColor(): string;
        /**
         * カメラが起動中かどうかを表します
         */
        get ActiveCamera(): boolean;
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
