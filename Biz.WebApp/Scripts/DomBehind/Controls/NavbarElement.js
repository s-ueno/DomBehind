var DomBehind;
(function (DomBehind) {
    DomBehind.BindingBehaviorBuilder.prototype.Scrolling = function () {
        var me = this;
        me.CurrentElement.click(function (e) {
            var a = e.target;
            var hash = a.hash;
            var offset = $(hash).offset();
            if (!offset)
                return;
            e.preventDefault();
            $('html, body').animate({
                scrollTop: offset.top
            }, 900, function () {
                window.location.hash = hash;
            });
        });
        return me;
    };
    DomBehind.BindingBehaviorBuilder.prototype.SlideAnimation = function () {
        var me = this;
        var uiElements = me.CurrentElement;
        $(window).scroll(function () {
            uiElements.each(function () {
                var pos = $(this).offset().top;
                var winTop = $(window).scrollTop();
                if (pos < winTop + 600) {
                    $(this).addClass("slide");
                }
            });
        });
        return me;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=NavbarElement.js.map