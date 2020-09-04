var DomBehind;
(function (DomBehind) {
    let SignSaveImage;
    (function (SignSaveImage) {
        SignSaveImage[SignSaveImage["Png"] = 0] = "Png";
        SignSaveImage[SignSaveImage["Jpeg"] = 1] = "Jpeg";
        SignSaveImage[SignSaveImage["Svg"] = 2] = "Svg";
    })(SignSaveImage = DomBehind.SignSaveImage || (DomBehind.SignSaveImage = {}));
    class Sign extends DomBehind.Data.RelativeDataBindingBehavior {
        SetOption(option) {
            this.Option = $.extend(true, this.DefaultOption, option);
        }
        get DefaultOption() {
            return {
                image: SignSaveImage.Png,
                color: "rgb(255,255,255)",
            };
        }
        Ensure() {
            this.Identity = this.Element.attr("id");
            if (!this.Identity) {
                this.Identity = `id-${NewUid()}`;
                this.Element.attr("id", this.Identity);
            }
            window[this.Identity] = this;
            let dom = $(`<canvas class="SignCanvas" style="width:100%;height:100%"></canvas>`);
            this.Element.append(dom);
            this.Canvas = dom[0];
            this.SignaturePad = new SignaturePad(this.Canvas);
            this.Resize();
            dom.ready(() => {
                this.Refresh();
            });
        }
        CreateImageToBlob() {
            return this.CreateImage(true);
        }
        CreateImageToArray() {
            let array = this.CreateImage(false);
            return array;
        }
        CreateImage(isBlob) {
            if (this.SignaturePad.isEmpty())
                return null;
            let mine = null;
            if (this.Option.image === SignSaveImage.Jpeg) {
                mine = "image/jpeg";
            }
            else if (this.Option.image === SignSaveImage.Svg) {
                mine = "image/svg+xml";
            }
            let sig = this.SignaturePad;
            let uri = sig.toDataURL(mine);
            if (isBlob)
                return this.ToBlob(uri);
            let array = this.ToArray(uri);
            return [].slice.call(array);
        }
        Download(fileName) {
            if (this.SignaturePad.isEmpty())
                return;
            let mine = null;
            if (this.Option.image === SignSaveImage.Jpeg) {
                mine = "image/jpeg";
            }
            else if (this.Option.image === SignSaveImage.Svg) {
                mine = "image/svg+xml";
            }
            let sig = this.SignaturePad;
            let uri = sig.toDataURL(mine);
            let bytes = this.ToBlob(uri);
            this.DownloadRaw(fileName, bytes);
        }
        ToBlob(dataURL) {
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
        ToArray(dataURL) {
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
        DownloadRaw(fileName, bytes) {
            let newUri = window.URL.createObjectURL(bytes);
            if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
                window.open(newUri);
            }
            else {
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
        Refresh() {
            if (!this.DataContext || this.DataContext._disposed) {
                return;
            }
            let ratio = Math.max(window.devicePixelRatio || 1, 1);
            this.Canvas.width = this.Canvas.offsetWidth * ratio;
            this.Canvas.height = this.Canvas.offsetHeight * ratio;
            this.Canvas.getContext("2d").scale(ratio, ratio);
            this.SignaturePad.clear();
        }
        Resize() {
            let timer;
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
    Sign.InstanceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("Instance", el => {
        if (Object.IsNullOrUndefined(el)) {
            return;
        }
        let identity = el.attr("id");
        if (!identity) {
            return null;
        }
        let me = window[identity];
        return me;
    }, (el, newValue) => {
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
    DomBehind.Sign = Sign;
    class SignBindingBuilder extends DomBehind.Data.DataBindingBehaviorBuilder {
        Binding(property, bindingExpression, mode, updateTrigger) {
            let me = this;
            if (me.CurrentBehavior instanceof DomBehind.Data.RelativeDataBindingBehavior) {
                let bkBehavior = me.CurrentBehavior;
                let bkElement = me.CurrentElement;
                let behavior = me.CurrentBehavior.AddBinding(new DomBehind.Data.DataBindingBehavior(), me.CurrentSelector);
                behavior.DataContext = me.CurrentBehavior.DataContext;
                behavior.Property = property;
                behavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, bindingExpression);
                behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
                behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;
                me.CurrentBehavior = bkBehavior;
                me.CurrentElement = bkElement;
            }
            else {
                me.Binding(property, bindingExpression, mode, updateTrigger);
            }
            return me;
        }
    }
    DomBehind.SignBindingBuilder = SignBindingBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildSign = function (option) {
        let me = this;
        if (me.CurrentBehavior instanceof DomBehind.Data.RelativeDataBindingBehavior) {
            let behavior = me.CurrentBehavior.AddBinding(new Sign(), me.CurrentSelector);
            behavior.DataContext = me.CurrentBehavior.DataContext;
            behavior.Element = me.CurrentElement;
            behavior.SetOption(option);
        }
        else {
            let behavior = me.Add(new Sign());
            behavior.DataContext = me.CurrentBehavior.DataContext;
            behavior.Element = me.CurrentElement;
            behavior.SetOption(option);
        }
        let newMe = new SignBindingBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentSelector = me.CurrentSelector;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
