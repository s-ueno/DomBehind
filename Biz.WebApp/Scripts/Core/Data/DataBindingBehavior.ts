namespace DomBehind.Core.Data {
    /**
     * linking the properties of the view and the ViewModel
     */
    export class DataBindingBehavior extends BindingBehavior {
        public Property: Data.DependencyProperty;

        public BindingExpression: (x) => any;
        public get BindingPath(): string {
            if (!this._bindingPath) {
                this._bindingPath = this.ParseBindingPath();
            }
            return this._bindingPath;
        }
        private _bindingPath: string;

        public Marks: string[] = [];

        protected Getter: (x) => any;
        protected Setter: (x, value) => void;

        // #region UpdateSource - UpdateTarget

        /**
         *  ValueCore is the input value of the view that is not transferred to the ViewModel
         */
        public get ValueCore(): any {
            let value = this.Property.GetValue(this.Element);
            if (!Object.IsNullOrUndefined(this.BindingPolicy.Converter)) {
                value = this.BindingPolicy.Converter.ConvertBack(value);
            }
            return value;
        }

        /**
         * Sends the current binding target value to the binding source property
         */
        public UpdateSource(): void {
            if (this.BindingPolicy.Mode === BindingMode.OneWay) return;

            if (Object.IsNullOrUndefined(this.Setter)) return;
            if (Object.IsNullOrUndefined(this.Property)) return;
            if (Object.IsNullOrUndefined(this.Property.GetValue)) return;

            this.Setter(this.DataContext, this.ValueCore);

            if (this.DataContext instanceof NotifiableImp) {
                var e = new PropertyChangedEventArgs(this.BindingPath);
                (<NotifiableImp>this.DataContext).PropertyChanged.Raise(this, e);
            }
        }

        /**
         * Forces a data transfer from the binding source property to the binding target property.
         */
        public UpdateTarget(): void {
            if (Object.IsNullOrUndefined(this.Property)) return;
            if (Object.IsNullOrUndefined(this.Property.SetValue)) return;
            if (Object.IsNullOrUndefined(this.Getter)) return;

            let value = this.Getter(this.DataContext);
            if (!Object.IsNullOrUndefined(this.BindingPolicy.Converter)) {
                value = this.BindingPolicy.Converter.Convert(value);
            }
            this.Property.SetValue(this.Element, value);
        }

        // #endregion


        // #region Ensure

        public Ensure(): void {
            
            if (this.BindingPolicy.Trigger === UpdateSourceTrigger.LostForcus) {
                let event = UIElement.LostForcusEvent.EventName;
                this.Events.push(event);

                this.Element.off(event);
                this.Element.on(event, e => {
                    this.UpdateSource();
                });
            }

            this.Getter = this.BindingExpression;
            this.Setter = (vm, value) => {
                var arr = this.BindingPath.split(".");
                var lastDataContext: any = this.DataContext;
                $.each(arr.slice(0, arr.length - 1), (i, source) => {
                    lastDataContext = lastDataContext[source];
                });
                var path = arr[arr.length - 1]
                lastDataContext[path] = value;
            };
        }

        protected ParseBindingPath(): string {
            var lamdaPath = Object.NameOf(this.BindingExpression);
            return lamdaPath.split(".").slice(1).join(".");
        }
        protected Events: string[] = [];
        protected EventsOff(): void {
            if (Object.IsNullOrUndefined(this.Element)) return;
            if (Object.IsNullOrUndefined(this.Events)) return;
            $.each(this.Events, (i, value) => {
                if (!String.IsNullOrEmpty(value)) {
                    this.Element.off(value);
                }
            });
        }

        // #endregion

        // #region Dispose

        public Dispose(): void {
            if (!this._disposed) {

                this.EventsOff();

                this.Property = null;
                this.Getter = null;
                this.Setter = null;
                this.Marks.length = 0;

                super.Dispose();
            }
        }

        // #endregion

    }
}
