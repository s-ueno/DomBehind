namespace DomBehind {

    export interface BindingBehaviorBuilder<T> {
        Scrolling(): BindingBehaviorBuilder<T>;
        SlideAnimation(): BindingBehaviorBuilder<T>;
    }

    BindingBehaviorBuilder.prototype.Scrolling = function () {
        let me: BindingBehaviorBuilder<any> = this;
        me.CurrentElement.click(e => {
            var a: any = e.target;
            var hash = a.hash;
            var offset = $(hash).offset();
            if (!offset) return;

            e.preventDefault();
            $('html, body').animate({
                scrollTop: offset.top
            }, 900, function () {
                window.location.hash = hash;
            });

        });
        return me;
    };

    BindingBehaviorBuilder.prototype.SlideAnimation = function () {
        let me: BindingBehaviorBuilder<any> = this;

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
}

