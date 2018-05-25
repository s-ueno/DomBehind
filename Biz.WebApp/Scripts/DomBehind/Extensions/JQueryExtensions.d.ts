interface JQueryStatic {
    GenerateZIndex(): number;
    GetLocalStorage<T>(key: string, defaultValue?: T): T;
    SetLocalStorage(key: string, value: any): void;
    GetSessionStorage<T>(key: string, defaultValue?: T): T;
    SetSessionStorage<T>(key: string, value: T): void;
    GetDomStorage<T>(key: string, defaultValue?: T): T;
    SetDomStorage<T>(key: string, value: T): void;
    GetWindowDynamic<T>(key: string, defaultValue?: T): T;
    SetWindowDynamic<T>(key: string, value?: T): any;
    SetRootUri(uri: string): void;
    AbsoluteUri(uri: string): string;
}
declare const z_indexKey: string;
declare const w_dynamicPrefix: string;
interface JQuery {
    ValidityState(): ValidityState;
    HasError(): boolean;
    SetCustomError(errorMessage: string): void;
    ClearCustomError(): void;
    CheckValidity(allChildren?: boolean): void;
    Raise(event: DomBehind.IEventBuilder): void;
}
