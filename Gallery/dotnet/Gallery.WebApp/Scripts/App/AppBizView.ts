namespace Gallery.WebApp {

    export abstract class AppBizView extends DomBehind.BizView {
        protected get CurrentUri(): string {
            return window.location.href.split('#')[0].split('?')[0];
        }

        protected get CurrentViewIdentity(): string {
            let relative = this.CurrentUri.Replace($.GetRootUri(), "");
            return relative;
        }

        protected get Navigator(): DomBehind.Navigation.INavigator {
            let app = DomBehind.Application.Current;
            return app.Navigator;
        }

        public /* override */ Validate(mark?: string): boolean {
            // Region未指定の場合は、従来通り
            if (String.IsNullOrWhiteSpace(mark)) {
                return super.Validate(mark);
            }

            // Region 指定の場合は、Validationにも設定しているRegionと突合する
            let result = true;
            if (this.BindingBehaviors) {
                this.RemoveValidator(mark);

                $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), (i, behavior) => {
                    // バリデーション
                    let arr = behavior.BindingPolicy.Validators.toArray().Where(x => x.ContainsMark(mark));
                    $.each(arr, (i, x) => {
                        if (x instanceof DomBehind.Validation.PipelineValidator) {
                            let dynamic: any = x as DomBehind.Validation.PipelineValidator;
                            let backup: DomBehind.Validation.Validator[] = dynamic.Validators;

                            dynamic.Validators = backup.Where(x => x.ContainsMark(mark));
                            try {
                                x.OnValidationg();
                                if (x.HasError) {
                                    result = false;
                                }
                            } finally {
                                dynamic.Validators = backup;
                            }
                        } else {
                            x.OnValidationg();
                            if (x.HasError) {
                                result = false;
                            }
                        }
                    });
                });
            }

            // サードパーティやNugetライブラリ拡張用
            if (this.DependencyValidate) {
                this.DependencyValidate(mark);
            }
            return result;
        }
    }

}