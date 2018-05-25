namespace Biz.WebApp {
    export class BizApplication extends DomBehind.Application {

        public /* override */ UnhandledException(error: any): void {
            var errorMessage: string = "Unknown exception";
            if (!Object.IsNullOrUndefined(error)) {
                if (error instanceof DomBehind.AjaxException) {
                    var ajaxError: DomBehind.AjaxException = <DomBehind.AjaxException>error;
                    errorMessage = ajaxError.ToString();
                } else if (error instanceof DomBehind.Exception) {
                    errorMessage = (<DomBehind.Exception>error).ToString();
                }
                else if (error instanceof Error) {
                    errorMessage = `${(<Error>error).name}:${(<Error>error).message}`;
                }
            }

            console.error(errorMessage);
            alert(errorMessage);
        }

        public get DefaultActionPolicy(): DomBehind.Data.ActionPolicy[] {
            return [
                new DomBehind.Data.SuppressDuplicateActionPolicy(),
                new DomBehind.Data.ExceptionHandlingActionPolicy(),
                new DomBehind.Data.ValidationExceptionHandlingActionPolicy(),
            ];
        }

        public /*  */ OnBrowserBack() {
            alert("The back button can not be used.");
        }

    }
}