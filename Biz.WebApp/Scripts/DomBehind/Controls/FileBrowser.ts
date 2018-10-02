namespace DomBehind {

    export interface IFileInfo {
        name: string;
        size: number;
        type: string;

        uri: string;
    }
    export interface ISelectedFiles extends JQueryEventObject {
        files: IFileInfo[];
    }

    export interface IFileUploader {
        UpdateAll();
        Update(file: IFileInfo);
    }

    export class FileBrowser
        extends Data.ActionBindingBehavior
        implements IFileUploader {

        public static SelectedFiles: IEventBuilder
            = EventBuilder.RegisterAttached<ISelectedFiles>("selectedFiles");

        public Ensure(): void {
            super.Ensure();

            let element = this.Element
            element.attr("type", "file");

            if (this.AcceptValue) {
                element.attr("accept", this.AcceptValue);
            } else {
                element.attr("accept", "image/*");
            }

            if (this.AllowMultiFiles) {
                element.attr("multiple", "multiple");
            }

            element.change((e: any) => {
                let args: ISelectedFiles = $.extend(true, e, {});

                let arr = new Array<IFileInfo>();
                $.each(e.target.files, (i, s) => {
                    let uri = URL.createObjectURL(s);
                    let file: IFileInfo = $.extend(true, s, {});
                    file.uri = uri;
                    arr.push(file);
                });
                this.Files = args.files = arr;
                this.OnTrigger(args);
            });

            if (this.InstanceExpression) {
                this.InstanceExpression.SetValue(this);
            }
        }
        public Files: Array<IFileInfo>;
        public AllowMultiFiles: boolean;
        public AcceptValue: string;
        public InstanceExpression: LamdaExpression;

        public UploadUri: string;
        public ProgressExpression: Function;
        public CompletedExpression: Function;
        public ErrorExpression: Function;
        public AlwaysExpression: Function;
        public MaximumNumberOfAjax: number = 1;

        UpdateAll() {
            if (!this.Files) {
                this.OnCompleted({ file: null, response: null });
                return;
            }

            let pooler = new Pooler(this);
            return pooler.Do().always(() => {
                this.OnAlways();
            });
        }
        Update(file: IFileInfo) {
            let executor = new Executor(this, file);
            executor.Do();

            return executor.Pms.always(() => {
                this.OnAlways();
            });
        }

        public OnProgress(e: { loaded: number, total: number, percent: number, file: IFileInfo }) {
            console.trace(`${e.file.name}...${e.loaded} / ${e.total}  ${e.percent} %`);

            if (this.ProgressExpression) {
                this.ProgressExpression(this.DataContext, e);
            }
        }

        public OnCompleted(e: { response: any, file: IFileInfo }) {
            if (e.file) {
                console.trace(`${e.file.name}...complete`);
            }
            if (this.CompletedExpression) {
                this.CompletedExpression(this.DataContext, e);
            }
        }

        public OnError(e: { file: IFileInfo, error: any }) {
            if (e.file) {
                console.trace(`error...${e.file.name}`);
            }
            if (e.error) {
                console.error(e.error);
            }

            if (this.ErrorExpression) {
                this.ErrorExpression(this.DataContext, e);
            }
        }

        public OnAlways() {
            if (this.AlwaysExpression) {
                this.AlwaysExpression(this.DataContext);
            }
        }
    }

    class Pooler {
        constructor(public FileBrowser: FileBrowser) {
        }
        public Do() {
            let files = this.FileBrowser.Files;
            let chunk = parseInt(String(files.length / this.FileBrowser.MaximumNumberOfAjax));
            if (chunk === 0) {
                chunk = 1;
            }

            let pmslist = new Array<JQueryPromise<any>>();
            let chunkList = files.Chunk(chunk);
            $.each(chunkList, (i, value) => {
                let e = new ChunkFlow(this.FileBrowser, value);
                pmslist.push(e.Do());
            });
            return $.when(pmslist);
        }
    }

    class ChunkFlow {
        constructor(public FileBrowser: FileBrowser, protected Queue: Array<IFileInfo>) {
        }
        public Do(): JQueryPromise<any> {
            let arr = this.Queue.Select(x => new Executor(this.FileBrowser, x));
            $.each(arr, (i, value) => {
                let nextIndex = i + 1;
                if (nextIndex < arr.length) {
                    value.Pms.always(() => {
                        arr[nextIndex].Do();
                    })
                }
            });
            if (0 < arr.length) {
                arr[0].Do();
            }
            return $.when(arr.Select(x => x.Pms));
        }
    }

    class Executor {
        constructor(public FileBrowser: FileBrowser, protected File: any) {
            this.Dfd = $.Deferred();
            this.Pms = this.Dfd.promise();
        }
        protected Dfd: JQueryDeferred<any>;
        public Pms: JQueryPromise<any>;
        public Do() {
            let formData = new FormData();
            formData.append("userfile", this.File);

            $.ajax({
                xhr: () => {
                    let xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", evt => {
                        if (evt.lengthComputable) {

                            let percent = (evt.loaded / evt.total) * 100;
                            this.FileBrowser.OnProgress({
                                loaded: evt.loaded,
                                total: evt.total,
                                percent: percent,
                                file: this.File,
                            });
                        }
                    }, false);
                    xhr.addEventListener("progress", evt => {
                        if (evt.lengthComputable) {

                            let percent = (evt.loaded / evt.total) * 100;
                            this.FileBrowser.OnProgress({
                                loaded: evt.loaded,
                                total: evt.total,
                                percent: percent,
                                file: this.File,
                            });
                        }
                    }, false);
                    return xhr;
                },
                type: "POST",
                url: this.FileBrowser.UploadUri,
                data: formData,
                processData: false,
                contentType: false,
                success: e => {
                    this.FileBrowser.OnCompleted({ response: e, file: this.File });
                    this.Dfd.resolve(e);
                },
                error: (x, status, error) => {
                    this.FileBrowser.OnError({ file: this.File, error: error });
                    this.Dfd.reject(error);
                }
            });
        }
    }

    export class FileBrowserBindingBehaviorBuilder<T> extends Data.ActionBindingBehaviorBuilder<T>{
        constructor(owner: BizView) {
            super(owner);
        }

        public AllowMultiFiles(): FileBrowserBindingBehaviorBuilder<T> {
            let me: FileBrowserBindingBehaviorBuilder<T> = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.AllowMultiFiles = true;
            }
            return me;
        }
        public AcceptFilter(filter: string): FileBrowserBindingBehaviorBuilder<T> {
            let me: FileBrowserBindingBehaviorBuilder<T> = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.AcceptValue = filter;
            }
            return me;
        }

        public UploadUri(uri: string): FileBrowserBindingBehaviorBuilder<T> {
            let me: FileBrowserBindingBehaviorBuilder<T> = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.UploadUri = uri;
            }
            return me;
        }

        public BindingUploader(exp: (owner: T) => IFileUploader): FileBrowserBindingBehaviorBuilder<T> {
            let me: FileBrowserBindingBehaviorBuilder<T> = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.InstanceExpression = new LamdaExpression(me.Owner.DataContext, exp);
            }
            return me;
        }

        public BindingUploaderProgress(exp: (owner: T, e: { loaded: number, total: number, percent: number, file: IFileInfo }) => void): FileBrowserBindingBehaviorBuilder<T> {
            let me: FileBrowserBindingBehaviorBuilder<T> = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.ProgressExpression = exp;
            }
            return me;
        }
        public BindingUploaderComplete(exp: (owner: T, e: { response: any, file: IFileInfo }) => void): FileBrowserBindingBehaviorBuilder<any> {
            let me: FileBrowserBindingBehaviorBuilder<T> = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.CompletedExpression = exp;
            }
            return me;
        }

        public BindingUploaderError(exp: (owner: T, e: { file: IFileInfo, error: any }) => void): FileBrowserBindingBehaviorBuilder<any> {
            let me: FileBrowserBindingBehaviorBuilder<T> = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.ErrorExpression = exp;
            }
            return me;
        }

        public BindingUploaderAlways(exp: (owner: T) => void): FileBrowserBindingBehaviorBuilder<any> {
            let me: FileBrowserBindingBehaviorBuilder<T> = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.AlwaysExpression = exp;
            }
            return me;
        }

        public MaximumNumberOfAjax(number: number) {
            let me: FileBrowserBindingBehaviorBuilder<T> = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.MaximumNumberOfAjax = number;
            }
            return me;
        }
    }

    export interface BindingBehaviorBuilder<T> {
        BuildFileBrowser(selectedEvent?: (x: T, args: ISelectedFiles) => void): FileBrowserBindingBehaviorBuilder<T>;
    }

    BindingBehaviorBuilder.prototype.BuildFileBrowser = function (selectedEvent?: (x, args) => void) {
        let me: BindingBehaviorBuilder<any> = this;

        let behavior = me.Add(new FileBrowser());
        behavior.Event = FileBrowser.SelectedFiles.Create();
        behavior.Action = selectedEvent;
        behavior.ActionParameterCount = behavior.Action.length;
        behavior.AllowBubbling = false;

        let newMe = new FileBrowserBindingBehaviorBuilder<any>(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    }
}
