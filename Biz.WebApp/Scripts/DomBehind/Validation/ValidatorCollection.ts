﻿namespace DomBehind.Validation {


    export class ValidatorCollection
        extends collections.LinkedList<Validator>
        implements IDisposable {

        public RemoveValidator(): void {
            $.each(this.toArray(), (i, x) => x.RemoveValidation());
        }

        public ClearValidator(): void {
            $.each(this.toArray(), (i, x) => x.ClearValidation());
        }

        public ApplyValidator(): void {
            $.each(this.toArray(), (i, x) => x.Apply());
        }

        public Validate(): boolean {
            let result = true;
            $.each(this.toArray(), (i, x) => {
                x.OnValidationg();
                if (x.HasError) {
                    result = false;
                }
            });
            return result;
        }

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
