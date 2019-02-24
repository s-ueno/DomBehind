interface W2alert {
    (msg, title, okCallBack): any;
}
declare var w2alert: W2alert;

interface W2confirm {
    (msg, title, okCallBack): any;
}
declare var w2confirm: W2confirm;

function ShowW2alert(message: string, title?: string, okCallback?: Function) {
    return w2alert(message, title, okCallback);
}
function ShowW2confirm(message: string, title?: string, okCallback?: Function, cancelCallback?: Function) {
    return w2confirm(message, title, okCallback).no(() => {
        if (cancelCallback)
            cancelCallback();
    });
}

namespace DomBehind {

    export interface IPopupController {
        Show();
        Message();
        Close();
    }

    export interface IPopupOption {
        width?: number;
        height?: number;

        title?: string;
    }

    export class TemplatePopup
        extends Data.DataBindingBehavior
        implements IPopupController {

        public Option: IPopupOption;
        public TitleExpression: LamdaExpression;

        private _currentElement: JQuery;
        protected get CurrentElement(): JQuery {
            return this._currentElement;
        }
        protected set CurrentElement(newValue: JQuery) {
            if (this._currentElement === newValue) return;

            if (this._currentElement) {
                this.Unsubscribe(this._currentElement);
            }

            this._currentElement = newValue;

            if (newValue) {
                this.Subscribe(newValue);
            }
        }
        protected Unsubscribe(value: JQuery) {
            if (!this.Bindings) return;

            $.each(this.Bindings.toArray(), (i, each) => {
                let binding: Data.BindingBehavior = each.Binding;
                binding.Element.off();
                if (binding instanceof Data.ActionBindingBehavior) {
                    binding.Event.Clear();
                }
            });
        }
        protected Subscribe(value: JQuery) {
            if (!this.Bindings) return;

            $.each(this.Bindings.toArray(), (i, each) => {
                let binding: Data.BindingBehavior = each.Binding;
                let selector: string = each.Selector;

                let el = value.find(selector);
                if (el) {
                    binding.Element = el;
                    binding.Ensure();
                }
            });
        }

        protected Bindings = new List<{ Binding: Data.BindingBehavior, Selector: string }>();

        public get LastBinding(): Data.BindingBehavior {
            let b = this.Bindings.last();
            return b ? b.Binding : null;
        }

        public Close() {
            w2popup.close();
        }

        public Show() {
            let option = this.CreateOption();

            w2popup.open(option);
        }
        public Message() {
            let option = this.CreateOption();

            w2popup.message(option);
        }

        protected CreateOption() {
            let template = this.Element;
            let div = this.FindTemplate(template);

            this.CurrentElement = div.clone();

            if (!this.CurrentElement) return;

            this.UpdateTarget();

            let option: any = $.extend(true, {}, this.Option);
            option.body = this.CurrentElement;

            if (this.TitleExpression) {
                option.title = this.TitleExpression.GetValue();
            }
            return option;
        }

        public /* override */  UpdateTarget() {
            if (!this.Bindings) return;
            $.each(this.Bindings.toArray(), (i, value) => {
                if (value.Binding instanceof Data.DataBindingBehavior) {
                    value.Binding.UpdateTarget();
                }
            });
        }

        public /* override */ UpdateSource() {
            if (!this.Bindings) return;
            $.each(this.Bindings.toArray(), (i, value) => {
                if (value.Binding instanceof Data.DataBindingBehavior) {
                    value.Binding.UpdateSource();
                }
            });
        }

        public AddBinding<T extends Data.BindingBehavior>(binding: T, selector: string): T {
            this.Bindings.add({ Binding: binding, Selector: selector });
            return binding;
        }

        protected FindTemplate(jtemplate: JQuery): JQuery {
            let support = ("content" in document.createElement("template"));
            if (support) {
                let temp: HTMLTemplateElement = (<HTMLTemplateElement>jtemplate[0]);
                let template = $(temp.content.querySelector("div"));
                return template;
            } else {
                let temp: any = jtemplate[0];
                let template = $(temp.querySelector("div"));
                return template;
            }
        }
    }

    export class PopupTemplateBindingBuilder<T> extends Data.DataBindingBehaviorBuilder<T> {


        public Element(value: any): PopupTemplateBindingBuilder<T> {
            let me: PopupTemplateBindingBuilder<any> = this;
            me.CurrentSelector = value;
            return me;
        }

        public Binding<P>(
            property: Data.DependencyProperty,
            bindingExpression: (x: T) => P,
            mode?: Data.BindingMode,
            updateTrigger?: Data.UpdateSourceTrigger
        ): PopupTemplateBindingBuilder<T> {

            let me: PopupTemplateBindingBuilder<any> = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {

                let bkBehavior = me.CurrentBehavior;
                let bkElement = me.CurrentElement;

                let behavior = me.CurrentBehavior.AddBinding(new Data.DataBindingBehavior(), me.CurrentSelector);
                behavior.DataContext = me.CurrentBehavior.DataContext;
                behavior.Property = property;
                behavior.PInfo = new LamdaExpression(this.Owner.DataContext, bindingExpression);
                behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
                behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;

                me.CurrentBehavior = bkBehavior;
                me.CurrentElement = bkElement;
            }
            return me;
        }

        public /* override */ ConvertTarget(exp: (x: any) => any): PopupTemplateBindingBuilder<T> {
            let me: PopupTemplateBindingBuilder<any> = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                let lastBehavior = me.CurrentBehavior.LastBinding;
                if (lastBehavior) {
                    if (lastBehavior.BindingPolicy.Converter) {
                        throw new Exception("Another 'IValueConverter' has already been assigned.");
                    }
                    let conv = new DomBehind.SimpleConverter();
                    conv.ConvertHandler = exp;
                    lastBehavior.BindingPolicy.Converter = conv;
                }
            }
            return me;
        }
        public /* override */ ConvertSource(exp: (x: any) => any): PopupTemplateBindingBuilder<T> {
            let me: PopupTemplateBindingBuilder<any> = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                let lastBehavior = me.CurrentBehavior.LastBinding;
                if (lastBehavior) {
                    if (lastBehavior.BindingPolicy.Converter) {
                        throw new Exception("Another 'IValueConverter' has already been assigned.");
                    }
                    let conv = new DomBehind.SimpleConverter();
                    conv.ConvertBackHandler = exp;
                    lastBehavior.BindingPolicy.Converter = conv;
                }
            }
            return me;
        }

        public BindingAction(event: IEventBuilder, action: (x: T, args: any) => void): PopupTemplateBindingBuilder<T>;
        public BindingAction(event: IEventBuilder, action: (x: T, args: any) => void, allowBubbling: boolean = false): PopupTemplateBindingBuilder<T> {
            let me: PopupTemplateBindingBuilder<any> = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                let newBehavior = me.CurrentBehavior.AddBinding(new Data.ActionBindingBehavior(), me.CurrentSelector);
                newBehavior.DataContext = me.CurrentBehavior.DataContext;
                newBehavior.Event = event.Create();
                newBehavior.Action = action;
                newBehavior.ActionParameterCount = action.length;
                newBehavior.AllowBubbling = allowBubbling;
            }
            return me;
        }

        public BindingPopupTitle(exp: (vm: T) => string): PopupTemplateBindingBuilder<T> {
            let me: PopupTemplateBindingBuilder<any> = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                me.CurrentBehavior.TitleExpression = new LamdaExpression(me.CurrentBehavior.DataContext, exp);
            }
            return me;
        }

        public /* override */ AddValidator<T extends Validation.Validator>(validator: T): T {
            let me: PopupTemplateBindingBuilder<any> = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                let childBehavior = me.CurrentBehavior.LastBinding;
                if (childBehavior instanceof Data.DataBindingBehavior) {
                    validator.Behavior = childBehavior;
                    // validator.Behavior.BindingPolicy.Validators.add(validator);
                    me.CurrentBehavior.BindingPolicy.Validators.add(validator);
                }
            }
            return validator;
        }
    }

    export interface BindingBehaviorBuilder<T> {
        BuildTemplatePopup(controller: (vm: T) => IPopupController, option?: IPopupOption): PopupTemplateBindingBuilder<T>;
    }

    BindingBehaviorBuilder.prototype.BuildTemplatePopup = function (controller: (vm: any) => IPopupController, option?: IPopupOption) {
        let me: BindingBehaviorBuilder<any> = this;

        let behavior = me.Add(new TemplatePopup());
        behavior.Element = me.CurrentElement;
        behavior.Option = option;

        // コントローラーの設定
        let exp = new LamdaExpression(me.Owner.DataContext, controller);
        exp.SetValue(behavior);

        // 
        let newMe = new PopupTemplateBindingBuilder<any>(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;

        return newMe;
    }
}


