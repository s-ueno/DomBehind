self.onmessage = e => {
    var arg: any = e.data;
    if (IsNullOrUndefined(arg)) return;
    if (!arg.Url) return;

    // chorme
    var callBack: Function = self.postMessage;
    if ((arg.SendType) && (arg.SendType === "GET")) {
        callBack(Get(arg.Url, arg.Request));
    } else {
        callBack(Post(arg.Url, arg.Request));
    }
}
function IsNullOrUndefined(obj: any): boolean {
    if (obj == null) return true;
    if (obj === null) return true;
    if (typeof obj === 'undefined') return true;
    return false;
}
function Post(url: string, request: any): any {
    var http = new XMLHttpRequest();
    http.open('POST', url, false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(request));
    if (http.status !== 200) {
        throw new Error(http.response);
    }
    return (http.response) ? JSON.parse(http.response) : http.response;
}
function Get(url: string, request: any): any {
    var http = new XMLHttpRequest();
    http.open('GET', url, false);
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    http.send(request);
    if (http.status !== 200) {
        throw new Error(http.response);
    }
    return http.response;
}