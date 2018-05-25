var DomBehind;
(function (DomBehind) {
    // デフォルトのメッセージをW2UI+Bootstrapでカスタマイズする
    // MessaageBox.BuiltIn(() => MessageBox);
    var MessageBox = /** @class */ (function () {
        function MessageBox() {
        }
        MessageBox.prototype.ShowMessage = function (message, title, status) {
            //w2popup.message({
            //    title: title,
            //    width: 580,
            //    height: 350,                
            //    body: `<div class="w2ui-centered">${message}</div>`,
            //    buttons: '<button class="w2ui-btn">Ok</button>'
            //});
            w2popup.open({
                width: 580,
                height: 350,
                title: '  <div class="alert alert-success"><strong>Success!</strong> This alert box could indicate a successful or positive action.</div>',
                body: '<div class="w2ui-centered">This is text inside the popup</div>',
                buttons: '<button class="w2ui-btn" onclick="w2alert(\'alert\')">Alert</button>' +
                    '<button class="w2ui-btn" onclick="w2confirm(\'confirm\')">Confirm</button>' +
                    '<button class="w2ui-btn" onclick="counter = 0; show();">Message</button>',
                showMax: true
            });
        };
        MessageBox.prototype.ShowYesNo = function (message, title, option) {
        };
        MessageBox.prototype.ShowOkCancel = function (message, title, option) {
        };
        return MessageBox;
    }());
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=MessageBox.js.map