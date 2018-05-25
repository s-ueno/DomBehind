interface String {

    /**
     * 拡張メソッドを宣言する際にprototype汚染を防止します
     */
    ExtendedPrototype(key: any, value: any): void;
};


Object.defineProperty(String.prototype, "ExtendedPrototype", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (key: any, value: any) {
        let me: string = this;
        Object.defineProperty(key, me, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: value
        });
    }
});
