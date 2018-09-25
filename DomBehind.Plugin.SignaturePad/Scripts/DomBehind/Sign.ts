namespace DomBehind {

    export enum SignSaveImage {
        Png, Jpeg, Svg
    }
    export interface ISignOption<T> {
        image?: SignSaveImage;
        color?: string;
    }

    export class Sign extends DomBehind.Data.BindingBehavior {

        public static InstanceProperty: Data.DependencyProperty
            = Data.DependencyProperty.RegisterAttached("Instance",
                el => {
                    let identity = el.attr("id");
                    if (!identity) {
                        return null;
                    }
                    let me: Sign = window[identity];
                    return me;
                },
                (el, newValue) => {
                    // read only
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.TwoWay /* hack onwaytosource */);


        protected Option: ISignOption<any>;
        public SetOption(option: ISignOption<any>) {
            this.Option = $.extend(true, this.DefaultOption, option);
        }
        protected get DefaultOption(): ISignOption<any> {
            return {
                image: SignSaveImage.Png,
                color: "rgb(255,255,255)",
            };
        }

        public Identity: string;
        protected SignaturePad: SignaturePad;
        protected Canvas: HTMLCanvasElement;
        public Ensure(): void {

            this.Identity = this.Element.attr("id");
            if (!this.Identity) {
                this.Identity = `id-${NewUid()}`;
                this.Element.attr("id", this.Identity);
            }

            window[this.Identity] = this;

            let dom = $(`<canvas class="SignCanvas" style="width:100%;height:100%"></canvas>`);
            this.Element.append(dom);

            this.Canvas = (<HTMLCanvasElement>dom[0])
            this.SignaturePad = new SignaturePad(this.Canvas);

            this.Refresh();
            this.Resize();
        }

        public CreateImageToBlob(): Blob {
            return (<Blob>this.CreateImage(true));
        }
        public CreateImageToArray(): number[] {
            let array: Array<number> = (<number[]>this.CreateImage(false));
            return array;
        }
        protected CreateImage(isBlob: boolean): Blob | Array<number> {
            if (this.SignaturePad.isEmpty()) return null;

            let mine: string = null;
            if (this.Option.image === SignSaveImage.Jpeg) {
                mine = "image/jpeg";
            } else if (this.Option.image === SignSaveImage.Svg) {
                mine = "image/svg+xml";
            }

            let sig: any = this.SignaturePad;
            let uri: string = sig.toDataURL(mine);

            if (isBlob)
                return this.ToBlob(uri);

            let array = this.ToArray(uri);
            return [].slice.call(array);
        }

        public Download(fileName: string) {
            if (this.SignaturePad.isEmpty()) return;

            let mine: string = null;
            if (this.Option.image === SignSaveImage.Jpeg) {
                mine = "image/jpeg";
            } else if (this.Option.image === SignSaveImage.Svg) {
                mine = "image/svg+xml";
            }

            let sig: any = this.SignaturePad;
            let uri: string = sig.toDataURL(mine);
            let bytes: Blob = this.ToBlob(uri);

            this.DownloadRaw(fileName, bytes);
        }

        protected ToBlob(dataURL: string) {
            let parts = dataURL.split(';base64,');
            let contentType = parts[0].split(":")[1];
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;
            let uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], { type: contentType });
        }

        protected ToArray(dataURL: string) {
            let parts = dataURL.split(';base64,');
            let contentType = parts[0].split(":")[1];
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;
            let uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return uInt8Array;
        }

        protected DownloadRaw(fileName: string, bytes: Blob) {
            let newUri = window.URL.createObjectURL(bytes);

            if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
                window.open(newUri);
            } else {
                let a = document.createElement("a");
                a.style.display = "none";
                a.href = newUri;
                a.download = fileName;

                document.body.appendChild(a);
                a.click();

                window.URL.revokeObjectURL(newUri);
                a.remove();
            }
        }

        public Refresh() {
            if (!this.DataContext || this.DataContext._disposed) {
                return;
            }

            let ratio = Math.max(window.devicePixelRatio || 1, 1);

            this.Canvas.width = this.Canvas.offsetWidth * ratio;
            this.Canvas.height = this.Canvas.offsetHeight * ratio;
            this.Canvas.getContext("2d").scale(ratio, ratio);

            this.SignaturePad.clear();
        }

        protected Resize() {
            let timer: any;
            $(window).on("resize", e => {
                if (timer !== false) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.Refresh();
                }, 200);
            });
        }
    }

    export interface BindingBehaviorBuilder<T> {
        BuildSign(option?: ISignOption<T>): BindingBehaviorBuilder<T>;
    }

    BindingBehaviorBuilder.prototype.BuildSign = function (option?: ISignOption<any>) {
        let me: BindingBehaviorBuilder<any> = this;
        let behavior = me.Add(new Sign());
        behavior.SetOption(option);
        return me;
    }
}