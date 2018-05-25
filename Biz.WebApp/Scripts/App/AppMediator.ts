namespace Biz.WebApp {

    export class AppMediator {

        public static ShowHideRightMenu = new DomBehind.TypedEvent<boolean>();
        public static ShowHideBottomMenu = new DomBehind.TypedEvent<boolean>();
    }

}