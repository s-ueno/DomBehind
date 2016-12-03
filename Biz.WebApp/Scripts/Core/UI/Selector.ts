namespace DomBehind.Core {
    export class Selector {
        private static IgnoreMark: string = "Selector.Ignore";
        private static InstanceMark: string = "Selector.Instance";
        public static Register(behavior: Data.DataBindingBehavior): void {
            if (!behavior.Element) return;
            if (behavior.AdditionalInfo[Selector.IgnoreMark]) return;
            if (behavior.AdditionalInfo[Selector.InstanceMark]) return;


            var tagName = behavior.Element.prop("tagName");
            if (tagName !== "SELECT") {
                behavior.AdditionalInfo[Selector.IgnoreMark] = true;
                return;
            }
            behavior.AdditionalInfo[Selector.InstanceMark] = new Selector(behavior);
        }
         constructor(public Behavior: Data.DataBindingBehavior) {
            Behavior.UpdateTargetEvent.AddHandler(
                (sender, e) => this.OnUpdateTarget(sender, e));
        }
        protected OnUpdateTarget(sender: Data.DataBindingBehavior, data: any): void {
            if (data instanceof Data.ListCollectionView) {
                this.UpdateTargetByListCollectionView(data as Data.ListCollectionView);
            } else {

            }
        }
        protected UpdateTargetByListCollectionView(source: Data.ListCollectionView): void {
            if (source.ViewReflected === Data.ListCollectionView.ViewReflectedState.UnChanged) return;
            if (source.ViewReflected === Data.ListCollectionView.ViewReflectedState.None) {
                source.PropertyChanged.AddHandler(
                    (sender, e) => this.OnDataSourcePropertyChanged(sender, e));
            }
            this.Render(source);
        }
        protected OnDataSourcePropertyChanged(
            sender: Data.ListCollectionView,
            e: PropertyChangedEventArgs): void {
            if (e.Name === "Current") {
                this.Select(sender);
            } else {
            }
        }
        protected Select(sender: Data.ListCollectionView) {
            if (Object.IsNullOrUndefined(sender.Current)) {
                
                return;
            }

            


        }

        protected Render(source: Data.ListCollectionView) {



            source.ViewReflected = Data.ListCollectionView.ViewReflectedState.UnChanged;
        }



    }
}