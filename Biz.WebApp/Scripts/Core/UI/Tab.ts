namespace DomBehind.Core {

    export class Tab extends Selector {
        public static ItemsSourceProperty: Data.DependencyProperty
        = Data.DependencyProperty.RegisterAttached("itemsSource",
            null,
            (x, y) => { },
            Data.UpdateSourceTrigger.Explicit,
            Data.BindingMode.OneWay,
            behavior => {
                Tab.Register(behavior);
            });

        protected static IgnoreMark: string = "Tab.Ignore";
        protected static InstanceMark: string = "Tab.Instance";
        public static Register(behavior: Data.DataBindingBehavior): void {
            if (!behavior.Element) return;
            if (behavior.AdditionalInfo[Tab.IgnoreMark]) return;
            if (behavior.AdditionalInfo[Tab.InstanceMark]) return;

            var tagName = behavior.Element.prop("tagName");
            if (tagName !== "DIV") {
                behavior.AdditionalInfo[Tab.IgnoreMark] = true;
                return;
            }
            behavior.AdditionalInfo[Tab.InstanceMark] = new Tab(behavior);
        }

        protected Render(source: Data.ListCollectionView) {
            this.Behavior.Element.empty();

            let headerContainer = $('<ul class="nav nav-tabs">');
            let contentContainer = $(`<div class="tab-content">`);

            this.Options.length = 0
            var arr = source.List.toArray();
            for (let i = 0; i < arr.length; i++) {
                let bindingOption = new Tab.BindingOption();
                bindingOption.Source = source;
                bindingOption.HeaderContainer = headerContainer;
                bindingOption.ContentContainer = contentContainer;
                bindingOption.Option = arr[i];
                bindingOption.IsActive = i === 0;
                bindingOption.Ensure();
                this.Options.push(bindingOption);
            }

            headerContainer.appendTo(this.Behavior.Element);
            contentContainer.appendTo(this.Behavior.Element);
        }

        protected Options: Tab.BindingOption[] = [];

    }

    export namespace Tab {
        interface OptionInternal {
            __uuid?: string;
            __DisplayMemberPath?: string;
            __header?: JQuery;
            __content?: JQuery;

            View?: BizView;
            ViewModel?: BizViewModel;
        }
        export interface UriOption extends OptionInternal {
            Uri: string;
        }

        export class BindingOption {

            public HeaderContainer: JQuery;
            public Header: JQuery;

            public ContentContainer: JQuery;
            public Content: JQuery;

            public Option: OptionInternal;
            public Source: Data.ListCollectionView;

            public IsActive: boolean;
            public Ensure(): void {
                this.PropertyChangedSafeHandle = (sender, e) => this.OnRecievePropertyChanged(e);

                if (!this.Option.__uuid)
                    this.Option.__uuid = NewUid();
                if (!this.Option.__DisplayMemberPath)
                    this.Option.__DisplayMemberPath = this.Source.DisplayMemberPath;

                var titleCss = this.IsActive ? 'active' : '';
                this.Header = $(`<li class="${titleCss}">`).appendTo(this.HeaderContainer);

                // content
                var contentCss = this.IsActive ? 'tab-pane fade in active' : 'tab-pane fade';
                this.Content = $(`<div class="${contentCss}" id="${this.Option.__uuid}">`).appendTo(this.ContentContainer);
                this.Content.on('RegisteredViewViewModel', (e: JQueryEventObject, behavior: Data.ViewViewModelBindingBehavior) => {
                    let element = $(e.target);
                    element.off('RegisteredViewViewModel');

                    this.Option.View = behavior.View;
                    this.Option.ViewModel = behavior.ViewModel;

                    let title = Selector.GetDisplayValue(behavior.ViewModel, this.Option.__DisplayMemberPath);
                    $(`<a href="#${this.Option.__uuid}" data-toggle="tab">`)
                        .text(title)
                        .appendTo(this.Header);

                    behavior.ViewModel.PropertyChanged.AddHandler(this.PropertyChangedSafeHandle);
                });

                // 
                var uriOption = this.Option as UriOption;
                if (uriOption.Uri) {
                    this.Content.load(uriOption.Uri);
                }
            }

            protected PropertyChangedSafeHandle: (sender: any, e: PropertyChangedEventArgs) => void;
            protected OnRecievePropertyChanged(e: PropertyChangedEventArgs) {
                switch (e.Name) {
                    case this.Option.__DisplayMemberPath:
                        var title = Selector.GetDisplayValue(this.Option.ViewModel, this.Option.__DisplayMemberPath);
                        this.Header.find("a").text(title);
                        break;
                    case LamdaExpression.Path<BizViewModel>(x => x.IsEnabled):
                        var enabled = this.Option.ViewModel.IsEnabled;
                        UIElement.IsEnabledProperty.SetValue(this.Header.find("a"), enabled);
                        UIElement.IsEnabledProperty.SetValue(this.Header, enabled);
                        break;
                }
            }


        }

    }
}   