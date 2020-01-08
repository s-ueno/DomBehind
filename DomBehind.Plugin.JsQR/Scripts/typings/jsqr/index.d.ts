interface Chunk {
    type: Mode;
    text: string;
}
interface ByteChunk {
    type: Mode.Byte | Mode.Kanji;
    bytes: number[];
}
interface ECIChunk {
    type: Mode.ECI;
    assignmentNumber: number;
}
declare type Chunks = Array<Chunk | ByteChunk | ECIChunk>;
interface DecodedQR {
    text: string;
    bytes: number[];
    chunks: Chunks;
}
declare enum Mode {
    Numeric = "numeric",
    Alphanumeric = "alphanumeric",
    Byte = "byte",
    Kanji = "kanji",
    ECI = "eci",
}
declare function decode(data: Uint8ClampedArray, version: number): DecodedQR;


interface Point {
    x: number;
    y: number;
}
interface QRCode {
    binaryData: number[];
    data: string;
    chunks: Chunks;
    location: {
        topRightCorner: Point;
        topLeftCorner: Point;
        bottomRightCorner: Point;
        bottomLeftCorner: Point;
        topRightFinderPattern: Point;
        topLeftFinderPattern: Point;
        bottomLeftFinderPattern: Point;
        bottomRightAlignmentPattern?: Point;
    };
}
interface Options {
    inversionAttempts?: "dontInvert" | "onlyInvert" | "attemptBoth" | "invertFirst";
}

interface jsQRStatic {
    (): any;
    (data: Uint8ClampedArray, width: number, height: number, providedOptions?: Options): QRCode | null;
}
declare var jsQR: jsQRStatic
