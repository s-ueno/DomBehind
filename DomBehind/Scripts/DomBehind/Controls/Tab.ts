namespace DomBehind.Controls {

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
            if (!this.HasChanges(source)) return;

            this.Behavior.Element.empty();

            this.HeaderContainer = $('<ul class="nav nav-tabs">');
            this.ContentContainer = $(`<div class="tab-content">`);

            this.Options.length = 0
            var arr = source.ToArray();
            for (let i = 0; i < arr.length; i++) {
                this.NewAdd(source, arr[i], i === 0);
            }
            this.HeaderContainer.appendTo(this.Behavior.Element);
            this.ContentContainer.appendTo(this.Behavior.Element);
        }
        public HeaderContainer: JQuery;
        public ContentContainer: JQuery;

        protected NewAdd(
            source: Data.ListCollectionView, option: Tab.UriOption, isActive: boolean = false): Tab.BindingOption {
            let bindingOption = new Tab.BindingOption(this);
            bindingOption.Source = source;
            bindingOption.Option = option;
            bindingOption.IsActive = isActive;
            bindingOption.Ensure();
            this.Options.push(bindingOption);
            return bindingOption;
        }


        protected Options: Tab.BindingOption[] = [];
        protected Added(source: Data.ListCollectionView, obj: any): void {
            this.NewAdd(source, obj);
        }
        protected Removed(source: Data.ListCollectionView, obj: Tab.UriOption): void {
            obj.__header.detach();
            obj.__content.detach();
        }

    }

    export namespace Tab {
        export interface OptionInternal extends IIdentity, IDisplayMemberPath {
            __header?: JQuery;
            __content?: JQuery;

            View?: BizView;
            ViewModel?: BizViewModel;
        }
        export interface UriOption extends OptionInternal {
            Uri: string;
        }

        export class BindingOption {
            constructor(protected Parent: Tab) {
            }

            public get HeaderContainer(): JQuery {
                return this.Parent.HeaderContainer;
            }
            public Header: JQuery;

            public get ContentContainer(): JQuery {
                return this.Parent.ContentContainer;
            }
            public Content: JQuery;

            public Option: OptionInternal;
            public Source: Data.ListCollectionView;

            public IsActive: boolean;
            public Ensure(): void {

                if (!this.Option.__uuid)
                    this.Option.__uuid = NewUid();
                if (!this.Option.DisplayMemberPath)
                    this.Option.DisplayMemberPath = this.Source.DisplayMemberPath;

                var titleCss = this.IsActive ? 'active' : '';
                this.Header = $(`<li class="${titleCss}" uuid="${this.Option.__uuid}">`).appendTo(this.HeaderContainer);
                this.Option.__header = this.Header;

                // content
                var contentCss = this.IsActive ? 'tab-pane fade in active' : 'tab-pane fade';
                this.Content = $(`<div class="${contentCss}" id="${this.Option.__uuid}">`).appendTo(this.ContentContainer);
                this.Option.__content = this.Content;


                this.Content.on('RegisteredViewViewModel', (e: JQueryEventObject, behavior: Data.ViewViewModelBindingBehavior) => {
                    let element = $(e.target);
                    element.off('RegisteredViewViewModel');

                    this.Option.View = behavior.View;
                    this.Option.ViewModel = behavior.ViewModel;

                    let title = Selector.GetDisplayValue(behavior.ViewModel, this.Option.DisplayMemberPath);
                    $(`<a href="#${this.Option.__uuid}" data-toggle="tab">`)
                        .text(title)
                        .appendTo(this.Header);

                    this.PropertyChangedSafeHandle = (sender, e) => this.OnRecievePropertyChanged(e);
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
                    case this.Option.DisplayMemberPath:
                        var title = Selector.GetDisplayValue(this.Option.ViewModel, this.Option.DisplayMemberPath);
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
