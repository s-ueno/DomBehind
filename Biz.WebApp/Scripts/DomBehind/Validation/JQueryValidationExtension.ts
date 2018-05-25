// デフォルトポリシーの上書き
$.validator.setDefaults({
    ignore: "",
    errorPlacement: function (error, element) {
        let id = element.attr("id");
        if (id) {
            let pre = element.prevAll(`[for="${id}"]`);
            if (pre.length != 0) {
                error.insertAfter(pre);
            }

            let post = element.nextAll(`[for="${id}"]`);
            if (post.length != 0) {
                error.insertAfter(post);

            }

            // 直近のFormからツリー検索
            let form = element.closest("form");
            let closet = form.find(`[for="${id}"]`);
            if (closet.length != 0) {
                error.insertAfter(closet);
            }

            // エラー項目が明示的に指定していない場合は、デフォルトのエラー挿入に従う
            if (pre.length === 0 && post.length === 0 && closet.length === 0) {
                error.insertAfter(element);
            }
        }
    }


    // 上述の errorPlacement をコメントアウトして、下記を復帰するとポップアップスタイルのValidationが有効化する
    //,
    //showErrors: function (errorMap, errorList) {
    //    $.each(this.successList, function (index, value) {
    //        $(value).popover('hide');
    //    });
    //    $.each(errorList, function (index, value) {
    //        var _popover = $(value.element).popover({
    //            trigger: 'manual',
    //            placement: 'auto right',
    //            content: value.message,
    //            template: "<div class='popover popover-validation' role='tooltip'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div></div>"
    //        });
    //        _popover.data('bs.popover').options.content = value.message; // popover要素のテキストを更新する
    //        $(value.element).popover('show');
    //    });
    //}
});


namespace DomBehind {

    export interface BizView {
        DependencyValidate(mark?: string);
        DependencyValidateSetup();
        DependencyValidateClear(mark?: string);
    }

    BizView.prototype.DependencyValidateSetup = function () {
        let me: BizView = this;
        let container: JQuery = me.Container;
        if (!container) {
            return;
        }
        if (!container.is("form")) {
            container = container.find("form");
        }
        if (container.length == 0) {
            container = container.closest("form");
        }
        if (container.length == 0) return;

        // name 属性、classに一意なIDを付与する
        $.each(me.BindingBehaviors.ListDataBindingBehavior(), (i, behavior) => {

            $.each(behavior.BindingPolicy.Validators.toArray(), (k, validator) => {
                let el = behavior.Element;

                let identity = el.attr("identity");
                if (!el.attr("identity")) {
                    identity = NewUid().Replace("-", "");
                    el.attr("identity", identity);
                }


                let cls = `cls-${identity}`;
                if (!el.hasClass(cls)) {
                    el.addClass(cls);
                }

                // Jquery validatorの実装上、Name属性がない場合はエラー項目名が一意にならない
                let name = el.attr("name");
                if (String.IsNullOrWhiteSpace(name)) {
                    el.attr("name", `name-${identity}`);
                }

                let funcName = `func-${identity}`;

                // なぜか、jQuery.Validationの 1.11.1 だと ルート指定がcls名じゃないんだけど
                // js追っていくとそうなっているので暫定。もしかしたら、
                //let o = JSON.parse(`{ "${cls}": { "${funcName}": true } }`);
                let o = JSON.parse(`{ "${funcName}": { "${funcName}": true }  }`);
                $.validator.addClassRules(cls, o);

                if (validator instanceof DomBehind.Validation.RequiredValidator) {
                    let requiredFunc: any = $.validator.methods.required;
                    if (validator.Message) {
                        $.validator.addMethod(`${funcName}`, requiredFunc, validator.Message);
                    } else {
                        $.validator.addMethod(`${funcName}`, requiredFunc, "必須項目です");
                    }
                }
            });
        });



    };

    BizView.prototype.DependencyValidate = function (mark?: string) {
        let me: BizView = this;
        let container: JQuery = me.Container;
        if (!container) {
            return;
        }
        if (!container.is("form")) {
            container = container.find("form");
        }
        if (container.length == 0) {
            container = container.closest("form");
        }
        if (container.length == 0) return;

        $.each(me.BindingBehaviors.ListDataBindingBehavior(mark), (i, behavior) => {
            $.each(behavior.BindingPolicy.Validators.toArray(), (k, validator) => {

                let el = behavior.Element;
                if (validator instanceof DomBehind.Validation.RequiredValidator) {
                    // HTML5 の required バリデーションが上書きするので、JqueryValidation使う場合は削除する
                    if (el.attr(validator.Attribute)) {
                        el.removeAttr(validator.Attribute);
                    }
                }

                el.valid();

            });
        });

        // デバックしやすいように...
        // let result = container.valid();
        // return result;
    };

    BizView.prototype.DependencyValidateClear = function (mark?: string) {
        let me: BizView = this;
        let container: JQuery = me.Container;
        if (!container) {
            return;
        }
        if (!container.is("form")) {
            container = container.find("form");
        }
        if (container.length == 0) {
            container = container.closest("form");
        }
        if (container.length == 0) return;

        let jqueryValidator = container.validate();
        if (jqueryValidator) {
            jqueryValidator.resetForm();
        }
    }
}
