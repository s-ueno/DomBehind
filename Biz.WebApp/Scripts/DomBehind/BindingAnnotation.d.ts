interface JQueryStatic {
    BindingAnnotation(selector: string, resolveViewType: () => any, resolveViewModelType: () => any): JQueryPromise<any>;
}
declare class annotationCollection {
    private lazyList;
    Any(selector: string, resolveViewType: () => any, resolveViewModelType: () => any): boolean;
    Add(selector: string, resolveViewType: () => any, resolveViewModelType: () => any): void;
    Remove(selector: string, resolveViewType: () => any, resolveViewModelType: () => any): void;
    ToArray(): {
        Selector: string;
        ResolveViewType: () => any;
        ResolveViewModelType: () => any;
    }[];
    Pop(peek?: boolean): void;
}
declare var __lazyCollection: annotationCollection;
declare namespace DomBehind {
}
