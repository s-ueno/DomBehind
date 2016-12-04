namespace DomBehind.Core {
    const z_indexKey: string = "z_indexKey";
    export class Utils {
        public static GenerateZIndex(): number {
            var value = $.GetDomStorage(z_indexKey, 2000)
            var newValue = value + 1;
            $.SetDomStorage(z_indexKey, newValue);
            return newValue;
        }


    }
}

