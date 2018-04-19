// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
// https://gist.github.com/jcxplorer/823878
function NewUid(): string {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

interface IIdentity {
    __uuid?: string;
}

function ExtendIIdentity(): IIdentity {
    return { __uuid: NewUid() };
}

