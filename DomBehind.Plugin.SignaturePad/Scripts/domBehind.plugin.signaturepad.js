var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var SignSaveImage;
    (function (SignSaveImage) {
        SignSaveImage[SignSaveImage["Png"] = 0] = "Png";
        SignSaveImage[SignSaveImage["Jpeg"] = 1] = "Jpeg";
        SignSaveImage[SignSaveImage["Svg"] = 2] = "Svg";
    })(SignSaveImage = DomBehind.SignSaveImage || (DomBehind.SignSaveImage = {}));
    var Sign = (function (_super) {
        __extends(Sign, _super);
        function Sign() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sign.prototype.SetOption = function (option) {
            this.Option = $.extend(true, this.DefaultOption, option);
        };
        Object.defineProperty(Sign.prototype, "DefaultOption", {
            get: function () {
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
            },
            enumerable: true,
            configurable: true
        });
        Sign.prototype.Ensure = function () {
            var _this = this;
            this.Identity = "id-" + NewUid();
            var dom = $("<canvas id=\"" + this.Identity + "\" class=\"SignCanvas\" style=\"width:100%;height:calc(100% - 30px)\"></canvas>");
            var canvas = dom[0];
            this.SignaturePad = new SignaturePad(canvas);
            var container = $("<div style=\"height:30px\"></div>");
            var div = $("<div class=\"pull-right\"></div>");
            container.append(div);
            if (this.Option.showClear) {
                var clearButton = $("<a class=\"signClear\" style=\"margin:0 4px\" href=\"javascript:void(0);\"><span class=\"" + this.Option.clearStyle + "\"></span> " + this.Option.clearCaption + "</a>");
                clearButton.on("click", function (e) {
                    _this.SignaturePad.clear();
                });
                div.append(clearButton);
            }
            if (this.Option.showUndo) {
                var undoButton = $("<a class=\"signUndo\" style=\"margin:0 4px\" href=\"javascript:void(0);\"><span class=\"" + this.Option.undoStyle + "\"></span> " + this.Option.undoCaption + "</a>");
                undoButton.on("click", function (e) {
                });
                div.append(undoButton);
            }
            if (this.Option.saveAction) {
                var saveButton = $("<a class=\"signSave\" style=\"margin:0 4px\" href=\"javascript:void(0);\"><span class=\"" + this.Option.undoStyle + "\"></span> " + this.Option.undoCaption + "</a>");
                saveButton.on("click", function (e) {
                    if (_this.SignaturePad.isEmpty()) {
                        alert("Please provide a signature first.");
                    }
                    else {
                        var dataURL = _this.SignaturePad.toDataURL();
                    }
                });
                div.append(saveButton);
            }
            if (this.Option.showDownload) {
                var saveButton = $("<a class=\"signDownload\" style=\"margin:0 4px\" href=\"javascript:void(0);\"><span class=\"" + this.Option.saveStyle + "\"></span> " + this.Option.saveCaption + "</a>");
                saveButton.on("click", function (e) {
                    if (_this.SignaturePad.isEmpty()) {
                        alert("Please provide a signature first.");
                    }
                    else {
                        var dataURL = _this.SignaturePad.toDataURL();
                        var blob = _this.dataURLToBlob(dataURL);
                    }
                });
                div.append(saveButton);
            }
            this.Element.append(canvas);
            this.Element.append(container);
        };
        Sign.prototype.dataURLToBlob = function (dataURL) {
            var parts = dataURL.split(';base64,');
            var contentType = parts[0].split(":")[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;
            var uInt8Array = new Uint8Array(rawLength);
            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], { type: contentType });
        };
        return Sign;
    }(DomBehind.Data.BindingBehavior));
    DomBehind.Sign = Sign;
    DomBehind.BindingBehaviorBuilder.prototype.BuildSign = function (option) {
        var me = this;
        var behavior = me.Add(new Sign());
        behavior.SetOption(option);
        return me;
    };
})(DomBehind || (DomBehind = {}));