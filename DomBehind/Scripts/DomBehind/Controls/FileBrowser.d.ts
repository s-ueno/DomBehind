declare namespace DomBehind {
    interface IFileInfo {
        name: string;
        size: number;
        type: string;
        uri: string;
    }
    interface ISelectedFiles extends JQueryEventObject {
        files: IFileInfo[];
    }
    interface IFileUploader {
        UpdateAll(): any;
        Update(file: IFileInfo): any;
    }
    class FileBrowser extends Data.ActionBindingBehavior implements IFileUploader {
        static SelectedFiles: IEventBuilder;
        Ensure(): void;
        Files: Array<IFileInfo>;
        AllowMultiFiles: boolean;
        AcceptValue: string;
        InstanceExpression: LamdaExpression;
        UploadUri: string;
        ProgressExpression: Function;
        CompletedExpression: Function;
        ErrorExpression: Function;
        AlwaysExpression: Function;
        MaximumNumberOfAjax: number;
        UpdateAll(): JQueryPromise<JQueryPromise<any>[]>;
        Update(file: IFileInfo): JQueryPromise<any>;
        OnProgress(e: {
            loaded: number;
            total: number;
            percent: number;
            file: IFileInfo;
        }): void;
        OnCompleted(e: {
            response: any;
            file: IFileInfo;
        }): void;
        OnError(e: {
            file: IFileInfo;
            error: any;
        }): void;
        OnAlways(): void;
    }
    class FileBrowserBindingBehaviorBuilder<T> extends Data.ActionBindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        AllowMultiFiles(): FileBrowserBindingBehaviorBuilder<T>;
        AcceptFilter(filter: string): FileBrowserBindingBehaviorBuilder<T>;
        UploadUri(uri: string): FileBrowserBindingBehaviorBuilder<T>;
        BindingUploader(exp: (owner: T) => IFileUploader): FileBrowserBindingBehaviorBuilder<T>;
        BindingUploaderProgress(exp: (owner: T, e: {
            loaded: number;
            total: number;
            percent: number;
            file: IFileInfo;
        }) => void): FileBrowserBindingBehaviorBuilder<T>;
        BindingUploaderComplete(exp: (owner: T, e: {
            response: any;
            file: IFileInfo;
        }) => void): FileBrowserBindingBehaviorBuilder<any>;
        BindingUploaderError(exp: (owner: T, e: {
            file: IFileInfo;
            error: any;
        }) => void): FileBrowserBindingBehaviorBuilder<any>;
        BindingUploaderAlways(exp: (owner: T) => void): FileBrowserBindingBehaviorBuilder<any>;
        MaximumNumberOfAjax(number: number): FileBrowserBindingBehaviorBuilder<T>;
    }
    interface BindingBehaviorBuilder<T> {
        BuildFileBrowser(selectedEvent?: (x: T, args: ISelectedFiles) => void): FileBrowserBindingBehaviorBuilder<T>;
    }
}
