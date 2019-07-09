declare interface QRCode {
    binaryData: number[];
    data: string;
    chunks: decoder.decodeData.Chunks;
    location: {
        topRightCorner: locator.Point;
        topLeftCorner: locator.Point;
        bottomRightCorner: locator.Point;
        bottomLeftCorner: locator.Point;
        topRightFinderPattern: locator.Point;
        topLeftFinderPattern: locator.Point;
        bottomLeftFinderPattern: locator.Point;
        bottomRightAlignmentPattern?: locator.Point;
    };
}
declare interface Options {
    inversionAttempts?: "dontInvert" | "onlyInvert" | "attemptBoth" | "invertFirst";
}
declare function jsQR(data: Uint8ClampedArray, width: number, height: number, providedOptions?: Options): QRCode | null;

declare class BitMatrix {
    static createEmpty(width: number, height: number): BitMatrix;
    width: number;
    height: number;
    private data;
    constructor(data: Uint8ClampedArray, width: number);
    get(x: number, y: number): boolean;
    set(x: number, y: number, v: boolean): void;
    setRegion(left: number, top: number, width: number, height: number, v: boolean): void;
}

declare module locator {
    interface Point {
        x: number;
        y: number;
    }
    interface QRLocation {
        topRight: Point;
        bottomLeft: Point;
        topLeft: Point;
        alignmentPattern: Point;
        dimension: number;
    }
    function locate(matrix: BitMatrix): QRLocation;
}

declare module extractor {
    function extract(image: BitMatrix, location: locator.QRLocation): {
        matrix: BitMatrix;
        mappingFunction: (x: number, y: number) => {
            x: number;
            y: number;
        };
    };
}

declare module decoder {
    module decodeData {
        class BitStream {
            private bytes;
            private byteOffset;
            private bitOffset;
            constructor(bytes: Uint8ClampedArray);
            readBits(numBits: number): number;
            available(): number;
        }

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
        type Chunks = Array<Chunk | ByteChunk | ECIChunk>;
        interface DecodedQR {
            text: string;
            bytes: number[];
            chunks: Chunks;
        }
        enum Mode {
            Numeric = "numeric",
            Alphanumeric = "alphanumeric",
            Byte = "byte",
            Kanji = "kanji",
            ECI = "eci",
        }
        function decode(data: Uint8ClampedArray, version: number): DecodedQR;

        const shiftJISTable: {
            [key: number]: number;
        };

    }

    module reedsolomon {
        function addOrSubtractGF(a: number, b: number): number;
        class GenericGF {
            primitive: number;
            size: number;
            generatorBase: number;
            zero: GenericGFPoly;
            one: GenericGFPoly;
            private expTable;
            private logTable;
            constructor(primitive: number, size: number, genBase: number);
            multiply(a: number, b: number): number;
            inverse(a: number): number;
            buildMonomial(degree: number, coefficient: number): GenericGFPoly;
            log(a: number): number;
            exp(a: number): number;
        }

        class GenericGFPoly {
            private field;
            private coefficients;
            constructor(field: GenericGF, coefficients: Uint8ClampedArray);
            degree(): number;
            isZero(): boolean;
            getCoefficient(degree: number): number;
            addOrSubtract(other: GenericGFPoly): GenericGFPoly;
            multiply(scalar: number): GenericGFPoly;
            multiplyPoly(other: GenericGFPoly): GenericGFPoly;
            multiplyByMonomial(degree: number, coefficient: number): GenericGFPoly;
            evaluateAt(a: number): number;
        }

        function decode(bytes: number[], twoS: number): Uint8ClampedArray;

    }

    function decode(matrix: BitMatrix): decodeData.DecodedQR;

    interface Version {
        infoBits: number;
        versionNumber: number;
        alignmentPatternCenters: number[];
        errorCorrectionLevels: Array<{
            ecCodewordsPerBlock: number;
            ecBlocks: Array<{
                numBlocks: number;
                dataCodewordsPerBlock: number;
            }>;
        }>;
    }
    const VERSIONS: Version[];

}

declare module binarizer {
    function binarize(data: Uint8ClampedArray, width: number, height: number, returnInverted: boolean): {
        binarized: BitMatrix;
        inverted: BitMatrix;
    } | {
        binarized: BitMatrix;
        inverted?: undefined;
    };
}