namespace Biz.WebApp.Portal {
    export class TitleBarViewModel extends DomBehind.BizViewModel {
        public Initialize(): void {
            
        }
        public BrowserReflesh() {
            this.Navigator.Move("Portal");
        }

        public ShowContact() {
            
        }

        public SignOut() {
            let svc = new Home.SignoutWebService();
            return svc.ExecuteAjax(null).always(() => {
                this.Navigator.Move("Home");
            });
        }
    }
}