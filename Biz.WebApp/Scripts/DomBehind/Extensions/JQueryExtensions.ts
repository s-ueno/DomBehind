interface JQueryStatic {

    GenerateZIndex(): number;

    GetLocalStorage<T>(key: string, defaultValue?: T): T;
    SetLocalStorage(key: string, value: any): void;

    GetSessionStorage<T>(key: string, defaultValue?: T): T;
    SetSessionStorage<T>(key: string, value: T): void;

    GetDomStorage<T>(key: string, defaultValue?: T): T;
    SetDomStorage<T>(key: string, value: T): void;

    GetWindowDynamic<T>(key: string, defaultValue?: T): T;
    SetWindowDynamic<T>(key: string, value?: T);


    SetRootUri(uri: string): void;
    GetRootUri(): string;
    AbsoluteUri(uri: string): string;
}


const z_indexKey: string = "z_indexKey";
$.GenerateZIndex = function () {
    var value = $.GetDomStorage(z_indexKey, 500)
    var newValue = value + 1;
    $.SetDomStorage(z_indexKey, newValue);
    return newValue;
}

$.GetLocalStorage = function (key: string, defaultValue?: any) {
    if (!window.localStorage.getItem(key)) {
        return defaultValue;
    }
    return JSON.parse(window.localStorage.getItem(key));
};
$.SetLocalStorage = function (key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
};

$.GetSessionStorage = function (key: string, defaultValue?: any) {
    if (!window.sessionStorage.getItem(key)) {
        return defaultValue;
    }
    return JSON.parse(window.sessionStorage.getItem(key));
};
$.SetSessionStorage = function (key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};

$.GetDomStorage = function (key: string, defaultValue?: any) {
    var value = $("body").find(`#DomStorage_${key}`).val();
    if (!value) {
        return defaultValue;
    }
    return JSON.parse(value);
};
$.SetDomStorage = function (key: string, value: any) {
    if ($("body").find(`#DomStorage_${key}`).length === 0) {
        $("<input>", {
            type: "hidden",
            id: `DomStorage_${key}`,
        }).appendTo("body");
    }

    if (Object.IsNullOrUndefined(value)) {
        let domId = `#DomStorage_${key}`;
        let dom = $(domId);
        if (dom.length !== 0) {
            dom.remove();
            return;
        }
    }
    $("body").find(`#DomStorage_${key}`).val(JSON.stringify(value));
};

$.SetRootUri = function (uri: string) {
    if (!uri) return;

    $.SetLocalStorage("RootUri", uri);
};
$.GetRootUri = function () {
    return $.GetLocalStorage("RootUri");
}

$.AbsoluteUri = function (uri: string): string {
    let rootUri = $.GetLocalStorage("RootUri", "");

    return `${rootUri}${uri}`;
};

const w_dynamicPrefix: string = "__Framework";
$.GetWindowDynamic = function (key: string, defaultValue?: any) {
    let newKey: string = `${w_dynamicPrefix}.${key}`;
    return window[newKey];
}
$.SetWindowDynamic = function (key: string, value: any) {
    let newKey: string = `${w_dynamicPrefix}.${key}`;
    window[newKey] = value;
}

interface JQuery {
    ValidityState(): ValidityState;
    HasError(): boolean;
    SetCustomError(errorMessage: string): void;
    ClearCustomError(): void;
    CheckValidity(allChildren?: boolean): void;

    Raise(event: DomBehind.IEventBuilder): void;
}

$.fn.ValidityState = function () {
    let me: any = this;
    let validity = me.validity;
    if (Object.IsNullOrUndefined(validity)) {
        $.each(me, (i, value) => {
            validity = value.validity;
            if (!Object.IsNullOrUndefined(validity)) {
                return false;
            }
        });
    }
    return validity;
};
$.fn.HasError = function () {
    let me: any = this;
    let validity = <ValidityState>me.ValidityState();
    return !validity.valid;
};
$.fn.SetCustomError = function (errorMessage: string) {
    let me: any = this;
    if (Object.IsNullOrUndefined(me.setCustomValidity)) {
        $.each(me, (i, value) => {
            if (!Object.IsNullOrUndefined(value.setCustomValidity)) {
                value.setCustomValidity(errorMessage);
            }
        });
    } else {
        me.setCustomValidity(errorMessage);
    }
};
$.fn.ClearCustomError = function () {
    let me: any = this;
    me.SetCustomError("");
};

$.fn.CheckValidity = function () {
    let me: any = this;
    let result: boolean = true;
    if (Object.IsNullOrUndefined(me.checkValidity)) {
        $.each(me, (i, value) => {
            if (!Object.IsNullOrUndefined(value.checkValidity)) {
                result = value.checkValidity();
            }
        });
    } else {
        result = me.checkValidity();
    }
};

$.fn.Raise = function (event: DomBehind.IEventBuilder) {
    let me: any = this;
    me.trigger(event.EventName);
};

