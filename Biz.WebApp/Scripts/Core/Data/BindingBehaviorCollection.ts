namespace DomBehind.Core {
    /**
     * provides the ability to easily use behaviors
     */
    export class BindingBehaviorCollection
        extends collections.LinkedList<Data.BindingBehavior>
        implements IDisposable {

        // #region Ensure

        /**
         * Ensure
         */
        public Ensure(): void {
            this.forEach(x => {
                x.Ensure();
                return true;
            });
        }

        // #endregion

        // #region List


        /**
         * lists the more behaviors
         * @param mark 
         */
        public ListDataBindingBehavior(mark?: string): Data.DataBindingBehavior[] {
            let list = this.toArray().filter(x => x instanceof Data.DataBindingBehavior);
            if (!String.IsNullOrWhiteSpace(mark)) {
                list = list.filter((x: Data.DataBindingBehavior) => x.Marks.some(y => y === mark));
            }
            return <Data.DataBindingBehavior[]>list;
        }

        // #endregion

        // #region UpdateTarget - UpdateSource

        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        public UpdateTarget(mark?: string): void {
            var list = this.ListDataBindingBehavior(mark);
            $.each(list, (i, x: Data.DataBindingBehavior) => {
                x.UpdateTarget();
            });
        }

        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        public UpdateSource(mark?: string): void {
            var list = this.ListDataBindingBehavior(mark);
            $.each(list, (i, x: Data.DataBindingBehavior) => {
                x.UpdateSource();
            });
        }

        // #endregion

        // #region


        // #endregion

        // #region Dispose

        public Dispose(): void {
            if (!this._disposed) {
                $.each(this.toArray(), (i, x) => x.Dispose());
                this.clear();
            }
            this._disposed = true;
        }
        protected _disposed: boolean = false;

        // #endregion

    }
}