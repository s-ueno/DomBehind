﻿namespace DomBehind {


    export class Breadbrumb {

        constructor(public Selector: string) {
        }

        public Parse(newUri: string, title: string, isRoot?: boolean): string {
            if (!newUri.toLowerCase().StartsWith("http://") &&
                !newUri.toLowerCase().StartsWith("https://")) {
                newUri = $.AbsoluteUri(newUri);
            }

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
                // stack = JSON.parse(decodeURIComponent(json.Value));
            }
            if (stack.Any()) {
                stack.LastOrDefault().Uri = currentUri;
            }
            stack.push({ Uri: newUri, Title: title });

            newQueryStrings.push({ Key: "b", Value: this.ToCompress(stack) });
            // newQueryStrings.push({ Key: "b", Value: encodeURIComponent(JSON.stringify(stack)) });

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
            let json = dic.FirstOrDefault(x => x.Key === "b");
            if (!json) {
                return;
            }

            // let stack: Array<{ Uri: string, Title: string }> = JSON.parse(decodeURIComponent(json.Value));
            let stack: Array<{ Uri: string, Title: string }> = this.ToDecompress(json.Value);
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

        public Pop() {
            let el = $(this.Selector);
            if (el.length === 0) return;

            let aList = el.find("a");
            if (aList.length < 2) return;

            $(aList[aList.length - 1]).click();

        }

    }




}