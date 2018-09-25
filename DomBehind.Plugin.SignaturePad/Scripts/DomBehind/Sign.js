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
                };
            },
            enumerable: true,
            configurable: true
        });
        Sign.prototype.Ensure = function () {
            this.Identity = this.Element.attr("id");
            if (!this.Identity) {
                this.Identity = "id-" + NewUid();
                this.Element.attr("id", this.Identity);
            }
            window[this.Identity] = this;
            var dom = $("<canvas class=\"SignCanvas\" style=\"width:100%;height:100%\"></canvas>");
            this.Element.append(dom);
            this.Canvas = dom[0];
            this.SignaturePad = new SignaturePad(this.Canvas);
            this.Refresh();
            this.Resize();
        };
        Sign.prototype.CreateImageToBlob = function () {
            return this.CreateImage(true);
        };
        Sign.prototype.CreateImageToArray = function () {
            var array = this.CreateImage(false);
            return array;
        };
        Sign.prototype.CreateImage = function (isBlob) {
            if (this.SignaturePad.isEmpty())
                return null;
            var mine = null;
            if (this.Option.image === SignSaveImage.Jpeg) {
                mine = "image/jpeg";
            }
            else if (this.Option.image === SignSaveImage.Svg) {
                mine = "image/svg+xml";
            }
            var sig = this.SignaturePad;
            var uri = sig.toDataURL(mine);
            if (isBlob)
                return this.ToBlob(uri);
            var array = this.ToArray(uri);
            return [].slice.call(array);
        };
        Sign.prototype.Download = function (fileName) {
            if (this.SignaturePad.isEmpty())
                return;
            var mine = null;
            if (this.Option.image === SignSaveImage.Jpeg) {
                mine = "image/jpeg";
            }
            else if (this.Option.image === SignSaveImage.Svg) {
                mine = "image/svg+xml";
            }
            var sig = this.SignaturePad;
            var uri = sig.toDataURL(mine);
            var bytes = this.ToBlob(uri);
            this.DownloadRaw(fileName, bytes);
        };
        Sign.prototype.ToBlob = function (dataURL) {
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
        Sign.prototype.ToArray = function (dataURL) {
            var parts = dataURL.split(';base64,');
            var contentType = parts[0].split(":")[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;
            var uInt8Array = new Uint8Array(rawLength);
            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return uInt8Array;
        };
        Sign.prototype.DownloadRaw = function (fileName, bytes) {
            var newUri = window.URL.createObjectURL(bytes);
            if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
                window.open(newUri);
            }
            else {
                var a = document.createElement("a");
                a.style.display = "none";
                a.href = newUri;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(newUri);
                a.remove();
            }
        };
        Sign.prototype.Refresh = function () {
            if (!this.DataContext || this.DataContext._disposed) {
                return;
            }
            var ratio = Math.max(window.devicePixelRatio || 1, 1);
            this.Canvas.width = this.Canvas.offsetWidth * ratio;
            this.Canvas.height = this.Canvas.offsetHeight * ratio;
            this.Canvas.getContext("2d").scale(ratio, ratio);
            this.SignaturePad.clear();
        };
        Sign.prototype.Resize = function () {
            var _this = this;
            var timer;
            $(window).on("resize", function (e) {
                if (timer !== false) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {
                    _this.Refresh();
                }, 200);
            });
        };
        Sign.InstanceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("Instance", function (el) {
            var identity = el.attr("id");
            if (!identity) {
                return null;
            }
            var me = window[identity];
            return me;
        }, function (el, newValue) {
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
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
