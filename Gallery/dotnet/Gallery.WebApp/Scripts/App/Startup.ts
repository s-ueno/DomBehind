
Gallery.WebApp.App.Resolve();

window.onbeforeunload = function (e) {
    let canceledEventArgs = { canceled: false, message: "" };

    Gallery.WebApp.AppMediator.WindowClosing.Raise(this, canceledEventArgs);
    if (canceledEventArgs.canceled) {
        return e.returnValue = canceledEventArgs.message;
    }


}

function NameOf<T>(exp: (x: T) => any): string {
    return DomBehind.LamdaExpression.Path(exp);
}

/**
 * ダイアログ系の画面はクエリ文字列をlocationから判断できないので、遷移時のパラメーターをセッションとして持っている
 * 次にダイアログから戻った場合は正しく前のクエリ文字列に復元しなければならないので、ここでそれを吸収する
 * @param func
 */
function PutbackQueryString(func: Function) {
    let s = $.GetSessionStorage("QueryString", "");
    let result = func();
    if (Object.IsPromise(result)) {
        let pms: JQueryPromise<any> = result;
        return pms.always(() => {
            $.SetSessionStorage("QueryString", s);
        });
    }

    $.SetSessionStorage("QueryString", s);
    return result;
}