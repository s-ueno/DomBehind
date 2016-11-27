namespace DomBehind.Core.Validation {

    export abstract class Validator
        implements IDisposable {

        constructor(attribute?: string) {
            this.Attribute = attribute;
        }

        public Behavior: Data.DataBindingBehavior
        public Message: any;
        public AllowApply: (x: any) => boolean;
        public Attribute: string;
        public HasError: boolean;

        public AttributeExpression: any;
        public get AttributeValue(): string | number {
            var ret = this.ParseAttributeValue();
            return Object.IsNullOrUndefined(ret) ? "" : ret;
        }
        protected ParseAttributeValue(): any {
            if (Object.IsNullOrUndefined(this.AttributeExpression)) return null;

            let obj: Object = this.AttributeExpression;
            let value: string;
            if (typeof obj === "string" || typeof obj === "number") {
                value = this.AttributeExpression;
            } else {
                value = this.AttributeExpression(this.Behavior.DataContext);
            }
            return value;
        }

        public OnValidationg(): void {
            this.HasError = false;

            this.Apply();

            this.HasError = !this.Validate(this.Behavior.ValueCore);
            if (this.HasError) {
                var message = this.ValidationMessage(this.Behavior.Element.ValidityState());
                if (!String.IsNullOrWhiteSpace(message)) {
                    this.Behavior.Element.SetCustomError(message);
                }
            }
        }

        public /* virtual */ Apply(): void {
            if (!Object.IsNullOrUndefined(this.AllowApply)) {
                var ret = this.AllowApply(this.Behavior.DataContext);
                if (!ret) {
                    this.RemoveValidation();
                    return;
                }
            }
            this.AddValidation();
        }

        public /* virtual */ RemoveValidation(): void {
            if (!String.IsNullOrWhiteSpace(this.Attribute)) {
                this.Behavior.Element.removeAttr(this.Attribute);
            }
            this.Behavior.Element.ClearCustomError();
        }
        public /* virtual */ AddValidation(): void {
            this.RemoveValidation();

            if (!String.IsNullOrWhiteSpace(this.Attribute)) {
                this.Behavior.Element.attr(this.Attribute, this.AttributeValue);
            }
        }
        public /* virtual */ Validate(value: any): boolean {
            return !this.Behavior.Element.HasError();
        }

        protected /* virtual */ ValidationMessage(validity: ValidityState): string {
            if (Object.IsNullOrUndefined(this.Message)) return null;

            let obj: Object = this.Message;
            let errorMessage: string;
            if (typeof obj === "string") {
                errorMessage = this.Message;
            } else {
                errorMessage = this.Message(this.Behavior.DataContext);
            }
            return errorMessage;
        }

        // #region Dispose

        public Dispose(): void {
            if (!this._disposed) {

            }
            this._disposed = true;
        }
        protected _disposed: boolean = false;

        // #endregion
    }
}