declare module collections {
    interface ICompareFunction<T> {
        (a: T, b: T): number;
    }
    interface IEqualsFunction<T> {
        (a: T, b: T): boolean;
    }
    interface ILoopFunction<T> {
        (a: T): boolean;
    }
    function defaultCompare<T>(a: T, b: T): number;
    function defaultEquals<T>(a: T, b: T): boolean;
    function defaultToString(item: any): string;
    function makeString<T>(item: T, join?: string): string;
    function isFunction(func: any): boolean;
    function isUndefined(obj: any): boolean;
    function isString(obj: any): boolean;
    function reverseCompareFunction<T>(compareFunction: ICompareFunction<T>): ICompareFunction<T>;
    function compareToEquals<T>(compareFunction: ICompareFunction<T>): IEqualsFunction<T>;
    module arrays {
        function indexOf<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number;
        function lastIndexOf<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number;
        function contains<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): boolean;
        function remove<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): boolean;
        function frequency<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number;
        function equals<T>(array1: T[], array2: T[], equalsFunction?: collections.IEqualsFunction<T>): boolean;
        function copy<T>(array: T[]): T[];
        function swap<T>(array: T[], i: number, j: number): boolean;
        function toString<T>(array: T[]): string;
        function forEach<T>(array: T[], callback: (item: T) => boolean): void;
    }
    interface ILinkedListNode<T> {
        element: T;
        next: ILinkedListNode<T>;
    }
    class LinkedList<T> {
        firstNode: ILinkedListNode<T>;
        private lastNode;
        private nElements;
        constructor();
        add(item: T, index?: number): boolean;
        first(): T;
        last(): T;
        elementAtIndex(index: number): T;
        indexOf(item: T, equalsFunction?: IEqualsFunction<T>): number;
        contains(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        remove(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        clear(): void;
        equals(other: LinkedList<T>, equalsFunction?: IEqualsFunction<T>): boolean;
        private equalsAux;
        removeElementAtIndex(index: number): T;
        forEach(callback: (item: T) => boolean): void;
        reverse(): void;
        toArray(): T[];
        size(): number;
        isEmpty(): boolean;
        toString(): string;
        private nodeAtIndex;
        private createNode;
    }
    interface IDictionaryPair<K, V> {
        key: K;
        value: V;
    }
    class Dictionary<K, V> {
        protected table: {
            [key: string]: IDictionaryPair<K, V>;
        };
        protected nElements: number;
        protected toStr: (key: K) => string;
        constructor(toStrFunction?: (key: K) => string);
        getValue(key: K): V;
        setValue(key: K, value: V): V;
        remove(key: K): V;
        keys(): K[];
        values(): V[];
        forEach(callback: (key: K, value: V) => any): void;
        containsKey(key: K): boolean;
        clear(): void;
        size(): number;
        isEmpty(): boolean;
        toString(): string;
    }
    class LinkedDictionary<K, V> extends Dictionary<K, V> {
        private head;
        private tail;
        constructor(toStrFunction?: (key: K) => string);
        private appendToTail;
        private getLinkedDictionaryPair;
        getValue(key: K): V;
        remove(key: K): V;
        clear(): void;
        private replace;
        setValue(key: K, value: V): V;
        keys(): K[];
        values(): V[];
        forEach(callback: (key: K, value: V) => any): void;
    }
    class MultiDictionary<K, V> {
        private dict;
        private equalsF;
        private allowDuplicate;
        constructor(toStrFunction?: (key: K) => string, valuesEqualsFunction?: IEqualsFunction<V>, allowDuplicateValues?: boolean);
        getValue(key: K): V[];
        setValue(key: K, value: V): boolean;
        remove(key: K, value?: V): boolean;
        keys(): K[];
        values(): V[];
        containsKey(key: K): boolean;
        clear(): void;
        size(): number;
        isEmpty(): boolean;
    }
    class Heap<T> {
        private data;
        private compare;
        constructor(compareFunction?: ICompareFunction<T>);
        private leftChildIndex;
        private rightChildIndex;
        private parentIndex;
        private minIndex;
        private siftUp;
        private siftDown;
        peek(): T;
        add(element: T): boolean;
        removeRoot(): T;
        contains(element: T): boolean;
        size(): number;
        isEmpty(): boolean;
        clear(): void;
        forEach(callback: (item: T) => boolean): void;
    }
    class Stack<T> {
        private list;
        constructor();
        push(elem: T): boolean;
        add(elem: T): boolean;
        pop(): T;
        peek(): T;
        size(): number;
        contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
        isEmpty(): boolean;
        clear(): void;
        forEach(callback: ILoopFunction<T>): void;
    }
    class Queue<T> {
        private list;
        constructor();
        enqueue(elem: T): boolean;
        add(elem: T): boolean;
        dequeue(): T;
        peek(): T;
        size(): number;
        contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
        isEmpty(): boolean;
        clear(): void;
        forEach(callback: ILoopFunction<T>): void;
    }
    class PriorityQueue<T> {
        private heap;
        constructor(compareFunction?: ICompareFunction<T>);
        enqueue(element: T): boolean;
        add(element: T): boolean;
        dequeue(): T;
        peek(): T;
        contains(element: T): boolean;
        isEmpty(): boolean;
        size(): number;
        clear(): void;
        forEach(callback: ILoopFunction<T>): void;
    }
    class Set<T> {
        private dictionary;
        constructor(toStringFunction?: (item: T) => string);
        contains(element: T): boolean;
        add(element: T): boolean;
        intersection(otherSet: Set<T>): void;
        union(otherSet: Set<T>): void;
        difference(otherSet: Set<T>): void;
        isSubsetOf(otherSet: Set<T>): boolean;
        remove(element: T): boolean;
        forEach(callback: ILoopFunction<T>): void;
        toArray(): T[];
        isEmpty(): boolean;
        size(): number;
        clear(): void;
        toString(): string;
    }
    class Bag<T> {
        private toStrF;
        private dictionary;
        private nElements;
        constructor(toStrFunction?: (item: T) => string);
        add(element: T, nCopies?: number): boolean;
        count(element: T): number;
        contains(element: T): boolean;
        remove(element: T, nCopies?: number): boolean;
        toArray(): T[];
        toSet(): Set<T>;
        forEach(callback: ILoopFunction<T>): void;
        size(): number;
        isEmpty(): boolean;
        clear(): void;
    }
    class BSTree<T> {
        private root;
        private compare;
        private nElements;
        constructor(compareFunction?: ICompareFunction<T>);
        add(element: T): boolean;
        clear(): void;
        isEmpty(): boolean;
        size(): number;
        contains(element: T): boolean;
        remove(element: T): boolean;
        inorderTraversal(callback: ILoopFunction<T>): void;
        preorderTraversal(callback: ILoopFunction<T>): void;
        postorderTraversal(callback: ILoopFunction<T>): void;
        levelTraversal(callback: ILoopFunction<T>): void;
        minimum(): T;
        maximum(): T;
        forEach(callback: ILoopFunction<T>): void;
        toArray(): T[];
        height(): number;
        private searchNode;
        private transplant;
        private removeNode;
        private inorderTraversalAux;
        private levelTraversalAux;
        private preorderTraversalAux;
        private postorderTraversalAux;
        private minimumAux;
        private maximumAux;
        private heightAux;
        private insertNode;
        private createNode;
    }
}
