namespace DomBehind {

    export class Locator {
        private static _container: any[] = [];

        public static Push(ins: any) {
            Locator._container.push(ins);
        }

        public static ToArray(): any[] {
            let array: any[] = [];
            $.each(Locator._container, (i, each) => {
                array.push(each);
            });
            return array;
        }

        public static List<T>(typeT: new (...params: any[]) => T, predicate?: (obj: T) => boolean): T[] {
            let array: T[] = [];
            $.each(Locator._container, (i, each) => {
                if (each instanceof typeT) {
                    if (!predicate) {
                        array.push(each);
                    } else if (predicate(each)) {
                        array.push(each);
                    }
                }
            });
            return array;
        }

        public static First<T>(typeT: new (...params: any[]) => T, predicate?: (obj: T) => boolean): T {
            let result: T;
            $.each(Locator._container, (i, each) => {
                if (each instanceof typeT) {
                    if (!predicate) {
                        result = each;
                        return false;
                    } else if (predicate(each)) {
                        result = each;
                        return false;
                    }
                }
            });
            return result;
        }

        public static Remove<T>(typeT: new (...params: any[]) => T, predicate?: (obj: T) => boolean) {
            let array: any[] = [];
            $.each(Locator._container, (i, each) => {
                if (each instanceof typeT) {
                    if (!(!predicate || predicate(each))) {
                        array.push(each);
                    }
                } else {
                    array.push(each);
                }
            });
            Locator._container = array;
        }

        public static Clear() {
            Locator._container = [];
        }

    }
}

