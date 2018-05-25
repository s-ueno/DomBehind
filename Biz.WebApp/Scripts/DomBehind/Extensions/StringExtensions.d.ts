interface StringConstructor {
    IsNullOrEmpty(str: string): boolean;
    IsNullOrWhiteSpace(str: string): boolean;
    Split(value: string, separator: string): string[];
}
declare enum StringSplitOptions {
    None = 0,
    RemoveEmptyEntries = 1,
}
interface String {
    Split(separator: string, option?: StringSplitOptions): string[];
    Escape(): string;
    UnEscape(): string;
    Replace(searchValue: string, replaceValue: string): string;
}
