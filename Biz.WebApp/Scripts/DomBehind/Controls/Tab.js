var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Tab = /** @class */ (function (_super) {
            __extends(Tab, _super);
            function Tab() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Options = [];
                return _this;
            }
            Tab.Register = function (behavior) {
                if (!behavior.Element)
                    return;
                if (behavior.AdditionalInfo[Tab.IgnoreMark])
                    return;
                if (behavior.AdditionalInfo[Tab.InstanceMark])
                    return;
                var tagName = behavior.Element.prop("tagName");
                if (tagName !== "DIV") {
                    behavior.AdditionalInfo[Tab.IgnoreMark] = true;
                    return;
                }
                behavior.AdditionalInfo[Tab.InstanceMark] = new Tab(behavior);
            };
            Tab.prototype.Render = function (source) {
                if (!this.HasChanges(source))
                    return;
                this.Behavior.Element.empty();
                this.HeaderContainer = $('<ul class="nav nav-tabs">');
                this.ContentContainer = $("<div class=\"tab-content\">");
                this.Options.length = 0;
                var arr = source.ToArray();
                for (var i = 0; i < arr.length; i++) {
                    this.NewAdd(source, arr[i], i === 0);
                }
                this.HeaderContainer.appendTo(this.Behavior.Element);
                this.ContentContainer.appendTo(this.Behavior.Element);
            };
            Tab.prototype.NewAdd = function (source, option, isActive) {
                if (isActive === void 0) { isActive = false; }
                var bindingOption = new Tab.BindingOption(this);
                bindingOption.Source = source;
                bindingOption.Option = option;
                bindingOption.IsActive = isActive;
                bindingOption.Ensure();
                this.Options.push(bindingOption);
                return bindingOption;
            };
            Tab.prototype.Added = function (source, obj) {
                this.NewAdd(source, obj);
            };
            Tab.prototype.Removed = function (source, obj) {
                obj.__header.detach();
                obj.__content.detach();
            };
            Tab.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", null, function (x, y) { }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, function (behavior) {
                Tab.Register(behavior);
            });
            Tab.IgnoreMark = "Tab.Ignore";
            Tab.InstanceMark = "Tab.Instance";
            return Tab;
        }(Controls.Selector));
        Controls.Tab = Tab;
        (function (Tab) {
            var BindingOption = /** @class */ (function () {
                function BindingOption(Parent) {
                    this.Parent = Parent;
                }
                Object.defineProperty(BindingOption.prototype, "HeaderContainer", {
                    get: function () {
                        return this.Parent.HeaderContainer;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingOption.prototype, "ContentContainer", {
                    get: function () {
                        return this.Parent.ContentContainer;
                    },
                    enumerable: true,
                    configurable: true
                });
                BindingOption.prototype.Ensure = function () {
                    var _this = this;
                    if (!this.Option.__uuid)
                        this.Option.__uuid = NewUid();
                    if (!this.Option.DisplayMemberPath)
                        this.Option.DisplayMemberPath = this.Source.DisplayMemberPath;
                    var titleCss = this.IsActive ? 'active' : '';
                    this.Header = $("<li class=\"" + titleCss + "\" uuid=\"" + this.Option.__uuid + "\">").appendTo(this.HeaderContainer);
                    this.Option.__header = this.Header;
                    // content
                    var contentCss = this.IsActive ? 'tab-pane fade in active' : 'tab-pane fade';
                    this.Content = $("<div class=\"" + contentCss + "\" id=\"" + this.Option.__uuid + "\">").appendTo(this.ContentContainer);
                    this.Option.__content = this.Content;
                    this.Content.on('RegisteredViewViewModel', function (e, behavior) {
                        var element = $(e.target);
                        element.off('RegisteredViewViewModel');
                        _this.Option.View = behavior.View;
                        _this.Option.ViewModel = behavior.ViewModel;
                        var title = Controls.Selector.GetDisplayValue(behavior.ViewModel, _this.Option.DisplayMemberPath);
                        $("<a href=\"#" + _this.Option.__uuid + "\" data-toggle=\"tab\">")
                            .text(title)
                            .appendTo(_this.Header);
                        _this.PropertyChangedSafeHandle = function (sender, e) { return _this.OnRecievePropertyChanged(e); };
                        behavior.ViewModel.PropertyChanged.AddHandler(_this.PropertyChangedSafeHandle);
                    });
                    // 
                    var uriOption = this.Option;
                    if (uriOption.Uri) {
                        this.Content.load(uriOption.Uri);
                    }
                };
                BindingOption.prototype.OnRecievePropertyChanged = function (e) {
                    switch (e.Name) {
                        case this.Option.DisplayMemberPath:
                            var title = Controls.Selector.GetDisplayValue(this.Option.ViewModel, this.Option.DisplayMemberPath);
                            this.Header.find("a").text(title);
                            break;
                        case DomBehind.LamdaExpression.Path(function (x) { return x.IsEnabled; }):
                            var enabled = this.Option.ViewModel.IsEnabled;
                            DomBehind.UIElement.IsEnabledProperty.SetValue(this.Header.find("a"), enabled);
                            DomBehind.UIElement.IsEnabledProperty.SetValue(this.Header, enabled);
                            break;
                    }
                };
                return BindingOption;
            }());
            Tab.BindingOption = BindingOption;
        })(Tab = Controls.Tab || (Controls.Tab = {}));
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Tab.js.map