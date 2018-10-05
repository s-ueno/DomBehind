(function () {
    var support = ("content" in document.createElement("template"));

    // Set the content property if missing
    if (!support) {
        var
			/**
			 * Prefer an array to a NodeList
			 * Otherwise, updating the content property of a node
			 * will update the NodeList and we'll loose the nested <template>
			 */
            templates = Array.prototype.slice.call(document.getElementsByTagName("template")),
            template, content, fragment, node, i = 0, j;

        // For each <template> element get its content and wrap it in a document fragment
        while ((template = templates[i++])) {
            content = template.children;
            fragment = document.createDocumentFragment();

            for (j = 0; node = content[j]; j++) {
                fragment.appendChild(node);
            }

            template.content = fragment;
        }
    }

    // Prepare a clone function to allow nested <template> elements
    function clone() {
        var
            templates = this.querySelectorAll("template"),
            fragments = [],
            template,
            i = 0;

        // If the support is OK simply clone and return
        if (support) {
            template = this.cloneNode(true);
            templates = template.content.querySelectorAll("template");

            // Set the clone method for each nested <template> element
            for (; templates[i]; i++) {
                templates[i].clone = clone;
            }

            return template;
        }

        // Loop through nested <template> to retrieve the content property
        for (; templates[i]; i++) {
            fragments.push(templates[i].content);
        }

        // Now, clone the document fragment
        template = this.cloneNode(true);

        // Makes sure the clone have a "content" and "clone" properties
        template.content = this.content;
        template.clone = clone;

		/**
		 * Retrieve the nested <template> once again
		 * Since we just cloned the document fragment,
		 * the content's property of the nested <template> might be undefined
		 * We have to re-set it using the fragment array we previously got
		 */
        templates = template.querySelectorAll("template");

        // Loop to set the content property of each nested template
        for (i = 0; templates[i]; i++) {
            templates[i].content = fragments[i];
            templates[i].clone = clone; // Makes sure to set the clone method as well
        }

        return template;
    }

    templates = document.querySelectorAll("template");
    i = 0;

    // Pollute the DOM with a "clone" method on each <template> element
    while ((template = templates[i++])) {
        template.clone = clone;
    }
}());
function NewUid() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-";
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}
function ExtendIIdentity() {
    return { __uuid: NewUid() };
}
function using(resource, func) {
    try {
        func(resource);
    }
    finally {
        resource.Dispose();
    }
}
//# sourceMappingURL=Global.js.map
//# sourceMappingURL=IDisposable.js.map
var DomBehind;
(function (DomBehind) {
    var EventArgs = (function () {
        function EventArgs() {
        }
        return EventArgs;
    }());
    DomBehind.EventArgs = EventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=EventArgs.js.map
var DomBehind;
(function (DomBehind) {
    var CancelEventArgs = (function () {
        function CancelEventArgs(Cancel) {
            if (Cancel === void 0) { Cancel = false; }
            this.Cancel = Cancel;
        }
        return CancelEventArgs;
    }());
    DomBehind.CancelEventArgs = CancelEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=CancelEventArgs.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var CollectionChangedEventArgs = (function (_super) {
        __extends(CollectionChangedEventArgs, _super);
        function CollectionChangedEventArgs() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CollectionChangedEventArgs;
    }(DomBehind.EventArgs));
    DomBehind.CollectionChangedEventArgs = CollectionChangedEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=CollectionChangedEventArgs.js.map
var DomBehind;
(function (DomBehind) {
    var Exception = (function () {
        function Exception(Message) {
            this.Message = Message;
        }
        Exception.prototype.ToString = function () { return this.Message; };
        return Exception;
    }());
    DomBehind.Exception = Exception;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Exception.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var AjaxException = (function (_super) {
        __extends(AjaxException, _super);
        function AjaxException(JqXHR, TextStatus, ErrorThrown) {
            var _this = _super.call(this, TextStatus) || this;
            _this.JqXHR = JqXHR;
            _this.TextStatus = TextStatus;
            _this.ErrorThrown = ErrorThrown;
            return _this;
        }
        Object.defineProperty(AjaxException.prototype, "ErrorStatus", {
            get: function () {
                return (this.JqXHR) ? this.JqXHR.status : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjaxException.prototype, "ErrorTitle", {
            get: function () {
                if (this.JqXHR) {
                    var json = this.JqXHR.responseJSON;
                    if (json && json.Message) {
                        return json.Message;
                    }
                    return $(this.JqXHR.responseText).filter("title").text();
                }
                return this.TextStatus + ":" + this.ErrorThrown;
            },
            enumerable: true,
            configurable: true
        });
        AjaxException.prototype.ToString = function () {
            return "status:" + this.ErrorStatus + "\n" + this.ErrorTitle;
        };
        return AjaxException;
    }(DomBehind.Exception));
    DomBehind.AjaxException = AjaxException;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=AjaxException.js.map
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        var ValidationException = (function () {
            function ValidationException(Message, Selector) {
                this.Message = Message;
                this.Selector = Selector;
            }
            return ValidationException;
        }());
        Validation.ValidationException = ValidationException;
        var AggregateValidationException = (function () {
            function AggregateValidationException(Items) {
                this.Items = Items;
            }
            return AggregateValidationException;
        }());
        Validation.AggregateValidationException = AggregateValidationException;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ValidationException.js.map
var DomBehind;
(function (DomBehind) {
    var TypedEvent = (function () {
        function TypedEvent() {
            this.handlers = [];
            this._disposed = false;
        }
        Object.defineProperty(TypedEvent.prototype, "EventName", {
            get: function () {
                return this._eventName;
            },
            set: function (value) {
                this._eventName = value;
            },
            enumerable: true,
            configurable: true
        });
        TypedEvent.prototype.AddHandler = function (handler) {
            this.handlers.push(handler);
        };
        TypedEvent.prototype.RemoveHandler = function (handler) {
            this.handlers = this.handlers.filter(function (h) { return h !== handler; });
        };
        TypedEvent.prototype.Raise = function (sender, data) {
            this.handlers.slice(0).forEach(function (h) { return h(sender, data); });
        };
        TypedEvent.prototype.Clear = function () {
            var _this = this;
            $.each(this.handlers, function (i, each) {
                _this.handlers[i] = null;
            });
            this.handlers = [];
        };
        TypedEvent.prototype.Ensure = function (behavior) {
            if (this.EnsureHandler) {
                this.EnsureHandler(behavior);
            }
        };
        TypedEvent.prototype.Dispose = function () {
            if (!this._disposed) {
                if (this.handlers) {
                    this.handlers.length = 0;
                }
            }
            this._disposed = true;
        };
        return TypedEvent;
    }());
    DomBehind.TypedEvent = TypedEvent;
    var EventBuilder = (function () {
        function EventBuilder(eventName) {
            this._eventName = eventName;
        }
        EventBuilder.prototype.Create = function () {
            var event = new TypedEvent();
            event.EventName = this.EventName;
            event.EnsureHandler = this.ensureHandler;
            return event;
        };
        Object.defineProperty(EventBuilder.prototype, "EventName", {
            get: function () {
                return this._eventName;
            },
            enumerable: true,
            configurable: true
        });
        EventBuilder.RegisterAttached = function (eventName, ensure) {
            var builder = new EventBuilder(eventName);
            builder.ensureHandler = ensure;
            return builder;
        };
        return EventBuilder;
    }());
    DomBehind.EventBuilder = EventBuilder;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=EventBuilder.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var PropertyChangedEventArgs = (function (_super) {
        __extends(PropertyChangedEventArgs, _super);
        function PropertyChangedEventArgs(Name) {
            var _this = _super.call(this) || this;
            _this.Name = Name;
            return _this;
        }
        return PropertyChangedEventArgs;
    }(DomBehind.EventArgs));
    DomBehind.PropertyChangedEventArgs = PropertyChangedEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=INotifyPropertyChanged.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var PropertyChangingEventArgs = (function (_super) {
        __extends(PropertyChangingEventArgs, _super);
        function PropertyChangingEventArgs(Name, OldValue, NewValue) {
            var _this = _super.call(this) || this;
            _this.Name = Name;
            _this.OldValue = OldValue;
            _this.NewValue = NewValue;
            return _this;
        }
        return PropertyChangingEventArgs;
    }(DomBehind.EventArgs));
    DomBehind.PropertyChangingEventArgs = PropertyChangingEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=INotifyPropertyChanging.js.map
var DomBehind;
(function (DomBehind) {
    var NotifiableImp = (function () {
        function NotifiableImp() {
            this.PropertyChanged = new DomBehind.TypedEvent();
            this._dic = {};
            this._disposed = false;
        }
        NotifiableImp.prototype.GetProperty = function (name, defaultValue) {
            var obj = this._dic[name];
            return Object.IsNullOrUndefined(obj) ? defaultValue : obj;
        };
        NotifiableImp.prototype.SetProperty = function (name, value) {
            var result = false;
            var oldValue = this.GetProperty(name);
            if (value !== oldValue) {
                result = true;
                this._dic[name] = value;
                this._dic[name + "_old___"] = oldValue;
                this.OnPropertyChanged(name);
            }
            return result;
        };
        NotifiableImp.prototype.Dispose = function () {
            if (!this._disposed) {
                this._dic = null;
                if (this.PropertyChanged) {
                    this.PropertyChanged.Dispose();
                }
            }
            this._disposed = true;
        };
        NotifiableImp.prototype.OnPropertyChanged = function (name) {
            this.PropertyChanged.Raise(this, new DomBehind.PropertyChangedEventArgs(name));
        };
        return NotifiableImp;
    }());
    DomBehind.NotifiableImp = NotifiableImp;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=NotifiableImp.js.map
//# sourceMappingURL=IValueConverter.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var PropertyInfo = (function () {
        function PropertyInfo(DataContext, MemberPath) {
            this.DataContext = DataContext;
            this.MemberPath = MemberPath;
        }
        PropertyInfo.prototype.SetValue = function (value) {
            var arr = this.MemberPath.split(".");
            var lastDataContext = this.DataContext;
            $.each(arr.slice(0, arr.length - 1), function (i, source) {
                if (Object.IsNullOrUndefined(lastDataContext)) {
                    return false;
                }
                lastDataContext = lastDataContext[source];
            });
            if (Object.IsNullOrUndefined(lastDataContext)) {
                return null;
            }
            var path = arr[arr.length - 1];
            lastDataContext[path] = value;
        };
        PropertyInfo.prototype.GetValue = function () {
            var arr = this.MemberPath.split(".");
            var lastDataContext = this.DataContext;
            $.each(arr.slice(0, arr.length - 1), function (i, source) {
                if (Object.IsNullOrUndefined(lastDataContext)) {
                    return false;
                }
                lastDataContext = lastDataContext[source];
            });
            if (Object.IsNullOrUndefined(lastDataContext)) {
                return null;
            }
            var path = arr[arr.length - 1];
            return lastDataContext[path];
        };
        PropertyInfo.prototype.Dispose = function () {
            this.DataContext = null;
            this.MemberPath = null;
        };
        return PropertyInfo;
    }());
    DomBehind.PropertyInfo = PropertyInfo;
    var LamdaExpression = (function (_super) {
        __extends(LamdaExpression, _super);
        function LamdaExpression(dataContext, Lamda) {
            var _this = _super.call(this, dataContext, LamdaExpression.ParsePropertyPath(Lamda)) || this;
            _this.Lamda = Lamda;
            return _this;
        }
        LamdaExpression.ParsePropertyPath = function (exp) {
            var path = LamdaExpression.NameOf(exp);
            return path.split(".").slice(1).join(".");
        };
        LamdaExpression.NameOf = function (expression) {
            var m = LamdaExpression._extractor_Minified.exec(expression + "");
            var s = m[1].trim();
            if (s.charAt(s.length - 1) === "}" ||
                s.charAt(s.length - 1) === ";") {
                m = LamdaExpression._extractor.exec(expression + "");
                s = m[1];
            }
            return s;
        };
        LamdaExpression.prototype.Dispose = function () {
            this.Lamda = null;
            _super.prototype.Dispose.call(this);
        };
        LamdaExpression.Path = function (exp) {
            return LamdaExpression.ParsePropertyPath(exp);
        };
        LamdaExpression.GetValueCore = function (dataContext, lamda) {
            var exp = new LamdaExpression(dataContext, lamda);
            return exp.GetValue();
        };
        LamdaExpression._extractor = new RegExp("return (.*);");
        LamdaExpression._extractor_Minified = new RegExp("return (.*)}");
        return LamdaExpression;
    }(PropertyInfo));
    DomBehind.LamdaExpression = LamdaExpression;
    var BooleanFakeExpression = (function (_super) {
        __extends(BooleanFakeExpression, _super);
        function BooleanFakeExpression(Value) {
            var _this = _super.call(this, null, ".") || this;
            _this.Value = Value;
            return _this;
        }
        BooleanFakeExpression.prototype.SetValue = function (value) {
        };
        BooleanFakeExpression.prototype.GetValue = function () {
            return this.Value;
        };
        return BooleanFakeExpression;
    }(PropertyInfo));
    DomBehind.BooleanFakeExpression = BooleanFakeExpression;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=PropertyInfo.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ListCollectionView = (function (_super) {
            __extends(ListCollectionView, _super);
            function ListCollectionView(source, DisplayMemberPath) {
                var _this = _super.call(this) || this;
                _this.DisplayMemberPath = DisplayMemberPath;
                _this.CurrentChanging = new DomBehind.TypedEvent();
                _this.CurrentChanged = new DomBehind.TypedEvent();
                _this.Added = new DomBehind.TypedEvent();
                _this.Removed = new DomBehind.TypedEvent();
                _this.engaged = false;
                _this.Source = new collections.LinkedList();
                _this.List = new collections.LinkedList();
                $.each(source, function (i, value) {
                    _this.Source.add(value);
                    _this.List.add(value);
                });
                _this.ViewReflected = ListCollectionView.ViewReflectedStatus.None;
                return _this;
            }
            Object.defineProperty(ListCollectionView.prototype, "Current", {
                get: function () { return this._current; },
                set: function (value) {
                    if (this.OnCurrentChanging().Cancel)
                        return;
                    this._current = value;
                    this.ViewReflected = ListCollectionView.ViewReflectedStatus.NoReflected;
                    if (this.engaged)
                        return;
                    this.OnCurrentChanged();
                    this.OnPropertyChanged("Current");
                },
                enumerable: true,
                configurable: true
            });
            ListCollectionView.prototype.OnCurrentChanging = function () {
                var e = new DomBehind.CancelEventArgs();
                this.CurrentChanging.Raise(this, e);
                return e;
            };
            ListCollectionView.prototype.OnCurrentChanged = function () {
                if (this.engaged)
                    return;
                this.CurrentChanged.Raise(this, new DomBehind.EventArgs());
            };
            ListCollectionView.prototype.Find = function (predicate) {
                return this.List.toArray().FirstOrDefault(predicate);
            };
            ListCollectionView.prototype.Contains = function (obj) {
                var _this = this;
                if (obj instanceof Array) {
                    var contains = true;
                    $.each(obj, function (i, value) {
                        if (!_this.List.contains(value)) {
                            contains = false;
                            return false;
                        }
                    });
                    return contains;
                }
                return this.List.contains(obj);
            };
            ListCollectionView.prototype.Select = function (obj) {
                this.Current = obj;
                return this;
            };
            ListCollectionView.prototype.UnSelect = function () {
                this.Current = null;
                return this;
            };
            ListCollectionView.prototype.MoveFirst = function () {
                this.Current = this.List.first();
                return this;
            };
            ListCollectionView.prototype.MoveLast = function () {
                this.Current = this.List.last();
                return this;
            };
            ListCollectionView.prototype.MoveToPosition = function (index) {
                this.Current = this.List.elementAtIndex(index);
                return this;
            };
            ListCollectionView.prototype.Refresh = function () {
                this.RefreshRaw();
                this.OnPropertyChanged();
                return this;
            };
            ListCollectionView.prototype.RefreshRaw = function () {
                var _this = this;
                this.List = new collections.LinkedList();
                $.each(this.Source.toArray(), function (i, value) {
                    if (_this.Filter) {
                        if (_this.Filter(value)) {
                            _this.List.add(value);
                        }
                    }
                    else {
                        _this.List.add(value);
                    }
                });
                if (this.Current) {
                    if (!this.Contains(this.Current)) {
                        this.MoveFirst();
                    }
                }
            };
            ListCollectionView.prototype.OnPropertyChanged = function (name) {
                if (this.engaged)
                    return;
                this.PropertyChanged.Raise(this, new DomBehind.PropertyChangedEventArgs(name));
            };
            ListCollectionView.prototype.Begin = function () {
                this.engaged = true;
                return this;
            };
            ListCollectionView.prototype.End = function () {
                this.engaged = false;
                return this;
            };
            ListCollectionView.prototype.Add = function (obj) {
                this.Source.add(obj);
                this.RefreshRaw();
                this.ViewReflected = ListCollectionView.ViewReflectedStatus.NoReflected;
                var e = new DomBehind.CollectionChangedEventArgs();
                e.Item = obj;
                this.Added.Raise(this, e);
                this.OnPropertyChanged("Source - Add");
            };
            ListCollectionView.prototype.Remove = function (obj) {
                this.Source.remove(obj);
                this.RefreshRaw();
                this.ViewReflected = ListCollectionView.ViewReflectedStatus.NoReflected;
                var e = new DomBehind.CollectionChangedEventArgs();
                e.Item = obj;
                this.Removed.Raise(this, e);
                this.OnPropertyChanged("Source - Remove");
            };
            ListCollectionView.prototype.ToArray = function () {
                var _this = this;
                return (this.Filter) ?
                    this.List.toArray().Where(function (x) { return _this.Filter(x); }) :
                    this.List.toArray();
            };
            return ListCollectionView;
        }(DomBehind.NotifiableImp));
        Data.ListCollectionView = ListCollectionView;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ListCollectionView;
        (function (ListCollectionView) {
            var ViewReflectedStatus;
            (function (ViewReflectedStatus) {
                ViewReflectedStatus[ViewReflectedStatus["None"] = 0] = "None";
                ViewReflectedStatus[ViewReflectedStatus["NoReflected"] = 1] = "NoReflected";
                ViewReflectedStatus[ViewReflectedStatus["Reflected"] = 2] = "Reflected";
            })(ViewReflectedStatus = ListCollectionView.ViewReflectedStatus || (ListCollectionView.ViewReflectedStatus = {}));
        })(ListCollectionView = Data.ListCollectionView || (Data.ListCollectionView = {}));
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ListCollectionView.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var UpdateSourceTrigger;
        (function (UpdateSourceTrigger) {
            UpdateSourceTrigger[UpdateSourceTrigger["Explicit"] = 0] = "Explicit";
            UpdateSourceTrigger[UpdateSourceTrigger["LostForcus"] = 1] = "LostForcus";
            UpdateSourceTrigger[UpdateSourceTrigger["PropertyChanged"] = 2] = "PropertyChanged";
        })(UpdateSourceTrigger = Data.UpdateSourceTrigger || (Data.UpdateSourceTrigger = {}));
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=UpdateSourceTrigger.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var BindingMode;
        (function (BindingMode) {
            BindingMode[BindingMode["TwoWay"] = 0] = "TwoWay";
            BindingMode[BindingMode["OneWay"] = 1] = "OneWay";
            BindingMode[BindingMode["OneWayToSource"] = 2] = "OneWayToSource";
        })(BindingMode = Data.BindingMode || (Data.BindingMode = {}));
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingMode.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return List;
    }(collections.LinkedList));
    DomBehind.List = List;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=List.js.map
var DomBehind;
(function (DomBehind) {
    var Observable = (function () {
        function Observable(source, option) {
            this.source = source;
            this.PropertyChanging = new DomBehind.TypedEvent();
            this.PropertyChanged = new DomBehind.TypedEvent();
            if (source == null)
                return;
            var keys = Object.keys(source);
            var _loop_1 = function () {
                var name_1 = keys[i];
                if (String.IsNullOrWhiteSpace(name_1))
                    return "continue";
                if (option) {
                    this_1.Wrapper = option.wrapper;
                    if (option.marks) {
                        if (option.marks.Any(function (x) { return x === name_1; })) {
                            this_1.Recurcive(source, name_1, null);
                        }
                    }
                    else {
                        this_1.Recurcive(source, name_1, null);
                    }
                }
                else {
                    this_1.Recurcive(source, name_1, null);
                }
            };
            var this_1 = this;
            for (var i = 0; i < keys.length; i++) {
                _loop_1();
            }
        }
        Observable.Register = function (target) {
            var marks = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                marks[_i - 1] = arguments[_i];
            }
            return new Observable(target, { marks: marks });
        };
        Observable.RegisterAttached = function (target, option) {
            return new Observable(target, option);
        };
        Observable.prototype.Recurcive = function (source, name, parentName) {
            var value = source[name];
            var notifibleName = (parentName) ? parentName + "." + name : name;
            Object.defineProperty(source, name, this.CreateDescriptor(notifibleName, value));
            if (Object.IsNullOrUndefined(value))
                return;
            if (typeof value !== "object")
                return;
            var keys = Object.keys(value);
            for (var i = 0; i < keys.length; i++) {
                this.Recurcive(value, keys[i], notifibleName);
            }
        };
        Object.defineProperty(Observable.prototype, "Source", {
            get: function () {
                return this.source;
            },
            enumerable: true,
            configurable: true
        });
        Observable.prototype.CreateDescriptor = function (notifibleName, value) {
            var changing = this.PropertyChanging;
            var notifier = this.PropertyChanged;
            var wrapper = this.Wrapper;
            var e = new DomBehind.PropertyChangedEventArgs(notifibleName);
            var sender = this.source;
            return {
                get: function () {
                    if (wrapper)
                        return wrapper(value);
                    return value;
                },
                set: function (v) {
                    changing.Raise(sender, new DomBehind.PropertyChangingEventArgs(e.Name, value, v));
                    value = v;
                    notifier.Raise(sender, e);
                },
                enumerable: true,
                configurable: true
            };
        };
        return Observable;
    }());
    DomBehind.Observable = Observable;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Observable.js.map
//# sourceMappingURL=IDisplayMemberPath.js.map
;
Object.defineProperty(String.prototype, "ExtendedPrototype", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (key, value) {
        var me = this;
        Object.defineProperty(key, me, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: value
        });
    }
});
//# sourceMappingURL=PropertyDescriptorExtensions.js.map
"Where".ExtendedPrototype(Array.prototype, function (predicate) {
    var me = this;
    return me.filter(function (value) { return predicate(value); });
});
"Select".ExtendedPrototype(Array.prototype, function (select) {
    var me = this;
    return me.map(function (x) { return select(x); });
});
"Any".ExtendedPrototype(Array.prototype, function (predicate) {
    var me = this;
    if (!predicate) {
        return me.length !== 0;
    }
    return me.some(function (x) { return predicate(x); });
});
"OrderBy".ExtendedPrototype(Array.prototype, function (selector) {
    var me = this;
    return me.sort(function (x, y) { return selector(x) - selector(y); });
});
"OrderByDecording".ExtendedPrototype(Array.prototype, function (selector) {
    var me = this;
    return me.sort(function (x, y) { return selector(y) - selector(x); });
});
"FirstOrDefault".ExtendedPrototype(Array.prototype, function (predicate) {
    var me = this;
    if (predicate) {
        me = me.filter(function (x) { return predicate(x); });
    }
    return 0 < me.length ? me[0] : null;
});
"LastOrDefault".ExtendedPrototype(Array.prototype, function (predicate) {
    var me = this;
    if (predicate) {
        me = me.filter(function (x) { return predicate(x); });
    }
    return 0 < me.length ? me[me.length - 1] : null;
});
"GroupBy".ExtendedPrototype(Array.prototype, function (selector) {
    var me = this;
    var result = new Array();
    $.each(me, function (i, value) {
        var groupKey = selector(value);
        if (!result.some(function (x) { return x.Key === groupKey; })) {
            result.push({ Key: groupKey, Values: new Array() });
        }
        var item = result.FirstOrDefault(function (x) { return x.Key === groupKey; });
        item.Values.push(value);
    });
    return result;
});
"SequenceEqual".ExtendedPrototype(Array.prototype, function (target, predicate) {
    var me = this;
    if (Object.IsNullOrUndefined(me) ||
        Object.IsNullOrUndefined(target)) {
        return false;
    }
    if (me.length !== target.length)
        return false;
    var result = true;
    for (var i = 0; i < me.length; i++) {
        var x = me[i];
        var y = target[i];
        if (predicate) {
            if (!predicate(x, y)) {
                result = false;
                break;
            }
        }
        else {
            if (x !== y) {
                result = false;
                break;
            }
        }
    }
    return result;
});
"Sum".ExtendedPrototype(Array.prototype, function (selector) {
    var me = this;
    var value = 0;
    me.forEach(function (x) {
        value += selector(x);
    });
    return value;
});
"Chunk".ExtendedPrototype(Array.prototype, function (size) {
    var arr = this;
    if (!size) {
        size = 1;
    }
    return arr.reduce(function (chunks, el, i) {
        if (i % size === 0) {
            chunks.push([el]);
        }
        else {
            chunks[chunks.length - 1].push(el);
        }
        return chunks;
    }, []);
});
//# sourceMappingURL=EnumerableExtensions.js.map
Object.IsNullOrUndefined = function (obj) {
    if (obj == null)
        return true;
    if (obj === null)
        return true;
    if (typeof obj === 'undefined')
        return true;
    return false;
};
Object.IsPromise = function (value) {
    if (Object.IsNullOrUndefined(value))
        return false;
    if (typeof value === 'object' && typeof value.then !== "function") {
        return false;
    }
    var promiseThenSrc = String($.Deferred().then);
    var valueThenSrc = String(value.then);
    return promiseThenSrc === valueThenSrc;
};
//# sourceMappingURL=ObjectExtensions.js.map
String.IsNullOrEmpty = function (str) { return !str; };
String.IsNullOrWhiteSpace = function (s) { return String.IsNullOrEmpty(s) || s.replace(/\s/g, '').length < 1; };
String.Split = function (s, sep) {
    return s.split(sep);
};
var StringSplitOptions;
(function (StringSplitOptions) {
    StringSplitOptions[StringSplitOptions["None"] = 0] = "None";
    StringSplitOptions[StringSplitOptions["RemoveEmptyEntries"] = 1] = "RemoveEmptyEntries";
})(StringSplitOptions || (StringSplitOptions = {}));
"Split".ExtendedPrototype(String.prototype, function (separator, option) {
    var me = this;
    if (Object.IsNullOrUndefined(option) ||
        option === StringSplitOptions.RemoveEmptyEntries)
        return me.split(separator).filter(function (x) { return !String.IsNullOrWhiteSpace(x); });
    return me.split(separator);
});
"Escape".ExtendedPrototype(String.prototype, function () {
    var me = this;
    return me
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
});
"UnEscape".ExtendedPrototype(String.prototype, function () {
    var me = this;
    return me
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
});
"Replace".ExtendedPrototype(String.prototype, function (searchValue, replaceValue) {
    var me = this;
    return me.split(searchValue).join(replaceValue);
});
"Repeat".ExtendedPrototype(String.prototype, function (count) {
    'use strict';
    if (this == null) {
        throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
        count = 0;
    }
    if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
        throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
        return '';
    }
    if (str.length * count >= 1 << 28) {
        throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (;;) {
        if ((count & 1) == 1) {
            rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
            break;
        }
        str += str;
    }
    return rpt;
});
"PadLeft".ExtendedPrototype(String.prototype, function (totalWidth, paddingChar) {
    totalWidth = totalWidth >> 0;
    paddingChar = String((typeof paddingChar !== 'undefined' ? paddingChar : ' '));
    if (this.length > totalWidth) {
        return String(this);
    }
    else {
        totalWidth = totalWidth - this.length;
        if (totalWidth > paddingChar.length) {
            paddingChar += paddingChar.Repeat(totalWidth / paddingChar.length);
        }
        return paddingChar.slice(0, totalWidth) + String(this);
    }
});
"PadRight".ExtendedPrototype(String.prototype, function (totalWidth, paddingChar) {
    totalWidth = totalWidth >> 0;
    paddingChar = String((typeof paddingChar !== 'undefined' ? paddingChar : ' '));
    if (this.length > totalWidth) {
        return String(this);
    }
    else {
        totalWidth = totalWidth - this.length;
        if (totalWidth > paddingChar.length) {
            paddingChar += paddingChar.Repeat(totalWidth / paddingChar.length);
        }
        return String(this) + paddingChar.slice(0, totalWidth);
    }
});
"SubString".ExtendedPrototype(String.prototype, function (start, length) {
    var me = this;
    return me.toString().substr(start, length);
});
//# sourceMappingURL=StringExtensions.js.map
var z_indexKey = "z_indexKey";
$.GenerateZIndex = function () {
    var value = $.GetDomStorage(z_indexKey, 500);
    var newValue = value + 1;
    $.SetDomStorage(z_indexKey, newValue);
    return newValue;
};
$.GetLocalStorage = function (key, defaultValue) {
    if (!window.localStorage.getItem(key)) {
        return defaultValue;
    }
    return JSON.parse(window.localStorage.getItem(key));
};
$.SetLocalStorage = function (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
};
$.GetSessionStorage = function (key, defaultValue) {
    if (!window.sessionStorage.getItem(key)) {
        return defaultValue;
    }
    return JSON.parse(window.sessionStorage.getItem(key));
};
$.SetSessionStorage = function (key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};
$.GetDomStorage = function (key, defaultValue) {
    var value = $("body").find("#DomStorage_" + key).val();
    if (!value) {
        return defaultValue;
    }
    return JSON.parse(value);
};
$.SetDomStorage = function (key, value) {
    if ($("body").find("#DomStorage_" + key).length === 0) {
        $("<input>", {
            type: "hidden",
            id: "DomStorage_" + key,
        }).appendTo("body");
    }
    if (Object.IsNullOrUndefined(value)) {
        var domId = "#DomStorage_" + key;
        var dom = $(domId);
        if (dom.length !== 0) {
            dom.remove();
            return;
        }
    }
    $("body").find("#DomStorage_" + key).val(JSON.stringify(value));
};
$.SetRootUri = function (uri) {
    if (!uri)
        return;
    $.SetLocalStorage("RootUri", uri);
};
$.GetRootUri = function () {
    return $.GetLocalStorage("RootUri");
};
$.AbsoluteUri = function (uri) {
    var rootUri = $.GetLocalStorage("RootUri", "");
    return "" + rootUri + uri;
};
var w_dynamicPrefix = "__Framework";
$.GetWindowDynamic = function (key, defaultValue) {
    var newKey = w_dynamicPrefix + "." + key;
    return window[newKey];
};
$.SetWindowDynamic = function (key, value) {
    var newKey = w_dynamicPrefix + "." + key;
    window[newKey] = value;
};
$.fn.ValidityState = function () {
    var me = this;
    var validity = me.validity;
    if (Object.IsNullOrUndefined(validity)) {
        $.each(me, function (i, value) {
            validity = value.validity;
            if (!Object.IsNullOrUndefined(validity)) {
                return false;
            }
        });
    }
    return validity;
};
$.fn.HasError = function () {
    var me = this;
    var validity = me.ValidityState();
    return !validity.valid;
};
$.fn.SetCustomError = function (errorMessage) {
    var me = this;
    if (Object.IsNullOrUndefined(me.setCustomValidity)) {
        $.each(me, function (i, value) {
            if (!Object.IsNullOrUndefined(value.setCustomValidity)) {
                value.setCustomValidity(errorMessage);
            }
        });
    }
    else {
        me.setCustomValidity(errorMessage);
    }
};
$.fn.ClearCustomError = function () {
    var me = this;
    me.SetCustomError("");
};
$.fn.CheckValidity = function () {
    var me = this;
    var result = true;
    if (Object.IsNullOrUndefined(me.checkValidity)) {
        $.each(me, function (i, value) {
            if (!Object.IsNullOrUndefined(value.checkValidity)) {
                result = value.checkValidity();
            }
        });
    }
    else {
        result = me.checkValidity();
    }
};
$.fn.Raise = function (event) {
    var me = this;
    me.trigger(event.EventName);
};
//# sourceMappingURL=JQueryExtensions.js.map
var DomBehind;
(function (DomBehind) {
    var TypedFactory = (function () {
        function TypedFactory(_ctor) {
            this._ctor = _ctor;
        }
        TypedFactory.prototype.CreateInstance = function () {
            return new this._ctor();
        };
        return TypedFactory;
    }());
    DomBehind.TypedFactory = TypedFactory;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=TypedFactory.js.map
var DomBehind;
(function (DomBehind) {
    var Repository = (function () {
        function Repository() {
        }
        Repository.AddService = function (context, getType, priority) {
            if (priority === void 0) { priority = 0; }
            Repository.contextList.push({ Context: context, GetType: getType, Priority: priority });
        };
        Repository.RemoveService = function (context) {
            Repository.contextList = Repository.contextList.filter(function (x) { return x.Context !== context; });
        };
        Repository.GetService = function (context) {
            var value = Repository.contextList
                .Where(function (x) { return x.Context === context; })
                .OrderBy(function (x) { return x.Priority; })
                .FirstOrDefault();
            if (!value)
                return null;
            var factory = new DomBehind.TypedFactory(value.GetType());
            return factory.CreateInstance();
        };
        Repository.CreateInstance = function (resolveType) {
            var factory = new DomBehind.TypedFactory(resolveType());
            return factory.CreateInstance();
        };
        Repository.contextList = [];
        return Repository;
    }());
    DomBehind.Repository = Repository;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Repository.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var DependencyProperty = (function () {
            function DependencyProperty(name) {
                this._propertyName = name;
            }
            Object.defineProperty(DependencyProperty.prototype, "PropertyName", {
                get: function () {
                    return this._propertyName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "GetValue", {
                get: function () {
                    return this._getter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "SetValue", {
                get: function () {
                    return this._setter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "UpdateSourceTrigger", {
                get: function () {
                    return this._updateSourceTrigger;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "BindingMode", {
                get: function () {
                    return this._bindingMode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "Ensure", {
                get: function () {
                    return this._ensure;
                },
                enumerable: true,
                configurable: true
            });
            DependencyProperty.RegisterAttached = function (propertyName, getValue, setValue, defaultUpdateSourceTrigger, mode, ensure) {
                if (defaultUpdateSourceTrigger === void 0) { defaultUpdateSourceTrigger = Data.UpdateSourceTrigger.Explicit; }
                if (mode === void 0) { mode = Data.BindingMode.TwoWay; }
                var dp = new DependencyProperty(propertyName);
                dp._getter = getValue;
                dp._setter = setValue;
                dp._updateSourceTrigger = defaultUpdateSourceTrigger;
                dp._bindingMode = mode;
                dp._ensure = ensure;
                return dp;
            };
            return DependencyProperty;
        }());
        Data.DependencyProperty = DependencyProperty;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DependencyProperty.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var BindingPolicy = (function () {
            function BindingPolicy() {
                this.Trigger = Data.UpdateSourceTrigger.Explicit;
                this.Mode = Data.BindingMode.TwoWay;
                this.Validators = new DomBehind.Validation.ValidatorCollection();
            }
            return BindingPolicy;
        }());
        Data.BindingPolicy = BindingPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingPolicy.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var BindingBehavior = (function () {
            function BindingBehavior() {
                this.BindingPolicy = new Data.BindingPolicy();
                this.Priolity = 0;
                this._disposed = false;
            }
            BindingBehavior.prototype.Dispose = function () {
                if (!this._disposed) {
                    this.DataContext = null;
                    this.Element = null;
                }
                this._disposed = true;
            };
            return BindingBehavior;
        }());
        Data.BindingBehavior = BindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingBehavior.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var DataBindingBehavior = (function (_super) {
            __extends(DataBindingBehavior, _super);
            function DataBindingBehavior() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Marks = [];
                _this.AdditionalInfo = new collections.LinkedDictionary();
                _this.UpdateSourceEvent = new DomBehind.TypedEvent();
                _this.UpdateTargetEvent = new DomBehind.TypedEvent();
                _this.Events = [];
                return _this;
            }
            Object.defineProperty(DataBindingBehavior.prototype, "PInfo", {
                get: function () {
                    return this._pinfo;
                },
                set: function (newValue) {
                    if (this._pinfo === newValue)
                        return;
                    this._pinfo = newValue;
                    if (newValue) {
                        this.Marks.push(newValue.MemberPath);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBindingBehavior.prototype, "ValueCore", {
                get: function () {
                    var value = this.Property.GetValue(this.Element);
                    if (!Object.IsNullOrUndefined(this.BindingPolicy.Converter)) {
                        value = this.BindingPolicy.Converter.ConvertBack(value);
                    }
                    return value;
                },
                enumerable: true,
                configurable: true
            });
            DataBindingBehavior.prototype.UpdateSource = function () {
                if (this.BindingPolicy.Mode === Data.BindingMode.OneWay)
                    return;
                if (Object.IsNullOrUndefined(this.Property))
                    return;
                if (Object.IsNullOrUndefined(this.Property.GetValue))
                    return;
                this.PInfo.SetValue(this.ValueCore);
                this.UpdateSourceEvent.Raise(this, this.ValueCore);
                if (this.DataContext instanceof DomBehind.NotifiableImp) {
                    var e = new DomBehind.PropertyChangedEventArgs(this.PInfo.MemberPath);
                    this.DataContext.PropertyChanged.Raise(this, e);
                }
            };
            DataBindingBehavior.prototype.UpdateTarget = function () {
                if (Object.IsNullOrUndefined(this.Property))
                    return;
                if (Object.IsNullOrUndefined(this.Property.SetValue))
                    return;
                var value = this.PInfo.GetValue();
                if (!Object.IsNullOrUndefined(this.BindingPolicy.Converter)) {
                    value = this.BindingPolicy.Converter.Convert(value);
                }
                this.Property.SetValue(this.Element, value, this);
                this.UpdateTargetEvent.Raise(this, value);
            };
            DataBindingBehavior.prototype.Ensure = function () {
                var _this = this;
                if (this.BindingPolicy.Trigger === Data.UpdateSourceTrigger.LostForcus) {
                    var event_1 = 'focusout';
                    this.Events.push(event_1);
                    this.Element.off(event_1);
                    this.Element.on(event_1, function (e) {
                        _this.UpdateSource();
                    });
                }
                if ((this.Property) && (this.Property.Ensure)) {
                    this.Property.Ensure(this);
                }
            };
            DataBindingBehavior.prototype.EventsOff = function () {
                var _this = this;
                if (Object.IsNullOrUndefined(this.Element))
                    return;
                if (Object.IsNullOrUndefined(this.Events))
                    return;
                $.each(this.Events, function (i, value) {
                    if (!String.IsNullOrEmpty(value)) {
                        _this.Element.off(value);
                    }
                });
            };
            DataBindingBehavior.prototype.Dispose = function () {
                if (!this._disposed) {
                    this.EventsOff();
                    this.Property = null;
                    if (this.PInfo)
                        this.PInfo.Dispose();
                    this.PInfo = null;
                    this.Marks.length = 0;
                    _super.prototype.Dispose.call(this);
                }
            };
            return DataBindingBehavior;
        }(Data.BindingBehavior));
        Data.DataBindingBehavior = DataBindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DataBindingBehavior.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ActionBindingBehavior = (function (_super) {
            __extends(ActionBindingBehavior, _super);
            function ActionBindingBehavior() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.ActionPolicyCollection = [];
                return _this;
            }
            ActionBindingBehavior.prototype.Ensure = function () {
                var _this = this;
                this.ActionHandle = function (x) { return _this.OnTrigger(x); };
                if (this.Event && this.Event) {
                    this.Event.Ensure(this);
                }
                if (this.Event && !String.IsNullOrWhiteSpace(this.Event.EventName)) {
                    this.Element.on(this.Event.EventName, function (e) { return _this.ActionHandle(e); });
                }
                this.EventHandle = function (sender, data) { return _this.Do(sender, data); };
                if (this.Event) {
                    this.Event.AddHandler(this.EventHandle);
                }
                if (this.Element.is("a") && !this.Element.attr("href")) {
                    this.Element.attr("href", "javascript:void(0);");
                }
            };
            ActionBindingBehavior.prototype.OnTrigger = function (e) {
                this.Event.Raise(this, e);
            };
            Object.defineProperty(ActionBindingBehavior.prototype, "ActionInvoker", {
                get: function () {
                    if (!this._actionInvoker) {
                        var defaultPolicies = DomBehind.Application.Current.DefaultActionPolicy;
                        var list = this.ActionPolicyCollection.concat(defaultPolicies);
                        this._actionInvoker = this.CreateActionInvoker(list);
                    }
                    return this._actionInvoker;
                },
                enumerable: true,
                configurable: true
            });
            ActionBindingBehavior.prototype.CreateActionInvoker = function (policies) {
                var _this = this;
                var list = [];
                if (policies) {
                    list = list.concat(policies);
                }
                list = list.OrderBy(function (x) { return x.Priority(); });
                $.each(list, function (i, value) {
                    var nextIndex = i + 1;
                    if (nextIndex < list.length) {
                        value.NextPolicy = list[nextIndex];
                    }
                    value.Behavior = _this;
                });
                return list[0];
            };
            ActionBindingBehavior.prototype.Do = function (sender, e) {
                var _this = this;
                if (!this.AllowBubbling) {
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                }
                this.ActionInvoker.Do(function () {
                    var result;
                    if (_this.Action) {
                        if (_this.ActionParameterCount === 1) {
                            result = _this.Action(_this.DataContext);
                        }
                        else if (_this.ActionParameterCount === 2) {
                            result = _this.Action(_this.DataContext, e);
                        }
                        else {
                            result = _this.Action(_this.DataContext);
                        }
                    }
                    return result;
                });
            };
            ActionBindingBehavior.prototype.Dispose = function () {
                if (!this._disposed) {
                    if (!Object.IsNullOrUndefined(this.Element)) {
                        if (!Object.IsNullOrUndefined(this.Event)) {
                            if (!String.IsNullOrWhiteSpace(this.Event.EventName)) {
                                this.Element.off(this.Event.EventName, this.ActionHandle);
                            }
                            this.ActionHandle = null;
                            this.Action = null;
                            this.Event.RemoveHandler(this.EventHandle);
                            this.EventHandle = null;
                            this.Event = null;
                        }
                        this.Element = null;
                    }
                    this.ActionParameterCount = null;
                    _super.prototype.Dispose.call(this);
                }
            };
            return ActionBindingBehavior;
        }(Data.BindingBehavior));
        Data.ActionBindingBehavior = ActionBindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionBindingBehavior.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ViewViewModelBindingBehavior = (function (_super) {
            __extends(ViewViewModelBindingBehavior, _super);
            function ViewViewModelBindingBehavior() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ViewViewModelBindingBehavior.prototype.Ensure = function () {
                this.View = this.GetView(this.DataContext);
                this.ViewModel = this.GetViewModel(this.DataContext);
                this.View.Container = this.Element;
                this.View.DataContext = this.ViewModel;
                this.View.Ensure();
            };
            ViewViewModelBindingBehavior.prototype.Dispose = function () {
                if (!this._disposed) {
                    if (!Object.IsNullOrUndefined(this.View)) {
                        this.View.Dispose();
                        this.View = null;
                    }
                    if (!Object.IsNullOrUndefined(this.ViewModel)) {
                        this.ViewModel.Dispose();
                        this.ViewModel = null;
                    }
                    this.GetView = null;
                    this.GetViewModel = null;
                    _super.prototype.Dispose.call(this);
                }
            };
            return ViewViewModelBindingBehavior;
        }(Data.BindingBehavior));
        Data.ViewViewModelBindingBehavior = ViewViewModelBindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ViewViewModelBindingBehavior.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var BindingBehaviorCollection = (function (_super) {
            __extends(BindingBehaviorCollection, _super);
            function BindingBehaviorCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._disposed = false;
                return _this;
            }
            BindingBehaviorCollection.prototype.Ensure = function () {
                var _this = this;
                var sortedList = [];
                var grouping = this.toArray().GroupBy(function (x) { return x.Element; });
                grouping.forEach(function (x) {
                    var items = x.Values.OrderBy(function (x) { return x.Priolity; });
                    items.forEach(function (y) {
                        sortedList.push(y);
                    });
                });
                this.clear();
                sortedList.forEach(function (x) {
                    _this.add(x);
                    x.Ensure();
                });
            };
            BindingBehaviorCollection.prototype.ListDataBindingBehavior = function (mark) {
                var list = this.toArray().filter(function (x) { return x instanceof Data.DataBindingBehavior; });
                if (!String.IsNullOrWhiteSpace(mark)) {
                    list = list.filter(function (x) { return x.Marks.some(function (y) { return y === mark; }); });
                }
                return list;
            };
            BindingBehaviorCollection.prototype.UpdateTarget = function (mark) {
                var list = this.ListDataBindingBehavior(mark);
                $.each(list, function (i, x) {
                    x.UpdateTarget();
                });
            };
            BindingBehaviorCollection.prototype.UpdateSource = function (mark) {
                var list = this.ListDataBindingBehavior(mark);
                $.each(list, function (i, x) {
                    x.UpdateSource();
                });
            };
            BindingBehaviorCollection.prototype.Dispose = function () {
                if (!this._disposed) {
                    $.each(this.toArray(), function (i, x) { return x.Dispose(); });
                    this.clear();
                }
                this._disposed = true;
            };
            return BindingBehaviorCollection;
        }(collections.LinkedList));
        Data.BindingBehaviorCollection = BindingBehaviorCollection;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingBehaviorCollection.js.map
var DomBehind;
(function (DomBehind) {
    var BindingBehaviorBuilder = (function () {
        function BindingBehaviorBuilder(owner) {
            this.Owner = owner;
        }
        BindingBehaviorBuilder.prototype.Element = function (value) {
            if (typeof value === "string") {
                this.CurrentElement = this.Owner.Container.find(value);
                this.CurrentSelector = value;
            }
            else {
                this.CurrentElement = value;
            }
            this.CurrentBehavior = null;
            return this;
        };
        BindingBehaviorBuilder.prototype.SetValue = function (dp, value) {
            dp.SetValue(this.CurrentElement, value, this.CurrentBehavior);
            return this;
        };
        BindingBehaviorBuilder.prototype.Binding = function (property, bindingExpression, mode, updateTrigger) {
            var behavior = this.Add(new DomBehind.Data.DataBindingBehavior());
            behavior.Property = property;
            behavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, bindingExpression);
            behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
            behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;
            var dataBindingBuilder = new DomBehind.Data.DataBindingBehaviorBuilder(this.Owner);
            dataBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            dataBindingBuilder.CurrentElement = this.CurrentElement;
            return dataBindingBuilder.PartialMark(behavior.PInfo.MemberPath);
        };
        BindingBehaviorBuilder.prototype.SetConverter = function (conv) {
            this.CurrentBehavior.BindingPolicy.Converter = conv;
            return this;
        };
        BindingBehaviorBuilder.prototype.ConvertTarget = function (exp) {
            if (this.CurrentBehavior.BindingPolicy.Converter) {
                throw new DomBehind.Exception("Another 'IValueConverter' has already been assigned.");
            }
            var conv = new SimpleConverter();
            conv.ConvertHandler = exp;
            this.CurrentBehavior.BindingPolicy.Converter = conv;
            return this;
        };
        BindingBehaviorBuilder.prototype.ConvertSource = function (exp) {
            if (this.CurrentBehavior.BindingPolicy.Converter) {
                throw new DomBehind.Exception("Another 'IValueConverter' has already been assigned.");
            }
            var conv = new SimpleConverter();
            conv.ConvertBackHandler = exp;
            this.CurrentBehavior.BindingPolicy.Converter = conv;
            return this;
        };
        BindingBehaviorBuilder.prototype.BindingViewViewModel = function (view, viewModel) {
            var behavior = this.Add(new DomBehind.Data.ViewViewModelBindingBehavior());
            behavior.GetView = view;
            behavior.GetViewModel = viewModel;
            return this;
        };
        BindingBehaviorBuilder.prototype.BindingAction = function (event, action, allowBubbling) {
            if (allowBubbling === void 0) { allowBubbling = false; }
            var behavior = this.Add(new DomBehind.Data.ActionBindingBehavior());
            behavior.Event = event.Create();
            behavior.Action = action;
            behavior.ActionParameterCount = action.length;
            behavior.AllowBubbling = allowBubbling;
            var actionBindingBuilder = new DomBehind.Data.ActionBindingBehaviorBuilder(this.Owner);
            actionBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            actionBindingBuilder.CurrentElement = this.CurrentElement;
            return actionBindingBuilder;
        };
        BindingBehaviorBuilder.prototype.Add = function (behavior) {
            this.CurrentBehavior = behavior;
            behavior.DataContext = this.Owner.DataContext;
            behavior.Element = this.CurrentElement;
            this.Owner.BindingBehaviors.add(behavior);
            return behavior;
        };
        return BindingBehaviorBuilder;
    }());
    DomBehind.BindingBehaviorBuilder = BindingBehaviorBuilder;
    var SimpleConverter = (function () {
        function SimpleConverter() {
        }
        SimpleConverter.prototype.Convert = function (value) {
            return this.ConvertHandler(value);
        };
        SimpleConverter.prototype.ConvertBack = function (value) {
            return this.ConvertBackHandler(value);
        };
        return SimpleConverter;
    }());
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingBehaviorBuilder.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var DataBindingBehaviorBuilder = (function (_super) {
            __extends(DataBindingBehaviorBuilder, _super);
            function DataBindingBehaviorBuilder(owner) {
                return _super.call(this, owner) || this;
            }
            Object.defineProperty(DataBindingBehaviorBuilder.prototype, "Behavior", {
                get: function () {
                    return this.CurrentBehavior;
                },
                enumerable: true,
                configurable: true
            });
            DataBindingBehaviorBuilder.prototype.PartialMark = function () {
                var _this = this;
                var mark = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    mark[_i] = arguments[_i];
                }
                $.each(mark, function (i, value) {
                    _this.Behavior.Marks.push(value);
                });
                return this;
            };
            DataBindingBehaviorBuilder.prototype.Converter = function (converter) {
                this.Behavior.BindingPolicy.Converter = converter;
                return this;
            };
            DataBindingBehaviorBuilder.prototype.AddValidator = function (validator) {
                this.Behavior.BindingPolicy.Validators.add(validator);
                validator.Behavior = this.Behavior;
                return validator;
            };
            return DataBindingBehaviorBuilder;
        }(DomBehind.BindingBehaviorBuilder));
        Data.DataBindingBehaviorBuilder = DataBindingBehaviorBuilder;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DataBindingBehaviorBuilder.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ActionBindingBehaviorBuilder = (function (_super) {
            __extends(ActionBindingBehaviorBuilder, _super);
            function ActionBindingBehaviorBuilder(owner) {
                return _super.call(this, owner) || this;
            }
            Object.defineProperty(ActionBindingBehaviorBuilder.prototype, "Behavior", {
                get: function () {
                    return this.CurrentBehavior;
                },
                enumerable: true,
                configurable: true
            });
            ActionBindingBehaviorBuilder.prototype.ActionPolicy = function () {
                var _this = this;
                var policies = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    policies[_i] = arguments[_i];
                }
                $.each(policies, function (i, x) {
                    _this.Behavior.ActionPolicyCollection.push(x);
                });
                return this;
            };
            return ActionBindingBehaviorBuilder;
        }(DomBehind.BindingBehaviorBuilder));
        Data.ActionBindingBehaviorBuilder = ActionBindingBehaviorBuilder;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionBindingBehaviorBuilder.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ActionPolicy = (function () {
            function ActionPolicy() {
            }
            ActionPolicy.prototype.Do = function (func) {
                var _this = this;
                var result;
                try {
                    this.Begin();
                    if (Object.IsNullOrUndefined(this.NextPolicy)) {
                        result = func();
                    }
                    else {
                        result = this.NextPolicy.Do(func);
                    }
                    if (!Object.IsPromise(result)) {
                        this.Done();
                        this.Always();
                    }
                    else {
                        var exception = void 0;
                        var p = result;
                        p.done(function () {
                            _this.Done();
                            _this.Always();
                        }).fail(function (x) {
                            var ex = new Data.ActionPolicyExceptionEventArgs(_this, x);
                            _this.Fail(ex);
                            _this.Always();
                            if (!ex.Handled) {
                                return ex;
                            }
                        });
                        return p;
                    }
                }
                catch (e) {
                    var ex = new Data.ActionPolicyExceptionEventArgs(this, e);
                    this.Fail(ex);
                    this.Always();
                    if (!ex.Handled)
                        throw e;
                }
            };
            return ActionPolicy;
        }());
        Data.ActionPolicy = ActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionPolicy.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ActionPolicyExceptionEventArgs = (function (_super) {
            __extends(ActionPolicyExceptionEventArgs, _super);
            function ActionPolicyExceptionEventArgs(sender, errorData) {
                var _this = _super.call(this) || this;
                _this.Data = errorData;
                _this.Handled = false;
                _this.Sender = sender;
                return _this;
            }
            return ActionPolicyExceptionEventArgs;
        }(DomBehind.EventArgs));
        Data.ActionPolicyExceptionEventArgs = ActionPolicyExceptionEventArgs;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionPolicyExceptionEventArgs.js.map
//# sourceMappingURL=IExceptionHandling.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ExceptionHandlingActionPolicy = (function (_super) {
            __extends(ExceptionHandlingActionPolicy, _super);
            function ExceptionHandlingActionPolicy() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._priority = 1;
                return _this;
            }
            ExceptionHandlingActionPolicy.prototype.Priority = function () {
                return this._priority;
            };
            ExceptionHandlingActionPolicy.prototype.Begin = function () {
            };
            ExceptionHandlingActionPolicy.prototype.Done = function () {
            };
            ExceptionHandlingActionPolicy.prototype.Fail = function (ex) {
                if (this.Behavior.DataContext) {
                    var handlingObj = this.Behavior.DataContext;
                    if (handlingObj.Catch) {
                        handlingObj.Catch(ex);
                    }
                    if (ex.Handled)
                        return;
                }
                DomBehind.Application.Current.UnhandledException(ex.Data);
                ex.Handled = true;
            };
            ExceptionHandlingActionPolicy.prototype.Always = function () {
            };
            return ExceptionHandlingActionPolicy;
        }(Data.ActionPolicy));
        Data.ExceptionHandlingActionPolicy = ExceptionHandlingActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ExceptionHandlingActionPolicy.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ValidationExceptionHandlingActionPolicy = (function (_super) {
            __extends(ValidationExceptionHandlingActionPolicy, _super);
            function ValidationExceptionHandlingActionPolicy() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._priority = 50;
                return _this;
            }
            ValidationExceptionHandlingActionPolicy.prototype.Priority = function () {
                return this._priority;
            };
            ValidationExceptionHandlingActionPolicy.prototype.Begin = function () { };
            ValidationExceptionHandlingActionPolicy.prototype.Done = function () { };
            ValidationExceptionHandlingActionPolicy.prototype.Fail = function (ex) {
                var _this = this;
                if (!this.Supported)
                    return;
                if (ex.Data instanceof DomBehind.Validation.AggregateValidationException) {
                    var vex = ex.Data;
                    $.each(vex.Items, function (i, each) {
                        _this.SetCustomError(each);
                    });
                    ex.Handled = true;
                }
                else if (ex.Data instanceof DomBehind.Validation.ValidationException) {
                    this.SetCustomError(ex.Data);
                    ex.Handled = true;
                }
            };
            ValidationExceptionHandlingActionPolicy.prototype.SetCustomError = function (vex) {
                this.Owner.find(vex.Selector).SetCustomError(vex.Message);
            };
            Object.defineProperty(ValidationExceptionHandlingActionPolicy.prototype, "Supported", {
                get: function () {
                    if (!this.ViewModel)
                        return false;
                    if (!this.View)
                        return false;
                    if (!this.Owner)
                        return false;
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationExceptionHandlingActionPolicy.prototype, "ViewModel", {
                get: function () {
                    return this.Behavior.DataContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationExceptionHandlingActionPolicy.prototype, "View", {
                get: function () {
                    return this.ViewModel.View;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValidationExceptionHandlingActionPolicy.prototype, "Owner", {
                get: function () {
                    return this.View.Container;
                },
                enumerable: true,
                configurable: true
            });
            ValidationExceptionHandlingActionPolicy.prototype.Always = function () { };
            return ValidationExceptionHandlingActionPolicy;
        }(Data.ActionPolicy));
        Data.ValidationExceptionHandlingActionPolicy = ValidationExceptionHandlingActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ValidationExceptionHandlingActionPolicy.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var DefaultWaitingOverlayOption = (function () {
            function DefaultWaitingOverlayOption() {
                this.Color = "rgba(255, 255, 255, 0.8)";
                this.Custom = "";
                this.Fade = true;
                this.Fontawesome = "";
                this.Image = null;
                this.ImagePosition = "center center";
                this.MaxSize = "100px";
                this.MinSize = "20px";
                this.ResizeInterval = 50;
                this.Size = "50%";
                this.ZIndex = 65535;
            }
            return DefaultWaitingOverlayOption;
        }());
        var WaitingOverlayActionPolicy = (function (_super) {
            __extends(WaitingOverlayActionPolicy, _super);
            function WaitingOverlayActionPolicy(option) {
                var _this = _super.call(this) || this;
                _this._priority = 100;
                _this._option = $.extend(true, {}, new DefaultWaitingOverlayOption(), option);
                ;
                return _this;
            }
            Object.defineProperty(WaitingOverlayActionPolicy.prototype, "Option", {
                get: function () {
                    return this._option;
                },
                enumerable: true,
                configurable: true
            });
            WaitingOverlayActionPolicy.prototype.Priority = function () {
                return this._priority;
            };
            WaitingOverlayActionPolicy.prototype.Begin = function () {
                var _this = this;
                var container = this.Container();
                var overlay = $("<div>", {
                    class: "loadingoverlay",
                    css: {
                        "background-color": this.Option.Color,
                        "display": "flex",
                        "flex-direction": "column",
                        "align-items": "center",
                        "justify-content": "center"
                    }
                });
                if (this.Option.ZIndex !== undefined)
                    overlay.css("z-index", this.Option.ZIndex);
                if (this.Option.Image)
                    overlay.css({
                        "background-image": "url(" + this.Option.Image + ")",
                        "background-position": this.Option.ImagePosition,
                        "background-repeat": "no-repeat"
                    });
                if (this.Option.Fontawesome)
                    $("<div>", {
                        class: "loadingoverlay_fontawesome " + this.Option.Fontawesome
                    }).appendTo(overlay);
                if (this.Option.Custom)
                    $(this.Option.Custom).appendTo(overlay);
                if (this.IsWholePage()) {
                    overlay.css({
                        "position": "fixed",
                        "top": 0,
                        "left": 0,
                        "width": "100%",
                        "height": "100%"
                    });
                }
                else {
                    overlay.css("position", (container.css("position") == "fixed") ? "fixed" : "absolute");
                }
                this.Resize(overlay);
                if (this.Option.ResizeInterval > 0) {
                    var resizeIntervalId = setInterval(function () { return _this.Resize(overlay); }, this.Option.ResizeInterval);
                    container.data("LoadingOverlayResizeIntervalId", resizeIntervalId);
                }
                if (!this.Option.Fade) {
                    this.Option.Fade = [0, 0];
                }
                else if (this.Option.Fade === true) {
                    this.Option.Fade = [400, 200];
                }
                else if (typeof this.Option.Fade == "string" || typeof this.Option.Fade == "number") {
                    this.Option.Fade = [this.Option.Fade, this.Option.Fade];
                }
                container.data({
                    "LoadingOverlay": overlay,
                    "LoadingOverlayFadeOutDuration": this.Option.Fade[1]
                });
                overlay
                    .hide()
                    .appendTo("body")
                    .fadeIn(this.Option.Fade[0]);
            };
            WaitingOverlayActionPolicy.prototype.Resize = function (overlay) {
                var container = this.Container();
                var wholePage = this.IsWholePage();
                if (!wholePage) {
                    var x = (container.css("position") == "fixed") ? container.position() : container.offset();
                    overlay.css({
                        top: x.top + parseInt(container.css("border-top-width"), 10),
                        left: x.left + parseInt(container.css("border-left-width"), 10),
                        width: container.innerWidth(),
                        height: container.innerHeight()
                    });
                }
                var c = wholePage ? $(window) : container;
                var size = "auto";
                if (this.Option.Size && this.Option.Size != "auto") {
                    size = Math.min(c.innerWidth(), c.innerHeight()) * parseFloat(this.Option.Size) / 100;
                    if (this.Option.MaxSize && size > parseInt(this.Option.MaxSize, 10))
                        size = parseInt(this.Option.MaxSize, 10) + "px";
                    if (this.Option.MinSize && size < parseInt(this.Option.MinSize, 10))
                        size = parseInt(this.Option.MinSize, 10) + "px";
                }
                overlay.css("background-size", size);
                overlay.children(".loadingoverlay_fontawesome").css("font-size", size);
            };
            WaitingOverlayActionPolicy.prototype.Done = function () {
            };
            WaitingOverlayActionPolicy.prototype.Fail = function (ex) {
            };
            WaitingOverlayActionPolicy.prototype.Always = function () {
                var container = this.Container();
                var resizeIntervalId = container.data("LoadingOverlayResizeIntervalId");
                if (resizeIntervalId)
                    clearInterval(resizeIntervalId);
                container.data("LoadingOverlay").fadeOut(container.data("LoadingOverlayFadeOutDuration"), function () {
                    $(this).remove();
                });
                container.removeData(["LoadingOverlay", "LoadingOverlayFadeOutDuration", "LoadingOverlayResizeIntervalId"]);
            };
            return WaitingOverlayActionPolicy;
        }(Data.ActionPolicy));
        Data.WaitingOverlayActionPolicy = WaitingOverlayActionPolicy;
        var ElementWaitingOverlayActionPolicy = (function (_super) {
            __extends(ElementWaitingOverlayActionPolicy, _super);
            function ElementWaitingOverlayActionPolicy(element, option) {
                var _this = _super.call(this, option) || this;
                _this._container = element;
                _this.Option.Image = "/Content/images/preloader.gif";
                return _this;
            }
            ElementWaitingOverlayActionPolicy.prototype.Container = function () {
                return this._container;
            };
            ElementWaitingOverlayActionPolicy.prototype.IsWholePage = function () {
                return false;
            };
            return ElementWaitingOverlayActionPolicy;
        }(WaitingOverlayActionPolicy));
        Data.ElementWaitingOverlayActionPolicy = ElementWaitingOverlayActionPolicy;
        var WindowWaitingOverlayActionPolicy = (function (_super) {
            __extends(WindowWaitingOverlayActionPolicy, _super);
            function WindowWaitingOverlayActionPolicy(option) {
                return _super.call(this, $(document), option) || this;
            }
            WindowWaitingOverlayActionPolicy.prototype.IsWholePage = function () {
                return true;
            };
            return WindowWaitingOverlayActionPolicy;
        }(ElementWaitingOverlayActionPolicy));
        Data.WindowWaitingOverlayActionPolicy = WindowWaitingOverlayActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        Data.ActionBindingBehaviorBuilder.prototype.WaitingOverlay = function (policy) {
            var me = this;
            if (!policy) {
                policy = new Data.WindowWaitingOverlayActionPolicy();
            }
            me.ActionPolicy(policy);
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WaitingOverlayActionPolicy.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        var SuppressDuplicateWorkException = (function (_super) {
            __extends(SuppressDuplicateWorkException, _super);
            function SuppressDuplicateWorkException() {
                return _super.call(this, "This exception is a safe exception issued to prevent double press") || this;
            }
            return SuppressDuplicateWorkException;
        }(DomBehind.Exception));
        var SuppressDuplicateActionPolicy = (function (_super) {
            __extends(SuppressDuplicateActionPolicy, _super);
            function SuppressDuplicateActionPolicy() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._priority = 10;
                _this.IsEnabled = DomBehind.UIElement.IsEnabledProperty;
                _this.referencecount = 0;
                _this.engaged = false;
                return _this;
            }
            SuppressDuplicateActionPolicy.prototype.Priority = function () {
                return this._priority;
            };
            SuppressDuplicateActionPolicy.prototype.Begin = function () {
                ++this.referencecount;
                if (this.engaged) {
                    throw new SuppressDuplicateWorkException();
                }
                this.engaged = true;
                this.IsEnabled.SetValue(this.Behavior.Element, false);
            };
            SuppressDuplicateActionPolicy.prototype.Done = function () {
            };
            SuppressDuplicateActionPolicy.prototype.Fail = function (ex) {
                if (ex.Data instanceof SuppressDuplicateWorkException) {
                    ex.Handled = true;
                }
            };
            SuppressDuplicateActionPolicy.prototype.Always = function () {
                if (--this.referencecount === 0) {
                    this.engaged = false;
                    this.IsEnabled.SetValue(this.Behavior.Element, true);
                }
            };
            return SuppressDuplicateActionPolicy;
        }(Data.ActionPolicy));
        Data.SuppressDuplicateActionPolicy = SuppressDuplicateActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=SuppressDuplicateActionPolicy.js.map
var DomBehind;
(function (DomBehind) {
    var IndexedDBHelper = (function () {
        function IndexedDBHelper(ctor, db) {
            var schema = new ctor();
            var name = schema.constructor.name;
            if (name === "Object") {
                throw Error("dynamic object is not supported");
            }
            this.DbName = db;
            this.TableName = name;
        }
        IndexedDBHelper.prototype.List = function () {
            var _this = this;
            var d = $.Deferred();
            var db = this.Open();
            db.done(function (x) {
                if (!x.objectStoreNames.contains(_this.TableName)) {
                    d.reject();
                    return;
                }
                var trans = x.transaction(_this.TableName, "readwrite");
                var objectStore = trans.objectStore(_this.TableName);
                var dbRequest = objectStore.getAll();
                dbRequest.onsuccess = function (e) {
                    var result = dbRequest.result;
                    d.resolve(result);
                };
                dbRequest.onerror = function (e) {
                    d.reject();
                };
            }).fail(function () {
                d.reject();
            });
            return d.promise();
        };
        IndexedDBHelper.prototype.Truncate = function () {
            var _this = this;
            var d = $.Deferred();
            var db = this.Open();
            db.done(function (x) {
                if (!x.objectStoreNames.contains(_this.TableName)) {
                    d.reject();
                    return;
                }
                var trans = x.transaction(_this.TableName, "readwrite");
                var objectStore = trans.objectStore(_this.TableName);
                var dbRequest = objectStore.clear();
                dbRequest.onsuccess = function (e) {
                    d.resolve();
                };
                dbRequest.onerror = function (e) {
                    d.reject();
                };
            }).fail(function () {
                d.reject();
            });
            return d.promise();
        };
        IndexedDBHelper.prototype.FindRowAsync = function (exp, value) {
            var d = $.Deferred();
            this.FindRowsAsync(exp, value).done(function (x) {
                d.resolve(x.FirstOrDefault());
            }).fail(function (x) {
                d.reject(x);
            });
            return d.promise();
        };
        IndexedDBHelper.prototype.FindRowsAsync = function (exp, value) {
            var _this = this;
            var path = DomBehind.LamdaExpression.Path(exp);
            var d = $.Deferred();
            var db = this.Open();
            db.done(function (x) {
                if (!x.objectStoreNames.contains(_this.TableName)) {
                    d.reject();
                    return;
                }
                var trans = x.transaction(_this.TableName, "readwrite");
                var objectStore = trans.objectStore(_this.TableName);
                if (objectStore.keyPath === path) {
                    var dbRequest_1 = objectStore.get(value);
                    dbRequest_1.onsuccess = function (e) {
                        var result = [dbRequest_1.result];
                        d.resolve(result);
                    };
                    dbRequest_1.onerror = function (e) {
                        d.reject(e);
                    };
                }
                else if (objectStore.indexNames.contains(path)) {
                    _this.FetchCursor(objectStore.index(path), value, d);
                }
                else {
                    x.close();
                    _this.Upgrade(x.version + 1, function (y) {
                        var newDb = y.target.result;
                        var newTrans = y.target.transaction;
                        var newObjectStore = newTrans.objectStore(_this.TableName);
                        var indexStore = newObjectStore.createIndex(path, path, { unique: false });
                        _this.FetchCursor(indexStore, value, d);
                    });
                }
            }).fail(function (x) {
                d.reject(x);
            });
            return d.promise();
        };
        IndexedDBHelper.prototype.FetchCursor = function (indexStore, value, d) {
            var list = new DomBehind.List();
            var cursorHandler = indexStore.openCursor(value);
            cursorHandler.onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    var value_1 = cursor.value;
                    if (!Object.IsNullOrUndefined(value_1)) {
                        list.add(value_1);
                    }
                    cursor.continue();
                }
                else {
                    d.resolve(list.toArray());
                }
            };
            cursorHandler.onerror = function (e) {
                d.reject(e);
            };
        };
        IndexedDBHelper.prototype.UpsertAsync = function (entity, primaryKey) {
            var _this = this;
            var path;
            if (primaryKey) {
                path = DomBehind.LamdaExpression.Path(primaryKey);
            }
            var d = $.Deferred();
            var db = this.Open();
            db.done(function (x) {
                if (!x.objectStoreNames.contains(_this.TableName)) {
                    x.close();
                    _this.Upgrade(x.version + 1, function (y) {
                        var newDb = y.target.result;
                        var newStore;
                        if (path) {
                            newStore = newDb.createObjectStore(_this.TableName, { keyPath: path });
                        }
                        else {
                            newStore = newDb.createObjectStore(_this.TableName, { keyPath: "__identity", autoIncrement: true });
                        }
                        newStore.transaction.oncomplete = function (e) {
                            newDb.close();
                            _this.UpsertAsync(entity, primaryKey).done(function (x) { return d.resolve(); }).fail(function (x) { return d.reject(x); });
                        };
                    });
                    return;
                }
                var trans = x.transaction(_this.TableName, "readwrite");
                var store = trans.objectStore(_this.TableName);
                store.put(entity);
                d.resolve();
            }).fail(function (x) {
                d.reject(x);
            });
            return d.promise();
        };
        IndexedDBHelper.prototype.DeleteAsync = function (entity) {
            var _this = this;
            var d = $.Deferred();
            var db = this.Open();
            db.done(function (x) {
                var trans = x.transaction(_this.TableName, "readwrite");
                if (trans.objectStoreNames.contains(_this.TableName)) {
                    var store = trans.objectStore(_this.TableName);
                    var identity = entity["" + store.keyPath];
                    store.delete(identity);
                    d.resolve();
                }
                else {
                    d.reject("table not found. " + _this.TableName);
                }
            }).fail(function (x) {
                d.reject(x);
            });
            return d.promise();
        };
        IndexedDBHelper.prototype.Open = function () {
            var d = $.Deferred();
            var factory = window.indexedDB;
            var openRequest = factory.open(this.DbName);
            openRequest.onsuccess = function (e) {
                var db = openRequest.result;
                d.resolve(db);
                db.close();
            };
            openRequest.onblocked = function (e) {
                d.reject(e);
            };
            openRequest.onerror = function (e) {
                d.reject(e);
            };
            return d.promise();
        };
        IndexedDBHelper.prototype.Upgrade = function (version, action) {
            var factory = window.indexedDB;
            var openRequest = factory.open(this.DbName, version);
            openRequest.onsuccess = function (e) {
                var dummy = e;
            };
            openRequest.onupgradeneeded = function (e) {
                var db = e.target.result;
                action(e);
                db.close();
            };
            openRequest.onerror = function (e) {
            };
        };
        return IndexedDBHelper;
    }());
    DomBehind.IndexedDBHelper = IndexedDBHelper;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=IndexedDBHelper.js.map
var DomBehind;
(function (DomBehind) {
    var Navigation;
    (function (Navigation) {
        var ModalStartupLocation;
        (function (ModalStartupLocation) {
            ModalStartupLocation[ModalStartupLocation["CenterScreen"] = 0] = "CenterScreen";
            ModalStartupLocation[ModalStartupLocation["Manual"] = 1] = "Manual";
        })(ModalStartupLocation = Navigation.ModalStartupLocation || (Navigation.ModalStartupLocation = {}));
    })(Navigation = DomBehind.Navigation || (DomBehind.Navigation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=INavigator.js.map
var DomBehind;
(function (DomBehind) {
    var Navigation;
    (function (Navigation) {
        var OnModalCloseEventName = "ModalClose";
        var ReferenceCountKey = "ReferenceCountKey";
        var DefaultNavigator = (function () {
            function DefaultNavigator() {
                this.DefaultSetting = {
                    FadeInDuration: 100,
                    FadeOutDuration: 100,
                    AllowCloseByClickOverlay: true,
                    ShowCloseButton: true,
                    ShowHeader: true,
                    StartupLocation: Navigation.ModalStartupLocation.CenterScreen,
                    StartupLocationTop: null,
                    StartupLocationLeft: null
                };
            }
            DefaultNavigator.prototype.NewWindow = function (uri, target, style) {
                if (!String.IsNullOrWhiteSpace(uri) && uri !== "about:blank") {
                    uri = $.AbsoluteUri(uri);
                }
                return window.open(uri, target, style);
            };
            DefaultNavigator.prototype.Move = function (uri, historyBack) {
                uri = $.AbsoluteUri(uri);
                if (location.href === uri)
                    return;
                if (historyBack) {
                    location.href = uri;
                }
                else {
                    location.replace(uri);
                }
            };
            DefaultNavigator.prototype.Reload = function (forcedReload) {
                location.reload(forcedReload);
            };
            DefaultNavigator.prototype.ShowModal = function (arg, option) {
                var setting = $.extend(true, this.DefaultSetting, option);
                ;
                var overlay = $("<div>", {
                    class: "modal-overlay",
                });
                overlay.css("z-index", $.GenerateZIndex());
                $("body").css("overflow", "hidden");
                overlay
                    .appendTo("body")
                    .fadeIn(setting.FadeInDuration, function () {
                    $.SetDomStorage(ReferenceCountKey, $.GetDomStorage(ReferenceCountKey, 0) + 1);
                });
                var container;
                if (typeof arg === "string") {
                    var ex;
                    var ajax = $.ajax({
                        url: $.AbsoluteUri(arg),
                        async: false,
                        type: "GET",
                        cache: false,
                        error: function (xhr, status, error) {
                            ex = new DomBehind.AjaxException(xhr, status, error);
                        },
                    });
                    if (ex)
                        throw ex;
                    var html = ajax.responseText;
                    container = $(html);
                }
                else {
                    container = arg;
                }
                container.find(".close").on("click", function (e, args) {
                    $(e.target).trigger(OnModalCloseEventName, args);
                });
                if (!setting.ShowCloseButton) {
                    container.find(".close").hide();
                }
                if (setting.StartupLocation === Navigation.ModalStartupLocation.Manual) {
                    if (Object.IsNullOrUndefined(setting.StartupLocationTop) &&
                        Object.IsNullOrUndefined(setting.StartupLocationLeft)) {
                        var buffCount = $.GetDomStorage(ReferenceCountKey, 0) + 1;
                        container.find(".modal-dialog")
                            .css("top", -50 + (buffCount * 5) + "%")
                            .css("left", -25 + (buffCount * 5) + "%");
                    }
                    else {
                        container.find(".modal-dialog")
                            .css("top", setting.StartupLocationTop)
                            .css("left", setting.StartupLocationLeft);
                    }
                }
                var modal = container.find(".modal-dialog");
                if (modal.draggable) {
                    modal.draggable({
                        handle: ".modal-header",
                        cursor: "move",
                    });
                }
                if (setting.Width) {
                    modal.css("width", option.Width);
                }
                if (setting.Height) {
                    modal.css("height", option.Height);
                }
                if (!setting.ShowHeader) {
                    container.find(".modal-header").hide();
                    container.find(".modal-body").css("height", "100%");
                }
                if (setting.AllowCloseByClickOverlay) {
                    overlay.click(overlay, function (e) {
                        $(e.target).trigger(OnModalCloseEventName);
                    });
                    container.click(function (e) {
                        e.stopPropagation();
                    });
                }
                var d = $.Deferred();
                overlay.off(OnModalCloseEventName);
                overlay.on(OnModalCloseEventName, { me: overlay, option: setting, target: container }, function (e, args) {
                    var eventObj = $.Event('modalClosing');
                    var modalBody = e.data.target.find(".modal-body");
                    $(modalBody.children()[0]).trigger(eventObj);
                    if (eventObj.result === false) {
                        d.reject();
                        return;
                    }
                    d.resolve(args);
                    var eventOption = e.data.option;
                    var me = e.data.me;
                    me.off(OnModalCloseEventName);
                    me.fadeOut(eventOption.FadeOutDuration, function () {
                        me.remove();
                        $.SetDomStorage(ReferenceCountKey, $.GetDomStorage(ReferenceCountKey, 0) - 1);
                        if ($.GetDomStorage(ReferenceCountKey, 0) === 0) {
                            $("body").css("overflow", "auto");
                        }
                    });
                });
                overlay.append(container);
                container.hide().show(0);
                return d.promise();
            };
            return DefaultNavigator;
        }());
        Navigation.DefaultNavigator = DefaultNavigator;
    })(Navigation = DomBehind.Navigation || (DomBehind.Navigation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DefaultNavigator.js.map
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        var Validator = (function () {
            function Validator(attribute) {
                this._disposed = false;
                this.Attribute = attribute;
            }
            Object.defineProperty(Validator.prototype, "AttributeValue", {
                get: function () {
                    var ret = this.ParseAttributeValue();
                    return Object.IsNullOrUndefined(ret) ? "" : ret;
                },
                enumerable: true,
                configurable: true
            });
            Validator.prototype.ParseAttributeValue = function () {
                if (Object.IsNullOrUndefined(this.AttributeExpression))
                    return null;
                var obj = this.AttributeExpression;
                var value;
                if (typeof obj === "string" || typeof obj === "number") {
                    value = this.AttributeExpression;
                }
                else {
                    value = this.AttributeExpression(this.Behavior.DataContext);
                }
                return value;
            };
            Validator.prototype.OnValidationg = function () {
                this.HasError = false;
                this.Apply();
                this.HasError = !this.Validate(this.Behavior.ValueCore);
                if (this.HasError) {
                    var message = this.ValidationMessage(this.Behavior.Element.ValidityState());
                    if (!String.IsNullOrWhiteSpace(message)) {
                        this.Behavior.Element.SetCustomError(message);
                    }
                }
            };
            Validator.prototype.Apply = function () {
                if (!Object.IsNullOrUndefined(this.AllowApply)) {
                    var ret = this.AllowApply(this.Behavior.DataContext);
                    if (!ret) {
                        this.RemoveValidation();
                        return;
                    }
                }
                this.AddValidation();
            };
            Validator.prototype.RemoveValidation = function () {
                if (!String.IsNullOrWhiteSpace(this.Attribute)) {
                    this.Behavior.Element.removeAttr(this.Attribute);
                }
                this.Behavior.Element.ClearCustomError();
            };
            Validator.prototype.AddValidation = function () {
                this.RemoveValidation();
                if (!String.IsNullOrWhiteSpace(this.Attribute)) {
                    this.Behavior.Element.attr(this.Attribute, this.AttributeValue);
                }
            };
            Validator.prototype.Validate = function (value) {
                return !this.Behavior.Element.HasError();
            };
            Validator.prototype.ValidationMessage = function (validity) {
                if (Object.IsNullOrUndefined(this.Message))
                    return null;
                var obj = this.Message;
                var errorMessage;
                if (typeof obj === "string") {
                    errorMessage = this.Message;
                }
                else {
                    errorMessage = this.Message(this.Behavior.DataContext);
                }
                return errorMessage;
            };
            Validator.prototype.Dispose = function () {
                if (!this._disposed) {
                }
                this._disposed = true;
            };
            return Validator;
        }());
        Validation.Validator = Validator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Validator.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        var ValidatorCollection = (function (_super) {
            __extends(ValidatorCollection, _super);
            function ValidatorCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._disposed = false;
                return _this;
            }
            ValidatorCollection.prototype.ClearValidator = function () {
                $.each(this.toArray(), function (i, x) { return x.RemoveValidation(); });
            };
            ValidatorCollection.prototype.ApplyValidator = function () {
                $.each(this.toArray(), function (i, x) { return x.Apply(); });
            };
            ValidatorCollection.prototype.Validate = function () {
                var result = true;
                $.each(this.toArray(), function (i, x) {
                    x.OnValidationg();
                    if (x.HasError) {
                        result = false;
                    }
                });
                return result;
            };
            ValidatorCollection.prototype.Dispose = function () {
                if (!this._disposed) {
                    $.each(this.toArray(), function (i, x) { return x.Dispose(); });
                    this.clear();
                }
                this._disposed = true;
            };
            return ValidatorCollection;
        }(collections.LinkedList));
        Validation.ValidatorCollection = ValidatorCollection;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ValidatorCollection.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        var MaxLengthValidator = (function (_super) {
            __extends(MaxLengthValidator, _super);
            function MaxLengthValidator() {
                return _super.call(this, "maxlength") || this;
            }
            MaxLengthValidator.prototype.Dispose = function () {
                if (!this._disposed) {
                    _super.prototype.Dispose.call(this);
                }
            };
            return MaxLengthValidator;
        }(Validation.Validator));
        Validation.MaxLengthValidator = MaxLengthValidator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    DomBehind.BindingBehaviorBuilder.prototype.MaxLength = function (maxlength, message, applyRule) {
        var me = this;
        var dataBinding = this;
        if (dataBinding.AddValidator) {
            var validator = dataBinding.AddValidator(new DomBehind.Validation.MaxLengthValidator());
            validator.AttributeExpression = maxlength;
            validator.Message = message;
            validator.AllowApply = applyRule;
        }
        var inputType = me.CurrentElement.attr("type");
        if (inputType == "number") {
            me.CurrentElement.off('input');
            me.CurrentElement.on('input', function (e) {
                var el = $(this);
                var value = String(el.val());
                if (value.length > maxlength) {
                    el.val(value.slice(0, maxlength));
                }
            });
        }
        else {
            DomBehind.UIElement.MaxLengthProperty.SetValue(me.CurrentElement, maxlength);
        }
        return me;
    };
    DomBehind.BindingBehaviorBuilder.prototype.MaxNumeric = function (max) {
        var me = this;
        DomBehind.UIElement.MaxNumericProperty.SetValue(me.CurrentElement, max);
        var length = max.toString().length;
        me.CurrentElement.off('input');
        me.CurrentElement.on('input', function (e) {
            var el = $(this);
            var maxlength = el.attr('max').length;
            var value = String(el.val());
            if (value.length > maxlength) {
                el.val(value.slice(0, maxlength));
            }
        });
        return me;
    };
    DomBehind.BindingBehaviorBuilder.prototype.MinNumeric = function (min) {
        var me = this;
        DomBehind.UIElement.MinNumericProperty.SetValue(me.CurrentElement, min);
        return me;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=MaxLengthValidator.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        var RegexValidator = (function (_super) {
            __extends(RegexValidator, _super);
            function RegexValidator() {
                return _super.call(this, "pattern") || this;
            }
            RegexValidator.prototype.RemoveValidation = function () {
                _super.prototype.RemoveValidation.call(this);
                this.Behavior.Element.removeAttr("title");
            };
            RegexValidator.prototype.ValidationMessage = function (validity) {
                var message = _super.prototype.ValidationMessage.call(this, validity);
                if (String.IsNullOrWhiteSpace(message)) {
                    this.Behavior.Element.attr("title", this.AttributeValue);
                }
                return message;
            };
            RegexValidator.prototype.Dispose = function () {
                if (!this._disposed) {
                    _super.prototype.Dispose.call(this);
                }
            };
            return RegexValidator;
        }(Validation.Validator));
        Validation.RegexValidator = RegexValidator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        Data.DataBindingBehaviorBuilder.prototype.Pattern = function (regex, message, applyRule) {
            var me = this;
            var validator = me.AddValidator(new DomBehind.Validation.RegexValidator());
            validator.AttributeExpression = regex;
            validator.Message = message;
            validator.AllowApply = applyRule;
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=RegexValidator.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        var RequiredValidator = (function (_super) {
            __extends(RequiredValidator, _super);
            function RequiredValidator() {
                return _super.call(this, "required") || this;
            }
            RequiredValidator.prototype.Dispose = function () {
                if (!this._disposed) {
                    _super.prototype.Dispose.call(this);
                }
            };
            return RequiredValidator;
        }(Validation.Validator));
        Validation.RequiredValidator = RequiredValidator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        Data.DataBindingBehaviorBuilder.prototype.Required = function (message, applyRule) {
            var me = this;
            var validator = me.AddValidator(new DomBehind.Validation.RequiredValidator());
            validator.Message = message;
            validator.AllowApply = applyRule;
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=RequiredValidator.js.map
var DomBehind;
(function (DomBehind) {
    var PoolType;
    (function (PoolType) {
        PoolType[PoolType["PreLoad"] = 1] = "PreLoad";
        PoolType[PoolType["Reload"] = 2] = "Reload";
    })(PoolType = DomBehind.PoolType || (DomBehind.PoolType = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=PoolType.js.map
var DomBehind;
(function (DomBehind) {
    var Threading;
    (function (Threading) {
        var WorkerPool = (function () {
            function WorkerPool() {
            }
            WorkerPool.Register = function (type, defaultPoolCount) {
                var _this = this;
                if (defaultPoolCount === void 0) { defaultPoolCount = 2; }
                $("body").ready(function (e) {
                    var factory = new DomBehind.TypedFactory(type());
                    for (var i = 0; i < defaultPoolCount; i++) {
                        var newThread = factory.CreateInstance();
                        if ((newThread.PoolType & DomBehind.PoolType.PreLoad) == DomBehind.PoolType.PreLoad) {
                            newThread.Load();
                        }
                        _this.Pool.push(newThread);
                    }
                });
            };
            WorkerPool.Do = function (type, arg) {
                var thread = null;
                var newPool = [];
                $.each(WorkerPool.Pool, function (i, value) {
                    if (thread) {
                        newPool.push(value);
                    }
                    else {
                        if (value instanceof type) {
                            thread = value;
                        }
                        else {
                            newPool.push(value);
                        }
                    }
                });
                WorkerPool.Pool = newPool;
                if (!thread) {
                    var factory = new DomBehind.TypedFactory(type);
                    thread = factory.CreateInstance();
                    thread.Load();
                }
                return thread.Do(arg).always(function () {
                    if (thread.PoolType & DomBehind.PoolType.Reload) {
                        thread.Terminate();
                        thread.Load();
                    }
                    WorkerPool.Pool.push(thread);
                });
            };
            WorkerPool.Pool = [];
            return WorkerPool;
        }());
        Threading.WorkerPool = WorkerPool;
    })(Threading = DomBehind.Threading || (DomBehind.Threading = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WorkerPool.js.map
var DomBehind;
(function (DomBehind) {
    var Threading;
    (function (Threading) {
        var WorkerWrapper = (function () {
            function WorkerWrapper() {
                this.PoolType = DomBehind.PoolType.Reload;
            }
            Object.defineProperty(WorkerWrapper.prototype, "Thread", {
                get: function () { return this._thread; },
                enumerable: true,
                configurable: true
            });
            ;
            WorkerWrapper.prototype.Load = function () {
                if (!this._thread)
                    this._thread = new Worker(this.WorkerScript);
            };
            Object.defineProperty(WorkerWrapper.prototype, "WorkerScript", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            WorkerWrapper.prototype.Do = function (arg) {
                var d = $.Deferred();
                this.Thread.onmessage = function (e) {
                    d.resolve(e.data);
                };
                this.Thread.onerror = function (e) {
                    console.error(e.filename + ":(" + e.lineno + ")\n" + e.message);
                    var errorMessage;
                    var stackTrace;
                    try {
                        $.each($(e.message), function (i, value) {
                            if (value instanceof HTMLTitleElement) {
                                errorMessage = value.text;
                            }
                            if (value instanceof Comment) {
                                stackTrace = value.text;
                            }
                        });
                    }
                    catch (ex) {
                        console.error(ex.message);
                    }
                    d.reject({ ErrorMessage: errorMessage, Description: stackTrace });
                };
                this.Thread.postMessage(arg);
                return d.promise();
            };
            WorkerWrapper.prototype.Terminate = function () {
                if (this._thread) {
                    this._thread.terminate();
                    this._thread = null;
                }
            };
            return WorkerWrapper;
        }());
        Threading.WorkerWrapper = WorkerWrapper;
    })(Threading = DomBehind.Threading || (DomBehind.Threading = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WorkerWrapper.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var Web;
    (function (Web) {
        DomBehind.Threading.WorkerPool.Register(function () { return PlainXMLHttpRequestWorker; });
        var PlainXMLHttpRequestWorker = (function (_super) {
            __extends(PlainXMLHttpRequestWorker, _super);
            function PlainXMLHttpRequestWorker() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(PlainXMLHttpRequestWorker.prototype, "WorkerScript", {
                get: function () {
                    return "~/Scripts/dombehind-PlainXMLHttpRequest.js";
                },
                enumerable: true,
                configurable: true
            });
            return PlainXMLHttpRequestWorker;
        }(DomBehind.Threading.WorkerWrapper));
        Web.PlainXMLHttpRequestWorker = PlainXMLHttpRequestWorker;
    })(Web = DomBehind.Web || (DomBehind.Web = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=PlainXMLHttpRequestWorker.js.map
var DomBehind;
(function (DomBehind) {
    var Web;
    (function (Web) {
        var WebService = (function () {
            function WebService() {
                this.Timeout = 1000 * 30;
            }
            WebService.prototype.Execute = function (request) {
                var ex;
                var option = this.DefaultPostSetting;
                option.data = request;
                option.async = false;
                option.error = function (xhr, status, error) {
                    ex = new DomBehind.AjaxException(xhr, status, error);
                };
                var promise = $.ajax(option);
                if (ex) {
                    throw ex;
                }
                return promise.responseJSON;
            };
            WebService.prototype.ExecuteAsync = function (request, option) {
                var d = $.Deferred();
                var p = $.extend(true, this.DefaultPostSetting, option);
                p.data = JSON.stringify(request);
                p.async = true;
                $.ajax(p).done(function (x) {
                    d.resolve(x);
                }).fail(function (x) {
                    d.reject(new DomBehind.AjaxException(x));
                });
                return d.promise();
            };
            WebService.prototype.ExecuteAjax = function (request, option) {
                var d = $.Deferred();
                var p = $.extend(true, this.DefaultPostSetting, option);
                p.data = request;
                p.async = true;
                $.ajax(p).done(function (x) {
                    d.resolve(x);
                }).fail(function (x) {
                    d.reject(new DomBehind.AjaxException(x));
                });
                return d.promise();
            };
            Object.defineProperty(WebService.prototype, "DefaultPostSetting", {
                get: function () {
                    return {
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        url: $.AbsoluteUri(this.Url),
                        timeout: this.Timeout,
                        traditional: true
                    };
                },
                enumerable: true,
                configurable: true
            });
            return WebService;
        }());
        Web.WebService = WebService;
    })(Web = DomBehind.Web || (DomBehind.Web = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WebService.js.map
var DomBehind;
(function (DomBehind) {
    var UIElement = (function () {
        function UIElement() {
        }
        UIElement.ValueProperty = DomBehind.Data.DependencyProperty.RegisterAttached("val", function (x) { return x.val(); }, function (x, y) { return x.val(y); }, DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
        UIElement.TextProperty = DomBehind.Data.DependencyProperty.RegisterAttached("text", function (x) { return x.text(); }, function (x, y) { return x.text(y); }, DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
        UIElement.SrcProperty = DomBehind.Data.DependencyProperty.RegisterAttached("src", function (x) { return x.attr("src"); }, function (x, y) { return x.attr("src", y); }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.IsEnabledProperty = DomBehind.Data.DependencyProperty.RegisterAttached("enabled", null, function (x, y) {
            var disabled = y === false ? true : false;
            if (disabled === true) {
                x.attr("disabled", "");
                x.addClass("disabled");
            }
            else {
                x.removeAttr("disabled");
                x.removeClass("disabled");
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.IsVisibleProperty = DomBehind.Data.DependencyProperty.RegisterAttached("display", function (x) { return x.attr("display") === "none" ? false : true; }, function (x, y) {
            var visible = y ? true : false;
            if (visible) {
                x.attr("display", "");
                x.show();
            }
            else {
                x.attr("display", "none");
                x.hide();
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
        UIElement.PlaceHolderProperty = DomBehind.Data.DependencyProperty.RegisterAttached("placeholder", null, function (x, y) { return x.attr("placeholder", y); }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.IsCheckedProperty = DomBehind.Data.DependencyProperty.RegisterAttached("checked", function (x) { return x.get(0).checked; }, function (x, y) { return x.get(0).checked = y; }, DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
        UIElement.MaxLengthProperty = DomBehind.Data.DependencyProperty.RegisterAttached("maxlength", null, function (x, y) { return x.attr("maxlength", y); }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.MaxNumericProperty = DomBehind.Data.DependencyProperty.RegisterAttached("maxlength", null, function (x, y) { return x.attr("max", y); }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.MinNumericProperty = DomBehind.Data.DependencyProperty.RegisterAttached("maxlength", null, function (x, y) { return x.attr("min", y); }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.HtmlSource = DomBehind.Data.DependencyProperty.RegisterAttached("htmlSource", null, function (x, y) {
            var p = {
                url: y,
                async: true,
                type: "GET",
                cache: true,
            };
            $.ajax(p).done(function (dom) {
                var body = $(dom).find("#_Layout");
                x.append($(dom));
            }).fail(function (error) {
                throw new DomBehind.AjaxException(error);
            });
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        UIElement.Click = DomBehind.EventBuilder.RegisterAttached("click");
        UIElement.Enter = DomBehind.EventBuilder.RegisterAttached("enterKeydown", function (x) {
            if (x && x.Element) {
                x.Element.keydown(function (e) {
                    if (e.which === 13) {
                        x.Element.trigger("enterKeydown");
                    }
                });
            }
        });
        UIElement.Keydown = DomBehind.EventBuilder.RegisterAttached("keydown");
        UIElement.LostFocus = DomBehind.EventBuilder.RegisterAttached("focusout");
        UIElement.Initialize = DomBehind.EventBuilder.RegisterAttached("initialize");
        UIElement.ViewLoaded = DomBehind.EventBuilder.RegisterAttached("viewLoaded");
        UIElement.ModalClosing = DomBehind.EventBuilder.RegisterAttached("modalClosing");
        return UIElement;
    }());
    DomBehind.UIElement = UIElement;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=UIElement.js.map
var DomBehind;
(function (DomBehind) {
    DomBehind.BindingBehaviorBuilder.prototype.InputType = function (inputType) {
        var me = this;
        var typeName = InputType[inputType];
        if (inputType === InputType.DateTimeLocal) {
            typeName = "DateTime-Local";
        }
        typeName = typeName.toLowerCase();
        me.CurrentElement.removeAttr("type");
        me.CurrentElement.attr("type", typeName);
        return me;
    };
    var InputType;
    (function (InputType) {
        InputType[InputType["Hidden"] = 0] = "Hidden";
        InputType[InputType["Text"] = 1] = "Text";
        InputType[InputType["Search"] = 2] = "Search";
        InputType[InputType["Tel"] = 3] = "Tel";
        InputType[InputType["Url"] = 4] = "Url";
        InputType[InputType["Email"] = 5] = "Email";
        InputType[InputType["Password"] = 6] = "Password";
        InputType[InputType["DateTime"] = 7] = "DateTime";
        InputType[InputType["Date"] = 8] = "Date";
        InputType[InputType["Month"] = 9] = "Month";
        InputType[InputType["Week"] = 10] = "Week";
        InputType[InputType["Time"] = 11] = "Time";
        InputType[InputType["DateTimeLocal"] = 12] = "DateTimeLocal";
        InputType[InputType["Number"] = 13] = "Number";
        InputType[InputType["Range"] = 14] = "Range";
        InputType[InputType["Color"] = 15] = "Color";
        InputType[InputType["Checkbox"] = 16] = "Checkbox";
        InputType[InputType["Radio"] = 17] = "Radio";
        InputType[InputType["File"] = 18] = "File";
        InputType[InputType["Submit"] = 19] = "Submit";
        InputType[InputType["Image"] = 20] = "Image";
        InputType[InputType["Reset"] = 21] = "Reset";
        InputType[InputType["Button"] = 22] = "Button";
    })(InputType = DomBehind.InputType || (DomBehind.InputType = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=InputElement.js.map
var DomBehind;
(function (DomBehind) {
    DomBehind.BindingBehaviorBuilder.prototype.Scrolling = function () {
        var me = this;
        me.CurrentElement.click(function (e) {
            var a = e.target;
            var hash = a.hash;
            var offset = $(hash).offset();
            if (!offset)
                return;
            e.preventDefault();
            $('html, body').animate({
                scrollTop: offset.top
            }, 900, function () {
                window.location.hash = hash;
            });
        });
        return me;
    };
    DomBehind.BindingBehaviorBuilder.prototype.SlideAnimation = function () {
        var me = this;
        var uiElements = me.CurrentElement;
        $(window).scroll(function () {
            uiElements.each(function () {
                var pos = $(this).offset().top;
                var winTop = $(window).scrollTop();
                if (pos < winTop + 600) {
                    $(this).addClass("slide");
                }
            });
        });
        return me;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=NavbarElement.js.map
var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Selector = (function () {
            function Selector(Behavior) {
                var _this = this;
                this.Behavior = Behavior;
                this.UpdateTargetEventHandle = function (sender, e) { return _this.OnUpdateTarget(sender, e); };
                Behavior.UpdateTargetEvent.AddHandler(this.UpdateTargetEventHandle);
                this.UpdateSourceEventHandle = function (e) { return _this.UpdateSource(e); };
                Behavior.Element.off('change', this.UpdateSourceEventHandle);
                Behavior.Element.on('change', this.UpdateSourceEventHandle);
                this.PropertyChangedEventHandle = function (sender, e) { return _this.OnDataSourcePropertyChanged(sender, e); };
                this.AddedHandle = function (sender, e) { return _this.Added(sender, e); };
                this.RemovedHandle = function (sender, e) { return _this.Removed(sender, e); };
            }
            Selector.Register = function (behavior) {
                if (!behavior.Element)
                    return;
                if (behavior.AdditionalInfo[Selector.IgnoreMark])
                    return;
                if (behavior.AdditionalInfo[Selector.InstanceMark])
                    return;
                var tagName = behavior.Element.prop("tagName");
                if (tagName !== "SELECT") {
                    behavior.AdditionalInfo[Selector.IgnoreMark] = true;
                    return;
                }
                behavior.AdditionalInfo[Selector.InstanceMark] = new Selector(behavior);
            };
            Selector.prototype.UpdateSource = function (e) {
                if (!this.Behavior.PInfo)
                    return;
                var dataSource = this.Behavior.PInfo.GetValue();
                if (dataSource instanceof DomBehind.Data.ListCollectionView) {
                    var collectionView = dataSource;
                    if (collectionView.OnCurrentChanging().Cancel) {
                        this.Select(collectionView);
                        return false;
                    }
                    var selectedItems_1 = [];
                    $.each(this.Behavior.Element.find("option"), function (i, value) {
                        if (value.selected) {
                            var uid = value.getAttribute("uuid");
                            var item = collectionView.Find(function (x) { return x.__uuid === uid; });
                            if (item) {
                                selectedItems_1.push(item);
                            }
                        }
                    });
                    dataSource.Begin();
                    if (this.Multiple) {
                        dataSource.Current = selectedItems_1;
                    }
                    else {
                        dataSource.Current = 0 < selectedItems_1.length ? selectedItems_1[0] : null;
                    }
                    dataSource.End();
                }
            };
            Selector.prototype.OnUpdateTarget = function (sender, data) {
                if (data instanceof DomBehind.Data.ListCollectionView) {
                    this.Render(data);
                }
                else if (data instanceof Array) {
                    var list = [];
                    $.each(data, function (i, value) {
                        list.push({ Value: value });
                    });
                    this.Render(new DomBehind.Data.ListCollectionView(list, "Value"));
                }
            };
            Selector.prototype.OnDataSourcePropertyChanged = function (sender, e) {
                if (e.Name === "Current") {
                    this.Select(sender);
                }
                if (!e.Name) {
                    this.Render(sender);
                }
            };
            Selector.prototype.Render = function (source) {
                var _this = this;
                if (!this.HasChanges(source))
                    return;
                this.Behavior.Element.empty();
                var arr = source.ToArray();
                if (source.Grouping) {
                    $.each(arr.GroupBy(source.Grouping), function (i, group) {
                        var optgroup = $("<optgroup>", { label: group.Key }).appendTo(_this.Behavior.Element);
                        $.each(group.Values, function (k, each) {
                            _this.RenderOption(optgroup, source, each);
                        });
                    });
                }
                else {
                    $.each(arr, function (i, value) {
                        _this.RenderOption(_this.Behavior.Element, source, value);
                    });
                }
                this.Select(source);
            };
            Object.defineProperty(Selector.prototype, "Multiple", {
                get: function () {
                    return this.Behavior.Element.prop("multiple") ? true : false;
                },
                set: function (value) {
                    this.Behavior.Element.prop("multiple", value);
                },
                enumerable: true,
                configurable: true
            });
            Selector.prototype.RenderOption = function (element, source, value) {
                if (!value.__uuid)
                    value = $.extend(value, ExtendIIdentity());
                if (!value.DisplayMemberPath)
                    value = $.extend(value, this.EnsureDisplayMemberPath(source.DisplayMemberPath));
                var option = $("<option uuid=\"" + value.__uuid + "\">" + Selector.GetDisplayValue(value, source.DisplayMemberPath) + "</option>");
                option.appendTo(element);
                value = $.extend(value, this.EnsureElement(option));
                if (value instanceof DomBehind.NotifiableImp) {
                    if (!value.__EventMarked) {
                        value.__EventMarked = true;
                        value.PropertyChanged.AddHandler(function (sender, e) {
                            var selectable = sender;
                            var text = Selector.GetDisplayValue(sender, selectable.DisplayMemberPath);
                            selectable.__Selector.val(text);
                        });
                    }
                }
            };
            Selector.prototype.EnsureDisplayMemberPath = function (path) {
                return { DisplayMemberPath: path };
            };
            Selector.prototype.EnsureElement = function (option) {
                return {
                    __Selector: option,
                    __Element: option[0],
                };
            };
            Selector.prototype.Added = function (source, obj) {
                this.Render(source);
            };
            Selector.prototype.Removed = function (source, obj) {
                this.Render(source);
            };
            Selector.prototype.Select = function (source) {
                return this.Multiple ? this.MultipleSelect(source) : this.SingleSelect(source);
            };
            Selector.prototype.SingleSelect = function (source) {
                var value = source.Current;
                if (Object.IsNullOrUndefined(value)) {
                    this.Behavior.Element.selectpicker('val', null);
                }
                else {
                    value.__Element.selected = true;
                    this.Behavior.Element.selectpicker('refresh');
                }
                source.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
            };
            Selector.prototype.MultipleSelect = function (source) {
                var value = source.Current;
                if (Object.IsNullOrUndefined(value)) {
                    this.Behavior.Element.selectpicker("deselectAll");
                }
                else {
                    $.each(value, function (i, x) {
                        var selectable = x;
                        selectable.__Element.selected = true;
                    });
                }
                this.Behavior.Element.selectpicker('refresh');
                source.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
            };
            Selector.prototype.HasChanges = function (source) {
                if (source.ViewReflected === DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected)
                    return false;
                if (source.ViewReflected === DomBehind.Data.ListCollectionView.ViewReflectedStatus.None) {
                    source.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.NoReflected;
                    source.Begin().Refresh().End();
                    this.Subscribe(source);
                }
                return true;
            };
            Selector.prototype.Subscribe = function (source) {
                this.UnSubscribe(source);
                source.Removed.AddHandler(this.RemovedHandle);
                source.Added.AddHandler(this.AddedHandle);
                source.PropertyChanged.AddHandler(this.PropertyChangedEventHandle);
            };
            Selector.prototype.UnSubscribe = function (source) {
                source.Added.RemoveHandler(this.AddedHandle);
                source.Removed.RemoveHandler(this.RemovedHandle);
                source.PropertyChanged.RemoveHandler(this.PropertyChangedEventHandle);
            };
            Selector.GetDisplayValue = function (value, displayMemberPath) {
                var displayValue = value;
                if (displayMemberPath) {
                    displayValue = new DomBehind.PropertyInfo(value, displayMemberPath).GetValue();
                }
                return displayValue;
            };
            Selector.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", null, function (x, y) { }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, function (behavior) {
                Selector.Register(behavior);
            });
            Selector.AllowMultipleProperty = DomBehind.Data.DependencyProperty.RegisterAttached("multiple", null, function (x, y) {
                var old = x.prop('multiple');
                if (old === y)
                    return;
                if (y === true) {
                    x.prop('multiple', true);
                }
                else {
                    x.prop('multiple', false);
                }
                x.selectpicker('destroy');
                x.selectpicker();
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
            Selector.IgnoreMark = "Selector.Ignore";
            Selector.InstanceMark = "Selector.Instance";
            return Selector;
        }());
        Controls.Selector = Selector;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        var Selector = DomBehind.Controls.Selector;
        Data.DataBindingBehaviorBuilder.prototype.Multiple = function (allowMultiple) {
            var me = this;
            var behavior = me.Add(new Data.DataBindingBehavior());
            behavior.Property = Selector.AllowMultipleProperty;
            behavior.Priolity = -1;
            if (allowMultiple) {
                behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, allowMultiple);
            }
            else {
                behavior.PInfo = new DomBehind.BooleanFakeExpression(true);
            }
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Selector.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
        var Tab = (function (_super) {
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
            var BindingOption = (function () {
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
var DomBehind;
(function (DomBehind) {
    var MessageStatus;
    (function (MessageStatus) {
        MessageStatus[MessageStatus["Infomation"] = 0] = "Infomation";
        MessageStatus[MessageStatus["Warning"] = 1] = "Warning";
        MessageStatus[MessageStatus["Error"] = 2] = "Error";
    })(MessageStatus = DomBehind.MessageStatus || (DomBehind.MessageStatus = {}));
    var MessaageBox = (function () {
        function MessaageBox() {
        }
        MessaageBox.ShowInfomation = function (message, title) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Infomation);
        };
        MessaageBox.ShowWarning = function (message, title) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Warning);
        };
        MessaageBox.ShowError = function (message, title) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Error);
        };
        MessaageBox.ShowMessage = function (message, title, status) {
            MessaageBox.Container.ShowMessage(message, title, status);
        };
        MessaageBox.ShowYesNo = function (message, title, option) {
            MessaageBox.Container.ShowYesNo(message, title, option);
        };
        MessaageBox.ShowOkCancel = function (message, title, option) {
            MessaageBox.Container.ShowOkCancel(message, title, option);
        };
        MessaageBox.BuiltIn = function (lazy) {
            MessaageBox._lazy = lazy;
        };
        ;
        Object.defineProperty(MessaageBox, "Container", {
            get: function () {
                if (MessaageBox._container) {
                    return MessaageBox._container;
                }
                if (!MessaageBox._lazy) {
                    throw new DomBehind.Exception("メッセージ機能をビルドインしてください");
                }
                var fac = new DomBehind.TypedFactory(MessaageBox._lazy());
                MessaageBox._container = fac.CreateInstance();
                return MessaageBox._container;
            },
            enumerable: true,
            configurable: true
        });
        return MessaageBox;
    }());
    DomBehind.MessaageBox = MessaageBox;
    MessaageBox.BuiltIn(function () { return DefaultMessageContainer; });
    var DefaultMessageContainer = (function () {
        function DefaultMessageContainer() {
        }
        DefaultMessageContainer.prototype.ShowMessage = function (message, title, status) {
            window.alert(message);
        };
        DefaultMessageContainer.prototype.ShowYesNo = function (message, title, option) {
            if (window.confirm(message)) {
                if (option && option.yesCallback) {
                    option.yesCallback();
                }
            }
            else {
                if (option && option.noCallBack) {
                    option.noCallBack();
                }
            }
        };
        DefaultMessageContainer.prototype.ShowOkCancel = function (message, title, option) {
            if (window.confirm(message)) {
                if (option && option.okCallback) {
                    option.okCallback();
                }
            }
            else {
                if (option && option.cancelCallBack) {
                    option.cancelCallBack();
                }
            }
        };
        return DefaultMessageContainer;
    }());
    DomBehind.DefaultMessageContainer = DefaultMessageContainer;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=MessageBox.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var ListView = (function (_super) {
        __extends(ListView, _super);
        function ListView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ListView.prototype, "ItemsSource", {
            get: function () {
                return this._items;
            },
            set: function (newValue) {
                var _this = this;
                if (Object.IsNullOrUndefined(newValue)) {
                    this.Clear();
                    this._items = newValue;
                    return;
                }
                var newItems = newValue.ToArray();
                if (!Object.IsNullOrUndefined(this._items) &&
                    newItems.SequenceEqual(this._items.ToArray())) {
                    return;
                }
                this.Clear();
                var body = this.Element.find("#" + this.BodyId);
                $.each(newItems, function (i, value) {
                    var tr = $("<tr></tr>");
                    $.each(_this.Columns, function (k, column) {
                        var td = $("<td></td>");
                        if (column.cellClass) {
                            td.addClass(column.cellClass);
                        }
                        var cellValue = column.value(value);
                        if (column.convertTarget) {
                            cellValue = column.convertTarget(cellValue);
                        }
                        td.text(cellValue);
                        tr.append(td);
                    });
                    body.append(tr);
                });
            },
            enumerable: true,
            configurable: true
        });
        ListView.prototype.Clear = function () {
            var body = this.Element.find("#" + this.BodyId);
            body.empty();
        };
        Object.defineProperty(ListView.prototype, "DefaultTableOption", {
            get: function () {
                return {
                    class: "",
                };
            },
            enumerable: true,
            configurable: true
        });
        ListView.prototype.Ensure = function () {
            _super.prototype.Ensure.call(this);
            this.Element.empty();
            if (!this.Element.hasClass("table-responsive")) {
                this.Element.addClass("table-responsive");
            }
            var identity = "lv-" + NewUid();
            this.Element.attr("listview-identity", identity);
            window[identity] = this;
            this.TableId = "tb-" + NewUid();
            this.HeaderId = "th-" + NewUid();
            this.BodyId = "tr-" + NewUid();
            var table = $("<table id=\"" + this.TableId + "\" class=\"table\"></table>");
            if (this.TableOption.isHover) {
                table.addClass("table-hover");
            }
            if (this.TableOption.isBordered) {
                table.addClass("table-bordered");
            }
            if (this.TableOption.isStriped) {
                table.addClass("table-striped");
            }
            if (this.TableOption.class) {
                table.addClass(this.TableOption.class);
            }
            var header = $("<thead id=\"" + this.HeaderId + "\"></thead>");
            var headerRow = $("<tr></tr>");
            $.each(this.Columns, function (i, value) {
                var th = $("<th>" + value.caption + "</th>");
                if (value.width) {
                    th.css('width', value.width);
                }
                if (value.headerClass) {
                    th.addClass(value.headerClass);
                }
                headerRow.append(th);
            });
            header.append(headerRow);
            table.append(header);
            var body = $("<tbody id=\"" + this.BodyId + "\"></tbody>");
            table.append(body);
            this.Element.append(table);
        };
        ListView.prototype.AddColumn = function (option) {
            if (!this.Columns) {
                this.Columns = new Array();
            }
            this.Columns.push(option);
        };
        ListView.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", function (el) {
        }, function (el, newValue) {
            var identity = el.attr("listview-identity");
            var me = window[identity];
            if (newValue instanceof DomBehind.Data.ListCollectionView) {
                me.ItemsSource = newValue;
            }
            else {
                me.ItemsSource = new DomBehind.Data.ListCollectionView([]);
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        return ListView;
    }(DomBehind.Data.DataBindingBehavior));
    DomBehind.ListView = ListView;
    var TableBindingBehaviorBuilder = (function (_super) {
        __extends(TableBindingBehaviorBuilder, _super);
        function TableBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        TableBindingBehaviorBuilder.prototype.ColumnBinding = function (title, binding, option) {
            if (this.CurrentBehavior instanceof ListView) {
                var op = $.extend(true, {}, option);
                op.value = binding;
                op.caption = title;
                this.CurrentBehavior.AddColumn(op);
            }
            return this;
        };
        return TableBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.TableBindingBehaviorBuilder = TableBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildListView = function (itemSource, option) {
        var me = this;
        var behavior = me.Add(new ListView());
        behavior.Property = ListView.ItemsSourceProperty;
        behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, itemSource);
        behavior.TableOption = option;
        var newMe = new TableBindingBehaviorBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ListView.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var TemplateListView = (function (_super) {
        __extends(TemplateListView, _super);
        function TemplateListView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TemplateListView.prototype, "ItemsSource", {
            set: function (newValue) {
                var _this = this;
                var jtemplate = $(document.body).find(this.Option.template);
                if (jtemplate.length === 0)
                    return;
                var template = this.FindTemplate(jtemplate);
                this.RemoveAll();
                var dataContext = this.DataContext;
                var rowContainer = $("<div class=\"templateRowContainer\"></div>");
                $.each(newValue.ToArray(), function (i, value) {
                    var newRow = template.clone();
                    value.__element = newRow;
                    $.each(_this.Columns, function (k, column) {
                        var el = newRow.find(column.templateSelector);
                        if (el.length !== 0) {
                            if (column.expression && column.dependencyProperty) {
                                var ret = column.expression(value);
                                if (column.convertTarget) {
                                    ret = column.convertTarget(ret);
                                }
                                column.dependencyProperty.SetValue(el, ret);
                                if (column.mode === DomBehind.Data.BindingMode.TwoWay) {
                                    var path = DomBehind.LamdaExpression.Path(column.expression);
                                    var observe = DomBehind.Observable.Register(value, path);
                                    observe.PropertyChanged.AddHandler(function (sender, d) {
                                        if (sender) {
                                            var v = sender[d.Name];
                                            column.dependencyProperty.SetValue(el, v);
                                        }
                                    });
                                }
                            }
                            if (column.expressionAction && column.attachedEvent) {
                                var newEvent_1 = column.attachedEvent.Create();
                                newEvent_1.AddHandler(function (sener, e) {
                                    column.expressionAction(dataContext, value);
                                });
                                el.off(newEvent_1.EventName);
                                el.on(newEvent_1.EventName, function (e) {
                                    newEvent_1.Raise(_this, e);
                                });
                                if (el.is("a") && !el.attr("href")) {
                                    el.attr("href", "javascript:void(0);");
                                }
                            }
                            if (_this.AlternateStyle) {
                                if (i % 2 !== 0) {
                                    var el_1 = newRow.find(_this.AlternateStyle.Selector);
                                    if (el_1.length !== 0) {
                                        el_1.addClass(_this.AlternateStyle.Css);
                                    }
                                }
                            }
                        }
                    });
                    rowContainer.append(newRow);
                });
                this.Element.append(rowContainer);
            },
            enumerable: true,
            configurable: true
        });
        TemplateListView.prototype.FindTemplate = function (jtemplate) {
            var support = ("content" in document.createElement("template"));
            if (support) {
                var temp = jtemplate[0];
                var template = $(temp.content.querySelector("div"));
                return template;
            }
            else {
                var temp = jtemplate[0];
                var template = $(temp.querySelector("div"));
                return template;
            }
        };
        TemplateListView.prototype.RemoveAll = function () {
            this.Element.empty();
        };
        TemplateListView.prototype.ClearSortMarks = function () {
            var view = this.Owner.Container;
            var headeArray = this.Columns.Where(function (x) { return x.header ? true : false; });
            $.each(headeArray, function (i, each) {
                var column = view.find(each.header);
                if (column.length !== 0) {
                    var span = column.find("span");
                    if (span.length !== 0) {
                        span.removeClass();
                    }
                }
            });
        };
        TemplateListView.prototype.Ensure = function () {
            var _this = this;
            _super.prototype.Ensure.call(this);
            this.Option = $.extend(true, this.DefaultOption, this.Option);
            var view = this.Owner.Container;
            var headeArray = this.Columns.Where(function (x) { return x.header ? true : false; });
            $.each(headeArray, function (i, each) {
                var column = view.find(each.header);
                if (column.length !== 0) {
                    var span = column.find("span");
                    if (span.length === 0) {
                        column.append($("<span></span>"));
                    }
                    if (column.is("a") && !column.attr("href")) {
                        column.attr("href", "javascript:void(0);");
                    }
                    column.off("click");
                    column.on("click", function (e) { return _this.OnColumnClick(e, each.header); });
                }
            });
            var identity = this.Element.attr("templateListView-identity");
            if (!identity) {
                identity = "id-" + NewUid();
                this.Element.attr("templateListView-identity", identity);
            }
            window[identity] = this;
        };
        TemplateListView.prototype.OnColumnClick = function (e, header) {
            var _this = this;
            if (header) {
                var target = $(e.target);
                var span = target.find("span");
                var asc = span.hasClass(this.Option.descClass);
                if (span.length !== 0) {
                    this.ClearSortMarks();
                    span.addClass(asc ? this.Option.ascClass : this.Option.descClass);
                }
                var ee_1 = {
                    selector: header,
                    sender: this,
                    target: target,
                    isAsc: asc,
                    text: target.text(),
                    value: target.val(),
                };
                if (this.Option.columnClick) {
                    DomBehind.Application.Current.SafeAction(function () {
                        return _this.Option.columnClick(_this.DataContext, ee_1);
                    });
                }
                else {
                    var column = this.Columns.FirstOrDefault(function (x) { return x.header === header; });
                    var list = this.PInfo.GetValue();
                    if (column && list instanceof DomBehind.Data.ListCollectionView) {
                        var exp_1 = DomBehind.LamdaExpression.Path(column.expression);
                        var sorted = asc ? list.ToArray().OrderBy(function (x) { return x[exp_1]; }) : list.ToArray().OrderByDecording(function (x) { return x[exp_1]; });
                        this.ItemsSource = this.DataContext[this.PInfo.MemberPath] = new DomBehind.Data.ListCollectionView(sorted);
                    }
                }
            }
        };
        Object.defineProperty(TemplateListView.prototype, "DefaultOption", {
            get: function () {
                return {
                    template: "",
                    ascClass: "fa fa-sort-asc",
                    descClass: "fa fa-sort-desc",
                };
            },
            enumerable: true,
            configurable: true
        });
        TemplateListView.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", function (el) {
        }, function (el, newValue) {
            var identity = el.attr("templateListView-identity");
            var template = window[identity];
            if (newValue instanceof DomBehind.Data.ListCollectionView) {
                template.ItemsSource = newValue;
            }
            else {
                template.ItemsSource = new DomBehind.Data.ListCollectionView([]);
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        return TemplateListView;
    }(DomBehind.Data.DataBindingBehavior));
    DomBehind.TemplateListView = TemplateListView;
    var TemplateListViewBindingBehaviorBuilder = (function (_super) {
        __extends(TemplateListViewBindingBehaviorBuilder, _super);
        function TemplateListViewBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        TemplateListViewBindingBehaviorBuilder.prototype.BindingColumn = function (selector, exp, option) {
            return this.BindingProperty(DomBehind.UIElement.TextProperty, selector, exp, option);
        };
        TemplateListViewBindingBehaviorBuilder.prototype.BindingColumnAction = function (selector, exp, option) {
            return this.BindingEvent(DomBehind.UIElement.Click, selector, exp, option);
        };
        TemplateListViewBindingBehaviorBuilder.prototype.BindingProperty = function (dp, selector, exp, option) {
            var me = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                option = $.extend(true, {}, option);
                option.templateSelector = selector;
                option.expression = exp;
                option.dependencyProperty = dp;
                me.CurrentBehavior.LastOption = option;
                me.CurrentBehavior.Columns.push(option);
            }
            return me;
        };
        TemplateListViewBindingBehaviorBuilder.prototype.BindingEvent = function (ev, selector, exp, option) {
            var me = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                option = $.extend(true, {}, option);
                option.templateSelector = selector;
                option.expressionAction = exp;
                option.attachedEvent = ev;
                me.CurrentBehavior.LastOption = option;
                me.CurrentBehavior.Columns.push(option);
            }
            return me;
        };
        TemplateListViewBindingBehaviorBuilder.prototype.BindingRowStyle = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                me.CurrentBehavior.RowStyleExpression = exp;
            }
            return me;
        };
        TemplateListViewBindingBehaviorBuilder.prototype.BindingAlternateRowStyle = function (selector, css) {
            var me = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                me.CurrentBehavior.AlternateStyle = { Selector: selector, Css: css };
            }
            return me;
        };
        return TemplateListViewBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.TemplateListViewBindingBehaviorBuilder = TemplateListViewBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildTemplateItems = function (itemsSource, option) {
        var me = this;
        var behavior = me.Add(new TemplateListView());
        behavior.Owner = me.Owner;
        behavior.Property = TemplateListView.ItemsSourceProperty;
        behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, itemsSource);
        behavior.Option = $.extend(true, {}, option);
        behavior.Columns = new Array();
        var newMe = new TemplateListViewBindingBehaviorBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=TemplateListView.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var FileBrowser = (function (_super) {
        __extends(FileBrowser, _super);
        function FileBrowser() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.MaximumNumberOfAjax = 1;
            return _this;
        }
        FileBrowser.prototype.Ensure = function () {
            var _this = this;
            _super.prototype.Ensure.call(this);
            var element = this.Element;
            element.attr("type", "file");
            element.attr("capture", "camera");
            if (this.AcceptValue) {
                element.attr("accept", this.AcceptValue);
            }
            else {
                element.attr("accept", "image/*");
            }
            if (this.AllowMultiFiles) {
                element.attr("multiple", "multiple");
            }
            element.change(function (e) {
                var args = $.extend(true, e, {});
                var arr = new Array();
                $.each(e.target.files, function (i, s) {
                    var uri = URL.createObjectURL(s);
                    var file = $.extend(true, s, {});
                    file.uri = uri;
                    arr.push(file);
                });
                _this.Files = args.files = arr;
                _this.OnTrigger(args);
            });
            if (this.InstanceExpression) {
                this.InstanceExpression.SetValue(this);
            }
        };
        FileBrowser.prototype.UpdateAll = function () {
            var _this = this;
            if (!this.Files) {
                this.OnCompleted({ file: null, response: null });
                return;
            }
            var pooler = new Pooler(this);
            return pooler.Do().always(function () {
                _this.OnAlways();
            });
        };
        FileBrowser.prototype.Update = function (file) {
            var _this = this;
            var executor = new Executor(this, file);
            executor.Do();
            return executor.Pms.always(function () {
                _this.OnAlways();
            });
        };
        FileBrowser.prototype.OnProgress = function (e) {
            console.trace(e.file.name + "..." + e.loaded + " / " + e.total + "  " + e.percent + " %");
            if (this.ProgressExpression) {
                this.ProgressExpression(this.DataContext, e);
            }
        };
        FileBrowser.prototype.OnCompleted = function (e) {
            if (e.file) {
                console.trace(e.file.name + "...complete");
            }
            if (this.CompletedExpression) {
                this.CompletedExpression(this.DataContext, e);
            }
        };
        FileBrowser.prototype.OnError = function (e) {
            if (e.file) {
                console.trace("error..." + e.file.name);
            }
            if (e.error) {
                console.error(e.error);
            }
            if (this.ErrorExpression) {
                this.ErrorExpression(this.DataContext, e);
            }
        };
        FileBrowser.prototype.OnAlways = function () {
            if (this.AlwaysExpression) {
                this.AlwaysExpression(this.DataContext);
            }
        };
        FileBrowser.SelectedFiles = DomBehind.EventBuilder.RegisterAttached("selectedFiles");
        return FileBrowser;
    }(DomBehind.Data.ActionBindingBehavior));
    DomBehind.FileBrowser = FileBrowser;
    var Pooler = (function () {
        function Pooler(FileBrowser) {
            this.FileBrowser = FileBrowser;
        }
        Pooler.prototype.Do = function () {
            var _this = this;
            var files = this.FileBrowser.Files;
            var chunk = parseInt(String(files.length / this.FileBrowser.MaximumNumberOfAjax));
            if (chunk === 0) {
                chunk = 1;
            }
            var pmslist = new Array();
            var chunkList = files.Chunk(chunk);
            $.each(chunkList, function (i, value) {
                var e = new ChunkFlow(_this.FileBrowser, value);
                pmslist.push(e.Do());
            });
            return $.when(pmslist);
        };
        return Pooler;
    }());
    var ChunkFlow = (function () {
        function ChunkFlow(FileBrowser, Queue) {
            this.FileBrowser = FileBrowser;
            this.Queue = Queue;
        }
        ChunkFlow.prototype.Do = function () {
            var _this = this;
            var arr = this.Queue.Select(function (x) { return new Executor(_this.FileBrowser, x); });
            $.each(arr, function (i, value) {
                var nextIndex = i + 1;
                if (nextIndex < arr.length) {
                    value.Pms.always(function () {
                        arr[nextIndex].Do();
                    });
                }
            });
            if (0 < arr.length) {
                arr[0].Do();
            }
            return $.when(arr.Select(function (x) { return x.Pms; }));
        };
        return ChunkFlow;
    }());
    var Executor = (function () {
        function Executor(FileBrowser, File) {
            this.FileBrowser = FileBrowser;
            this.File = File;
            this.Dfd = $.Deferred();
            this.Pms = this.Dfd.promise();
        }
        Executor.prototype.Do = function () {
            var _this = this;
            var formData = new FormData();
            formData.append("userfile", this.File);
            $.ajax({
                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percent = (evt.loaded / evt.total) * 100;
                            _this.FileBrowser.OnProgress({
                                loaded: evt.loaded,
                                total: evt.total,
                                percent: percent,
                                file: _this.File,
                            });
                        }
                    }, false);
                    xhr.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percent = (evt.loaded / evt.total) * 100;
                            _this.FileBrowser.OnProgress({
                                loaded: evt.loaded,
                                total: evt.total,
                                percent: percent,
                                file: _this.File,
                            });
                        }
                    }, false);
                    return xhr;
                },
                type: "POST",
                url: this.FileBrowser.UploadUri,
                data: formData,
                processData: false,
                contentType: false,
                success: function (e) {
                    _this.FileBrowser.OnCompleted({ response: e, file: _this.File });
                    _this.Dfd.resolve(e);
                },
                error: function (x, status, error) {
                    _this.FileBrowser.OnError({ file: _this.File, error: error });
                    _this.Dfd.reject(error);
                }
            });
        };
        return Executor;
    }());
    var FileBrowserBindingBehaviorBuilder = (function (_super) {
        __extends(FileBrowserBindingBehaviorBuilder, _super);
        function FileBrowserBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        FileBrowserBindingBehaviorBuilder.prototype.AllowMultiFiles = function () {
            var me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.AllowMultiFiles = true;
            }
            return me;
        };
        FileBrowserBindingBehaviorBuilder.prototype.AcceptFilter = function (filter) {
            var me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.AcceptValue = filter;
            }
            return me;
        };
        FileBrowserBindingBehaviorBuilder.prototype.UploadUri = function (uri) {
            var me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.UploadUri = uri;
            }
            return me;
        };
        FileBrowserBindingBehaviorBuilder.prototype.BindingUploader = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.InstanceExpression = new DomBehind.LamdaExpression(me.Owner.DataContext, exp);
            }
            return me;
        };
        FileBrowserBindingBehaviorBuilder.prototype.BindingUploaderProgress = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.ProgressExpression = exp;
            }
            return me;
        };
        FileBrowserBindingBehaviorBuilder.prototype.BindingUploaderComplete = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.CompletedExpression = exp;
            }
            return me;
        };
        FileBrowserBindingBehaviorBuilder.prototype.BindingUploaderError = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.ErrorExpression = exp;
            }
            return me;
        };
        FileBrowserBindingBehaviorBuilder.prototype.BindingUploaderAlways = function (exp) {
            var me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.AlwaysExpression = exp;
            }
            return me;
        };
        FileBrowserBindingBehaviorBuilder.prototype.MaximumNumberOfAjax = function (number) {
            var me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.MaximumNumberOfAjax = number;
            }
            return me;
        };
        return FileBrowserBindingBehaviorBuilder;
    }(DomBehind.Data.ActionBindingBehaviorBuilder));
    DomBehind.FileBrowserBindingBehaviorBuilder = FileBrowserBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildFileBrowser = function (selectedEvent) {
        var me = this;
        var behavior = me.Add(new FileBrowser());
        behavior.Event = FileBrowser.SelectedFiles.Create();
        behavior.Action = selectedEvent;
        behavior.ActionParameterCount = behavior.Action.length;
        behavior.AllowBubbling = false;
        var newMe = new FileBrowserBindingBehaviorBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=FileBrowser.js.map
var DomBehind;
(function (DomBehind) {
    var Application = (function () {
        function Application() {
            this._navigator = new DomBehind.Navigation.DefaultNavigator();
        }
        Object.defineProperty(Application, "Current", {
            get: function () {
                return Application._app;
            },
            enumerable: true,
            configurable: true
        });
        Application.Resolve = function () {
            if (Application._app)
                return;
            var me = this;
            $(document).ready(function () {
                var appFactory = new DomBehind.TypedFactory(me);
                var app = appFactory.CreateInstance();
                Application._app = app;
                window.history.pushState(null, "", window.location.href);
                window.onpopstate = function () {
                    window.history.pushState(null, "", window.location.href);
                    Application.Current.OnBrowserBack();
                };
            });
        };
        Application.prototype.OnBrowserBack = function () { };
        Application.prototype.SafeAction = function (func, context) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            try {
                if (context) {
                    return $.proxy(func, context, args);
                }
                else {
                    return func();
                }
            }
            catch (e) {
                this.UnhandledException(e);
            }
        };
        Object.defineProperty(Application.prototype, "DefaultActionPolicy", {
            get: function () {
                return [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "Navigator", {
            get: function () {
                return this._navigator;
            },
            enumerable: true,
            configurable: true
        });
        return Application;
    }());
    DomBehind.Application = Application;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Application.js.map
var DomBehind;
(function (DomBehind) {
    var BizView = (function () {
        function BizView() {
            this._disposed = false;
        }
        Object.defineProperty(BizView.prototype, "Container", {
            get: function () {
                return this._container;
            },
            set: function (value) {
                if (this._container !== value) {
                    if (this._container) {
                        this._container.empty();
                        this._container = null;
                    }
                    this._container = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BizView.prototype, "DataContext", {
            get: function () {
                return this._dataContext;
            },
            set: function (value) {
                if (this._dataContext !== value) {
                    this._dataContext = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        BizView.prototype.OnDataContextPropertyChanged = function (sender, e) {
            this.UpdateTarget(e.Name);
        };
        BizView.prototype.ViewLoaded = function (responseText, textStatus, XMLHttpRequest) { };
        BizView.prototype.Ensure = function () {
            if (!this.DataContext)
                return;
            var viewModel = this.DataContext;
            viewModel.View = this;
            if (this.BindingBehaviors) {
                this.BindingBehaviors.Dispose();
                this.BindingBehaviors = null;
            }
            this.BindingBehaviors = new DomBehind.Data.BindingBehaviorCollection();
            this.BuildBinding();
            this.Subscribe();
            this.BindingBehaviors.Ensure();
            if (this.DependencyValidateSetup) {
                this.DependencyValidateSetup();
            }
            if (!viewModel.Initialized) {
                viewModel.Initialized = true;
                this.Container.Raise(DomBehind.UIElement.Initialize);
            }
            this.UpdateTarget();
            this.Container.Raise(DomBehind.UIElement.ViewLoaded);
        };
        BizView.prototype.UnSubscribe = function () {
        };
        BizView.prototype.Subscribe = function () {
        };
        BizView.prototype.CreateBindingBuilder = function () {
            var builder = new DomBehind.BindingBehaviorBuilder(this);
            builder.Element(this.Container).BindingAction(DomBehind.UIElement.Initialize, function (vm) { return vm.Initialize(); });
            builder.Element(this.Container).BindingAction(DomBehind.UIElement.ViewLoaded, function (vm) { return vm.ViewLoaded(); });
            return builder;
        };
        BizView.prototype.UpdateTarget = function (mark) {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateTarget(mark);
        };
        BizView.prototype.UpdateSource = function (mark) {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateSource(mark);
        };
        BizView.prototype.Validate = function (mark) {
            var result = true;
            if (this.BindingBehaviors) {
                this.ClearValidator(mark);
                $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), function (i, behavior) {
                    if (!behavior.BindingPolicy.Validators.Validate()) {
                        result = false;
                    }
                });
                if (result) {
                    this.ClearValidator(mark);
                }
            }
            if (this.DependencyValidate) {
                this.DependencyValidate(mark);
            }
            return result;
        };
        BizView.prototype.ClearValidator = function (mark) {
            $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), function (i, value) {
                value.BindingPolicy.Validators.ClearValidator();
            });
            this.Container.ClearCustomError();
            if (this.DependencyValidateClear) {
                this.DependencyValidateClear(mark);
            }
        };
        BizView.prototype.Dispose = function () {
            if (!this._disposed) {
                this.UnSubscribe();
                if (this.BindingBehaviors) {
                    this.BindingBehaviors.Dispose();
                    this.BindingBehaviors = null;
                }
                if (this.DataContext) {
                    var disopsable = this.DataContext;
                    if (disopsable.Dispose) {
                        disopsable.Dispose();
                    }
                    this.DataContext = null;
                }
                if (this.Container) {
                    this.Container.empty();
                    this.Container = null;
                }
            }
            this._disposed = true;
        };
        return BizView;
    }());
    DomBehind.BizView = BizView;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BizView.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomBehind;
(function (DomBehind) {
    var BizViewModel = (function (_super) {
        __extends(BizViewModel, _super);
        function BizViewModel() {
            var _this = _super.call(this) || this;
            _this.Initialized = false;
            DomBehind.Locator.Push(_this);
            return _this;
        }
        BizViewModel.prototype.NotifyEvent = function (event, args) {
            if (event)
                event.Raise(this, args);
        };
        Object.defineProperty(BizViewModel.prototype, "Title", {
            get: function () {
                return this._title;
            },
            set: function (value) {
                this._title = value;
                document.title = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BizViewModel.prototype, "View", {
            get: function () {
                return this._view;
            },
            set: function (value) {
                if (this._view !== value) {
                    this._view = value;
                    this.OnViewChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        BizViewModel.prototype.OnViewChanged = function () {
        };
        BizViewModel.prototype.ViewLoaded = function () { };
        BizViewModel.prototype.UpdateTarget = function (mark) {
            if (this.View) {
                this.View.UpdateTarget(mark);
            }
        };
        BizViewModel.prototype.UpdateSource = function (mark) {
            if (this.View) {
                this.View.UpdateSource(mark);
            }
        };
        BizViewModel.prototype.Validate = function (mark) {
            var result = false;
            if (this.View) {
                result = this.View.Validate(mark);
            }
            return result;
        };
        BizViewModel.prototype.WaitingOverlay = function (func, image) {
            var overlayPolocy = new DomBehind.Data.WindowWaitingOverlayActionPolicy();
            if (image) {
                overlayPolocy.Option.Image = image;
            }
            this.SafeAction(func, overlayPolocy);
        };
        BizViewModel.prototype.SafeAction = function (func) {
            var policies = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                policies[_i - 1] = arguments[_i];
            }
            var behavior = new DomBehind.Data.ActionBindingBehavior();
            var list = [new DomBehind.Data.ExceptionHandlingActionPolicy()];
            if (policies) {
                $.each(policies, function (i, value) { return list.push(value); });
            }
            var invoker = behavior.CreateActionInvoker(list);
            invoker.Do(func);
        };
        BizViewModel.prototype.Catch = function (ex) {
            if (ex.Data instanceof DomBehind.AjaxException) {
            }
        };
        Object.defineProperty(BizViewModel.prototype, "Navigator", {
            get: function () {
                return DomBehind.Application.Current.Navigator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BizViewModel.prototype, "IsEnabled", {
            get: function () {
                return this.GetProperty("IsEnabled", true);
            },
            set: function (value) {
                this.SetProperty("IsEnabled", value);
            },
            enumerable: true,
            configurable: true
        });
        BizViewModel.prototype.ShowInfomation = function (message, title) {
            DomBehind.MessaageBox.ShowMessage(message, title, DomBehind.MessageStatus.Infomation);
        };
        BizViewModel.prototype.ShowWarning = function (message, title) {
            DomBehind.MessaageBox.ShowMessage(message, title, DomBehind.MessageStatus.Warning);
        };
        BizViewModel.prototype.ShowError = function (message, title) {
            DomBehind.MessaageBox.ShowMessage(message, title, DomBehind.MessageStatus.Error);
        };
        BizViewModel.prototype.ShowMessage = function (message, title, status) {
            DomBehind.MessaageBox.ShowMessage(message, title, status);
        };
        BizViewModel.prototype.ShowYesNo = function (message, title, option) {
            DomBehind.MessaageBox.ShowYesNo(message, title, option);
        };
        BizViewModel.prototype.ShowOkCancel = function (message, title, option) {
            DomBehind.MessaageBox.ShowOkCancel(message, title, option);
        };
        BizViewModel.prototype.Dispose = function () {
            if (!this._disposed) {
                _super.prototype.Dispose.call(this);
            }
        };
        return BizViewModel;
    }(DomBehind.NotifiableImp));
    DomBehind.BizViewModel = BizViewModel;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BizViewModel.js.map
var annotationCollection = (function () {
    function annotationCollection() {
        this.lazyList = [];
    }
    annotationCollection.prototype.Any = function (selector, resolveViewType, resolveViewModelType) {
        return this.lazyList.Any(function (x) {
            return x.Selector === selector &&
                x.ResolveViewType === resolveViewType &&
                x.ResolveViewModelType === resolveViewModelType;
        });
    };
    annotationCollection.prototype.Add = function (selector, resolveViewType, resolveViewModelType) {
        this.lazyList.push({
            Selector: selector,
            ResolveViewType: resolveViewType,
            ResolveViewModelType: resolveViewModelType
        });
    };
    annotationCollection.prototype.Remove = function (selector, resolveViewType, resolveViewModelType) {
        var newArray = [];
        $.each(this.lazyList, function (i, x) {
            if (!(x.Selector === selector &&
                x.ResolveViewType === x.ResolveViewType &&
                x.ResolveViewModelType === x.ResolveViewModelType)) {
                newArray.push(x);
            }
        });
        this.lazyList = newArray;
    };
    annotationCollection.prototype.ToArray = function () {
        var newArray = [];
        $.each(this.lazyList, function (i, x) { return newArray.push(x); });
        return newArray;
    };
    annotationCollection.prototype.Pop = function (peek) {
        var _this = this;
        $.each(this.ToArray(), function (i, each) {
            if (!peek) {
                _this.Remove(each.Selector, each.ResolveViewType, each.ResolveViewModelType);
            }
            $.BindingAnnotation(each.Selector, each.ResolveViewType, each.ResolveViewModelType);
        });
    };
    return annotationCollection;
}());
var __lazyCollection = new annotationCollection();
$.BindingAnnotation = function (selector, resolveViewType, resolveViewModelType) {
    var d = $.Deferred();
    var view = $(selector);
    view.ready(function (e) {
        var ele = $(selector);
        if (ele.length === 0) {
            if (!__lazyCollection.Any(selector, resolveViewType, resolveViewModelType)) {
                __lazyCollection.Add(selector, resolveViewType, resolveViewModelType);
            }
            d.reject();
            return;
        }
        var viewFactory = new DomBehind.TypedFactory(resolveViewType());
        var viewModelFactory = new DomBehind.TypedFactory(resolveViewModelType());
        var behavior = new DomBehind.Data.ViewViewModelBindingBehavior();
        behavior.GetView = function (x) { return viewFactory.CreateInstance(); };
        behavior.GetViewModel = function (x) { return viewModelFactory.CreateInstance(); };
        behavior.Element = $(selector);
        behavior.Ensure();
        ele.trigger("RegisteredViewViewModel", behavior);
        d.resolve();
    });
    return d.promise();
};
//# sourceMappingURL=BindingAnnotation.js.map
var DomBehind;
(function (DomBehind) {
    var Locator = (function () {
        function Locator() {
        }
        Locator.Push = function (ins) {
            Locator._container.push(ins);
        };
        Locator.List = function (typeT, predicate) {
            var array = [];
            $.each(Locator._container, function (i, each) {
                if (each instanceof typeT) {
                    if (!predicate) {
                        array.push(each);
                    }
                    else if (predicate(each)) {
                        array.push(each);
                    }
                }
            });
            return array;
        };
        Locator.First = function (typeT, predicate) {
            var result;
            $.each(Locator._container, function (i, each) {
                if (each instanceof typeT) {
                    if (!predicate) {
                        result = each;
                        return false;
                    }
                    else if (predicate(each)) {
                        result = each;
                        return false;
                    }
                }
            });
            return result;
        };
        Locator.Remove = function (typeT, predicate) {
            var array = [];
            $.each(Locator._container, function (i, each) {
                if (each instanceof typeT) {
                    if (!(!predicate || predicate(each))) {
                        array.push(each);
                    }
                }
                else {
                    array.push(each);
                }
            });
            Locator._container = array;
        };
        Locator.Clear = function () {
            Locator._container = [];
        };
        Locator._container = [];
        return Locator;
    }());
    DomBehind.Locator = Locator;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Locator.js.map
$.validator.setDefaults({
    ignore: "",
    errorPlacement: function (error, element) {
        var id = element.attr("id");
        if (id) {
            var pre = element.prevAll("[for=\"" + id + "\"]");
            if (pre.length != 0) {
                error.insertAfter(pre);
            }
            var post = element.nextAll("[for=\"" + id + "\"]");
            if (post.length != 0) {
                error.insertAfter(post);
            }
            var form = element.closest("form");
            var closet = form.find("[for=\"" + id + "\"]");
            if (closet.length != 0) {
                error.insertAfter(closet);
            }
            if (pre.length === 0 && post.length === 0 && closet.length === 0) {
                error.insertAfter(element);
            }
        }
    }
});
var DomBehind;
(function (DomBehind) {
    DomBehind.BizView.prototype.DependencyValidateSetup = function () {
        var me = this;
        var container = me.Container;
        if (!container) {
            return;
        }
        if (!container.is("form")) {
            container = container.find("form");
        }
        if (container.length == 0) {
            container = container.closest("form");
        }
        if (container.length == 0)
            return;
        $.each(me.BindingBehaviors.ListDataBindingBehavior(), function (i, behavior) {
            $.each(behavior.BindingPolicy.Validators.toArray(), function (k, validator) {
                var el = behavior.Element;
                var identity = el.attr("identity");
                if (!el.attr("identity")) {
                    identity = NewUid().Replace("-", "");
                    el.attr("identity", identity);
                }
                var cls = "cls-" + identity;
                if (!el.hasClass(cls)) {
                    el.addClass(cls);
                }
                var name = el.attr("name");
                if (String.IsNullOrWhiteSpace(name)) {
                    el.attr("name", "name-" + identity);
                }
                var funcName = "func-" + identity;
                var o = JSON.parse("{ \"" + funcName + "\": { \"" + funcName + "\": true }  }");
                $.validator.addClassRules(cls, o);
                if (validator instanceof DomBehind.Validation.RequiredValidator) {
                    var requiredFunc = $.validator.methods.required;
                    if (validator.Message) {
                        $.validator.addMethod("" + funcName, requiredFunc, validator.Message);
                    }
                    else {
                        $.validator.addMethod("" + funcName, requiredFunc, "必須項目です");
                    }
                }
            });
        });
    };
    DomBehind.BizView.prototype.DependencyValidate = function (mark) {
        var me = this;
        var container = me.Container;
        if (!container) {
            return;
        }
        if (!container.is("form")) {
            container = container.find("form");
        }
        if (container.length == 0) {
            container = container.closest("form");
        }
        if (container.length == 0)
            return;
        $.each(me.BindingBehaviors.ListDataBindingBehavior(mark), function (i, behavior) {
            $.each(behavior.BindingPolicy.Validators.toArray(), function (k, validator) {
                var el = behavior.Element;
                if (validator instanceof DomBehind.Validation.RequiredValidator) {
                    if (el.attr(validator.Attribute)) {
                        el.removeAttr(validator.Attribute);
                    }
                }
                el.valid();
            });
        });
    };
    DomBehind.BizView.prototype.DependencyValidateClear = function (mark) {
        var me = this;
        var container = me.Container;
        if (!container) {
            return;
        }
        if (!container.is("form")) {
            container = container.find("form");
        }
        if (container.length == 0) {
            container = container.closest("form");
        }
        if (container.length == 0)
            return;
        var jqueryValidator = container.validate();
        if (jqueryValidator) {
            jqueryValidator.resetForm();
        }
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=JQueryValidationExtension.js.map