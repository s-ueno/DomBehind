namespace App.ContactUs {
    export interface ISampleList {
        Value: number;
        Text: string;
        Price: number;
    }
    export class ContactUsViewModel
        extends DomBehind.Core.BizViewModel {


        public Initialize(): void {
            var list: ISampleList[] = [];
            list.push({ Value: 0, Text: "AAA", Price: 250 });
            list.push({ Value: 1, Text: "BBB", Price: 135 });
            list.push({ Value: 2, Text: "CCC", Price: 700 });
            list.push({ Value: 3, Text: "DDD", Price: 499 });
            this.SampleList = new DomBehind.Core.Data.ListCollectionView(list);
        }
        public Name: string;
        public Email: string;
        public Message: string;
        public SampleList: DomBehind.Core.Data.ListCollectionView;
        public ContactUs() {
            this.UpdateTarget();
            this.SampleList.Refresh();

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

            this.SampleList.Refresh();

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
