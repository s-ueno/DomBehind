namespace DomBehind {

    export enum SignSaveImage {
        Png, Jpeg, Svg
    }
    export interface ISignOption<T> {
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

    export class Sign extends Data.BindingBehavior {

        protected Option: ISignOption<any>;
        public SetOption(option: ISignOption<any>) {
            this.Option = $.extend(true, this.DefaultOption, option);
        }
        protected get DefaultOption(): ISignOption<any> {
            return {
                image: SignSaveImage.Png,
                color: "rgb(255,255,255)",

                showClear: true,
                clearCaption: " Clear",
                clearStyle: "fa fa-remove",

                showUndo: true,
                undoCaption: " Undo",
                undoStyle: "fa fa-undo",

                showDownload: true,
                downloadCaption: " Download",
                downloadStyle: "fa fa-download",

                saveCaption: " Save",
                saveStyle: "fa fa-save",
            };
        }

        public Identity: string;
        public Ensure(): void {

            this.Identity = `id-${NewUid()}`;

            let canvas = $(`<canvas id="${this.Identity}" class="SignCanvas" style="width:100%;height:calc(100% - 30px)"></canvas>`);



            let container = $(`<div style="height:30px"></div>`);
            let div = $(`<div class="pull-left"></div>`);
            if (this.Option.showClear) {
                let clearButton = $(`<a class="signClear" style="margin:0 4px" href="javascript:void(0);"><span class="${this.Option.clearStyle}"></span> ${this.Option.clearCaption}</a>`);
                clearButton.on("click", e => {

                });
            }

        }

    }

    export interface BindingBehaviorBuilder<T> {
        BuildSign(option: ISignOption<T>): BindingBehaviorBuilder<T>;
    }

    BindingBehaviorBuilder.prototype.BuildSign = function (option: ISignOption<any>) {
        let me: BindingBehaviorBuilder<any> = this;
        let behavior = me.Add(new Sign());
        behavior.SetOption(option);
        return me;
    }
}