namespace DomBehind.Navigation {
    export enum ModalStartupLocation {
        CenterScreen,
        Manual,
    }

    export interface IModalHelperSettings {
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

    export interface INavigator {
        ShowModal(uri: string, option?: IModalHelperSettings);
        ShowModal(jquery: JQuery, option?: IModalHelperSettings);

        Move(uri: string);
        Move(uri: string, historyBack: boolean);

        NewWindow(uri: string, target?: string, style?: string): Window;

        Reload(forcedReload?: boolean);
    }
}
