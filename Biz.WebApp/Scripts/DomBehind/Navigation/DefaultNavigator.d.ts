declare namespace DomBehind.Navigation {
    class DefaultNavigator implements INavigator {
        Move(uri: string): any;
        Move(uri: string, historyBack: boolean): any;
        protected DefaultSetting: IModalHelperSettings;
        ShowModal(arg: any, option?: IModalHelperSettings): void;
    }
}
