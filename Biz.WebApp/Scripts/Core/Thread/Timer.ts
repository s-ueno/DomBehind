self.onmessage = e => {
    var arg: any = e.data;
    if (!arg) return;

    var message = arg.Message;

    if (message === "Start") {
        begin = new Date().getTime();
        duration = arg.Duration;
        Start();
    } else if (message === "Reset") {
        begin = new Date().getTime();
    } else if (message === "Break") {
        notifyBreak = true;
    }
}

var begin: number
var duration: number;
var notifyBreak: boolean = false;
function Start() {
    var allow: boolean = true;
    while (allow) {
        // ui thread queue for onmmessage 
        setTimeout(() => {
            var now = new Date().getTime();
            var end = begin + duration;
            allow = now < end;
        }, 1);

        if (notifyBreak) return;
    }
    // chorme
    var callBack: Function = self.postMessage;
    callBack("complete");
}
