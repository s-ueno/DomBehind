var z_indexKey = "z_indexKey";
$.GenerateZIndex = function () {
    var value = $.GetDomStorage(z_indexKey, 2000);
    var newValue = value + 1;
    $.SetDomStorage(z_indexKey, newValue);
    return newValue;
};
$.GetLocalStorage = function (key, defaultValue) {
    if (!window.localStorage.getItem(key)) {
        return defaultValue;
    }
    return JSON.parse(window.localStorage.getItem(key));
};
$.SetLocalStorage = function (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
};
$.GetSessionStorage = function (key, defaultValue) {
    if (!window.sessionStorage.getItem(key)) {
        return defaultValue;
    }
    return JSON.parse(window.sessionStorage.getItem(key));
};
$.SetSessionStorage = function (key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};
$.GetDomStorage = function (key, defaultValue) {
    var value = $("body").find("#DomStorage_" + key).val();
    if (!value) {
        return defaultValue;
    }
    return JSON.parse(value);
};
$.SetDomStorage = function (key, value) {
    if ($("body").find("#DomStorage_" + key).length === 0) {
        $("<input>", {
            type: "hidden",
            id: "DomStorage_" + key,
        }).appendTo("body");
    }
    $("body").find("#DomStorage_" + key).val(JSON.stringify(value));
};
$.SetRootUri = function (uri) {
    if (!uri)
        return;
    $.SetLocalStorage("RootUri", uri);
};
$.AbsoluteUri = function (uri) {
    var rootUri = $.GetLocalStorage("RootUri", "");
    return "" + rootUri + uri;
};
var w_dynamicPrefix = "__Framework";
$.GetWindowDynamic = function (key, defaultValue) {
    var newKey = w_dynamicPrefix + "." + key;
    return window[newKey];
};
$.SetWindowDynamic = function (key, value) {
    var newKey = w_dynamicPrefix + "." + key;
    window[newKey] = value;
};
$.fn.ValidityState = function () {
    var me = this;
    var validity = me.validity;
    if (Object.IsNullOrUndefined(validity)) {
        $.each(me, function (i, value) {
            validity = value.validity;
            if (!Object.IsNullOrUndefined(validity)) {
                return false;
            }
        });
    }
    return validity;
};
$.fn.HasError = function () {
    var me = this;
    var validity = me.ValidityState();
    return !validity.valid;
};
$.fn.SetCustomError = function (errorMessage) {
    var me = this;
    if (Object.IsNullOrUndefined(me.setCustomValidity)) {
        $.each(me, function (i, value) {
            if (!Object.IsNullOrUndefined(value.setCustomValidity)) {
                value.setCustomValidity(errorMessage);
            }
        });
    }
    else {
        me.setCustomValidity(errorMessage);
    }
};
$.fn.ClearCustomError = function () {
    var me = this;
    me.SetCustomError("");
};
$.fn.CheckValidity = function () {
    var me = this;
    var result = true;
    if (Object.IsNullOrUndefined(me.checkValidity)) {
        $.each(me, function (i, value) {
            if (!Object.IsNullOrUndefined(value.checkValidity)) {
                result = value.checkValidity();
            }
        });
    }
    else {
        result = me.checkValidity();
    }
};
$.fn.Raise = function (event) {
    var me = this;
    me.trigger(event.EventName);
};
//# sourceMappingURL=JQueryExtensions.js.map