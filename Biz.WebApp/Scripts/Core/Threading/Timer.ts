self.onmessage = e => {
    duration = e.data;
    if (!duration) return;

    begin = new Date().getTime();
    Start();
}

var begin: number
var duration: number;
function Start() {
    var allow: boolean = true;
    while (allow) {
        var now = new Date().getTime();
        var end = begin + duration;
        allow = now < end;
    }
    // chorme
    var callBack: Function = self.postMessage;
    callBack("complete");
}
