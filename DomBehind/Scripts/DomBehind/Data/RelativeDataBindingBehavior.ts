namespace DomBehind.Data {
    export class RelativeDataBindingBehavior
        extends DataBindingBehavior {

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
    }
}