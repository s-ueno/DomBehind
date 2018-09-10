namespace Biz.WebApp.Shared {
    import UIElement = DomBehind.UIElement;

    export class LayoutView extends DomBehind.BizView {

        public BuildBinding(): void {
            let builder = this.CreateBindingBuilder<LayoutViewModel>();

            // バインドしない、直DOM操作は、コードビハインド上でインラインコード
            builder.Element("#menu_toggle")
                .BindingAction(UIElement.Click, x => {
                    let body = $("body");
                    let sidebar = $("#sidebar-menu");
                    if (body.hasClass("nav-md")) {
                        sidebar.find('li.active ul').hide();
                        sidebar.find('li.active').addClass('active-sm').removeClass('active');
                    } else {
                        sidebar.find('li.active-sm ul').show();
                        sidebar.find('li.active-sm').addClass('active').removeClass('active-sm');
                    }
                    body.toggleClass('nav-md nav-sm');
                });


            // バインドしない、直DOM操作はインラインコード
            builder.Element("#sidebar-menu a")
                .BindingAction(UIElement.Click, (x, e: JQueryEventObject) => {
                    let me = $(e.target);
                    let li = me.parent();
                    let sideMenu = $("#sidebar-menu");
                    let body = $("body");
                    if (li.is('.active')) {
                        li.removeClass('active active-sm');
                    } else {

                        // prevent closing menu if we are on child menu
                        if (!li.parent().is('.child_menu')) {
                            sideMenu.find('li').removeClass('active active-sm');
                            sideMenu.find('li ul').slideUp();
                        } else {
                            if (body.is(".nav-sm")) {
                                li.parent().find("li").removeClass("active active-sm");
                                li.parent().find("li ul").slideUp();
                            }
                        }
                        li.addClass('active');
                        $('ul:first', li).slideDown();
                    }
                });


        }
    }
}