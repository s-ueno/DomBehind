declare namespace DomBehind.Data {
    class ViewViewModelBindingBehavior extends BindingBehavior {
        GetView: (x: any) => BizView;
        GetViewModel: (x: any) => BizViewModel;
        View: BizView;
        ViewModel: BizViewModel;
        Ensure(): void;
        Dispose(): void;
    }
}
