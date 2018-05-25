var DomBehind;
(function (DomBehind) {
    var MessageStatus;
    (function (MessageStatus) {
        MessageStatus[MessageStatus["Infomation"] = 0] = "Infomation";
        MessageStatus[MessageStatus["Warning"] = 1] = "Warning";
        MessageStatus[MessageStatus["Error"] = 2] = "Error";
    })(MessageStatus = DomBehind.MessageStatus || (DomBehind.MessageStatus = {}));
    var MessaageBox = /** @class */ (function () {
        function MessaageBox() {
        }
        MessaageBox.ShowInfomation = function (message, title) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Infomation);
        };
        MessaageBox.ShowWarning = function (message, title) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Warning);
        };
        MessaageBox.ShowError = function (message, title) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Error);
        };
        MessaageBox.ShowMessage = function (message, title, status) {
            MessaageBox.Container.ShowMessage(message, title, status);
        };
        MessaageBox.ShowYesNo = function (message, title, option) {
            MessaageBox.Container.ShowYesNo(message, title, option);
        };
        MessaageBox.ShowOkCancel = function (message, title, option) {
            MessaageBox.Container.ShowOkCancel(message, title, option);
        };
        MessaageBox.BuiltIn = function (lazy) {
            MessaageBox._lazy = lazy;
        };
        ;
        Object.defineProperty(MessaageBox, "Container", {
            get: function () {
                if (MessaageBox._container) {
                    return MessaageBox._container;
                }
                if (!MessaageBox._lazy) {
                    throw new DomBehind.Exception("メッセージ機能をビルドインしてください");
                }
                var fac = new DomBehind.TypedFactory(MessaageBox._lazy());
                MessaageBox._container = fac.CreateInstance();
                return MessaageBox._container;
            },
            enumerable: true,
            configurable: true
        });
        return MessaageBox;
    }());
    DomBehind.MessaageBox = MessaageBox;
    // デフォルトのビルトイン
    MessaageBox.BuiltIn(function () { return DefaultMessageContainer; });
    var DefaultMessageContainer = /** @class */ (function () {
        function DefaultMessageContainer() {
        }
        DefaultMessageContainer.prototype.ShowMessage = function (message, title, status) {
            // デフォルトのアラートメッセージ
            window.alert(message);
        };
        DefaultMessageContainer.prototype.ShowYesNo = function (message, title, option) {
            // window.confirm はjavascriptを止めるタイプのメッセージボックスなので、このほうが嬉しいシチュエーションの方がエンタープライズだと多いと思われる
            // 通常、JSやCSS系のFWだとjavascriptを止めないで、callbackでOK、Cancelなどを実行するが、それでも良いなら割とデザインに幅が広がる
            if (window.confirm(message)) {
                if (option && option.yesCallback) {
                    option.yesCallback();
                }
            }
            else {
                if (option && option.noCallBack) {
                    option.noCallBack();
                }
            }
        };
        DefaultMessageContainer.prototype.ShowOkCancel = function (message, title, option) {
            // window.confirm はjavascriptを止めるタイプのメッセージボックスなので、このほうが嬉しいシチュエーションの方がエンタープライズだと多いと思われる
            // 通常、JSやCSS系のFWだとjavascriptを止めないで、callbackでOK、Cancelなどを実行するが、それでも良いなら割とデザインに幅が広がる
            if (window.confirm(message)) {
                if (option && option.okCallback) {
                    option.okCallback();
                }
            }
            else {
                if (option && option.cancelCallBack) {
                    option.cancelCallBack();
                }
            }
        };
        return DefaultMessageContainer;
    }());
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=MessageBox.js.map