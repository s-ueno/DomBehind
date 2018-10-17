namespace DomBehind {


    export class Breadbrumb {

        constructor(public Selector: string) {
        }

        public Parse(newUri: string, title: string) {
            if (!newUri.toLowerCase().StartsWith("http://") &&
                !newUri.toLowerCase().StartsWith("https://")) {
                newUri = $.AbsoluteUri(newUri);
            }

            let arr = newUri.Split("?");
            let queryString = "";
            if (1 < arr.length) {
                queryString = arr[1];
            }
            let newQueryStrings = this.SplitQueryString(queryString);


            let currentUri = location.href;
            let oldArr = currentUri.Split("?");
            queryString = "";
            if (1 < oldArr.length) {
                queryString = oldArr[1];
            }
            let oldQueryStrings = this.SplitQueryString(queryString);


            let stack = new Array<{ Uri: string, Title: string }>();
            let json = oldQueryStrings.FirstOrDefault(x => x.Key === "b");
            if (json) {
                stack = JSON.parse(decodeURIComponent(json.Value));
            }
            stack.push({ Uri: newUri, Title: title });

            newQueryStrings.push({ Key: "b", Value: encodeURIComponent(JSON.stringify(stack)) });

            let newQuery = newQueryStrings.Select(x => `${x.Key}=${x.Value}`).join("&");
            if (!String.IsNullOrWhiteSpace(newQuery)) {
                return `${arr[0]}?${newQuery}`;
            }
            return arr[0];
        }

        protected SplitQueryString(s: string): Array<{ Key: string, Value: string }> {
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

            let dic = this.SplitQueryString(queryString);
            let json = dic.FirstOrDefault(x => x.Key === "b");
            if (!json) {
                return;
            }

            let stack: Array<{ Uri: string, Title: string }> = JSON.parse(decodeURIComponent(json.Value));
            if (!stack) {
                return;
            }

            let aList = new List<string>();
            $.each(stack, (i, value) => {
                if (i === (stack.length - 1)) {
                    aList.add(`<a>${value.Title}</a>`);
                } else {
                    aList.add(`<a href="${value.Uri}">${value.Title}</a>`);
                }

            });
            let html = aList.toArray().join(" > ");
            el.append(html);
        }

    }




}