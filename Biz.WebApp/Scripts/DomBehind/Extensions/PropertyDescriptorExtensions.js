;
Object.defineProperty(String.prototype, "ExtendedPrototype", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (key, value) {
        var me = this;
        Object.defineProperty(key, me, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: value
        });
    }
});
//# sourceMappingURL=PropertyDescriptorExtensions.js.map