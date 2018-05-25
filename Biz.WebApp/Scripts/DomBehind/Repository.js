var DomBehind;
(function (DomBehind) {
    var Repository = /** @class */ (function () {
        function Repository() {
        }
        Repository.AddService = function (context, getType, priority) {
            if (priority === void 0) { priority = 0; }
            Repository.contextList.push({ Context: context, GetType: getType, Priority: priority });
        };
        Repository.RemoveService = function (context) {
            Repository.contextList = Repository.contextList.filter(function (x) { return x.Context !== context; });
        };
        Repository.GetService = function (context) {
            var value = Repository.contextList
                .Where(function (x) { return x.Context === context; })
                .OrderBy(function (x) { return x.Priority; })
                .FirstOrDefault();
            if (!value)
                return null;
            var factory = new DomBehind.TypedFactory(value.GetType());
            return factory.CreateInstance();
        };
        Repository.CreateInstance = function (resolveType) {
            var factory = new DomBehind.TypedFactory(resolveType());
            return factory.CreateInstance();
        };
        Repository.contextList = [];
        return Repository;
    }());
    DomBehind.Repository = Repository;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Repository.js.map