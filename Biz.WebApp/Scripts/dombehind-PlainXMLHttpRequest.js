self.onmessage = function (e) {
    var arg = e.data;
    if (IsNullOrUndefined(arg))
        return;
    if (!arg.Url)
        return;
    // chrome
    var callBack = self.postMessage;
    if ((arg.SendType) && (arg.SendType === "GET")) {
        callBack(Get(arg.Url, arg.Request));
    }
    else {
        callBack(Post(arg.Url, arg.Request));
    }
};
function IsNullOrUndefined(obj) {
    if (obj == null)
        return true;
    if (obj === null)
        return true;
    if (typeof obj === 'undefined')
        return true;
    return false;
}
function Post(url, request) {
    var http = new XMLHttpRequest();
    http.open('POST', url, false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(request));
    if (http.status !== 200) {
        throw new Error(http.response);
    }
    return (http.response) ? JSON.parse(http.response) : http.response;
}
function Get(url, request) {
    var http = new XMLHttpRequest();
    http.open('GET', url, false);
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    http.send(request);
    if (http.status !== 200) {
        throw new Error(http.response);
    }
    return http.response;
}
//# sourceMappingURL=dombehind-PlainXMLHttpRequest.js.map