interface ObjectConstructor {
    IsNullOrUndefined(obj: any): boolean;
    IsPromise(obj: any): boolean;
    NameOf(name: any): string;
}
