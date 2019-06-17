namespace Gallery.WebApp {

    export class AppMediator {
        public static SPAMoveRequest = new DomBehind.TypedEvent<{ uri: string, title: string, pms?: JQueryPromise<any> }>();
        public static SPAPopRequest = new DomBehind.TypedEvent<number | null>();
        public static ThrowAjaxException = new DomBehind.TypedEvent<{ exception: any, additionalInfo?: any }>();
        public static ThrowException(sender: AppBizViewModel, exception: any, additionalInfo?: any) {
            AppMediator.ThrowAjaxException.Raise(sender, { exception: exception, additionalInfo: additionalInfo });
        }

        public static WindowClosing = new DomBehind.TypedEvent<{ canceled: boolean, message: string }>();
    }
}