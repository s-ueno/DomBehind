﻿namespace DomBehind {
    export class QRCodeReader extends Data.BindingBehavior {

        public Option: QRCodeReaderOption;

        /**
         * フレームレートのデフォルト値
         */
        public get DefaultFrameRate() {
            return { Min: 0, Max: 15 };
        };

        /**
         * カメラ解像度のデフォルト値
         */
        public get DefaultResolution() {
            return { Width: 640, Height: 480 };
        }

        /**
         * マークのデフォルト色 
         */
        public get DefaultMarkColor() {
            return '#FF3B58'
        }

        /**
         * カメラが起動中かどうかを表します
         */
        public get ActiveCamera(): boolean {
            return this.activeCamera;
        }

        private activeCamera: boolean;

        /**
         * カメラ映像の取得元ストリーム
         * ※ カメラ停止中はnullが入るので、Nullチェックした上で使うこと。
         */
        private stream?: MediaStream;

        public Ensure(): void {
            // Videoを生成する
            let video = document.createElement('video');

            // Canvasを取得する
            let canvasEl: HTMLCanvasElement = this.Element[0] as HTMLCanvasElement;
            let context = canvasEl.getContext('2d');

            let media = navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: this.Option.Resolution.Width,
                    height: this.Option.Resolution.Height,
                    facingMode: {
                        exact: 'environment'
                    },
                    frameRate: {
                        min: this.Option.FrameRate.Min,
                        max: this.Option.FrameRate.Max
                    }
                }
            });

            // QRCode読取する
            let readQRCode = () => {
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    // キャンバスに収まるようトリミングしたフレームを取得する
                    context.drawImage(video, 0, 0, canvasEl.width, canvasEl.height, 0, 0, canvasEl.width, canvasEl.height);
                    let imgData = context.getImageData(0, 0, canvasEl.width, canvasEl.height);

                    // QRCode読取する
                    let code = jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: 'dontInvert' });

                    if (code) {
                        // QRコードの周囲に四角マークを描画する
                        if (this.Option.Mark.Enable) {
                            this.DrawLine(context, code.location.topLeftCorner, code.location.topRightCorner, this.Option.Mark.Color);
                            this.DrawLine(context, code.location.topRightCorner, code.location.bottomRightCorner, this.Option.Mark.Color);
                            this.DrawLine(context, code.location.bottomRightCorner, code.location.bottomLeftCorner, this.Option.Mark.Color);
                            this.DrawLine(context, code.location.bottomLeftCorner, code.location.topLeftCorner, this.Option.Mark.Color);
                        }

                        // QRコード読取時コールバックイベントを発火する
                        if (this.Option.OnRead) {
                            this.Option.OnRead({
                                Data: code.data,
                                BinaryData: code.binaryData,
                                VideoSize: { Width: video.videoWidth, Height: video.videoHeight }
                            });
                        }
                    }
                }
                window.requestAnimationFrame(readQRCode);
            };

            // メディアストリームを取得した上で、再描画のタイミングでQRコード読取をする
            media.then((stream) => {
                video.srcObject = stream;
                video.setAttribute('playsinline', 'true');
                video.play();
                this.activeCamera = true;

                window.requestAnimationFrame(readQRCode);
            });
        }

        /**
         * カメラを起動します
         */
        public StartCamera() {
            this.Ensure();
        }

        /**
         * カメラを停止します
         */
        public StopCamera() {
            if (this.stream) {
                this.stream.getTracks().forEach((t) => {
                    t.stop();
                });
            }

            this.activeCamera = false;
        }

        /**
         * Canvasに直線を描画します
         * @param canvasCtx Canvas描画コンテキスト(2D)
         * @param begin 開始地点
         * @param end 終了地点
         * @param color 直線の色
         */
        private DrawLine(canvasCtx: CanvasRenderingContext2D,
            begin: {
                x: number;
                y: number;
            },
            end: {
                x: number;
                y: number;
            },
            color: string): void {
            canvasCtx.beginPath();
            canvasCtx.moveTo(begin.x, begin.y);
            canvasCtx.lineTo(end.x, end.y);
            canvasCtx.lineWidth = 4;
            canvasCtx.strokeStyle = color;
            canvasCtx.stroke();
        }
    }

    export interface QRCodeReaderOption {
        // QRCode認識時にマークする
        Mark?: { Enable: boolean, Color: string };
        // カメラの解像度
        Resolution?: { Width: number, Height: number };
        // カメラのFPS
        FrameRate?: { Min: number, Max: number };
        // QRCode読取のコールバック
        OnRead?: (result: QRCodeReaderResult) => void;
    }

    export interface QRCodeReaderResult {
        // QRCodeデータ
        Data: string;
        // QRCodeデータ(バイナリ)
        BinaryData: number[];
        // ビデオサイズ(拡大・縮小なし)
        VideoSize: { Width: number, Height: number };
    }

    export interface BindingBehaviorBuilder<T> {
        BuildQRCodeReader<TRow>(option: QRCodeReaderOption): BindingBehaviorBuilder<TRow>;
        ActiveCamera(binding: (row: T) => BindingBehaviorBuilder<T>);
    }

    BindingBehaviorBuilder.prototype.BuildQRCodeReader = function (option: QRCodeReaderOption) {
        let me: BindingBehaviorBuilder<any> = this;
        let behavior = me.Add(new QRCodeReader());
        // マークの設定
        option.Mark = option.Mark || { Enable: false, Color: behavior.DefaultMarkColor };

        // カメラ解像度の設定
        option.Resolution = option.Resolution || behavior.DefaultResolution;

        // フレームレートの設定
        option.FrameRate = option.FrameRate || behavior.DefaultFrameRate;
        behavior.Option = option;

        return me;
    }
}
