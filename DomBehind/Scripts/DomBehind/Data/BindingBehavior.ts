namespace DomBehind.Data {
    /**
     * supports the link of the view and the view model
     */
    export abstract class BindingBehavior
        implements IDisposable {

        // #region property

        public DataContext: any
        public Element: JQuery;
        public BindingPolicy: BindingPolicy = new BindingPolicy();
        public Priolity: number = 0;

        public AdditionalInfo: collections.LinkedDictionary<string, any>
            = new collections.LinkedDictionary<string, any>();
        // #endregion

        // #region must inherits

        /**
         * ensure a bind
         */
        public abstract Ensure(): void;

        // #endregion

        // #region Dispose

        public Dispose(): void {
            if (!this._disposed) {
                this.DataContext = null;
                this.Element = null;
            }
            this._disposed = true;
        }
        protected _disposed: boolean = false;

        // #endregion

    }
}
