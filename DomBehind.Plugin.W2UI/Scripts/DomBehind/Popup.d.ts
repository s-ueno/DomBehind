interface W2alert {
    (msg: any, title: any, okCallBack: any): any;
}
declare var w2alert: W2alert;
interface W2confirm {
    (msg: any, title: any, okCallBack: any): any;
}
declare var w2confirm: W2confirm;
declare function ShowW2alert(message: string, title?: string, okCallback?: Function): any;
declare function ShowW2confirm(message: string, title?: string, okCallback?: Function, cancelCallback?: Function): any;
declare namespace DomBehind {
    interface IPopupController {
        Show(): any;
        Message(): any;
        Close(): any;
    }
    interface IPopupOption {
        width?: number;
        height?: number;
        title?: string;
    }
    class TemplatePopup extends Data.DataBindingBehavior implements IPopupController {
        Option: IPopupOption;
        TitleExpression: LamdaExpression;
        private _currentElement;
        protected CurrentElement: JQuery;
        protected Unsubscribe(value: JQuery): void;
        protected Subscribe(value: JQuery): void;
        protected Bindings: List<{
            Binding: Data.BindingBehavior;
            Selector: string;
        }>;
        readonly LastBinding: Data.BindingBehavior;
        Close(): void;
        Show(): void;
        Message(): void;
        protected CreateOption(): any;
        UpdateTarget(): void;
        UpdateSource(): void;
        AddBinding<T extends Data.BindingBehavior>(binding: T, selector: string): T;
        protected FindTemplate(jtemplate: JQuery): JQuery;
    }
    class PopupTemplateBindingBuilder<T> extends Data.DataBindingBehaviorBuilder<T> {
        Element(value: any): PopupTemplateBindingBuilder<T>;
        Binding<P>(property: Data.DependencyProperty, bindingExpression: (x: T) => P, mode?: Data.BindingMode, updateTrigger?: Data.UpdateSourceTrigger): PopupTemplateBindingBuilder<T>;
        ConvertTarget(exp: (x: any) => any): PopupTemplateBindingBuilder<T>;
        ConvertSource(exp: (x: any) => any): PopupTemplateBindingBuilder<T>;
        BindingAction(event: IEventBuilder, action: (x: T, args: any) => void): PopupTemplateBindingBuilder<T>;
        BindingPopupTitle(exp: (vm: T) => string): PopupTemplateBindingBuilder<T>;
        AddValidator<T extends Validation.Validator>(validator: T): T;
    }
    interface BindingBehaviorBuilder<T> {
        BuildTemplatePopup(controller: (vm: T) => IPopupController, option?: IPopupOption): PopupTemplateBindingBuilder<T>;
    }
}
