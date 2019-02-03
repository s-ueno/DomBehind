declare namespace DomBehind {
    class Breadbrumb {
        Selector: string;
        constructor(Selector: string);
        static AllowLocalStorage: boolean;
        Parse(newUri: string, title: string, isRoot?: boolean): string;
        protected ParseRestUri(newUri: string, isRoot: boolean, title: string): string;
        protected ParseSessionStorage(newUri: string, isRoot: boolean, title: string): string;
        protected ToCompress(input: any): string;
        protected ToDecompress(input: string): any;
        protected static SplitQueryString(s: string): Array<{
            Key: string;
            Value: string;
        }>;
        protected static GetLocalStorage(id: string): string;
        protected static SetLocalStorage(id: string, value: string): void;
        Update(): void;
        protected BuildStack(s: string): any;
        Pop(count?: number): void;
    }
}
