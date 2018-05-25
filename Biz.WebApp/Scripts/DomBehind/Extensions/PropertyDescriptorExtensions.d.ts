interface String {
    /**
     * 拡張メソッドを宣言する際にprototype汚染を防止します
     */
    ExtendedPrototype(key: any, value: any): void;
}
