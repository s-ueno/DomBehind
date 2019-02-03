declare namespace DomBehind {
    interface BizView {
        DependencyValidate(mark?: string): any;
        DependencyValidateSetup(): any;
        DependencyValidateClear(mark?: string): any;
    }
}
