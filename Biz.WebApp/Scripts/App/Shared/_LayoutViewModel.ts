


namespace App.Shared {

    export class _LayoutViewModel
        extends DomBehind.Core.BizViewModel {

        /**
         * 
         */
        public Initialize(): void {
        }


        public ShowSignIn() {

            this.ModalHelper.Show("Account/SignInDialog");

        }

    }



}

