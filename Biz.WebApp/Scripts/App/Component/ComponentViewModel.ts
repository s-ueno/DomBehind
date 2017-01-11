namespace App.Component {


    export class ComponentViewModel
        extends DomBehind.Core.BizViewModel {


        public Initialize(): void {
            this.ViewModelCollection
                = new DomBehind.Core.Data.ListCollectionView(this.CreateTabCollection(), "Title");

        }
        public ViewModelCollection: DomBehind.Core.Data.ListCollectionView;
        protected CreateTabCollection(): DomBehind.Core.Tab.UriOption[] {
            return [
                { Uri: "Component/TabContent1" },
                { Uri: "Component/TabContent2" },
            ];
        }
    }
}