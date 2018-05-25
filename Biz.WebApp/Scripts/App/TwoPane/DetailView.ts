namespace Biz.WebApp.TwoPane {
    import UIElement = DomBehind.UIElement;


    export class DetailView extends DomBehind.BizView {
        public BuildBinding(): void {
            let builder = this.CreateBindingBuilder<DetailViewModel>();


            builder.Element('.form-twopane-detail-panel input[name="CustomerId"]')
                .Binding(UIElement.ValueProperty, x => x.Row.CustomerId);
            builder.Element('.form-twopane-detail-input-field-group input[name="FirstName"]')
                .Binding(UIElement.ValueProperty, x => x.Row.FirstName);
            builder.Element('.form-twopane-detail-input-field-group input[name="LastName"]')
                .Binding(UIElement.ValueProperty, x => x.Row.LastName);



            builder.Element('.form-twopane-detail-panel > input[name="CloseButton"]')
                .BindingAction(UIElement.Click, x => x.Hide());

            builder.Element('.form-twopane-detail-panel > input[name="SaveButton"]')
                .BindingAction(UIElement.Click, x => x.Save());

        }
    }

}