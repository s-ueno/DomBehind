declare namespace DomBehind.Navigation {
    enum ModalStartupLocation {
        CenterScreen = 0,
        Manual = 1,
    }
    interface IModalHelperSettings {
        FadeInDuration?: number;
        FadeOutDuration?: number;
        AllowCloseByClickOverlay?: boolean;
        ShowCloseButton?: boolean;
        StartupLocation?: ModalStartupLocation;
        StartupLocationTop?: number;
        StartupLocationLeft?: number;
    }
    interface INavigator {
        ShowModal(uri: string, option?: IModalHelperSettings): any;
        ShowModal(jquery: JQuery, option?: IModalHelperSettings): any;
        Move(uri: string): any;
        Move(uri: string, historyBack: boolean): any;
    }
}
