namespace DomBehind {


    export class Breadbrumb {
        constructor(public Selector: string) {
        }
        public static get AllowLocalStorage(): boolean {
            return $.GetLocalStorage<boolean>("Breadbrumb.AllowLocalStorage", true);
        }
        public static set AllowLocalStorage(value: boolean) {
            $.SetLocalStorage("Breadbrumb.AllowLocalStorage", value);
        }

        public Parse(newUri: string, title: string, isRoot?: boolean): string {

            if (!newUri.toLowerCase().StartsWith("http://") &&
                !newUri.toLowerCase().StartsWith("https://")) {
                newUri = $.AbsoluteUri(newUri);
            }

            if (Breadbrumb.AllowLocalStorage)
                return this.ParseSessionStorage(newUri, isRoot, title);

            return this.ParseRestUri(newUri, isRoot, title);
        }

        protected ParseRestUri(newUri: string, isRoot: boolean, title: string) {
            let arr = newUri.Split("?");
            let queryString = "";
            if (1 < arr.length) {
                queryString = arr[1];
            }
            let newQueryStrings = Breadbrumb.SplitQueryString(queryString);


            let currentUri = location.href;
            if (isRoot) {
                currentUri = currentUri.Split("?")[0];
            }

            let oldArr = currentUri.Split("?");
            queryString = "";
            if (1 < oldArr.length) {
                queryString = oldArr[1];
            }
            let oldQueryStrings = Breadbrumb.SplitQueryString(queryString);


            let stack = new Array<{ Uri: string, Title: string }>();
            let json = oldQueryStrings.FirstOrDefault(x => x.Key === "b");
            if (json) {
                stack = this.ToDecompress(json.Value);
            }
            if (stack.Any()) {
                if (oldQueryStrings.Any()) {
                    stack.LastOrDefault().Uri = `${currentUri}&isPop=true`;
                } else {
                    stack.LastOrDefault().Uri = `${currentUri}?isPop=true`;
                }
            }
            stack.push({ Uri: newUri, Title: title });

            newQueryStrings.push({ Key: "b", Value: this.ToCompress(stack) });

            let newQuery = newQueryStrings.Select(x => `${x.Key}=${x.Value}`).join("&");
            let result: string = arr[0];
            if (!String.IsNullOrWhiteSpace(newQuery)) {
                result = `${arr[0]}?${newQuery}`;
            }

            if (0 < stack.length) {
                stack.LastOrDefault().Uri = result;
            }

            return result;
        }

        protected ParseSessionStorage(newUri: string, isRoot: boolean, title: string) {
            let arr = newUri.Split("?");
            let queryString = "";
            if (1 < arr.length) {
                queryString = arr[1];
            }
            let newQueryStrings = Breadbrumb.SplitQueryString(queryString);
            let currentUri = location.href;
            if (isRoot) {
                currentUri = currentUri.Split("?")[0];
            }
            let oldArr = currentUri.Split("?");
            queryString = "";
            if (1 < oldArr.length) {
                queryString = oldArr[1];
            }
            let oldQueryStrings = Breadbrumb.SplitQueryString(queryString);
            let stack = new Array<{
                Uri: string;
                Title: string;
            }>();
            let idKeyValue = oldQueryStrings.FirstOrDefault(x => x.Key === "b");
            let oldId = "";
            let newId = NewUid();
            if (idKeyValue) {
                oldId = idKeyValue.Value;
            }
            else {
                oldId = NewUid();
            }
            let json = Breadbrumb.GetLocalStorage(oldId);
            if (json) {
                stack = this.ToDecompress(json);
            }
            if (stack.Any()) {
                if (oldQueryStrings.Any()) {
                    stack.LastOrDefault().Uri = `${currentUri}&isPop=true`;
                } else {
                    stack.LastOrDefault().Uri = `${currentUri}?isPop=true`;
                }
            }
            stack.push({ Uri: newUri, Title: title });
            Breadbrumb.SetLocalStorage(newId, this.ToCompress(stack));
            if (!newQueryStrings.Any(x => x.Key === "b")) {
                newQueryStrings.push({ Key: "b", Value: newId });
            }
            let newQuery = newQueryStrings.Select(x => `${x.Key}=${x.Value}`).join("&");
            let result: string = arr[0];
            if (!String.IsNullOrWhiteSpace(newQuery)) {
                result = `${arr[0]}?${newQuery}`;
            }
            if (0 < stack.length) {
                stack.LastOrDefault().Uri = result;
            }
            return result;
        }



        protected ToCompress(input: any): string {
            let json = JSON.stringify(input);
            let comp = LZString.compressToBase64(json);
            return encodeURIComponent(comp);
        }
        protected ToDecompress(input: string) {
            let dec = decodeURIComponent(input);
            let json = LZString.decompressFromBase64(dec);
            return JSON.parse(json);
        }

        protected static SplitQueryString(s: string): Array<{ Key: string, Value: string }> {
            if (!String.IsNullOrWhiteSpace(s)) {
                let dec = $('<div/>').html(s).text();

                let array = dec.Split("&", StringSplitOptions.RemoveEmptyEntries);
                let result = [];
                $.each(array, (i, value) => {

                    let split = value.Split("=", StringSplitOptions.None);
                    if (split.length == 2) {
                        result.push({ Key: split[0], Value: split[1] });
                    }
                });
                return result;
            }
            return new Array<any>();
        }

        protected static GetLocalStorage(id: string): string {
            return $.GetLocalStorage(id, "");
        }
        protected static SetLocalStorage(id: string, value: string) {
            $.SetLocalStorage(id, value);
        }

        public Update() {
            let el = $(this.Selector);
            if (el.length === 0) return;

            el.empty();

            let uri = location.href;
            let arr = uri.Split("?");
            let queryString = "";
            if (1 < arr.length) {
                queryString = arr[1];
            }

            if (String.IsNullOrWhiteSpace(queryString)) {
                return;
            }

            let dic = Breadbrumb.SplitQueryString(queryString);
            let id = dic.FirstOrDefault(x => x.Key === "b");
            if (!id) {
                return;
            }

            // let stack: Array<{ Uri: string, Title: string }> = JSON.parse(decodeURIComponent(json.Value));
            let stack: Array<{ Uri: string, Title: string }> = this.BuildStack(id.Value);
            if (!stack) {
                return;
            }

            let aList = new Array<JQuery>();
            $.each(stack, (i, value) => {
                if (i === (stack.length - 1)) {
                    aList.push($(`<a>${value.Title}</a>`));
                } else {
                    let a = $(`<a href="javascript:void(0);">${value.Title}</a>`);
                    a.click(e => {
                        // タップして戻る際にイベントが取れないので発行する
                        let newE: any = new Event("breadbrumbTapped");
                        newE.__title = value.Title;
                        newE.__uri = value.Uri;
                        newE.__e = e;
                        window.dispatchEvent(newE);

                        location.replace(value.Uri);
                    });
                    aList.push(a);
                }
                aList.push($(`<span> > </span>`));
            });

            for (var i = 0; i < aList.length - 1; i++) {
                el.append(aList[i]);
            }
        }

        protected BuildStack(s: string) {
            if (Breadbrumb.AllowLocalStorage) {
                s = Breadbrumb.GetLocalStorage(s);
            }
            return this.ToDecompress(s);
        }

        public Pop(count: number = 1) {
            let el = $(this.Selector);
            if (el.length === 0) return;

            let aList = el.find("a");

            let back = ++count;
            if (aList.length <= back) return;

            aList[aList.length - back].click();
        }

    }




}