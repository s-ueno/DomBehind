declare namespace DomBehind {
    abstract class Application {
        static readonly Current: Application;
        private static _app;
        static Resolve(): void;
        protected OnBrowserBack(): void;
        abstract UnhandledException(error: any): void;
        readonly DefaultActionPolicy: Data.ActionPolicy[];
        readonly Navigator: Navigation.INavigator;
        private _navigator;
    }
}

interface JQueryStatic {
    BindingAnnotation(selector: string, resolveViewType: () => any, resolveViewModelType: () => any): JQueryPromise<any>;
}
declare class annotationCollection {
    private lazyList;
    Any(selector: string, resolveViewType: () => any, resolveViewModelType: () => any): boolean;
    Add(selector: string, resolveViewType: () => any, resolveViewModelType: () => any): void;
    Remove(selector: string, resolveViewType: () => any, resolveViewModelType: () => any): void;
    ToArray(): {
        Selector: string;
        ResolveViewType: () => any;
        ResolveViewModelType: () => any;
    }[];
    Pop(peek?: boolean): void;
}
declare var __lazyCollection: annotationCollection;
declare namespace DomBehind {
}

declare namespace DomBehind {
    /**
     * It is the code behind the view
     * to promotes component-oriented developers
     */
    abstract class BizView implements IDisposable {
        Container: JQuery;
        private _container;
        DataContext: any;
        private _dataContext;
        abstract BuildBinding(): void;
        OnDataContextPropertyChanged(sender: any, e: PropertyChangedEventArgs): void;
        ViewLoaded(responseText: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): void;
        Ensure(): void;
        protected UnSubscribe(): void;
        protected Subscribe(): void;
        /**
         * start the build of the binding
         */
        protected CreateBindingBuilder<T extends BizViewModel>(): BindingBehaviorBuilder<T>;
        /**
         * provides the ability to easily use behaviors
         */
        BindingBehaviors: Data.BindingBehaviorCollection;
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        UpdateTarget(mark?: string): void;
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        UpdateSource(mark?: string): void;
        Validate(mark?: string): boolean;
        ClearValidator(mark?: string): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
}

declare namespace DomBehind {
    /**
     * ViewModel
     * to promotes component-oriented developers
     */
    abstract class BizViewModel extends NotifiableImp implements Data.IExceptionHandling {
        constructor();
        protected NotifyEvent<TEvent>(event: TypedEvent<TEvent>, args: TEvent): void;
        Title: string;
        private _title;
        View: BizView;
        private _view;
        protected OnViewChanged(): void;
        Initialized: boolean;
        /**
         * must inherits Initialize method.
         */
        abstract Initialize(): void;
        /**
         * inherit if necessary ViewLoaded method.
         */
        ViewLoaded(): void;
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        UpdateTarget(mark?: string): void;
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        UpdateSource(mark?: string): void;
        Validate(mark?: string): boolean;
        protected WaitingOverlay(func: Function, image?: string): void;
        protected SafeAction(func: Function, ...policies: Data.ActionPolicy[]): void;
        Catch(ex: Data.ActionPolicyExceptionEventArgs): void;
        protected readonly Navigator: Navigation.INavigator;
        IsEnabled: boolean;
        ShowInfomation(message: string, title?: string): void;
        ShowWarning(message: string, title?: string): void;
        ShowError(message: string, title?: string): void;
        ShowMessage(message: string, title?: string, status?: MessageStatus): void;
        ShowYesNo(message: string, title?: string, option?: {
            status?: MessageStatus;
            yesCallback?: Function;
            noCallBack?: Function;
        }): void;
        ShowOkCancel(message: string, title?: string, option?: {
            status?: MessageStatus;
            okCallback?: Function;
            cancelCallBack?: Function;
        }): void;
        ShowModal(uri: string, option?: Navigation.IModalHelperSettings): any;
        ShowModal(jquery: JQuery, option?: Navigation.IModalHelperSettings): any;
        Dispose(): void;
    }
}

declare namespace DomBehind {
    class Locator {
        private static _container;
        static Push(ins: any): void;
        static List<T>(typeT: new (...params: any[]) => T, predicate?: (obj: T) => boolean): T[];
        static First<T>(typeT: new (...params: any[]) => T, predicate?: (obj: T) => boolean): T;
        static Remove<T>(typeT: new (...params: any[]) => T, predicate?: (obj: T) => boolean): void;
        static Clear(): void;
    }
}

declare namespace DomBehind {
    class Repository {
        private static contextList;
        static AddService(context: string, getType: () => any, priority?: number): void;
        static RemoveService(context: string): void;
        static GetService<T>(context: string): T;
        static CreateInstance<T>(resolveType: () => any): {};
    }
}

declare namespace DomBehind {
    interface TypedConstructor<T> {
        new (): T;
    }
    class TypedFactory<T> {
        private _ctor;
        constructor(_ctor: TypedConstructor<T>);
        CreateInstance(): T;
    }
}

declare namespace DomBehind {
    interface BindingBehaviorBuilder<T> {
        InputType(inputType: InputType): BindingBehaviorBuilder<T>;
    }
    /**
     * HTML5
     */
    enum InputType {
        /**
         * hidden
         */
        Hidden = 0,
        /**
         * text
         */
        Text = 1,
        /**
         * search
         */
        Search = 2,
        /**
         * tel
         */
        Tel = 3,
        /**
         * url
         */
        Url = 4,
        /**
         * email
         */
        Email = 5,
        /**
         * password
         */
        Password = 6,
        /**
         * datetime
         */
        DateTime = 7,
        /**
         * date
         */
        Date = 8,
        /**
         * month
         */
        Month = 9,
        /**
         * week
         */
        Week = 10,
        /**
         * time
         */
        Time = 11,
        /**
         * datetime-local
         */
        DateTimeLocal = 12,
        /**
         * number
         */
        Number = 13,
        /**
         * range
         */
        Range = 14,
        /**
         * color
         */
        Color = 15,
        /**
         * checkbox
         */
        Checkbox = 16,
        /**
         * radio
         */
        Radio = 17,
        /**
         * file
         */
        File = 18,
        /**
         * submit
         */
        Submit = 19,
        /**
         * image
         */
        Image = 20,
        /**
         * reset
         */
        Reset = 21,
        /**
         * button
         */
        Button = 22,
    }
}

declare namespace DomBehind {
    enum MessageStatus {
        Infomation = 0,
        Warning = 1,
        Error = 2,
    }
    class MessaageBox {
        static ShowInfomation(message: string, title?: string): void;
        static ShowWarning(message: string, title?: string): void;
        static ShowError(message: string, title?: string): void;
        static ShowMessage(message: string, title?: string, status?: MessageStatus): void;
        static ShowYesNo(message: string, title?: string, option?: {
            status?: MessageStatus;
            yesCallback?: Function;
            noCallBack?: Function;
        }): void;
        static ShowOkCancel(message: string, title?: string, option?: {
            status?: MessageStatus;
            okCallback?: Function;
            cancelCallBack?: Function;
        }): void;
        static BuiltIn<T>(lazy: () => TypedConstructor<T>): void;
        private static _lazy;
        private static readonly Container;
        private static _container;
    }
    interface IMessageContainer {
        ShowMessage(message: string, title?: string, status?: MessageStatus): any;
        ShowYesNo(message: string, title?: string, option?: {
            status?: MessageStatus;
            yesCallback?: Function;
            noCallBack?: Function;
        }): any;
        ShowOkCancel(message: string, title?: string, option?: {
            status?: MessageStatus;
            okCallback?: Function;
            cancelCallBack?: Function;
        }): any;
    }
}

declare namespace DomBehind {
    interface BindingBehaviorBuilder<T> {
        Scrolling(): BindingBehaviorBuilder<T>;
        SlideAnimation(): BindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind.Controls {
    interface ISelectableElement extends IDisplayMemberPath {
        __Selector: JQuery;
        __Element: HTMLOptionElement;
    }
    class Selector {
        Behavior: Data.DataBindingBehavior;
        static ItemsSourceProperty: Data.DependencyProperty;
        static AllowMultipleProperty: Data.DependencyProperty;
        protected static IgnoreMark: string;
        protected static InstanceMark: string;
        static Register(behavior: Data.DataBindingBehavior): void;
        constructor(Behavior: Data.DataBindingBehavior);
        /** Hold the handle in order to safely remove the Event */
        protected UpdateTargetEventHandle: (sender, e) => void;
        protected UpdateSourceEventHandle: (sender, e) => void;
        protected PropertyChangedEventHandle: (sender, e) => void;
        protected UpdateSource(e: JQueryEventObject): boolean;
        protected OnUpdateTarget(sender: Data.DataBindingBehavior, data: any): void;
        protected OnDataSourcePropertyChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs): void;
        protected Render(source: Data.ListCollectionView): void;
        protected Multiple: boolean;
        protected RenderOption(element: JQuery, source: Data.ListCollectionView, value: any): void;
        protected EnsureDisplayMemberPath(path: string): IDisplayMemberPath;
        protected EnsureElement(option: JQuery): ISelectableElement;
        private AddedHandle;
        private RemovedHandle;
        protected Added(source: Data.ListCollectionView, obj: any): void;
        protected Removed(source: Data.ListCollectionView, obj: any): void;
        protected Select(source: Data.ListCollectionView): void;
        private SingleSelect(source);
        private MultipleSelect(source);
        protected HasChanges(source: Data.ListCollectionView): boolean;
        protected Subscribe(source: Data.ListCollectionView): void;
        protected UnSubscribe(source: Data.ListCollectionView): void;
        static GetDisplayValue(value: any, displayMemberPath: string): any;
    }
}
declare namespace DomBehind.Data {
    interface DataBindingBehaviorBuilder<T> {
        Multiple(): DataBindingBehaviorBuilder<T>;
        Multiple(allowMultiple: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind.Controls {
    class Tab extends Selector {
        static ItemsSourceProperty: Data.DependencyProperty;
        protected static IgnoreMark: string;
        protected static InstanceMark: string;
        static Register(behavior: Data.DataBindingBehavior): void;
        protected Render(source: Data.ListCollectionView): void;
        HeaderContainer: JQuery;
        ContentContainer: JQuery;
        protected NewAdd(source: Data.ListCollectionView, option: Tab.UriOption, isActive?: boolean): Tab.BindingOption;
        protected Options: Tab.BindingOption[];
        protected Added(source: Data.ListCollectionView, obj: any): void;
        protected Removed(source: Data.ListCollectionView, obj: Tab.UriOption): void;
    }
    namespace Tab {
        interface OptionInternal extends IIdentity, IDisplayMemberPath {
            __header?: JQuery;
            __content?: JQuery;
            View?: BizView;
            ViewModel?: BizViewModel;
        }
        interface UriOption extends OptionInternal {
            Uri: string;
        }
        class BindingOption {
            protected Parent: Tab;
            constructor(Parent: Tab);
            readonly HeaderContainer: JQuery;
            Header: JQuery;
            readonly ContentContainer: JQuery;
            Content: JQuery;
            Option: OptionInternal;
            Source: Data.ListCollectionView;
            IsActive: boolean;
            Ensure(): void;
            protected PropertyChangedSafeHandle: (sender: any, e: PropertyChangedEventArgs) => void;
            protected OnRecievePropertyChanged(e: PropertyChangedEventArgs): void;
        }
    }
}

declare namespace DomBehind {
    class UIElement {
        /**
         * Gets or sets the val attribute of the element
         */
        static ValueProperty: Data.DependencyProperty;
        static IsEnabledProperty: Data.DependencyProperty;
        static PlaceHolderProperty: Data.DependencyProperty;
        static IsCheckedProperty: Data.DependencyProperty;
        static MaxLengthProperty: Data.DependencyProperty;
        static HtmlSource: Data.DependencyProperty;
        static Click: IEventBuilder;
        static LostFocus: IEventBuilder;
        static Initialize: IEventBuilder;
        static ViewLoaded: IEventBuilder;
        static ModalClosing: IEventBuilder;
    }
}

declare namespace DomBehind.Data {
    /**
     * linked the method of the View of the event and the ViewModel
     */
    class ActionBindingBehavior extends BindingBehavior {
        Event: IEvent;
        /**
         * Hold the handle in order to safely remove the Event
         */
        protected EventHandle: (sender, e) => void;
        Action: Function;
        /**
         * Hold the handle in order to safely remove the Action
         */
        protected ActionHandle: (e: any) => void;
        ActionParameterCount: number;
        AllowBubbling: boolean;
        Ensure(): void;
        OnTrigger(e: any): void;
        ActionPolicyCollection: ActionPolicy[];
        protected readonly ActionInvoker: ActionPolicy;
        private _actionInvoker;
        CreateActionInvoker(policies: ActionPolicy[]): ActionPolicy;
        /**
         * Run the linked action
         * @param sender
         * @param e
         */
        protected Do(sender: any, e: any): void;
        Dispose(): void;
    }
}

declare namespace DomBehind.Data {
    class ActionBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected readonly Behavior: Data.ActionBindingBehavior;
        ActionPolicy(...policies: Data.ActionPolicy[]): ActionBindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind.Data {
    /**
     * supports the link of the view and the view model
     */
    abstract class BindingBehavior implements IDisposable {
        DataContext: any;
        Element: JQuery;
        BindingPolicy: BindingPolicy;
        Priolity: number;
        /**
         * ensure a bind
         */
        abstract Ensure(): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
}

declare namespace DomBehind {
    /**
     * support the construction of behavior
     */
    class BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        Owner: BizView;
        /**
         * define the target element
         * @param selector
         */
        Element(selector: string): BindingBehaviorBuilder<T>;
        Element(uiElement: JQuery): BindingBehaviorBuilder<T>;
        CurrentElement: JQuery;
        CurrentSelector: string;
        CurrentBehavior: Data.BindingBehavior;
        /**
         * linking the properties of the view and the view model
         * @param property
         * @param getter
         * @param setter
         * @param updateTrigger is update timing of view model
         */
        Binding<P>(property: Data.DependencyProperty, bindingExpression: (x: T) => P, mode?: Data.BindingMode, updateTrigger?: Data.UpdateSourceTrigger): Data.DataBindingBehaviorBuilder<T>;
        BindingViewViewModel(view: (x: T) => BizView, viewModel: (x: T) => BizViewModel): BindingBehaviorBuilder<T>;
        /**
         * linking the action of the view and the view model
         * @param event
         * @param action
         */
        BindingAction(event: IEventBuilder, action: (x: T) => any): BindingBehaviorBuilder<T>;
        /**
         * linking the action of the view and the view model
         * @param event
         * @param action
         */
        BindingAction(event: IEventBuilder, action: (x: T, args: any) => void): BindingBehaviorBuilder<T>;
        /**
         * Register the behavior
         * @param behavior
         */
        Add<TBehavior extends Data.BindingBehavior>(behavior: TBehavior): TBehavior;
    }
}

declare namespace DomBehind.Data {
    /**
     * provides the ability to easily use behaviors
     */
    class BindingBehaviorCollection extends collections.LinkedList<Data.BindingBehavior> implements IDisposable {
        /**
         * Ensure
         */
        Ensure(): void;
        /**
         * lists the more behaviors
         * @param mark
         */
        ListDataBindingBehavior(mark?: string): Data.DataBindingBehavior[];
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        UpdateTarget(mark?: string): void;
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        UpdateSource(mark?: string): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
}

declare namespace DomBehind.Data {
    /**
     * policy on binding
     */
    class BindingPolicy {
        Trigger: UpdateSourceTrigger;
        Mode: BindingMode;
        Converter: IValueConverter;
        Validators: Validation.ValidatorCollection;
    }
}

declare namespace DomBehind.Data {
    /**
     * linking the properties of the view and the ViewModel
     */
    class DataBindingBehavior extends BindingBehavior {
        Property: Data.DependencyProperty;
        PInfo: PropertyInfo;
        private _pinfo;
        Marks: string[];
        AdditionalInfo: collections.LinkedDictionary<string, any>;
        /**
         *  ValueCore is the input value of the view that is not transferred to the ViewModel
         */
        readonly ValueCore: any;
        UpdateSourceEvent: IEvent;
        /**
         * Sends the current binding target value to the binding source property
         */
        UpdateSource(): void;
        UpdateTargetEvent: IEvent;
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         */
        UpdateTarget(): void;
        Ensure(): void;
        protected Events: string[];
        protected EventsOff(): void;
        Dispose(): void;
    }
}

declare namespace DomBehind.Data {
    class DataBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected readonly Behavior: Data.DataBindingBehavior;
        /**
         * Give any of the mark to the property.
         * It is possible to perform partial updating and partial validation.
         * @param region
         */
        PartialMark(...mark: string[]): DataBindingBehaviorBuilder<T>;
        /**
         *
         * @param converter
         */
        Converter(converter: IValueConverter): DataBindingBehaviorBuilder<T>;
        AddValidator<T extends Validation.Validator>(validator: T): T;
    }
}

declare namespace DomBehind.Data {
    /**
     * To communicate the View and ViewModel properties using JQuery
     */
    class DependencyProperty {
        constructor(name: string);
        readonly PropertyName: string;
        private _propertyName;
        /**
         * Using JQuery to get the value from the View
         */
        readonly GetValue: (jQuery: JQuery) => any;
        private _getter;
        /**
         * Using JQuery and set the value to View
         */
        readonly SetValue: (jQuery: JQuery, value: any) => void;
        private _setter;
        /**
         * Default UpdateSourceTrigger
         */
        readonly UpdateSourceTrigger: UpdateSourceTrigger;
        private _updateSourceTrigger;
        readonly BindingMode: BindingMode;
        private _bindingMode;
        readonly Ensure: (behavior: DataBindingBehavior) => void;
        private _ensure;
        /**
         * It defines the communication using JQuery
         * @param propertyName
         * @param getValue
         * @param setValue
         * @param updateSourceTrigger
         */
        static RegisterAttached(propertyName: string, getValue: (jQuery: JQuery) => any, setValue: (jQuery: JQuery, value: any) => void, defaultUpdateSourceTrigger?: UpdateSourceTrigger, mode?: BindingMode, ensure?: (behavior: DataBindingBehavior) => void): DependencyProperty;
    }
}

declare namespace DomBehind.Data {
    class ViewViewModelBindingBehavior extends BindingBehavior {
        GetView: (x: any) => BizView;
        GetViewModel: (x: any) => BizViewModel;
        View: BizView;
        ViewModel: BizViewModel;
        Ensure(): void;
        Dispose(): void;
    }
}

declare namespace DomBehind.Data {
    /**
     * Apply any of the policy to the bindable action
     */
    abstract class ActionPolicy {
        /**
         * Return the execution priority
         */
        abstract Priority(): number;
        abstract Begin(): void;
        abstract Done(): void;
        abstract Fail(ex: ActionPolicyExceptionEventArgs): void;
        abstract Always(): void;
        /**
         *
         * @param func
         */
        Do(func: Function): any;
        NextPolicy: ActionPolicy;
        Behavior: ActionBindingBehavior;
    }
}

declare namespace DomBehind.Data {
    class ActionPolicyExceptionEventArgs extends EventArgs {
        constructor(sender: any, errorData: any);
        Handled: boolean;
        Data: any;
        Sender: any;
    }
}

declare namespace DomBehind.Data {
    class ExceptionHandlingActionPolicy extends ActionPolicy {
        Priority(): number;
        private _priority;
        Begin(): void;
        Done(): void;
        Fail(ex: ActionPolicyExceptionEventArgs): void;
        Always(): void;
    }
}

declare namespace DomBehind.Data {
    interface IExceptionHandling {
        Catch(ex: ActionPolicyExceptionEventArgs): void;
    }
}

declare namespace DomBehind.Data {
    class SuppressDuplicateActionPolicy extends ActionPolicy {
        Priority(): number;
        private _priority;
        protected IsEnabled: DependencyProperty;
        Begin(): void;
        private referencecount;
        private engaged;
        Done(): void;
        Fail(ex: ActionPolicyExceptionEventArgs): void;
        Always(): void;
    }
}

declare namespace DomBehind.Data {
    class ValidationExceptionHandlingActionPolicy extends ActionPolicy {
        Priority(): number;
        private _priority;
        Begin(): void;
        Done(): void;
        Fail(ex: ActionPolicyExceptionEventArgs): void;
        protected SetCustomError(vex: Validation.ValidationException): void;
        protected readonly Supported: boolean;
        protected readonly ViewModel: BizViewModel;
        protected readonly View: BizView;
        protected readonly Owner: JQuery;
        Always(): void;
    }
}

declare namespace DomBehind.Data {
    /******************************************************************************
    LoadingOverlay - A flexible loading overlay jQuery plugin
        Author          : Gaspare Sganga
        Version         : 1.5.1
        License         : MIT
        Documentation   : http://gasparesganga.com/labs/jquery-loading-overlay/
    *******************************************************************************/
    interface IWaitingOverlayOption {
        Color: string;
        Custom: string;
        Fade: any;
        Fontawesome: string;
        Image: string;
        ImagePosition: string;
        MaxSize: string;
        MinSize: string;
        ResizeInterval: number;
        Size: any;
        ZIndex: number;
    }
    abstract class WaitingOverlayActionPolicy extends ActionPolicy {
        constructor(option?: IWaitingOverlayOption);
        readonly Option: IWaitingOverlayOption;
        private _option;
        Priority(): number;
        private _priority;
        protected abstract Container(): JQuery;
        protected abstract IsWholePage(): boolean;
        Begin(): void;
        protected Resize(overlay: JQuery): void;
        Done(): void;
        Fail(ex: ActionPolicyExceptionEventArgs): void;
        Always(): void;
    }
    class ElementWaitingOverlayActionPolicy extends WaitingOverlayActionPolicy {
        constructor(element: JQuery, option?: IWaitingOverlayOption);
        protected Container(): JQuery;
        private _container;
        protected IsWholePage(): boolean;
    }
    class WindowWaitingOverlayActionPolicy extends ElementWaitingOverlayActionPolicy {
        constructor(option?: IWaitingOverlayOption);
        protected IsWholePage(): boolean;
    }
}
declare namespace DomBehind.Data {
    interface ActionBindingBehaviorBuilder<T> {
        WaitingOverlay(policy?: Data.WaitingOverlayActionPolicy): ActionBindingBehaviorBuilder<T>;
    }
}

interface Array<T> {
    Where(predicate: (value: T) => boolean): Array<T>;
    Select<U>(select: (value: T) => U): Array<U>;
    Any(predicate?: (value: T) => boolean): boolean;
    OrderBy(selector: (value: T) => any): Array<T>;
    OrderByDecording(selector: (value: T) => any): Array<T>;
    FirstOrDefault(predicate?: (x: T) => boolean): T;
    LastOrDefault(predicate?: (x: T) => boolean): T;
    GroupBy(selector: (value: T) => any): Array<{
        Key: any;
        Values: Array<T>;
    }>;
    SequenceEqual(target: Array<T>, predicate?: (x1: T, x2: T) => boolean): boolean;
}

interface JQueryStatic {
    GenerateZIndex(): number;
    GetLocalStorage<T>(key: string, defaultValue?: T): T;
    SetLocalStorage(key: string, value: any): void;
    GetSessionStorage<T>(key: string, defaultValue?: T): T;
    SetSessionStorage<T>(key: string, value: T): void;
    GetDomStorage<T>(key: string, defaultValue?: T): T;
    SetDomStorage<T>(key: string, value: T): void;
    GetWindowDynamic<T>(key: string, defaultValue?: T): T;
    SetWindowDynamic<T>(key: string, value?: T): any;
    SetRootUri(uri: string): void;
    AbsoluteUri(uri: string): string;
}
declare const z_indexKey: string;
declare const w_dynamicPrefix: string;
interface JQuery {
    ValidityState(): ValidityState;
    HasError(): boolean;
    SetCustomError(errorMessage: string): void;
    ClearCustomError(): void;
    CheckValidity(allChildren?: boolean): void;
    Raise(event: DomBehind.IEventBuilder): void;
}

interface ObjectConstructor {
    IsNullOrUndefined(obj: any): boolean;
    IsPromise(obj: any): boolean;
    NameOf(name: any): string;
}

interface String {
    /**
     * 拡張メソッドを宣言する際にprototype汚染を防止します
     */
    ExtendedPrototype(key: any, value: any): void;
}

interface StringConstructor {
    IsNullOrEmpty(str: string): boolean;
    IsNullOrWhiteSpace(str: string): boolean;
    Split(value: string, separator: string): string[];
}
declare enum StringSplitOptions {
    None = 0,
    RemoveEmptyEntries = 1,
}
interface String {
    Split(separator: string, option?: StringSplitOptions): string[];
    Escape(): string;
    UnEscape(): string;
    Replace(searchValue: string, replaceValue: string): string;
}

declare namespace DomBehind.Navigation {
    class DefaultNavigator implements INavigator {
        Move(uri: string): any;
        Move(uri: string, historyBack: boolean): any;
        protected DefaultSetting: IModalHelperSettings;
        ShowModal(arg: any, option?: IModalHelperSettings): void;
    }
}

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

declare namespace DomBehind {
    enum PoolType {
        PreLoad = 1,
        Reload = 2,
    }
}

declare namespace DomBehind.Threading {
    class WorkerPool {
        protected static Pool: WorkerWrapper[];
        static Register(type: () => any, defaultPoolCount?: number): void;
        static Do(type: any, arg: any): JQueryPromise<any>;
    }
}

declare namespace DomBehind.Threading {
    abstract class WorkerWrapper {
        protected readonly Thread: Worker;
        private _thread;
        Load(): void;
        protected readonly WorkerScript: string;
        PoolType: PoolType;
        Do(arg: any): JQueryPromise<any>;
        Terminate(): void;
    }
}

declare namespace DomBehind {
    class AjaxException extends Exception {
        JqXHR: JQueryXHR;
        TextStatus: string;
        ErrorThrown: string;
        constructor(JqXHR?: JQueryXHR, TextStatus?: string, ErrorThrown?: string);
        readonly ErrorStatus: number;
        readonly ErrorTitle: string;
        ToString(): string;
    }
}

declare namespace DomBehind.Data {
    enum BindingMode {
        TwoWay = 0,
        OneWay = 1,
    }
}

declare namespace DomBehind {
    class CancelEventArgs {
        Cancel: boolean;
        constructor(Cancel?: boolean);
    }
}

declare namespace DomBehind {
    class CollectionChangedEventArgs extends EventArgs {
        Item: any;
    }
}

declare namespace DomBehind {
    class EventArgs {
    }
}

declare namespace DomBehind {
    interface IEventName {
        EventName: string;
    }
    interface IEvent extends IEventName, IDisposable {
        AddHandler(handler: {
            (sender: any, data: any): void;
        }): void;
        RemoveHandler(handler: {
            (sender: any, data: any): void;
        }): void;
        Clear(): any;
        Raise(sender: any, data: any): void;
    }
    /**
     * define typed events
     */
    class TypedEvent<T> implements IEvent {
        EventName: string;
        private _eventName;
        private handlers;
        /**
         * Handle the defined event
         * @param handler
         */
        AddHandler(handler: {
            (sender: any, data: T): void;
        }): void;
        /**
         * Remove the handle from the defined event
         * @param handler
         */
        RemoveHandler(handler: {
            (sender: any, data: T): void;
        }): void;
        /**
         * Notify all of the handle
         * @param sender
         * @param data
         */
        Raise(sender: any, data: T): void;
        Clear(): void;
        Dispose(): void;
        protected _disposed: boolean;
    }
    interface IEventBuilder {
        Create(): IEvent;
        EventName: string;
    }
    /**
     * Generate a typed event class.
     */
    class EventBuilder<T> implements IEventBuilder {
        constructor(eventName: string);
        Create(): IEvent;
        /**
         * It gets the event name.
         * Event name will be used in JQuery
         */
        readonly EventName: string;
        private _eventName;
        /**
         * Generate a typed event class.
         * @param eventName
         */
        static RegisterAttached<T>(eventName?: string): IEventBuilder;
    }
}

declare namespace DomBehind {
    class Exception {
        Message: string;
        constructor(Message?: string);
        ToString(): string;
    }
}

declare function NewUid(): string;
interface IIdentity {
    __uuid?: string;
}
declare function ExtendIIdentity(): IIdentity;
declare function using<T extends DomBehind.IDisposable>(resource: T, func: (resource: T) => void): void;

declare namespace DomBehind {
    interface IDisplayMemberPath {
        DisplayMemberPath?: string;
    }
}

declare namespace DomBehind {
    interface IDisposable {
        Dispose(): void;
    }
}

declare namespace DomBehind {
    class PropertyChangedEventArgs extends EventArgs {
        Name: string;
        constructor(Name?: string);
    }
    interface INotifyPropertyChanged {
        PropertyChanged: TypedEvent<PropertyChangedEventArgs>;
    }
}

declare namespace DomBehind {
    class PropertyChangingEventArgs extends EventArgs {
        Name: string;
        OldValue: any;
        NewValue: any;
        constructor(Name?: string, OldValue?: any, NewValue?: any);
    }
    interface INotifyPropertyChanging {
        PropertyChanging: TypedEvent<PropertyChangingEventArgs>;
    }
}

declare namespace DomBehind {
    interface IValueConverter {
        Convert(value: any): any;
        ConvertBack(value: any): any;
    }
}

declare namespace DomBehind {
    class List<T> extends collections.LinkedList<T> {
    }
}

declare namespace DomBehind.Data {
    class ListCollectionView extends NotifiableImp {
        DisplayMemberPath: string;
        constructor(source: Array<any>, DisplayMemberPath?: string);
        protected Source: collections.LinkedList<any>;
        protected List: collections.LinkedList<any>;
        private _current;
        Current: any;
        OnCurrentChanging(): CancelEventArgs;
        CurrentChanging: TypedEvent<CancelEventArgs>;
        OnCurrentChanged(): void;
        CurrentChanged: TypedEvent<EventArgs>;
        Find(predicate: (x) => boolean): any;
        Contains(obj: any): boolean;
        Select(obj: any): ListCollectionView;
        UnSelect(): ListCollectionView;
        MoveFirst(): ListCollectionView;
        MoveLast(): ListCollectionView;
        Filter: (obj: any) => boolean;
        Grouping: (obj: any) => any;
        Refresh(): ListCollectionView;
        protected RefreshRaw(): void;
        OnPropertyChanged(name?: string): void;
        ViewReflected: ListCollectionView.ViewReflectedStatus;
        Begin(): ListCollectionView;
        End(): ListCollectionView;
        Add(obj: any): void;
        Added: TypedEvent<CollectionChangedEventArgs>;
        Remove(obj: any): void;
        Removed: TypedEvent<CollectionChangedEventArgs>;
        ToArray(): Array<any>;
        private engaged;
    }
}
declare namespace DomBehind.Data.ListCollectionView {
    enum ViewReflectedStatus {
        None = 0,
        NoReflected = 1,
        Reflected = 2,
    }
}

declare namespace DomBehind {
    class NotifiableImp implements IDisposable, INotifyPropertyChanged {
        PropertyChanged: TypedEvent<PropertyChangedEventArgs>;
        protected GetProperty<T>(name: string, defaultValue?: T): T;
        protected SetProperty<T>(name: string, value: T): boolean;
        protected _dic: {
            [key: string]: any;
        };
        Dispose(): void;
        protected _disposed: boolean;
        OnPropertyChanged(name: string): void;
    }
}

declare namespace DomBehind {
    class Observable<T> {
        protected source: T;
        protected marks: string[];
        static Register<T>(target: T, ...marks: string[]): Observable<T>;
        PropertyChanging: TypedEvent<PropertyChangingEventArgs>;
        PropertyChanged: TypedEvent<PropertyChangedEventArgs>;
        constructor(source: T, marks?: string[]);
        protected Recurcive(source: any, name: string, parentName: string): void;
        readonly Source: T;
        protected CreateDescriptor(notifibleName: string, value: any): PropertyDescriptor;
    }
}

declare namespace DomBehind {
    class PropertyInfo implements IDisposable {
        DataContext: any;
        MemberPath: string;
        constructor(DataContext: any, MemberPath: string);
        SetValue(value: any): void;
        GetValue(): any;
        Dispose(): void;
    }
    class LamdaExpression extends PropertyInfo {
        Lamda: (x) => any;
        constructor(dataContext: any, Lamda: (x) => any);
        private static ParsePropertyPath(exp);
        private static _extractor;
        private static _extractor_Minified;
        private static NameOf(expression);
        Dispose(): void;
        static Path<T>(exp: (x: T) => any): string;
        static GetValueCore(dataContext: any, lamda: (x) => any): any;
    }
    class BooleanFakeExpression extends PropertyInfo {
        Value: boolean;
        constructor(Value: boolean);
        SetValue(value: any): void;
        GetValue(): any;
    }
}

declare namespace DomBehind.Data {
    /**
     * Describes the timing of binding source updates.
     */
    enum UpdateSourceTrigger {
        /**
         * Updates the binding source only when you call the UpdateSource method.
         */
        Explicit = 0,
        /**
         * Updates the binding source whenever the binding target element loses focus.
         */
        LostForcus = 1,
        /**
         * This is for extension
         */
        PropertyChanged = 2,
    }
}

declare namespace DomBehind.Validation {
    class ValidationException {
        Message: string;
        Selector: string;
        constructor(Message: string, Selector: string);
    }
    class AggregateValidationException {
        Items: ValidationException[];
        constructor(Items: ValidationException[]);
    }
}

declare namespace DomBehind {
    interface BizView {
        DependencyValidate(mark?: string): any;
        DependencyValidateSetup(): any;
        DependencyValidateClear(mark?: string): any;
    }
}

declare namespace DomBehind.Validation {
    class MaxLengthValidator extends Validator {
        constructor();
        Dispose(): void;
    }
}
declare namespace DomBehind.Data {
    interface DataBindingBehaviorBuilder<T> {
        MaxLength(maxlength: number, message?: string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        MaxLength(maxlength: number, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        MaxLength(maxlength: (x: T) => number, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        MaxLength(maxlength: any, message?: any, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind.Validation {
    class RegexValidator extends Validator {
        constructor();
        RemoveValidation(): void;
        protected ValidationMessage(validity: ValidityState): string;
        Dispose(): void;
    }
}
declare namespace DomBehind.Data {
    interface DataBindingBehaviorBuilder<T> {
        Pattern(regex: string, message?: string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Pattern(regex: string, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Pattern(regex: (x: T) => string, message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Pattern(regex: any, message?: any, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind.Validation {
    class RequiredValidator extends Validator {
        constructor();
        Dispose(): void;
    }
}
declare namespace DomBehind.Data {
    interface DataBindingBehaviorBuilder<T> {
        Required(message?: string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Required(message?: (x: T) => string, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
        Required(message?: any, applyRule?: (x: T) => boolean): DataBindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind.Validation {
    abstract class Validator implements IDisposable {
        constructor(attribute?: string);
        Behavior: Data.DataBindingBehavior;
        Message: any;
        AllowApply: (x: any) => boolean;
        Attribute: string;
        HasError: boolean;
        AttributeExpression: any;
        readonly AttributeValue: string | number;
        protected ParseAttributeValue(): any;
        OnValidationg(): void;
        Apply(): void;
        RemoveValidation(): void;
        AddValidation(): void;
        Validate(value: any): boolean;
        protected ValidationMessage(validity: ValidityState): string;
        Dispose(): void;
        protected _disposed: boolean;
    }
}

declare namespace DomBehind.Validation {
    class ValidatorCollection extends collections.LinkedList<Validator> implements IDisposable {
        ClearValidator(): void;
        ApplyValidator(): void;
        Validate(): boolean;
        Dispose(): void;
        protected _disposed: boolean;
    }
}

declare namespace DomBehind.Controls {
    class Dropdown {
        static ItemsSourceProperty: Data.DependencyProperty;
        static Register(behavior: Data.DataBindingBehavior): void;
        static Rebuild(el: JQuery, list: Data.ListCollectionView): boolean;
        _engaged: boolean;
        Items: Data.ListCollectionView;
        Element: JQuery;
        OnCurrentChanged(sender: Data.ListCollectionView, e: PropertyChangedEventArgs): void;
    }
}

declare namespace DomBehind {
    interface IFooterOption<TViewModel> {
    }
    interface IHeaderOption<TViewModel> {
        add?: (x: TViewModel, row: any) => any;
        edit?: (x: TViewModel, row: any) => void;
        delete?: (x: TViewModel, row: any) => void;
        save?: (x: TViewModel, row: any) => void;
    }
    interface IGridOption<TViewModel> {
        multiSelect?: boolean;
        dragAndDropRow?: boolean;
        onSelect?: (x: TViewModel, args) => void;
        onDoubleClick?: (x: TViewModel, args) => void;
        isSpinning?: (x: TViewModel) => boolean;
        footerOption?: IFooterOption<TViewModel>;
        headerOption?: IHeaderOption<TViewModel>;
    }
    enum FieldType {
        Text = 1,
        Int = 2,
        Double = 3,
        Date = 4,
        Hex = 5,
        Money = 6,
        Currency = 7,
        Percent = 8,
        Alphanumeric = 9,
        Time = 10,
        Color = 11,
        List = 12,
    }
    interface IColumnBinding<TRow> extends IColumnBindingOption {
        advancedSearch?: FieldType;
        renderType?: RenderType;
    }
    /**
     * シンプルなカスタム表示
     * */
    enum RenderType {
        Number = 1,
        Currency = 2,
        Money = 3,
        Percent = 4,
        Time = 5,
        Date = 6,
        Age = 7,
        Toggle = 8,
    }
    interface IColumnBindingOption {
        caption?: string;
        field?: string;
        size?: string;
        min?: string;
        max?: string;
        hidden?: boolean;
        hideable?: boolean;
        sortable?: boolean;
        searchable?: boolean;
        resizable?: boolean;
        attr?: string;
        style?: string;
        render?: string | Function;
        title?: string;
        editable?: {
            fieldType?: FieldType;
            min?: number;
            max?: number;
            precision?: number;
            itemSource?: (vm: any) => any[];
            showAll?: boolean;
        };
        frozen?: boolean;
        info?: any;
    }
    class W2GridBindingBehavior extends Data.BindingBehavior {
        static IsSpinningProperty: Data.DependencyProperty;
        NewAdd: (value: Data.DataBindingBehavior) => Data.DataBindingBehavior;
        ItemsSource: PropertyInfo;
        ListCollectionView: Data.ListCollectionView;
        GridOption: IGridOption<any>;
        RowStyleBinding: (row: any) => string;
        CellStyleBinding: (row: any) => string;
        RowClassBinding: (row: any) => string;
        protected Column: IColumnBinding<any>[];
        protected Grid: W2UI.W2Grid;
        protected readonly IsMultiSelect: boolean;
        protected GenerateRecId(): number;
        private __id;
        readonly SelectedObject: any;
        AddColumn(binding: IColumnBinding<any>): void;
        Ensure(): void;
        protected SuppressListCollectionViewAction(action: (lc: Data.ListCollectionView) => void): void;
        OnSelect(sender: any, e: any): void;
        OnDoubleClick(sender: any, e: any): void;
        OnToolbarAdd(sender: any, e: any): void;
        protected AddRow(row: any): void;
        OnToolbarEdit(sender: any, e: any): void;
        OnToolbarSave(sender: any, e: any): void;
        private _deleteTargets;
        OnToolbarDelete(sender: any, e: any): void;
        private OnCurrentChanged(sender, e);
        static FieldTypeToString(type: FieldType): string;
        static RenderTypeToString(type: RenderType): string;
        private ParseCellStyles(value);
        private RowInjection(value);
    }
    class W2GridBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        protected readonly DefaultOption: IColumnBindingOption;
        ColumnBinding(title: string, binding: (row: T) => any, option?: IColumnBinding<T>): W2GridBindingBehaviorBuilder<T>;
        /**
         * 行スタイルをバインドします。
         *
         * ラムダで指定されたプロパティに格納する例：
         *  "background-color: #FBFEC0"
         *
         *  注意点として、RowStyleBindingとCellStyleBindingはどちらかしか利用できません。
         *  Rowのスタイル適用　+　Cellに個別スタイルを適用する場合は、CellStyleBinding + RowCssBinding を利用してください。
         *
         * @param styleBinding　style属性値の文字列を示すプロパティ先をラムダで指定します。
         *
         */
        RowStyleBinding(styleBinding: (row: T) => string): W2GridBindingBehaviorBuilder<T>;
        /**
         * 任意のclass属性を行にバインドします
         *
         * @param classBinding css名の文字列を示すプロパティ先をラムダで指定します
         *
         */
        RowCssBinding(classBinding: (row: T) => string): W2GridBindingBehaviorBuilder<T>;
        /**
         * セルスタイルをバインドします。
         *
         * ラムダで指定されたプロパティに格納する例（SampleIDフィールド、SampleNameフィールドがあるとして）：
         *  '{ "SampleID": "background-color: #FBFEC0; color: red", "SampleName": "background-color: #FBFEC0" }'
         *
         *  注意点として、RowStyleBindingとCellStyleBindingはどちらかしか利用できません。
         *  Rowのスタイル適用　+　Cellに個別スタイルを適用する場合は、CellStyleBinding + RowCssBinding を利用してください。
         *
         * @param cellStyleBinding style属性値の文字列を示すプロパティ先をラムダで指定します。ただし、列を示すJSON形式です
         */
        CellStyleBinding(cellStyleBinding: (row: T) => string): W2GridBindingBehaviorBuilder<T>;
    }
    interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにw2layout機構を組み込みます。
         * 実装例：
         *
         */
        BuildGrid<TRow>(itemSource: (x: T) => any, option?: IGridOption<T>): W2GridBindingBehaviorBuilder<TRow>;
    }
}

declare namespace DomBehind {
    enum W2LayoutType {
        Top = 0,
        Left = 1,
        Right = 2,
        Main = 3,
        Preview = 4,
        Bottom = 5,
    }
    interface LayoutOption {
        size?: number;
        resizable?: boolean;
        style?: string;
        overflow?: string;
        content?: string;
    }
    class W2LayoutBindingBehavior extends Data.BindingBehavior {
        static IsVisibleProperty: Data.DependencyProperty;
        static GetIsVisible(el: JQuery): boolean;
        static SetIsVisible(el: JQuery, value: any): void;
        static UriProperty: Data.DependencyProperty;
        Types: {
            [key: number]: {
                Uri: any;
                Visibility: any;
                Container: JQuery;
                Option: LayoutOption;
            };
        };
        NewAdd: (value: Data.DataBindingBehavior) => Data.DataBindingBehavior;
        protected readonly DefaultOption: LayoutOption;
        Ensure(): void;
    }
    class W2LayoutBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        Top(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Top(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Left(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Left(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Right(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Right(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Main(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Main(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Preview(bindingUri: (x: T) => any, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        Preview(uri: string, option?: LayoutOption, bindingVisible?: (x: T) => any): W2LayoutBindingBehaviorBuilder<T>;
        protected AddLayout(type: W2LayoutType, uri: any, option?: LayoutOption, bindingVisible?: (x: T) => any): void;
    }
    interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにw2layout機構を組み込みます。
         * 実装例：
         *
         */
        BuildLayout(): W2LayoutBindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind {
}

declare namespace DomBehind {
    interface ISidebarNode {
        Title: string;
        Icon?: string;
        Image?: string;
        Badge?: number;
        Style?: string;
        IsGroup?: boolean;
        AllowShowHideGroupNode?: boolean;
        AddtionalInfo?: any;
        Selected?: boolean;
        Expanded?: boolean;
        IsVisible?: boolean;
        Enabled?: boolean;
        OnClick?: Function;
        Id?: string;
        Children?: ISidebarNode[];
    }
    class W2SidebarBindingBehavior extends Data.BindingBehavior {
        Identity: string;
        ClickEvent: IEvent;
        AllowMenuExpand: boolean;
        static ItemsSource: Data.DependencyProperty;
        static BuildW2Node(value: ISidebarNode): any;
        static RecursiveNode(value: ISidebarNode[]): any;
        static FindModel(value: ISidebarNode[], id: string): any;
        Ensure(): void;
    }
    class W2SidebarBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
    }
    interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにw2sidebar機構を組み込みます。
         * 実装例：
         *
         */
        BuildSidebar(bindingNodes: (x: T) => any, selectedAction?: (x: T, args: any) => void, useCloseMenu?: boolean): W2SidebarBindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind {
    interface ISidemenuNode {
        Title: string;
        Icon?: string;
        Image?: string;
        Badge?: number;
        Style?: string;
        IsGroup?: boolean;
        AllowShowHideGroupNode?: boolean;
        AddtionalInfo?: any;
        Selected?: boolean;
        Expanded?: boolean;
        IsVisible?: boolean;
        Enabled?: boolean;
        OnClick?: Function;
        Id?: string;
        Children?: ISidemenuNode[];
    }
    class W2SidemenuBindingBehavior extends Data.BindingBehavior {
        Identity: string;
        ClickEvent: IEvent;
        AllowMenuExpand: boolean;
        static ItemsSource: Data.DependencyProperty;
        static BuildW2Node(value: ISidemenuNode): any;
        static RecursiveNode(value: ISidemenuNode[]): any;
        static FindModel(value: ISidemenuNode[], id: string): any;
        Ensure(): void;
    }
    class W2SidemenuBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
    }
    interface BindingBehaviorBuilder<T> {
        /**
         * Divタグにw2sidebar機構を組み込みます。
         * 実装例：
         *
         */
        BuildSidemenu(bindingNodes: (x: T) => any, selectedAction?: (x: T, args: any) => void, useCloseMenu?: boolean): W2SidebarBindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind {
    enum W2ToolbarItemType {
        Default = 0,
        Button = 1,
        RadioButton = 2,
        Checkbox = 3,
        Separator = 4,
        Space = 5,
        Menu = 6,
        CheckMenu = 7,
        RadioMenu = 8,
        DropHtml = 9,
        Html = 10,
    }
    interface IToolbarMenuItem {
        text: string;
        id?: any;
        checked?: boolean;
        onClick?: Function;
    }
    interface IToolbarOption {
        ClickAction?: (x: any, args: any) => void;
        EnabledBinding?: (x: any) => boolean;
        Icon?: string;
        IsChecked?: (x: any) => any;
        ItemsBinding?: (x: any) => IToolbarMenuItem[];
    }
    class W2ToolBarBindingBehavior extends Data.ActionBindingBehavior {
        Name: string;
        MenuList: List<W2UI.W2Item>;
        ToolBar: W2UI.W2Toolbar;
        Ensure(): void;
    }
    class W2ToolBarBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        AddMenuButton(title: string, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddMenuButton(bindingTitle: (x: T) => any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddMenuCheckbox(title: string, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddMenuCheckbox(bindingTitle: (x: T) => any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddDropCheckMenubox(title: string, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        AddDropCheckMenubox(binding: (x: T) => any, option?: IToolbarOption): W2ToolBarBindingBehaviorBuilder<T>;
        protected AddMenu(title: string, type: W2ToolbarItemType, option?: IToolbarOption): any;
        protected AddMenuBinding(bindingTitle: (x: T) => any, type: W2ToolbarItemType, option?: IToolbarOption): void;
        private TypeToString(type);
    }
    interface BindingBehaviorBuilder<T> {
        /**
         * DivタグにW2Toolbar機構を組み込みます。
         * 実装例：
         * .W2ToolBar((x: XXXViewModel, args: any) => x.ToolbarAction(args))
         * @param action メニュークリック時のアクションをバインドします。引数のargsはクリック時のイベント引数です
         * @param name Name属性に指定します。未指定時には任意のUUIDが付与されます
         */
        BuildToolBar(action?: (x: T, args: any) => void, name?: string): W2ToolBarBindingBehaviorBuilder<T>;
    }
}

declare namespace DomBehind.Web {
    class PlainXMLHttpRequestWorker extends Threading.WorkerWrapper {
        protected readonly WorkerScript: string;
    }
}

declare namespace DomBehind.Web {
    abstract class WebService<TRequest, TResponse> {
        protected readonly abstract Url: string;
        Timeout: number;
        Execute(request: TRequest): TResponse;
        ExecuteAjax(request: TRequest, option?: JQueryAjaxSettings): JQueryPromise<TResponse>;
        ExecuteAsync(request: TRequest): JQueryPromise<TResponse>;
        protected readonly DefaultPostSetting: JQueryAjaxSettings;
    }
}