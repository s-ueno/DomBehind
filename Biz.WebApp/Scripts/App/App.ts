class BizApplication extends DomBehind.Core.Application {

    public /* override */ UnhandledException(error: any): void {
        var errorMessage: string = "Unknown exception";
        if (!Object.IsNullOrUndefined(error)) {
            if (error instanceof DomBehind.Core.AjaxException) {
                var ajaxError: DomBehind.Core.AjaxException
                    = <DomBehind.Core.AjaxException>error;
                errorMessage = ajaxError.ToString();
            } else if (error instanceof DomBehind.Core.Exception) {
                errorMessage = (<DomBehind.Core.Exception>error).ToString();
            }
            else if (error instanceof Error) {
                errorMessage = `${(<Error>error).name}:${(<Error>error).message}`;
            }
        }

        console.error(errorMessage);
        alert(errorMessage);
    }

    public get DefaultActionPolicy(): DomBehind.Core.Data.ActionPolicy[] {
        return [
            new DomBehind.Core.Data.SuppressDuplicateActionPolicy(),
            new DomBehind.Core.Data.ExceptionHandlingActionPolicy(),
            new DomBehind.Core.Validation.ValidationExceptionHandlingActionPolicy(),
        ];
    }
}