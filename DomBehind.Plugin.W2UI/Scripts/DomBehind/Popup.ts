interface W2alert {
    (msg, title, okCallBack): any;
}
declare var w2alert: W2alert;

interface W2confirm {
    (msg, title, okCallBack): any;
}
declare var w2confirm: W2confirm;

function ShowW2alert(message: string, title: string, okCallback: Function) {
    return w2alert(message, title, okCallback);
}
function ShowW2confirm(message: string, title: string, okCallback: Function, cancelCallback: Function) {
    return w2confirm(message, title, okCallback).no(() => {
        if (cancelCallback)
            cancelCallback();
    });
}

namespace DomBehind {

    export interface IPopupController {
        Show();
    }

    export class TemplatePopup
        extends Data.DataBindingBehavior
        implements IPopupController {


        //public DataBindings: List<{ exp: LamdaExpression, mode?: Data.BindingMode, updateTrigger?: Data.UpdateSourceTrigger }>
        //    = new List<{ exp: LamdaExpression, mode?: Data.BindingMode, updateTrigger?: Data.UpdateSourceTrigger }>();
        //public EventBindings: List<LamdaExpression> = new List<LamdaExpression>();

        protected CurrentElement: JQuery;
        protected Bindings = new List<Data.BindingBehavior>();

        Ensure(): void {

        }

        public Show() {
            let template = this.Element;
            let div = this.FindTemplate(template);
            let newElement = div.clone();





        }


        public /* override */  UpdateTarget() {
            if (!this.Bindings) return;
            $.each(this.Bindings, (i, value) => {

                if (value instanceof Data.DataBindingBehavior) {
                    
                    value.UpdateTarget();
                }
            });
        }

        public /* override */ UpdateSource() {

        }


        public AddBinding<T extends Data.BindingBehavior>(binding: T): T {
            this.Bindings.add(binding);
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

        public Binding<P>(property: Data.DependencyProperty,
            bindingExpression: (x: T) => P,
            mode?: Data.BindingMode,
            updateTrigger?: Data.UpdateSourceTrigger
        ): PopupTemplateBindingBuilder<T> {

            let me: PopupTemplateBindingBuilder<any> = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {

                let bkBehavior = me.CurrentBehavior;
                let bkElement = me.CurrentElement;

                let behavior = me.CurrentBehavior.AddBinding(new Data.DataBindingBehavior());
                behavior.Property = property;
                behavior.PInfo = new LamdaExpression(this.Owner.DataContext, bindingExpression);
                behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
                behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;

                me.CurrentBehavior = bkBehavior;
                me.CurrentElement = bkElement;
            }
            return me;
        }

        public BindingAction(event: IEventBuilder, action: (x: T, args: any) => void): PopupTemplateBindingBuilder<T>;
        public BindingAction(event: IEventBuilder, action: (x: T, args: any) => void, allowBubbling: boolean = false): PopupTemplateBindingBuilder<T> {
            let me: PopupTemplateBindingBuilder<any> = this;
            if (me.CurrentBehavior instanceof TemplatePopup) {
                let newBehavior = me.CurrentBehavior.AddBinding(new Data.ActionBindingBehavior());
                newBehavior.Event = event.Create();
                newBehavior.Action = action;
                newBehavior.ActionParameterCount = action.length;
                newBehavior.AllowBubbling = allowBubbling;
            }
            return me;
        }
    }

    export interface BindingBehaviorBuilder<T> {
        BuildTemplatePopup(controller: (vm: T) => IPopupController): PopupTemplateBindingBuilder<T>;
    }

    BindingBehaviorBuilder.prototype.BuildTemplatePopup = function (controller: (vm: any) => IPopupController) {
        let me: BindingBehaviorBuilder<any> = this;

        let behavior = me.Add(new TemplatePopup());
        behavior.Element = me.CurrentElement;

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


