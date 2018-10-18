declare module LZString {
    /**
    * Encode in base64.
    */
    export function compressToBase64(input: string): string;

    /**
    * Decompress a base64 encoded string.
    */
    export function decompressFromBase64(input: string): string;

    /**
    * Encode using valid utf-16 characters.  Ideal for html5 localStorage.
    */
    export function compressToUTF16(input: string): string;

    /**
    * Decode a string compressed using the compressToUTF16 method.
    */
    export function decompressFromUTF16(input: string): string;

    /**
    * Compress.
    */
    export function compress(input: string): string;

    /**
    * Decompress.
    */
    export function decompress(input: string): string;
} 