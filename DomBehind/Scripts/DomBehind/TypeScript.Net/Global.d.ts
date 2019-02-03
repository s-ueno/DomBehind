declare function NewUid(): string;
interface IIdentity {
    __uuid?: string;
}
declare function ExtendIIdentity(): IIdentity;
declare function using<T extends DomBehind.IDisposable>(resource: T, func: (resource: T) => void): void;
