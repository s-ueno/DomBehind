namespace DomBehind {
    export class QRCodeReader extends Data.BindingBehavior {
        constructor() {
            super();
        }

        public Option: QRCodeReaderOption;

        /**
         * フレームレートのデフォルト値
         */
        public get DefaultFrameRate() {
            return { Min: 0, Max: 15 };
        };

        public Ensure(): void {
            // Videoを生成する
            let video = document.createElement('video');

            // Canvasを取得する
            let canvasEl: HTMLCanvasElement = this.Element[0] as HTMLCanvasElement;
            let context = canvasEl.getContext('2d');

            let media = navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: {
                        exact: 'environment'
                    },
                    frameRate: {
                        min: this.Option.FrameRate.Min || this.DefaultFrameRate.Min,
                        max: this.Option.FrameRate.Max || this.DefaultFrameRate.Max
                    },
                }
            });

            // QRCode読取する
            let readQRCode = () => {

                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    // Canvasの高さ調整
                    canvasEl.height = video.videoHeight;
                    canvasEl.width = video.videoWidth;

                    // フレームを取得する
                    context.drawImage(video, 0, 0, canvasEl.width, canvasEl.height);
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
                                ImageSize: { Width: imgData.width, Height: imgData.height }
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

                window.requestAnimationFrame(readQRCode);
            });
        }

        /**
         * Canvasに直線を描画します
         * @param canvasCtx Canvas描画コンテキスト(2D)
         * @param begin 開始地点
         * @param end 終了地点
         * @param color 直線の色
         */
        private DrawLine(canvasCtx: CanvasRenderingContext2D, begin: locator.Point, end: locator.Point, color: string): void {
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
        Mark: { Enable: boolean, Color?: string };
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
        // フレーム画像のサイズ
        ImageSize: { Width: number, Height: number };
    }

    export interface BindingBehaviorBuilder<T> {
        BuildQRCodeReader<TRow>(option: QRCodeReaderOption): BindingBehaviorBuilder<TRow>;
    }

    BindingBehaviorBuilder.prototype.BuildQRCodeReader = function (option: QRCodeReaderOption) {
        let me: BindingBehaviorBuilder<any> = this;
        let behavior = me.Add(new QRCodeReader());

        // フレームレート未指定の場合の規定値
        if (!option.FrameRate) {
            option.FrameRate = { Min: 0, Max: 15 };
        }

        // QRCodeスキャンのコールバックが未指定の場合の規定値
        if (!option.OnRead) {
            option.OnRead = (result: QRCodeReaderResult) => { };
        }

        behavior.Option = option;

        return me;
    }
}
