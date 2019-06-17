namespace Gallery.WebApp.Shared {
    import UIElement = DomBehind.UIElement;
    export class LayoutView extends AppBizView {
        constructor() {
            super();
            this.UpdateMenu();
        }

        BuildBinding(): void {
            let builder = this.CreateBindingBuilder<LayoutViewModel>();

            // 上部サイト名をクリックすると、サイト全体をリフレッシュする
            builder.Element(".banner_title")
                .BindingAction(UIElement.Click, x => x.Reload());
            // ログインユーザー名をバインドする
            builder.Element(".login_userName")
                .Binding(UIElement.TextProperty, x => x.UserName)
                .ConvertTarget(x => x + " さん");
            // ログインユーザー名をバインドする
            builder.Element(".header_login_userName")
                .Binding(UIElement.TextProperty, x => x.UserName)
                .BindingAction(UIElement.Click, x => {
                    $(".user-profile")[0].click();
                });

            // ハンバーガーメニューのクリックアクション
            builder.Element(".menu_toggle")
                .BindingAction(UIElement.Click, x => {
                    let body = $("body");
                    let menu = $("#sidebar-menu");
                    // 画面幅がフルサイズ表示
                    if (body.hasClass("nav-md")) {
                        menu.find("li.active ul").hide();
                        menu.find('li.active').addClass('active-sm').removeClass('active');

                        body.find('.banner_title').hide();
                    }
                    else {
                        menu.find('li.active-sm ul').show();
                        menu.find('li.active-sm').addClass('active').removeClass('active-sm');

                        body.find('.banner_title').show();
                    }
                    body.toggleClass("nav-md nav-sm");
                    // 生成済みグリッドを軒並みリフレッシュする
                    DomBehind.W2GridBindingBehavior.Refresh.Raise(this, null);
                });

            //
            builder.Element("#sidebar-menu a")
                .BindingAction(UIElement.Click, (x, e: JQueryEventObject) => {

                    let body = $("body");
                    let sidebar = $("#sidebar-menu");
                    let li = $(e.target).parent();
                    let uriIdentity = li.data("identity");
                    let title = li.find(" a").text();

                    if (!String.IsNullOrWhiteSpace(uriIdentity)) {

                        // アプリからパンくず戻す命令を受けた場合でも、明示的に宣言されたキャッシュクリアイベントを発行し
                        // サブスクライブ先でキャンセルされた場合は、パンくずの移動をキャンセルする
                        let cancelEvent: { canceled: boolean | JQueryDeferred<boolean>, additionalInfo?: any } = {
                            canceled: false
                        };

                        this.MenuClick(li, uriIdentity, title);
                    }

                    if (li.is(".active")) {
                        li.removeClass('active active-sm');
                        $('ul:first', li).slideUp();
                    }
                    else {
                        if (!li.parent().is('.child_menu')) {
                            sidebar.find('li').removeClass('active active-sm');
                            sidebar.find('li ul').slideUp();
                        }
                        else {
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

        /**
         * メニューの選択状態を更新する
         */
        protected UpdateMenu() {
            let currentViewIdentity = this.CurrentViewIdentity;

            // 選択
            let sideMenu = $('#sidebar-menu');
            let nodes = sideMenu.find("li.current-page");
            if (nodes.length !== 0) {
                $.each(nodes, (i, value) => {
                    let node = $(value);
                    if (node.data("identity")) {
                        node.removeClass('active active-sm current-page');
                    }

                });
            }

            sideMenu.find(`a[data-identity="${currentViewIdentity}"]`).parent("li").addClass('current-page');

            // ノードを開く
            sideMenu.find("li").filter(function (i, e) {
                let me = $(e);
                let identity = me.data("identity");
                return identity === currentViewIdentity;
            }).addClass('current-page').parents('ul').slideDown().parent().addClass('active');

            // 生成済みグリッドを軒並みリフレッシュする
            DomBehind.W2GridBindingBehavior.Refresh.Raise(this, null);
        }

        protected /* virtual */  MenuClick(li: JQuery, uriIdentity: string, title: string) {

            NProgress.start();

            let oldPathName = location.pathname;
            let oldDom = $($('.main > div:not([display=none])')[0]);

            if (!oldDom.hasClass('menu-cache')) {
                oldDom.addClass('menu-cache');
                oldDom.attr("data-menu-cache", oldPathName);

                oldDom.attr("data-menu-cache-id", oldDom.attr("id"));
                oldDom.removeAttr("id");
            }


            let newDom = $(`.menu-cache[data-menu-cache="/${uriIdentity}"]`);
            if (newDom.length !== 0) {
                $('.menu-cache').hide();


                this.ReplaceLocationHref(uriIdentity, title);

                newDom.attr("id", newDom.attr("data-menu-cache-id"));

                // Activateイベントを起こす
                newDom.Raise(UIElement.Activate);
                newDom.show();

                setTimeout(() => {
                    this.UpdateMenu();
                    setTimeout(() => NProgress.done(), 300);
                }, 1);

                return;
            }

            let uri = $.AbsoluteUri(uriIdentity);
            this.Get(uri).done((dom: string) => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(dom, "text/html");
                let body = $(doc.body);


                let renderSection = body.find(".main > div");
                renderSection.addClass('menu-cache');
                renderSection.attr('data-menu-cache', `/${uriIdentity}`);

                $('.menu-cache').hide();

                this.ReplaceLocationHref(uriIdentity, title);

                $(".main").append(renderSection);

                let script = body.find("script").last();
                let source = script.html();
                let s = document.createElement("script");
                s.type = "text/javascript";
                s.innerHTML = source;
                document.body.appendChild(s);

                this.UpdateMenu();
            }).fail(error => {
                // viewが取得できなかった
                console.error(error);

            }).always(() => {
                setTimeout(() => NProgress.done(), 300);
            });
        }

        protected ReplaceLocationHref(uriIdentity: string, title: string) {
            let breadbrumb = new DomBehind.Breadbrumb("#_layout .BreadcrumbContainer");
            let newUri = breadbrumb.Parse($.AbsoluteUri(uriIdentity), title, true);
            history.replaceState("", "", newUri);
            breadbrumb.Update();

            // ロケーション変更に伴い、アプリケーション上のクエリ文字列をリフレッシュする
            $.SetQueryStrings(window.location.search);

            App.Instance.LastViewTitle = title;
            App.Instance.LastViewUri = newUri;
        }

        protected Get(url: string): JQueryPromise<any> {
            let d = $.Deferred();

            $.ajax({
                type: "GET",
                url: url,
                async: true
            }).done(x => d.resolve(x)).fail(x => d.reject(x));

            return d.promise();
        }
    }

}