declare namespace DomBehind {
    class Repository {
        private static contextList;
        static AddService(context: string, getType: () => any, priority?: number): void;
        static RemoveService(context: string): void;
        static GetService<T>(context: string): T;
        static CreateInstance<T>(resolveType: () => any): {};
    }
}
