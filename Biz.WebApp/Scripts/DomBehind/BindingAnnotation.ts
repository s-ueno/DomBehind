interface JQueryStatic {
    BindingAnnotation(
        selector: string,
        resolveViewType: () => any,
        resolveViewModelType: () => any): JQueryPromise<any>;
    //PopAnnotation(peek?: boolean );
}

class annotationCollection {
    private lazyList: { Selector: string, ResolveViewType: () => any, ResolveViewModelType: () => any }[] = [];

    public Any(selector: string, resolveViewType: () => any, resolveViewModelType: () => any): boolean {
        return this.lazyList.Any(x =>
            x.Selector === selector &&
            x.ResolveViewType === resolveViewType &&
            x.ResolveViewModelType === resolveViewModelType
        );
    }
    public Add(selector: string, resolveViewType: () => any, resolveViewModelType: () => any) {
        this.lazyList.push({
            Selector: selector,
            ResolveViewType: resolveViewType,
            ResolveViewModelType: resolveViewModelType
        })
    }
    public Remove(selector: string, resolveViewType: () => any, resolveViewModelType: () => any) {
        let newArray: { Selector: string, ResolveViewType: () => any, ResolveViewModelType: () => any }[] = [];
        $.each(this.lazyList, (i, x) => {
            if (!(x.Selector === selector &&
                x.ResolveViewType === x.ResolveViewType &&
                x.ResolveViewModelType === x.ResolveViewModelType)) {
                newArray.push(x);
            }
        });
        this.lazyList = newArray;
    }
    public ToArray(): { Selector: string, ResolveViewType: () => any, ResolveViewModelType: () => any }[] {
        let newArray: { Selector: string, ResolveViewType: () => any, ResolveViewModelType: () => any }[] = [];
        $.each(this.lazyList, (i, x) => newArray.push(x));
        return newArray;
    }

    public Pop(peek?: boolean) {
        $.each(this.ToArray(), (i, each: { Selector: string, ResolveViewType: () => any, ResolveViewModelType: () => any }) => {
            if (!peek) {
                // 消す（ポップする）
                this.Remove(each.Selector, each.ResolveViewType, each.ResolveViewModelType);
            }
            // リトライ
            $.BindingAnnotation(each.Selector, each.ResolveViewType, each.ResolveViewModelType);
        });
    }
}

var __lazyCollection = new annotationCollection();
$.BindingAnnotation = function (selector: string, resolveViewType: () => any, resolveViewModelType: () => any) {
    let d = $.Deferred();
    let view = $(selector);

    view.ready(function (e) {
        // other page or lazy loaded
        let ele = $(selector);
        if (ele.length === 0) {
            // 未登録の場合
            if (!__lazyCollection.Any(selector, resolveViewType, resolveViewModelType)) {
                __lazyCollection.Add(selector, resolveViewType, resolveViewModelType);
            }
            d.reject();
            return;
        }

        let viewFactory = new DomBehind.TypedFactory(resolveViewType());
        let viewModelFactory = new DomBehind.TypedFactory(resolveViewModelType());

        let behavior = new DomBehind.Data.ViewViewModelBindingBehavior();
        behavior.GetView = x => <DomBehind.BizView>viewFactory.CreateInstance();
        behavior.GetViewModel = x => <DomBehind.BizViewModel>viewModelFactory.CreateInstance();
        behavior.Element = $(selector);
        behavior.Ensure();

        ele.trigger("RegisteredViewViewModel", behavior);

        d.resolve();
    });
    return d.promise();
};

//$.PopAnnotation = function (peek?: boolean) {
//    __lazyCollection.Pop(peek);
//};

namespace DomBehind {

}