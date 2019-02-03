declare namespace DomBehind.Navigation {
    enum ModalStartupLocation {
        CenterScreen = 0,
        Manual = 1
    }
    interface IModalHelperSettings {
        FadeInDuration?: number;
        FadeOutDuration?: number;
        AllowCloseByClickOverlay?: boolean;
        ShowCloseButton?: boolean;
        ShowHeader?: boolean;
        StartupLocation?: ModalStartupLocation;
        StartupLocationTop?: number;
        StartupLocationLeft?: number;
        Height?: string;
        Width?: string;
    }
    interface INavigator {
        ShowModal(uri: string, option?: IModalHelperSettings): JQueryPromise<any>;
        ShowModal(jquery: JQuery, option?: IModalHelperSettings): JQueryPromise<any>;
        Move(uri: string): any;
        Move(uri: string, historyBack: boolean): any;
        NewWindow(uri: string, target?: string, style?: string): Window;
        Reload(forcedReload?: boolean): any;
    }
}
