namespace DomBehind.Data {
    /**
     * linking the properties of the view and the ViewModel
     */
    export class DataBindingBehavior extends BindingBehavior {
        public Property: Data.DependencyProperty;

        public get PInfo(): PropertyInfo {
            return this._pinfo;
        }
        public set PInfo(newValue: PropertyInfo) {
            if (this._pinfo === newValue) return;

            this._pinfo = newValue;
            if (newValue) {
                this.Marks.push(newValue.MemberPath);
            }
        }
        private _pinfo: PropertyInfo;

        public Marks: string[] = [];

        public AdditionalInfo: collections.LinkedDictionary<string, any>
            = new collections.LinkedDictionary<string, any>();
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

        public UpdateSourceEvent: IEvent = new TypedEvent<any>();
        /**
         * Sends the current binding target value to the binding source property
         */
        public UpdateSource(): void {
            if (this.BindingPolicy.Mode === BindingMode.OneWay) return;

            if (Object.IsNullOrUndefined(this.Property)) return;
            if (Object.IsNullOrUndefined(this.Property.GetValue)) return;

            this.PInfo.SetValue(this.ValueCore);
            this.UpdateSourceEvent.Raise(this, this.ValueCore);

            if (this.DataContext instanceof NotifiableImp) {
                var e = new PropertyChangedEventArgs(this.PInfo.MemberPath);
                (<NotifiableImp>this.DataContext).PropertyChanged.Raise(this, e);
            }
        }

        public UpdateTargetEvent: IEvent = new TypedEvent<any>();
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         */
        public UpdateTarget(): void {
            if (Object.IsNullOrUndefined(this.Property)) return;
            if (Object.IsNullOrUndefined(this.Property.SetValue)) return;

            let value = this.PInfo.GetValue();
            if (!Object.IsNullOrUndefined(this.BindingPolicy.Converter)) {
                value = this.BindingPolicy.Converter.Convert(value);
            }
            this.Property.SetValue(this.Element, value);
            this.UpdateTargetEvent.Raise(this, value);
        }

        // #endregion


        // #region Ensure

        public Ensure(): void {
            if (this.BindingPolicy.Trigger === UpdateSourceTrigger.LostForcus) {
                let event = 'focusout';
                this.Events.push(event);

                this.Element.off(event);
                this.Element.on(event, e => {
                    this.UpdateSource();
                });
            }

            if ((this.Property) && (this.Property.Ensure)) {
                this.Property.Ensure(this);
            }
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
                if (this.PInfo)
                    this.PInfo.Dispose();
                this.PInfo = null;
                this.Marks.length = 0;

                super.Dispose();
            }
        }

        // #endregion

    }
}

