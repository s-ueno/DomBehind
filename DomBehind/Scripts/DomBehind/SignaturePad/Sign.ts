//namespace DomBehind {

//    export enum SignSaveImage {
//        Png, Jpeg, Svg
//    }
//    export interface ISignOption<T> {
//        image?: SignSaveImage;
//        color?: string;

//        showClear?: boolean;
//        clearCaption?: string;
//        clearStyle?: string;

//        showUndo?: boolean;
//        undoCaption?: string;
//        undoStyle?: string;

//        showDownload?: boolean;
//        downloadCaption?: string;
//        downloadStyle?: string;

//        saveAction?: (owner: T, image: Blob) => void;
//        saveCaption?: string;
//        saveStyle?: string;
//    }

//    export class Sign extends Data.BindingBehavior {

//        protected Option: ISignOption<any>;
//        public SetOption(option: ISignOption<any>) {
//            this.Option = $.extend(true, this.DefaultOption, option);
//        }
//        protected get DefaultOption(): ISignOption<any> {
//            return {
//                image: SignSaveImage.Png,
//                color: "rgb(255,255,255)",

//                showClear: true,
//                clearCaption: " Clear",
//                clearStyle: "fa fa-remove",

//                showUndo: true,
//                undoCaption: " Undo",
//                undoStyle: "fa fa-undo",

//                showDownload: true,
//                downloadCaption: " Download",
//                downloadStyle: "fa fa-download",

//                saveCaption: " Save",
//                saveStyle: "fa fa-save",
//            };
//        }

//        public Identity: string;
//        public SignaturePad: SignaturePad;
//        public Ensure(): void {

//            this.Identity = `id-${NewUid()}`;

//            let canvas = $(`<canvas id="${this.Identity}" class="SignCanvas" style="width:100%;height:calc(100% - 30px)"></canvas>`);
//            this.SignaturePad = new SignaturePad(canvas[0]);


//            let container = $(`<div style="height:30px"></div>`);
//            let div = $(`<div class="pull-right"></div>`);
//            container.append(div);

//            if (this.Option.showClear) {
//                let clearButton = $(`<a class="signClear" style="margin:0 4px" href="javascript:void(0);"><span class="${this.Option.clearStyle}"></span> ${this.Option.clearCaption}</a>`);
//                clearButton.on("click", e => {
//                    this.SignaturePad.clear();
//                });
//                div.append(clearButton);
//            }
//            if (this.Option.showUndo) {
//                let undoButton = $(`<a class="signUndo" style="margin:0 4px" href="javascript:void(0);"><span class="${this.Option.undoStyle}"></span> ${this.Option.undoCaption}</a>`);
//                undoButton.on("click", e => {

//                });
//                div.append(undoButton);
//            }
//            if (this.Option.saveAction) {
//                let saveButton = $(`<a class="signSave" style="margin:0 4px" href="javascript:void(0);"><span class="${this.Option.undoStyle}"></span> ${this.Option.undoCaption}</a>`);
//                saveButton.on("click", e => {
//                    if (this.SignaturePad.isEmpty()) {
//                        alert("Please provide a signature first.");
//                    } else {
//                        let dataURL = this.SignaturePad.toDataURL();

//                    }
//                });
//                div.append(saveButton);
//            }
//            if (this.Option.showDownload) {
//                let saveButton = $(`<a class="signDownload" style="margin:0 4px" href="javascript:void(0);"><span class="${this.Option.saveStyle}"></span> ${this.Option.saveCaption}</a>`);
//                saveButton.on("click", e => {
//                    if (this.SignaturePad.isEmpty()) {
//                        alert("Please provide a signature first.");
//                    } else {
//                        let dataURL = this.SignaturePad.toDataURL();
//                        var blob = this.dataURLToBlob(dataURL);
//                    }
//                });
//                div.append(saveButton);
//            }

//            this.Element.append(canvas);
//            this.Element.append(container);
//        }
//        dataURLToBlob(dataURL) {
//            let parts = dataURL.split(';base64,');
//            let contentType = parts[0].split(":")[1];
//            let raw = window.atob(parts[1]);
//            let rawLength = raw.length;
//            let uInt8Array = new Uint8Array(rawLength);

//            for (var i = 0; i < rawLength; ++i) {
//                uInt8Array[i] = raw.charCodeAt(i);
//            }

//            return new Blob([uInt8Array], { type: contentType });
//        }
//    }

//    export interface BindingBehaviorBuilder<T> {
//        BuildSign(option: ISignOption<T>): BindingBehaviorBuilder<T>;
//    }

//    BindingBehaviorBuilder.prototype.BuildSign = function (option: ISignOption<any>) {
//        let me: BindingBehaviorBuilder<any> = this;
//        let behavior = me.Add(new Sign());
//        behavior.SetOption(option);
//        return me;
//    }
//}