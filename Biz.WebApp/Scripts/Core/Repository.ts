namespace DomBehind.Core {


    interface IContext {
        Context: string;
        GetType: () => any;
        Priority: number;
    }
    export class Repository {
        private static contextList: IContext[] = [];
        public static AddService(context: string, getType: () => any, priority: number = 0): void {
            Repository.contextList.push({ Context: context, GetType: getType, Priority: priority });
        }
        public static RemoveService(context: string): void {
            Repository.contextList = Repository.contextList.filter(x => x.Context !== context);
        }
        public static GetService<T>(context: string): T {
            let value = Repository.contextList
                .Where(x => x.Context === context)
                .OrderBy(x => x.Priority)
                .FirstOrDefault();
            if (!value) return null;

            let factory = new TypedFactory<T>(value.GetType());
            return factory.CreateInstance();
        }

        public static CreateInstance<T>(resolveType: () => any) {
            let factory = new DomBehind.Core.TypedFactory(resolveType());
            return factory.CreateInstance();
        }
    }


}