declare namespace DomBehind.Navigation {
    class DefaultNavigator implements INavigator {
        NewWindow(uri: string, target?: string, style?: string): Window;
        Move(uri: string): any;
        Move(uri: string, historyBack: boolean): any;
        Reload(forcedReload?: boolean): void;
        protected DefaultSetting: IModalHelperSettings;
        ShowModal(arg: any, option?: IModalHelperSettings): JQueryPromise<any>;
    }
}
