namespace App.ContactUs {
    export class ContactUsViewModel
        extends DomBehind.Core.BizViewModel {


        public Initialize(): void {

        }
        public Name: string;
        public Email: string;
        public Message: string;

        public ContactUs() {
            if (!this.Validate()) return;

            return $.PromiseWith(d => {
                var svc = new SendWebService();
                return svc.ExecuteAsync({
                    Name: this.Name,
                    Email: this.Email,
                    Message: this.Message
                }).done(() => {
                    this.Name = "";
                    this.Email = "";
                    this.Message = "";
                    this.UpdateTarget();

                    this.Thanks();
                    d.resolve();
                }).fail(x => {
                    d.reject(new DomBehind.Core.Exception(x.ErrorMessage));
                });
            });
        }
        protected Thanks() {

            $.notify({
                icon: "glyphicon glyphicon-info-sign",
                title: '<strong>thanks for reaching out!</strong><br/>',
                message: "We always love to hear from you. Our inbox can’t wait to get your messages, so talk to us any time you like! Cheers!"
            }, {
                    allow_dismiss: true,
                    newest_on_top: false,
                    spacing: 30,
                    offset: 20,
                    delay: 5000,
                    type: "info",
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    timer: 1000,
                    mouse_over: null,
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    },

                });

        }

    }
}
