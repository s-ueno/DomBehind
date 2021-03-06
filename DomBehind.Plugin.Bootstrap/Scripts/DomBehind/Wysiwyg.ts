﻿namespace DomBehind {

    export class Wysiwyg {

        public static HtmlProperty: Data.DependencyProperty =
            Data.DependencyProperty.RegisterAttached("html",
                (el: JQuery) => {
                    return el.html();
                },
                (el, newValue) => {
                    el.html(newValue);
                },
                Data.UpdateSourceTrigger.LostForcus,
                Data.BindingMode.TwoWay);

        public static TextProperty: Data.DependencyProperty =
            Data.DependencyProperty.RegisterAttached("text",
                (el: JQuery) => {
                    return el.text();
                },
                (el, newValue) => {
                    el.text(newValue);
                },
                Data.UpdateSourceTrigger.LostForcus,
                Data.BindingMode.TwoWay);

        public static readonly toolBarHtml: string = `` +
            `<div class="btn-toolbar editor" data-role="editor-toolbar" data-target="#@Id">` +
            `  <div class="btn-group">` +
            `    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font Size" aria-expanded="false">` +
            `      <i class="fa fa-text-height"></i>&nbsp;` +
            `      <b class="caret"></b>` +
            `    </a>` +
            `    <ul class="dropdown-menu">` +
            `      <li>` +
            `        <a data-edit="fontSize 5" class="">` +
            `          <p style="font-size:17px">Huge</p>` +
            `        </a>` +
            `      </li>` +
            `      <li>` +
            `        <a data-edit="fontSize 3" class="">` +
            `          <p style="font-size:14px">Normal</p>` +
            `        </a>` +
            `      </li>` +
            `      <li>` +
            `        <a data-edit="fontSize 1">` +
            `          <p style="font-size:11px">Small</p>` +
            `        </a>` +
            `      </li>` +
            `    </ul>` +
            `  </div>` +
            `  <div class="btn-group">` +
            `    <a class="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)">` +
            `      <i class="fa fa-bold"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)">` +
            `      <i class="fa fa-italic"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="strikethrough" title="Strikethrough">` +
            `      <i class="fa fa-strikethrough"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)">` +
            `      <i class="fa fa-underline"></i>` +
            `    </a>` +
            `  </div>` +
            `  <div class="btn-group">` +
            `    <a class="btn" data-edit="insertunorderedlist" title="Bullet list">` +
            `      <i class="fa fa-list-ul"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="insertorderedlist" title="Number list">` +
            `      <i class="fa fa-list-ol"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)">` +
            `      <i class="fa fa-dedent"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="indent" title="Indent (Tab)">` +
            `      <i class="fa fa-indent"></i>` +
            `    </a>` +
            `  </div>` +
            `  <div class="btn-group">` +
            `    <a class="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)">` +
            `      <i class="fa fa-align-left"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)">` +
            `      <i class="fa fa-align-center"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)">` +
            `      <i class="fa fa-align-right"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)">` +
            `      <i class="fa fa-align-justify"></i>` +
            `    </a>` +
            `  </div>` +
            `  <div class="btn-group">` +
            `    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink">` +
            `      <i class="fa fa-link"></i>` +
            `    </a>` +
            `    <div class="dropdown-menu input-append">` +
            `      <input class="span2" placeholder="URL" type="text" data-edit="createLink">` +
            `      <button class="btn" type="button">Add</button>` +
            `    </div>` +
            `    <a class="btn" data-edit="unlink" title="Remove Hyperlink">` +
            `      <i class="fa fa-cut"></i>` +
            `    </a>` +
            `  </div>` +
            `  <div class="btn-group">` +
            `    <a class="btn" title="Insert picture (or just drag &amp; drop)" id="@pictureBtnId">` +
            `      <i class="fa fa-picture-o"></i>` +
            `    </a>` +
            `    <input type="file" data-role="magic-overlay" data-target="#@pictureBtnId" data-edit="insertImage">` +
            `  </div>` +
            `  <div class="btn-group">` +
            `    <a class="btn" data-edit="undo" title="Undo (Ctrl/Cmd+Z)">` +
            `      <i class="fa fa-undo"></i>` +
            `    </a>` +
            `    <a class="btn" data-edit="redo" title="Redo (Ctrl/Cmd+Y)">` +
            `      <i class="fa fa-repeat"></i>` +
            `    </a>` +
            `  </div>` +
            `</div>` +
            ``;
    }


    export interface BindingBehaviorBuilder<T> {
        BuildEditor(html: (x: T) => string, str?: (x: T) => string): BindingBehaviorBuilder<T>;
    }
    BindingBehaviorBuilder.prototype.BuildEditor = function (html: (x: any) => string, str: (x: any) => string): BindingBehaviorBuilder<any> {
        let me: BindingBehaviorBuilder<any> = this;
        try {
            let el = me.CurrentElement;
            let id = el.attr("id");
            if (!id) {
                id = `id-${NewUid()}`;
            }
            let toolBarString = Wysiwyg.toolBarHtml
                .Replace("@Id", id)
                .Replace("@pictureBtnId", `id-${NewUid()}`)
                .Replace("@voiceBtnId", `id-${NewUid()}`);

            let tb = $(toolBarString);
            el.before(tb);
            tb.find(".dropdown-toggle").dropdown();


            el.wysiwyg({
                toolbarSelector: '[data-target="#' + id + '"]',
            });


            //tb.find('[data-toggle="dropdown"]').each((i, el) => {
            //    let parent = $(el.parentElement)
            //    if (parent.hasClass("btn-group")) {
            //        parent.click(e => {
            //            let a = $(e.target);
            //            let me = a.closest("div.btn-group");
            //            me.toggleClass("open");
            //        });
            //    }
            //});


            if (html) {
                let behavior = me.Add(new Data.DataBindingBehavior());
                behavior.Property = Wysiwyg.HtmlProperty;
                behavior.PInfo = new LamdaExpression(me.Owner.DataContext, html);
            }

            if (str) {
                let behavior = me.Add(new Data.DataBindingBehavior());
                behavior.Property = Wysiwyg.TextProperty;
                behavior.PInfo = new LamdaExpression(me.Owner.DataContext, str);
            }
        } catch (e) {
            console.error(e);
        }
        return me;
    }
}
