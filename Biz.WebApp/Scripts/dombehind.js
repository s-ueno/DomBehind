// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
// https://gist.github.com/jcxplorer/823878
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
    var EventArgs = /** @class */ (function () {
        function EventArgs() {
        }
        return EventArgs;
    }());
    DomBehind.EventArgs = EventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=EventArgs.js.map
var DomBehind;
(function (DomBehind) {
    var CancelEventArgs = /** @class */ (function () {
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
    var CollectionChangedEventArgs = /** @class */ (function (_super) {
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
    var Exception = /** @class */ (function () {
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
    var AjaxException = /** @class */ (function (_super) {
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
                    // MVC Controller経由の緩いコントラクト
                    var json = this.JqXHR.responseJSON;
                    if (json && json.Message) {
                        return json.Message;
                    }
                    // ERROR HTMLからタイトル抜粋
                    return $(this.JqXHR.responseText).filter("title").text();
                }
                // JqueryAjax以外
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
        var ValidationException = /** @class */ (function () {
            function ValidationException(Message, Selector) {
                this.Message = Message;
                this.Selector = Selector;
            }
            return ValidationException;
        }());
        Validation.ValidationException = ValidationException;
        var AggregateValidationException = /** @class */ (function () {
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
    /**
     * define typed events
     */
    var TypedEvent = /** @class */ (function () {
        function TypedEvent() {
            // #region implements interface of IEventName
            // #endregion
            // #region implements interface of IEvent
            this.handlers = [];
            this._disposed = false;
            // #endregion
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
        /**
         * Handle the defined event
         * @param handler
         */
        TypedEvent.prototype.AddHandler = function (handler) {
            this.handlers.push(handler);
        };
        /**
         * Remove the handle from the defined event
         * @param handler
         */
        TypedEvent.prototype.RemoveHandler = function (handler) {
            this.handlers = this.handlers.filter(function (h) { return h !== handler; });
        };
        /**
         * Notify all of the handle
         * @param sender
         * @param data
         */
        TypedEvent.prototype.Raise = function (sender, data) {
            this.handlers.slice(0).forEach(function (h) { return h(sender, data); });
        };
        // #endregion
        TypedEvent.prototype.Clear = function () {
            var _this = this;
            $.each(this.handlers, function (i, each) {
                _this.handlers[i] = null;
            });
            this.handlers = [];
        };
        TypedEvent.prototype.Ensure = function (behavior /*: Data.ActionBindingBehavior */) {
            if (this.EnsureHandler) {
                this.EnsureHandler(behavior);
            }
        };
        // #region IDisposable
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
    /**
     * Generate a typed event class.
     */
    var EventBuilder = /** @class */ (function () {
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
            /**
             * It gets the event name.
             * Event name will be used in JQuery
             */
            get: function () {
                return this._eventName;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Generate a typed event class.
         * @param eventName
         */
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
    var PropertyChangedEventArgs = /** @class */ (function (_super) {
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
    var PropertyChangingEventArgs = /** @class */ (function (_super) {
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
    var NotifiableImp = /** @class */ (function () {
        function NotifiableImp() {
            // #region INotifyPropertyChanged
            this.PropertyChanged = new DomBehind.TypedEvent();
            this._dic = {};
            this._disposed = false;
        }
        // #endregion
        // #region Property Backing Store
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
        // #endregion
        // #region Dispose
        NotifiableImp.prototype.Dispose = function () {
            if (!this._disposed) {
                this._dic = null;
                if (this.PropertyChanged) {
                    this.PropertyChanged.Dispose();
                }
            }
            this._disposed = true;
        };
        // #endregion
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
    var PropertyInfo = /** @class */ (function () {
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
    var LamdaExpression = /** @class */ (function (_super) {
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
            // console.info(`★${expression}`);
            var m = LamdaExpression._extractor_Minified.exec(expression + "");
            var s = m[1].trim();
            // console.info(`★${s}`);
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
        // http://stackoverflow.com/questions/29191451/get-name-of-variable-in-typescript
        LamdaExpression._extractor = new RegExp("return (.*);");
        LamdaExpression._extractor_Minified = new RegExp("return (.*)}");
        return LamdaExpression;
    }(PropertyInfo));
    DomBehind.LamdaExpression = LamdaExpression;
    var BooleanFakeExpression = /** @class */ (function (_super) {
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
        var ListCollectionView = /** @class */ (function (_super) {
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
        /**
         * Describes the timing of binding source updates.
         */
        var UpdateSourceTrigger;
        (function (UpdateSourceTrigger) {
            /**
             * Updates the binding source only when you call the UpdateSource method.
             */
            UpdateSourceTrigger[UpdateSourceTrigger["Explicit"] = 0] = "Explicit";
            /**
             * Updates the binding source whenever the binding target element loses focus.
             */
            UpdateSourceTrigger[UpdateSourceTrigger["LostForcus"] = 1] = "LostForcus";
            /**
             * This is for extension
             */
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
    var List = /** @class */ (function (_super) {
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
    var Observable = /** @class */ (function () {
        // #endregion
        function Observable(source, option) {
            this.source = source;
            // #region INotifyPropertyChanged
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
//# sourceMappingURL=EnumerableExtensions.js.map
// declare var Object: ObjectConstructor;
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
// declare var String: StringConstructor;
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
    totalWidth = totalWidth >> 0; //truncate if number or convert non-number to 0;
    paddingChar = String((typeof paddingChar !== 'undefined' ? paddingChar : ' '));
    if (this.length > totalWidth) {
        return String(this);
    }
    else {
        totalWidth = totalWidth - this.length;
        if (totalWidth > paddingChar.length) {
            paddingChar += paddingChar.Repeat(totalWidth / paddingChar.length); //append to original to ensure we are longer than needed
        }
        return paddingChar.slice(0, totalWidth) + String(this);
    }
});
"PadRight".ExtendedPrototype(String.prototype, function (totalWidth, paddingChar) {
    totalWidth = totalWidth >> 0; //floor if number or convert non-number to 0;
    paddingChar = String((typeof paddingChar !== 'undefined' ? paddingChar : ' '));
    if (this.length > totalWidth) {
        return String(this);
    }
    else {
        totalWidth = totalWidth - this.length;
        if (totalWidth > paddingChar.length) {
            paddingChar += paddingChar.Repeat(totalWidth / paddingChar.length); //append to original to ensure we are longer than needed
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
    var TypedFactory = /** @class */ (function () {
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
    var Repository = /** @class */ (function () {
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
    var IndexedDBHelper = /** @class */ (function () {
        function IndexedDBHelper(ctor, DbName) {
            this.DbName = DbName;
            var schema = new ctor();
            var name = schema.constructor.name;
            if (name == "Object") {
                throw Error("dynamic object is not supported");
            }
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
                    // cursor is end;
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
                        // 
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
            // let d = $.Deferred<any>();
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
    var Data;
    (function (Data) {
        /**
         * To communicate the View and ViewModel properties using JQuery
         */
        var DependencyProperty = /** @class */ (function () {
            // #region  constructor
            function DependencyProperty(name) {
                this._propertyName = name;
            }
            Object.defineProperty(DependencyProperty.prototype, "PropertyName", {
                // #endregion
                // #region PropertyName
                get: function () {
                    return this._propertyName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "GetValue", {
                // #endregion
                // #region GetValue-SetValue
                /**
                 * Using JQuery to get the value from the View
                 */
                get: function () {
                    return this._getter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "SetValue", {
                /**
                 * Using JQuery and set the value to View
                 */
                get: function () {
                    return this._setter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "UpdateSourceTrigger", {
                // #endregion
                // #region UpdateSourceTrigger
                /**
                 * Default UpdateSourceTrigger
                 */
                get: function () {
                    return this._updateSourceTrigger;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "BindingMode", {
                // #endregion
                // #region Binding Mode
                get: function () {
                    return this._bindingMode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DependencyProperty.prototype, "Ensure", {
                // #endregion
                // #region Ensure Action
                get: function () {
                    return this._ensure;
                },
                enumerable: true,
                configurable: true
            });
            // #endregion
            // #region static method
            /**
             * It defines the communication using JQuery
             * @param propertyName
             * @param getValue
             * @param setValue
             * @param updateSourceTrigger
             */
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
        /**
         * policy on binding
         */
        var BindingPolicy = /** @class */ (function () {
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
        /**
         * supports the link of the view and the view model
         */
        var BindingBehavior = /** @class */ (function () {
            function BindingBehavior() {
                // #region property
                this.BindingPolicy = new Data.BindingPolicy();
                this.Priolity = 0;
                this._disposed = false;
                // #endregion
            }
            // #endregion
            // #region Dispose
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
        /**
         * linking the properties of the view and the ViewModel
         */
        var DataBindingBehavior = /** @class */ (function (_super) {
            __extends(DataBindingBehavior, _super);
            function DataBindingBehavior() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Marks = [];
                _this.AdditionalInfo = new collections.LinkedDictionary();
                _this.UpdateSourceEvent = new DomBehind.TypedEvent();
                _this.UpdateTargetEvent = new DomBehind.TypedEvent();
                _this.Events = [];
                return _this;
                // #endregion
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
                // #region UpdateSource - UpdateTarget
                /**
                 *  ValueCore is the input value of the view that is not transferred to the ViewModel
                 */
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
            /**
             * Sends the current binding target value to the binding source property
             */
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
            /**
             * Forces a data transfer from the binding source property to the binding target property.
             */
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
            // #endregion
            // #region Ensure
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
            // #endregion
            // #region Dispose
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
        /**
         * linked the method of the View of the event and the ViewModel
         */
        var ActionBindingBehavior = /** @class */ (function (_super) {
            __extends(ActionBindingBehavior, _super);
            function ActionBindingBehavior() {
                // #region Event property
                var _this = _super !== null && _super.apply(this, arguments) || this;
                // #endregion
                // #region ActionPolicy
                _this.ActionPolicyCollection = [];
                return _this;
                // #endregion
            }
            // #region Ensure
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
            // #endregion
            // #region Do
            /**
             * Run the linked action
             * @param sender
             * @param e
             */
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
            // #endregion
            // #region Dispose
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
        var ViewViewModelBindingBehavior = /** @class */ (function (_super) {
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
        /**
         * provides the ability to easily use behaviors
         */
        var BindingBehaviorCollection = /** @class */ (function (_super) {
            __extends(BindingBehaviorCollection, _super);
            function BindingBehaviorCollection() {
                // #region Ensure
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._disposed = false;
                return _this;
                // #endregion
            }
            /**
             * Ensure
             */
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
            // #endregion
            // #region List
            /**
             * lists the more behaviors
             * @param mark
             */
            BindingBehaviorCollection.prototype.ListDataBindingBehavior = function (mark) {
                var list = this.toArray().filter(function (x) { return x instanceof Data.DataBindingBehavior; });
                if (!String.IsNullOrWhiteSpace(mark)) {
                    list = list.filter(function (x) { return x.Marks.some(function (y) { return y === mark; }); });
                }
                return list;
            };
            // #endregion
            // #region UpdateTarget - UpdateSource
            /**
             * Forces a data transfer from the binding source property to the binding target property.
             * @param mark
             */
            BindingBehaviorCollection.prototype.UpdateTarget = function (mark) {
                var list = this.ListDataBindingBehavior(mark);
                $.each(list, function (i, x) {
                    x.UpdateTarget();
                });
            };
            /**
             * Sends the current binding target value to the binding source property
             * @param mark
             */
            BindingBehaviorCollection.prototype.UpdateSource = function (mark) {
                var list = this.ListDataBindingBehavior(mark);
                $.each(list, function (i, x) {
                    x.UpdateSource();
                });
            };
            // #endregion
            // #region
            // #endregion
            // #region Dispose
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
    /**
     * support the construction of behavior
     */
    var BindingBehaviorBuilder = /** @class */ (function () {
        // #region constructor
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
        // #endregion
        BindingBehaviorBuilder.prototype.SetValue = function (dp, value) {
            dp.SetValue(this.CurrentElement, value, this.CurrentBehavior);
            return this;
        };
        // #region Binding is linking the properties of the view and the view model
        /**
         * linking the properties of the view and the view model
         * @param property
         * @param getter
         * @param setter
         * @param updateTrigger is update timing of view model
         */
        BindingBehaviorBuilder.prototype.Binding = function (property, bindingExpression, mode, updateTrigger) {
            var behavior = this.Add(new DomBehind.Data.DataBindingBehavior());
            behavior.Property = property;
            behavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, bindingExpression);
            behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
            behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;
            var dataBindingBuilder = new DomBehind.Data.DataBindingBehaviorBuilder(this.Owner);
            dataBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            dataBindingBuilder.CurrentElement = this.CurrentElement;
            // default PartialMark is PropertyName
            return dataBindingBuilder.PartialMark(behavior.PInfo.MemberPath);
        };
        /**
         * Assign "IValueConverter"
         * @param conv
         */
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
        // #endregion
        // #region BindingViewModel
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
        // #endregion
        // #region Add
        /**
         * Register the behavior
         * @param behavior
         */
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
    var SimpleConverter = /** @class */ (function () {
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
        var DataBindingBehaviorBuilder = /** @class */ (function (_super) {
            __extends(DataBindingBehaviorBuilder, _super);
            // #region constructor
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
            // #endregion
            /**
             * Give any of the mark to the property.
             * It is possible to perform partial updating and partial validation.
             * @param region
             */
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
            /**
             *
             * @param converter
             */
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
        var ActionBindingBehaviorBuilder = /** @class */ (function (_super) {
            __extends(ActionBindingBehaviorBuilder, _super);
            // #region constructor
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
            // #endregion
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
        /**
         * Apply any of the policy to the bindable action
         */
        var ActionPolicy = /** @class */ (function () {
            function ActionPolicy() {
            }
            // #endregion
            /**
             *
             * @param func
             */
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
        var ActionPolicyExceptionEventArgs = /** @class */ (function (_super) {
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
        var ExceptionHandlingActionPolicy = /** @class */ (function (_super) {
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
        var ValidationExceptionHandlingActionPolicy = /** @class */ (function (_super) {
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
        // #region http://gasparesganga.com/labs/jquery-loading-overlay/
        var DefaultWaitingOverlayOption = /** @class */ (function () {
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
        var WaitingOverlayActionPolicy = /** @class */ (function (_super) {
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
        // #endregion
        var ElementWaitingOverlayActionPolicy = /** @class */ (function (_super) {
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
        var WindowWaitingOverlayActionPolicy = /** @class */ (function (_super) {
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
        // SuppressDuplicateActionPolicy is the work
        var SuppressDuplicateWorkException = /** @class */ (function (_super) {
            __extends(SuppressDuplicateWorkException, _super);
            function SuppressDuplicateWorkException() {
                return _super.call(this, "This exception is a safe exception issued to prevent double press") || this;
            }
            return SuppressDuplicateWorkException;
        }(DomBehind.Exception));
        var SuppressDuplicateActionPolicy = /** @class */ (function (_super) {
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
        var DefaultNavigator = /** @class */ (function () {
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
                    // e.data.trigger(OnModalCloseEventName, args);
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
                //// domに追加
                //overlay.append(container);
                var modal = container.find(".modal-dialog");
                modal.draggable({
                    handle: ".modal-header",
                    cursor: "move",
                });
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
                        // e.data.trigger(OnModalCloseEventName);
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
                // domに追加
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
        var Validator = /** @class */ (function () {
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
            // #region Dispose
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
        var ValidatorCollection = /** @class */ (function (_super) {
            __extends(ValidatorCollection, _super);
            function ValidatorCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._disposed = false;
                return _this;
                // #endregion
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
            // #region Dispose
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
        var MaxLengthValidator = /** @class */ (function (_super) {
            __extends(MaxLengthValidator, _super);
            function MaxLengthValidator() {
                return _super.call(this, "maxlength") || this;
            }
            // #region Dispose
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
        var RegexValidator = /** @class */ (function (_super) {
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
            // #region Dispose
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
        var RequiredValidator = /** @class */ (function (_super) {
            __extends(RequiredValidator, _super);
            function RequiredValidator() {
                return _super.call(this, "required") || this;
            }
            // #region Dispose
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
        var WorkerPool = /** @class */ (function () {
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
        var WorkerWrapper = /** @class */ (function () {
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
        var PlainXMLHttpRequestWorker = /** @class */ (function (_super) {
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
        var WebService = /** @class */ (function () {
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
    var UIElement = /** @class */ (function () {
        function UIElement() {
        }
        /**
         * Gets or sets the val attribute of the element
         */
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
    /**
     * HTML5
     */
    var InputType;
    (function (InputType) {
        /**
         * hidden
         */
        InputType[InputType["Hidden"] = 0] = "Hidden";
        /**
         * text
         */
        InputType[InputType["Text"] = 1] = "Text";
        /**
         * search
         */
        InputType[InputType["Search"] = 2] = "Search";
        /**
         * tel
         */
        InputType[InputType["Tel"] = 3] = "Tel";
        /**
         * url
         */
        InputType[InputType["Url"] = 4] = "Url";
        /**
         * email
         */
        InputType[InputType["Email"] = 5] = "Email";
        /**
         * password
         */
        InputType[InputType["Password"] = 6] = "Password";
        /**
         * datetime
         */
        InputType[InputType["DateTime"] = 7] = "DateTime";
        /**
         * date
         */
        InputType[InputType["Date"] = 8] = "Date";
        /**
         * month
         */
        InputType[InputType["Month"] = 9] = "Month";
        /**
         * week
         */
        InputType[InputType["Week"] = 10] = "Week";
        /**
         * time
         */
        InputType[InputType["Time"] = 11] = "Time";
        /**
         * datetime-local
         */
        InputType[InputType["DateTimeLocal"] = 12] = "DateTimeLocal";
        /**
         * number
         */
        InputType[InputType["Number"] = 13] = "Number";
        /**
         * range
         */
        InputType[InputType["Range"] = 14] = "Range";
        /**
         * color
         */
        InputType[InputType["Color"] = 15] = "Color";
        /**
         * checkbox
         */
        InputType[InputType["Checkbox"] = 16] = "Checkbox";
        /**
         * radio
         */
        InputType[InputType["Radio"] = 17] = "Radio";
        /**
         * file
         */
        InputType[InputType["File"] = 18] = "File";
        /**
         * submit
         */
        InputType[InputType["Submit"] = 19] = "Submit";
        /**
         * image
         */
        InputType[InputType["Image"] = 20] = "Image";
        /**
         * reset
         */
        InputType[InputType["Reset"] = 21] = "Reset";
        /**
         * button
         */
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
        var Selector = /** @class */ (function () {
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
                // this.Behavior.Element.selectpicker('refresh');
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
                // HACK bootstrap-select.js val method
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
var DomBehind;
(function (DomBehind) {
    var MessageStatus;
    (function (MessageStatus) {
        MessageStatus[MessageStatus["Infomation"] = 0] = "Infomation";
        MessageStatus[MessageStatus["Warning"] = 1] = "Warning";
        MessageStatus[MessageStatus["Error"] = 2] = "Error";
    })(MessageStatus = DomBehind.MessageStatus || (DomBehind.MessageStatus = {}));
    var MessaageBox = /** @class */ (function () {
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
    // デフォルトのビルトイン
    MessaageBox.BuiltIn(function () { return DefaultMessageContainer; });
    var DefaultMessageContainer = /** @class */ (function () {
        function DefaultMessageContainer() {
        }
        DefaultMessageContainer.prototype.ShowMessage = function (message, title, status) {
            // デフォルトのアラートメッセージ
            window.alert(message);
        };
        DefaultMessageContainer.prototype.ShowYesNo = function (message, title, option) {
            // window.confirm はjavascriptを止めるタイプのメッセージボックスなので、このほうが嬉しいシチュエーションの方がエンタープライズだと多いと思われる
            // 通常、JSやCSS系のFWだとjavascriptを止めないで、callbackでOK、Cancelなどを実行するが、それでも良いなら割とデザインに幅が広がる
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
            // window.confirm はjavascriptを止めるタイプのメッセージボックスなので、このほうが嬉しいシチュエーションの方がエンタープライズだと多いと思われる
            // 通常、JSやCSS系のFWだとjavascriptを止めないで、callbackでOK、Cancelなどを実行するが、それでも良いなら割とデザインに幅が広がる
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
    var ListView = /** @class */ (function (_super) {
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
    var TableBindingBehaviorBuilder = /** @class */ (function (_super) {
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
    var TemplateListView = /** @class */ (function (_super) {
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
                var temp = jtemplate[0];
                var template = $(temp.content.querySelector("div"));
                this.RemoveAll();
                var dataContext = this.DataContext;
                var rowContainer = $("<div class=\"templateRowContainer\"></div>");
                $.each(newValue.ToArray(), function (i, value) {
                    var newRow = template.clone();
                    $.each(_this.Columns, function (k, column) {
                        var el = newRow.find(column.templateSelector);
                        if (el.length !== 0) {
                            // property binding
                            if (column.expression && column.dependencyProperty) {
                                // one time
                                var ret = column.expression(value);
                                column.dependencyProperty.SetValue(el, ret);
                                // two way
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
                            // event binding
                            if (column.expressionAction && column.attachedEvent) {
                                var newEvent_1 = column.attachedEvent.Create();
                                newEvent_1.AddHandler(function (sener, e) {
                                    column.expressionAction(dataContext, value);
                                });
                                el.off(newEvent_1.EventName);
                                el.on(newEvent_1.EventName, function (e) {
                                    newEvent_1.Raise(_this, e);
                                });
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
    var TemplateListViewBindingBehaviorBuilder = /** @class */ (function (_super) {
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
var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Tooltip = /** @class */ (function () {
            function Tooltip() {
            }
            Tooltip.TextProperty = DomBehind.Data.DependencyProperty.RegisterAttached("title", function (x) { return x.attr("title"); }, function (x, y) {
                var element = x;
                if (x.attr("type") === "checkbox") {
                    var parent_1 = x.closest("label");
                    parent_1.tooltip();
                    parent_1.attr("title", y);
                }
                else {
                    x.tooltip();
                    x.attr("title", y);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
            return Tooltip;
        }());
        Controls.Tooltip = Tooltip;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Tooltip.js.map
var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Selectmenu = /** @class */ (function () {
            function Selectmenu() {
                this._engaged = false;
            }
            Selectmenu.Register = function (behavior) {
                var el = behavior.Element;
                var value = el.data("native-menu");
                if (String.IsNullOrWhiteSpace(value)) {
                    el.data("native-menu", "false");
                }
            };
            Selectmenu.Rebuild = function (el, list) {
                var newArray = list.ToArray();
                if (newArray.SequenceEqual(list.__oldArray)) {
                    return false;
                }
                el.empty();
                var identity = el.data("menu_identity");
                if (!identity) {
                    identity = "menu_" + NewUid();
                    el.data("menu_identity", identity);
                }
                var oldArray = list.__oldArray;
                list.__oldArray = newArray;
                var index = 0;
                var items = newArray.Select(function (x) {
                    if (Object.IsNullOrUndefined(x))
                        return null;
                    x.recid = identity + "_" + ++index;
                    var text;
                    if (list.DisplayMemberPath) {
                        text = x[list.DisplayMemberPath];
                    }
                    else {
                        text = x.toString();
                    }
                    var newVal = {
                        id: x.recid,
                        text: text,
                        obj: x,
                    };
                    el.append("<option value=\"" + newVal.id + "\">" + newVal.text + "</option>");
                    return newVal;
                });
                Selectmenu.UpdateCurrent(el, list);
                return true;
            };
            Selectmenu.UpdateCurrent = function (el, list) {
                var widget = el.selectmenu();
                if (list.Current != null) {
                    var id = list.Current.recid;
                    widget.val(id);
                }
                widget.selectmenu("refresh");
            };
            Selectmenu.prototype.OnCurrentChanged = function (sender, e) {
                if (this._engaged)
                    return;
                var me = sender.__widget;
                var el = me.Element;
                // プロパティ未指定の場合は、リフレッシュする
                if (String.IsNullOrWhiteSpace(e.Name)) {
                    Selectmenu.Rebuild(el, sender);
                }
                else if (e.Name === "Current") {
                    Selectmenu.UpdateCurrent(el, sender);
                }
            };
            Selectmenu.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", function (el) {
            }, function (el, newValue) {
                if (newValue instanceof DomBehind.Data.ListCollectionView) {
                    if (!Selectmenu.Rebuild(el, newValue))
                        return;
                    // 
                    var sm_1 = newValue.__widget;
                    if (!sm_1) {
                        sm_1 = newValue.__widget = new Selectmenu();
                    }
                    var option = {
                        change: function (e) {
                            var recId = el.val();
                            sm_1._engaged = true;
                            try {
                                if (sm_1.Items) {
                                    var current = sm_1.Items.ToArray().FirstOrDefault(function (x) { return x.recid === recId; });
                                    sm_1.Items.Select(current);
                                }
                            }
                            finally {
                                sm_1._engaged = false;
                            }
                        },
                        classes: {
                            "ui-selectmenu-menu": "jqueryui-highlight"
                        }
                    };
                    sm_1.Element = el.selectmenu(option);
                    sm_1.Element.selectmenu("refresh");
                    sm_1.Items = newValue;
                    newValue.PropertyChanged.RemoveHandler(sm_1.OnCurrentChanged);
                    newValue.PropertyChanged.AddHandler(sm_1.OnCurrentChanged);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, function (behavior) {
                Selectmenu.Register(behavior);
            });
            return Selectmenu;
        }());
        Controls.Selectmenu = Selectmenu;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Selectmenu.js.map
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
    var CalendarViewMode;
    (function (CalendarViewMode) {
        CalendarViewMode[CalendarViewMode["month"] = 0] = "month";
        CalendarViewMode[CalendarViewMode["agendaWeek"] = 1] = "agendaWeek";
        CalendarViewMode[CalendarViewMode["agendaDay"] = 2] = "agendaDay";
    })(CalendarViewMode = DomBehind.CalendarViewMode || (DomBehind.CalendarViewMode = {}));
    var CalendarHeaderButtons;
    (function (CalendarHeaderButtons) {
        CalendarHeaderButtons[CalendarHeaderButtons["prevYear"] = 1] = "prevYear";
        CalendarHeaderButtons[CalendarHeaderButtons["prev"] = 2] = "prev";
        CalendarHeaderButtons[CalendarHeaderButtons["next"] = 4] = "next";
        CalendarHeaderButtons[CalendarHeaderButtons["nextYear"] = 8] = "nextYear";
        CalendarHeaderButtons[CalendarHeaderButtons["month"] = 16] = "month";
        CalendarHeaderButtons[CalendarHeaderButtons["agendaWeek"] = 32] = "agendaWeek";
        CalendarHeaderButtons[CalendarHeaderButtons["agendaDay"] = 64] = "agendaDay";
        CalendarHeaderButtons[CalendarHeaderButtons["title"] = 128] = "title";
        CalendarHeaderButtons[CalendarHeaderButtons["today"] = 256] = "today";
    })(CalendarHeaderButtons = DomBehind.CalendarHeaderButtons || (DomBehind.CalendarHeaderButtons = {}));
    var EventDataWrapper = /** @class */ (function () {
        function EventDataWrapper() {
            this.CalendarBindings = {};
        }
        Object.defineProperty(EventDataWrapper.prototype, "id", {
            get: function () {
                return this.GetValue("id");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "title", {
            get: function () {
                return this.GetValue("title");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "start", {
            get: function () {
                var value = this.GetValue("start");
                return moment(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "end", {
            get: function () {
                var value = this.GetValue("end");
                return moment(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "allDay", {
            get: function () {
                return this.GetValue("allDay");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "url", {
            get: function () {
                return this.GetValue("url");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "className", {
            get: function () {
                return this.GetValue("className");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "editable", {
            get: function () {
                return this.GetValue("editable", true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "color", {
            get: function () {
                return this.GetValue("color");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "backgroundColor", {
            get: function () {
                return this.GetValue("backgroundColor");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "borderColor", {
            get: function () {
                return this.GetValue("borderColor");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "textColor", {
            get: function () {
                return this.GetValue("textColor");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "rendering", {
            get: function () {
                return this.GetValue("rendering");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "startEditable", {
            get: function () {
                return this.GetValue("startEditable", true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "overlap", {
            get: function () {
                return this.GetValue("overlap", true);
            },
            enumerable: true,
            configurable: true
        });
        EventDataWrapper.prototype.GetValue = function (key, defaultValue) {
            var option = this.CalendarBindings[key];
            if (!option || !option.Expression)
                return defaultValue;
            var value = option.Expression(this.EventData);
            if (option.ConvertTarget) {
                value = option.ConvertTarget(value);
            }
            return value;
        };
        return EventDataWrapper;
    }());
    var Calendar = /** @class */ (function (_super) {
        __extends(Calendar, _super);
        function Calendar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.CalendarBindings = {};
            return _this;
        }
        Calendar.prototype.Ensure = function () {
            var _this = this;
            _super.prototype.Ensure.call(this);
            this.Option = $.extend(true, this.DefaultOption, this.Option);
            // ユニークなIDを属性に付与した上で、グローバル管理
            var identity = "id-" + NewUid();
            this.Element.attr("fullCalendar-identity", identity);
            window[identity] = this;
            var option = {
                header: {
                    left: this.ParseCalendarHeaderButtons(this.Option.header.left),
                    center: this.ParseCalendarHeaderButtons(this.Option.header.center),
                    right: this.ParseCalendarHeaderButtons(this.Option.header.right)
                },
                defaultDate: this.Option.defaultDate,
                businessHours: this.Option.businessHours,
                editable: this.Option.editable,
                theme: this.Option.theme,
                defaultView: this.ParseCalendarViewMode(this.Option.defaultView),
                scrollTime: this.ParseScrollTime(this.Option.scrollTime),
                slotDuration: this.ParseSlotDuration(this.Option.slotDuration),
            };
            // patch
            option.eventAfterAllRender = function (view) {
            };
            if (this.Option.eventClick) {
                option.eventClick = function (a, b, c) {
                    if (a.EventData) {
                        var e_1 = {
                            sender: _this,
                            original: a.EventData,
                            event: b,
                            view: c
                        };
                        DomBehind.Application.Current.SafeAction(function () {
                            return _this.Option.eventClick(_this.DataContext, e_1);
                        });
                    }
                };
            }
            if (this.Option.dayClick) {
                // hack d.tsがjsの変更に追いついていない
                option.dayClick = function (date, jsEvent, view) {
                    var e = {
                        event: jsEvent,
                        view: view,
                        date: date && date.toDate() ? date.toDate() : date,
                    };
                    DomBehind.Application.Current.SafeAction(function () {
                        return _this.Option.dayClick(_this.DataContext, e);
                    });
                };
            }
            var nativeOption = {
                lang: this.Option.lang,
                locale: this.Option.lang
            };
            option = $.extend(option, nativeOption);
            this.Element.fullCalendar(option);
            if (this.Option.viewModeClick) {
                var monthButton = this.Element.find(".fc-month-button span");
                if (monthButton.length !== 0) {
                    monthButton.click(function (e) {
                        var eventArgs = {
                            sender: _this,
                            mode: CalendarViewMode.month,
                            original: e,
                        };
                        _this.Option.viewModeClick(_this.DataContext, eventArgs);
                        //Application.Current.SafeAction((vm: any, option: ICalendarOption<any>, e: ICalendarEventArgs) => {
                        //    option.viewModeClick(vm, e);
                        //}, this.DataContext, this.DataContext, this.Option, eventArgs);
                    });
                }
                var agendaWeekButton = this.Element.find(".fc-agendaWeek-button span");
                if (agendaWeekButton.length !== 0) {
                    agendaWeekButton.click(function (e) {
                        var eventArgs = {
                            sender: _this,
                            mode: CalendarViewMode.agendaWeek,
                            original: e,
                        };
                        _this.Option.viewModeClick(_this.DataContext, eventArgs);
                    });
                }
                var agendaDayButton = this.Element.find(".fc-agendaDay-button span");
                if (agendaDayButton.length !== 0) {
                    agendaDayButton.click(function (e) {
                        var eventArgs = {
                            sender: _this,
                            mode: CalendarViewMode.agendaDay,
                            original: e,
                        };
                        _this.Option.viewModeClick(_this.DataContext, eventArgs);
                    });
                }
            }
        };
        Calendar.prototype.ParseCalendarHeaderButtons = function (status) {
            var list = new DomBehind.List();
            if (this.HasFlag(status, CalendarHeaderButtons.prevYear)) {
                list.add("prevYear");
            }
            if (this.HasFlag(status, CalendarHeaderButtons.prev)) {
                list.add("prev");
            }
            if (this.HasFlag(status, CalendarHeaderButtons.next)) {
                list.add("next");
            }
            if (this.HasFlag(status, CalendarHeaderButtons.nextYear)) {
                list.add("nextYear");
            }
            if (this.HasFlag(status, CalendarHeaderButtons.month)) {
                list.add("month");
            }
            if (this.HasFlag(status, CalendarHeaderButtons.agendaWeek)) {
                list.add("agendaWeek");
            }
            if (this.HasFlag(status, CalendarHeaderButtons.agendaDay)) {
                list.add("agendaDay");
            }
            if (this.HasFlag(status, CalendarHeaderButtons.title)) {
                list.add("title");
            }
            if (this.HasFlag(status, CalendarHeaderButtons.today)) {
                list.add("today");
            }
            return list.toArray().join(",");
        };
        Calendar.prototype.HasFlag = function (status, flag) {
            return ((status & flag) == flag);
        };
        Calendar.prototype.ParseCalendarViewMode = function (status) {
            if (status === CalendarViewMode.agendaDay) {
                return "agendaDay";
            }
            else if (status === CalendarViewMode.agendaWeek) {
                return "agendaWeek";
            }
            else {
                return "month";
            }
        };
        Calendar.prototype.ParseScrollTime = function (hour) {
            return moment.duration(hour, "hour");
        };
        Calendar.prototype.ParseSlotDuration = function (minute) {
            return moment.duration(minute, "minute");
        };
        Object.defineProperty(Calendar.prototype, "DefaultOption", {
            get: function () {
                return {
                    header: {
                        left: CalendarHeaderButtons.prev | CalendarHeaderButtons.today | CalendarHeaderButtons.next,
                        center: CalendarHeaderButtons.title,
                        right: CalendarHeaderButtons.month | CalendarHeaderButtons.agendaWeek | CalendarHeaderButtons.agendaDay
                    },
                    defaultDate: new Date(),
                    businessHours: true,
                    editable: true,
                    theme: false,
                    defaultView: CalendarViewMode.agendaWeek,
                    scrollTime: 9,
                    slotDuration: 15,
                    lang: "ja",
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "ItemsSource", {
            set: function (newValue) {
                var _this = this;
                this.RemoveAll();
                var events = new DomBehind.List();
                $.each(newValue.ToArray(), function (i, value) {
                    var newValue = new EventDataWrapper();
                    newValue.EventData = value;
                    newValue.CalendarBindings = _this.CalendarBindings;
                    events.add(newValue);
                });
                this.Element.fullCalendar("addEventSource", events.toArray());
            },
            enumerable: true,
            configurable: true
        });
        Calendar.prototype.RemoveAll = function () {
            this.Element.fullCalendar("removeEvents");
        };
        Calendar.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", function (el) {
        }, function (el, newValue) {
            var identity = el.attr("fullCalendar-identity");
            var calendar = window[identity];
            if (newValue instanceof DomBehind.Data.ListCollectionView) {
                calendar.ItemsSource = newValue;
            }
            else {
                calendar.ItemsSource = new DomBehind.Data.ListCollectionView([]);
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        return Calendar;
    }(DomBehind.Data.DataBindingBehavior));
    DomBehind.Calendar = Calendar;
    var CalendarBindingBehaviorBuilder = /** @class */ (function (_super) {
        __extends(CalendarBindingBehaviorBuilder, _super);
        function CalendarBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        CalendarBindingBehaviorBuilder.prototype.BindingIdentity = function (exp) {
            return this.AddBinding("id", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingTitle = function (exp) {
            return this.AddBinding("title", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingStartDate = function (exp) {
            return this.AddBinding("start", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingEndDate = function (exp) {
            return this.AddBinding("end", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingAllDay = function (exp) {
            return this.AddBinding("allDay", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingUrl = function (exp) {
            return this.AddBinding("url", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingClass = function (exp) {
            return this.AddBinding("className", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingEditable = function (exp) {
            return this.AddBinding("editable", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingColor = function (exp) {
            return this.AddBinding("color", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingBackgroundColor = function (exp) {
            return this.AddBinding("backgroundColor", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingBorderColor = function (exp) {
            return this.AddBinding("borderColor", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingTextColor = function (exp) {
            return this.AddBinding("textColor", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingRendering = function (exp) {
            return this.AddBinding("rendering", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingStartEditable = function (exp) {
            return this.AddBinding("startEditable", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.BindingOverlap = function (exp) {
            return this.AddBinding("overlap", exp);
        };
        CalendarBindingBehaviorBuilder.prototype.AddBinding = function (key, exp) {
            var me = this;
            if (me.CurrentBehavior instanceof Calendar) {
                me.CurrentBehavior.CalendarBindings[key] = {
                    Expression: exp,
                };
                me.CurrentBehavior.LastOption = me.CurrentBehavior.CalendarBindings[key];
            }
            return me;
        };
        return CalendarBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.CalendarBindingBehaviorBuilder = CalendarBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildCalendar = function (itemsSource, option) {
        var me = this;
        var behavior = me.Add(new Calendar());
        behavior.Property = Calendar.ItemsSourceProperty;
        behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, itemsSource);
        behavior.Option = option;
        var newMe = new CalendarBindingBehaviorBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Calendar.js.map
var DomBehind;
(function (DomBehind) {
    var Editor = /** @class */ (function () {
        function Editor() {
        }
        Editor.HtmlProperty = DomBehind.Data.DependencyProperty.RegisterAttached("html", function (el) {
            return el.html();
        }, function (el, newValue) {
            el.html(newValue);
        }, DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
        Editor.TextProperty = DomBehind.Data.DependencyProperty.RegisterAttached("text", function (el) {
            return el.text();
        }, function (el, newValue) {
            el.text(newValue);
        }, DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
        Editor.toolBarHtml = "" +
            "<div class=\"btn-toolbar editor\" data-role=\"editor-toolbar\" data-target=\"#@Id\">" +
            "  <div class=\"btn-group\">" +
            "    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" title=\"Font Size\" aria-expanded=\"false\">" +
            "      <i class=\"fa fa-text-height\"></i>&nbsp;" +
            "      <b class=\"caret\"></b>" +
            "    </a>" +
            "    <ul class=\"dropdown-menu\">" +
            "      <li>" +
            "        <a data-edit=\"fontSize 5\" class=\"\">" +
            "          <p style=\"font-size:17px\">Huge</p>" +
            "        </a>" +
            "      </li>" +
            "      <li>" +
            "        <a data-edit=\"fontSize 3\" class=\"\">" +
            "          <p style=\"font-size:14px\">Normal</p>" +
            "        </a>" +
            "      </li>" +
            "      <li>" +
            "        <a data-edit=\"fontSize 1\">" +
            "          <p style=\"font-size:11px\">Small</p>" +
            "        </a>" +
            "      </li>" +
            "    </ul>" +
            "  </div>" +
            "  <div class=\"btn-group\">" +
            "    <a class=\"btn\" data-edit=\"bold\" title=\"Bold (Ctrl/Cmd+B)\">" +
            "      <i class=\"fa fa-bold\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"italic\" title=\"Italic (Ctrl/Cmd+I)\">" +
            "      <i class=\"fa fa-italic\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"strikethrough\" title=\"Strikethrough\">" +
            "      <i class=\"fa fa-strikethrough\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"underline\" title=\"Underline (Ctrl/Cmd+U)\">" +
            "      <i class=\"fa fa-underline\"></i>" +
            "    </a>" +
            "  </div>" +
            "  <div class=\"btn-group\">" +
            "    <a class=\"btn\" data-edit=\"insertunorderedlist\" title=\"Bullet list\">" +
            "      <i class=\"fa fa-list-ul\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"insertorderedlist\" title=\"Number list\">" +
            "      <i class=\"fa fa-list-ol\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"outdent\" title=\"Reduce indent (Shift+Tab)\">" +
            "      <i class=\"fa fa-dedent\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"indent\" title=\"Indent (Tab)\">" +
            "      <i class=\"fa fa-indent\"></i>" +
            "    </a>" +
            "  </div>" +
            "  <div class=\"btn-group\">" +
            "    <a class=\"btn\" data-edit=\"justifyleft\" title=\"Align Left (Ctrl/Cmd+L)\">" +
            "      <i class=\"fa fa-align-left\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"justifycenter\" title=\"Center (Ctrl/Cmd+E)\">" +
            "      <i class=\"fa fa-align-center\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"justifyright\" title=\"Align Right (Ctrl/Cmd+R)\">" +
            "      <i class=\"fa fa-align-right\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"justifyfull\" title=\"Justify (Ctrl/Cmd+J)\">" +
            "      <i class=\"fa fa-align-justify\"></i>" +
            "    </a>" +
            "  </div>" +
            "  <div class=\"btn-group\">" +
            "    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" title=\"Hyperlink\">" +
            "      <i class=\"fa fa-link\"></i>" +
            "    </a>" +
            "    <div class=\"dropdown-menu input-append\">" +
            "      <input class=\"span2\" placeholder=\"URL\" type=\"text\" data-edit=\"createLink\">" +
            "      <button class=\"btn\" type=\"button\">Add</button>" +
            "    </div>" +
            "    <a class=\"btn\" data-edit=\"unlink\" title=\"Remove Hyperlink\">" +
            "      <i class=\"fa fa-cut\"></i>" +
            "    </a>" +
            "  </div>" +
            "  <div class=\"btn-group\">" +
            "    <a class=\"btn\" title=\"Insert picture (or just drag &amp; drop)\" id=\"@pictureBtnId\">" +
            "      <i class=\"fa fa-picture-o\"></i>" +
            "    </a>" +
            "    <input type=\"file\" data-role=\"magic-overlay\" data-target=\"#@pictureBtnId\" data-edit=\"insertImage\">" +
            "  </div>" +
            "  <div class=\"btn-group\">" +
            "    <a class=\"btn\" data-edit=\"undo\" title=\"Undo (Ctrl/Cmd+Z)\">" +
            "      <i class=\"fa fa-undo\"></i>" +
            "    </a>" +
            "    <a class=\"btn\" data-edit=\"redo\" title=\"Redo (Ctrl/Cmd+Y)\">" +
            "      <i class=\"fa fa-repeat\"></i>" +
            "    </a>" +
            "  </div>" +
            "</div>" +
            "";
        return Editor;
    }());
    DomBehind.Editor = Editor;
    DomBehind.BindingBehaviorBuilder.prototype.BuildEditor = function (html, str) {
        var me = this;
        try {
            var el = me.CurrentElement;
            var id = el.attr("id");
            if (!id) {
                id = "id-" + NewUid();
            }
            var toolBarString = Editor.toolBarHtml
                .Replace("@Id", id)
                .Replace("@pictureBtnId", "id-" + NewUid())
                .Replace("@voiceBtnId", "id-" + NewUid());
            var tb = $(toolBarString);
            el.before(tb);
            tb.find(".dropdown-toggle").dropdown();
            el.wysiwyg({
                toolbarSelector: '[data-target="#' + id + '"]',
            });
            //tb.find('[data-toggle="dropdown"]').each((i, el) => {
            //    let parent = $(el.parentElement)
            //    if (parent.hasClass("btn-group")) {
            //        parent.click(e => {
            //            let a = $(e.target);
            //            let me = a.closest("div.btn-group");
            //            me.toggleClass("open");
            //        });
            //    }
            //});
            if (html) {
                var behavior = me.Add(new DomBehind.Data.DataBindingBehavior());
                behavior.Property = Editor.HtmlProperty;
                behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, html);
            }
            if (str) {
                var behavior = me.Add(new DomBehind.Data.DataBindingBehavior());
                behavior.Property = Editor.TextProperty;
                behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, str);
            }
        }
        catch (e) {
            console.error(e);
        }
        return me;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Editor.js.map
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
    var W2ToolbarItemType;
    (function (W2ToolbarItemType) {
        // button
        W2ToolbarItemType[W2ToolbarItemType["Default"] = 0] = "Default";
        // button
        W2ToolbarItemType[W2ToolbarItemType["Button"] = 1] = "Button";
        // radio
        W2ToolbarItemType[W2ToolbarItemType["RadioButton"] = 2] = "RadioButton";
        // check
        W2ToolbarItemType[W2ToolbarItemType["Checkbox"] = 3] = "Checkbox";
        // break
        W2ToolbarItemType[W2ToolbarItemType["Separator"] = 4] = "Separator";
        // spacer
        W2ToolbarItemType[W2ToolbarItemType["Space"] = 5] = "Space";
        // menu
        W2ToolbarItemType[W2ToolbarItemType["Menu"] = 6] = "Menu";
        // menu-check
        W2ToolbarItemType[W2ToolbarItemType["CheckMenu"] = 7] = "CheckMenu";
        // menu-radio
        W2ToolbarItemType[W2ToolbarItemType["RadioMenu"] = 8] = "RadioMenu";
        // drop
        W2ToolbarItemType[W2ToolbarItemType["DropHtml"] = 9] = "DropHtml";
        // html
        W2ToolbarItemType[W2ToolbarItemType["Html"] = 10] = "Html";
    })(W2ToolbarItemType = DomBehind.W2ToolbarItemType || (DomBehind.W2ToolbarItemType = {}));
    var W2ToolBarBindingBehavior = /** @class */ (function (_super) {
        __extends(W2ToolBarBindingBehavior, _super);
        function W2ToolBarBindingBehavior() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.MenuList = new DomBehind.List();
            return _this;
        }
        W2ToolBarBindingBehavior.prototype.Ensure = function () {
            var option = {
                name: this.Name,
                items: this.MenuList.toArray(),
            };
            this.ToolBar = this.Element.w2toolbar(option);
            _super.prototype.Ensure.call(this);
        };
        return W2ToolBarBindingBehavior;
    }(DomBehind.Data.ActionBindingBehavior));
    DomBehind.W2ToolBarBindingBehavior = W2ToolBarBindingBehavior;
    var W2ToolBarBindingBehaviorBuilder = /** @class */ (function (_super) {
        __extends(W2ToolBarBindingBehaviorBuilder, _super);
        function W2ToolBarBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        W2ToolBarBindingBehaviorBuilder.prototype.AddMenuButton = function (title, option) {
            if (typeof title === "string") {
                this.AddMenu(title, W2ToolbarItemType.Button, option);
            }
            else {
                this.AddMenuBinding(title, W2ToolbarItemType.Button, option);
            }
            return this;
        };
        W2ToolBarBindingBehaviorBuilder.prototype.AddMenuCheckbox = function (title, option) {
            if (typeof title === "string") {
                this.AddMenu(title, W2ToolbarItemType.Checkbox, option);
            }
            else {
                this.AddMenuBinding(title, W2ToolbarItemType.Checkbox, option);
            }
            return this;
        };
        W2ToolBarBindingBehaviorBuilder.prototype.AddDropCheckMenubox = function (title, option) {
            if (typeof title === "string") {
                this.AddMenu(title, W2ToolbarItemType.CheckMenu, option);
            }
            else {
                this.AddMenuBinding(title, W2ToolbarItemType.CheckMenu, option);
            }
            return this;
        };
        W2ToolBarBindingBehaviorBuilder.prototype.AddMenu = function (title, type, option) {
            var _this = this;
            var w2Behavior = this.CurrentBehavior;
            var itemIdentity = NewUid();
            var menuItem = {
                /* メニューを識別するアイデンティティ */
                id: itemIdentity,
                /* 文字固定 */
                text: title,
                /* メニューのタイプ */
                type: this.TypeToString(type),
            };
            // 活性制御をバインド指定している場合
            if (option && option.EnabledBinding) {
                var enabledP = DomBehind.Data.DependencyProperty.RegisterAttached(itemIdentity, function (el) {
                    var td = $("#tb_" + w2Behavior.Name + "_item_" + itemIdentity);
                    return !td.hasClass("disabled");
                }, function (el, newValue) {
                    if (newValue) {
                        w2Behavior.ToolBar.enable(itemIdentity);
                    }
                    else {
                        w2Behavior.ToolBar.disable(itemIdentity);
                    }
                });
                var enabledBindingBehavior = this.Add(new DomBehind.Data.DataBindingBehavior());
                enabledBindingBehavior.Property = enabledP;
                enabledBindingBehavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, option.EnabledBinding);
            }
            // 個別メニュークリックをバインド指定している場合
            if (option && option.ClickAction) {
                var clickEvent_1 = new DomBehind.TypedEvent();
                clickEvent_1.EventName = itemIdentity;
                var actionBindingBehavior = this.Add(new DomBehind.Data.ActionBindingBehavior());
                actionBindingBehavior.Event = clickEvent_1;
                actionBindingBehavior.Action = option.ClickAction;
                actionBindingBehavior.ActionParameterCount = option.ClickAction.length;
                actionBindingBehavior.AllowBubbling = false;
                menuItem.onClick = function (e) {
                    clickEvent_1.Raise(_this, e);
                };
            }
            // font-awesome
            if (option && option.Icon) {
                menuItem.icon = option.Icon;
            }
            if (option && option.IsChecked) {
                var defaultCheck = DomBehind.LamdaExpression.GetValueCore(this.Owner.DataContext, option.IsChecked);
                menuItem.checked = defaultCheck;
                var newP = DomBehind.Data.DependencyProperty.RegisterAttached("checked-" + itemIdentity, function (el) {
                    return menuItem.checked;
                }, function (el, newValue) {
                    var oldValue = el.attr("checked-" + itemIdentity);
                    if (oldValue) {
                        if (newValue === Boolean(oldValue)) {
                            return;
                        }
                    }
                    el.attr("checked-" + itemIdentity, newValue);
                    menuItem.checked = newValue;
                    var w2uiToolbar = w2Behavior.ToolBar;
                    if (w2uiToolbar) {
                        if (newValue) {
                            w2uiToolbar.check(itemIdentity);
                        }
                        w2uiToolbar.refresh();
                    }
                });
                // データバインドする
                var dataBindingBehavior = this.Add(new DomBehind.Data.DataBindingBehavior());
                dataBindingBehavior.Property = newP;
                dataBindingBehavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, option.IsChecked);
            }
            if (option && option.ItemsBinding) {
                var itemsP = DomBehind.Data.DependencyProperty.RegisterAttached("menuItems", function (el) {
                }, function (el, newValue) {
                    if (menuItem.items == newValue)
                        return;
                    menuItem.items = newValue;
                    var w2uiToolbar = w2Behavior.ToolBar;
                    if (w2uiToolbar) {
                        $.each(w2uiToolbar.items, function (i, each) {
                            if (each.id === menuItem.id) {
                                each.items = newValue;
                                each.selected = newValue.Where(function (x) { return x.checked === true; }).Select(function (x) { return x.id; });
                                each.onRefresh = function (e) {
                                    var item = e.item;
                                    if (item) {
                                        var ids_1 = item.selected;
                                        $.each(newValue, function (i, node) {
                                            var isChecked = ids_1.Any(function (x) { return x === node.id; });
                                            node.onClick(isChecked);
                                        });
                                    }
                                };
                                return false;
                            }
                        });
                        w2uiToolbar.refresh(itemIdentity);
                    }
                });
                var itemsBindingBehavior = this.Add(new DomBehind.Data.DataBindingBehavior());
                itemsBindingBehavior.Property = itemsP;
                itemsBindingBehavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, option.ItemsBinding);
            }
            w2Behavior.MenuList.add(menuItem);
            // 最後にカレントを元に戻す
            this.CurrentBehavior = w2Behavior;
            return menuItem;
        };
        W2ToolBarBindingBehaviorBuilder.prototype.AddMenuBinding = function (bindingTitle, type, option) {
            var w2Behavior = this.CurrentBehavior;
            var itemIdentity = NewUid();
            // タイトルのデフォルト値を設定して、追加処理へ
            var defaultTitle = DomBehind.LamdaExpression.GetValueCore(this.Owner.DataContext, bindingTitle);
            var menuItem = this.AddMenu(defaultTitle, type, option);
            // 新しいDependencyPropertyを生成し、メニューを識別するIdentityを生やす
            var newP = DomBehind.Data.DependencyProperty.RegisterAttached("title-" + itemIdentity, function (el) {
                var cell = $("#tb_" + w2Behavior.Name + "_item_" + itemIdentity + " .w2ui-tb-caption");
                return cell.text();
            }, function (el, newValue) {
                var cell = $("#tb_" + w2Behavior.Name + "_item_" + itemIdentity + " .w2ui-tb-caption");
                cell.text(newValue);
            });
            // Captionをデータバインドする
            var dataBindingBehavior = this.Add(new DomBehind.Data.DataBindingBehavior());
            dataBindingBehavior.Property = newP;
            dataBindingBehavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, bindingTitle);
        };
        W2ToolBarBindingBehaviorBuilder.prototype.TypeToString = function (type) {
            var result = "button";
            switch (type) {
                case W2ToolbarItemType.Button:
                    result = "button";
                    break;
                case W2ToolbarItemType.Checkbox:
                    result = "check";
                    break;
                case W2ToolbarItemType.CheckMenu:
                    result = "menu-check";
                    break;
            }
            return result;
        };
        return W2ToolBarBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.W2ToolBarBindingBehaviorBuilder = W2ToolBarBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildToolBar = function (action) {
        var func = action;
        var me = this;
        var behavior = me.Add(new W2ToolBarBindingBehavior());
        behavior.AllowBubbling = false;
        if (name) {
            behavior.Name = name;
        }
        else {
            behavior.Name = NewUid();
        }
        if (action) {
            var click = DomBehind.EventBuilder.RegisterAttached("onClick");
            behavior.Event = click.Create();
            behavior.Action = func;
            behavior.ActionParameterCount = func.length;
        }
        var newMe = new W2ToolBarBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = me.CurrentBehavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Toolbar.js.map
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
    var W2LayoutType;
    (function (W2LayoutType) {
        /* top */
        W2LayoutType[W2LayoutType["Top"] = 0] = "Top";
        /* left */
        W2LayoutType[W2LayoutType["Left"] = 1] = "Left";
        /* right */
        W2LayoutType[W2LayoutType["Right"] = 2] = "Right";
        /* main */
        W2LayoutType[W2LayoutType["Main"] = 3] = "Main";
        /* preview */
        W2LayoutType[W2LayoutType["Preview"] = 4] = "Preview";
        /* bottom */
        W2LayoutType[W2LayoutType["Bottom"] = 5] = "Bottom";
    })(W2LayoutType = DomBehind.W2LayoutType || (DomBehind.W2LayoutType = {}));
    var W2LayoutBindingBehavior = /** @class */ (function (_super) {
        __extends(W2LayoutBindingBehavior, _super);
        function W2LayoutBindingBehavior() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Types = {};
            return _this;
        }
        W2LayoutBindingBehavior.GetIsVisible = function (el) {
            var id = el.attr("parent-id");
            var w2uilayout = w2ui[id];
            if (w2uilayout) {
                var typeString = el.attr("w2layout-type");
                var panel = w2uilayout.get(typeString);
                if (!panel)
                    return null;
                return !panel.hidden;
            }
            return null;
        };
        W2LayoutBindingBehavior.SetIsVisible = function (el, value) {
            var id = el.attr("parent-id");
            var typeString = el.attr("w2layout-type");
            var w2uilayout = w2ui[id];
            if (w2uilayout) {
                var panel = w2uilayout.get(typeString);
                if (!panel)
                    return;
                var hidden = panel.hidden;
                if (value && hidden) {
                    w2uilayout.show(typeString, false);
                }
                else if (!value && !hidden) {
                    w2uilayout.hide(typeString, false);
                }
            }
        };
        Object.defineProperty(W2LayoutBindingBehavior.prototype, "DefaultOption", {
            get: function () {
                return {
                    size: null,
                    resizable: false,
                    style: 'border: 1px solid #dfdfdf; padding: 5px;',
                };
            },
            enumerable: true,
            configurable: true
        });
        W2LayoutBindingBehavior.prototype.Ensure = function () {
            var _this = this;
            var options = [];
            $.each(this.Types, function (i, each) {
                var option = $.extend(true, _this.DefaultOption, each.Option);
                var index = Number(i);
                var typeString = "";
                switch (index) {
                    case W2LayoutType.Top:
                        typeString = option.type = "top";
                        break;
                    case W2LayoutType.Left:
                        typeString = option.type = "left";
                        break;
                    case W2LayoutType.Right:
                        typeString = option.type = "right";
                        break;
                    case W2LayoutType.Main:
                        typeString = option.type = "main";
                        break;
                    case W2LayoutType.Preview:
                        typeString = option.type = "preview";
                        break;
                    case W2LayoutType.Bottom:
                        typeString = option.type = "bottom";
                        break;
                    default:
                }
                option.content = each.Container;
                options.push(option);
                // w2layout-type
                option.content.attr("w2layout-type", typeString);
                // 表示・非表示オプション
                if (each.Visibility) {
                    var dataBehavior = _this.NewAdd(new DomBehind.Data.DataBindingBehavior());
                    dataBehavior.Property = W2LayoutBindingBehavior.IsVisibleProperty;
                    dataBehavior.PInfo = new DomBehind.LamdaExpression(_this.DataContext, each.Visibility);
                    dataBehavior.Element = option.content;
                }
                // uri 
                if (typeof each.Uri === "string") {
                    // 非同期
                    var ajax = $.ajax({
                        url: each.Uri,
                        async: true,
                        type: "Get",
                        cache: false,
                    });
                    ajax.done(function (html) {
                        var body = $(html).filter(".body-content");
                        option.content.append(body);
                        //$.PopAnnotation();
                    }).fail(function (ex) {
                        //  Todo load失敗時
                    });
                }
                else {
                    var dataBehavior = _this.NewAdd(new DomBehind.Data.DataBindingBehavior());
                    dataBehavior.Property = W2LayoutBindingBehavior.UriProperty;
                    dataBehavior.PInfo = new DomBehind.LamdaExpression(_this.DataContext, each.Uri);
                    dataBehavior.Element = option.content;
                }
            });
            var id = this.Element.attr("id");
            if (!id) {
                id = "root-" + NewUid().Replace("-", "");
            }
            this.Element.w2layout({
                name: id,
                padding: 4,
                panels: options
            });
        };
        W2LayoutBindingBehavior.IsVisibleProperty = DomBehind.Data.DependencyProperty.RegisterAttached("W2LayoutBinding-IsVisible", function (el) {
            return W2LayoutBindingBehavior.GetIsVisible(el);
        }, function (el, newValue) {
            W2LayoutBindingBehavior.SetIsVisible(el, newValue);
        });
        W2LayoutBindingBehavior.UriProperty = DomBehind.Data.DependencyProperty.RegisterAttached("W2LayoutBinding-Uri", function (el) {
            return el.attr("W2LayoutBinding-Uri");
        }, function (el, newValue) {
            if (!newValue)
                newValue = "";
            var idAtt = "w2layout-uri-" + newValue.Replace("/", "");
            var id = el.attr(idAtt);
            if (!id) {
                el.attr(idAtt, id = "id-" + NewUid());
            }
            var div = el.find("#" + id);
            if (div.length === 0) {
                div = $("<div class=\"parent-size\"></div>");
                div.attr("id", id);
                el.append(div);
            }
            $.each(el.children( /*直下の子要素(div)のみ*/), function (i, each) {
                $(each).hide();
            });
            if (!newValue) {
                return;
            }
            div.show();
            var loaded = div.attr("loaded");
            if (!loaded) {
                // Todo 常にサーバーにデータ取得するのではなく、DOMキャッシュの戦略を立てる
                // 非同期
                var ajax = $.ajax({
                    url: newValue,
                    async: true,
                    type: "Get",
                    cache: false,
                });
                ajax.done(function (html) {
                    var body = $(html).filter(".body-content");
                    div.empty();
                    div.append(body);
                }).fail(function (ex) {
                    //  Todo load失敗時
                });
            }
            div.attr("loaded", "true");
        });
        return W2LayoutBindingBehavior;
    }(DomBehind.Data.BindingBehavior));
    DomBehind.W2LayoutBindingBehavior = W2LayoutBindingBehavior;
    var W2LayoutBindingBehaviorBuilder = /** @class */ (function (_super) {
        __extends(W2LayoutBindingBehaviorBuilder, _super);
        function W2LayoutBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        W2LayoutBindingBehaviorBuilder.prototype.Top = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Top, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.Left = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Left, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.Right = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Right, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.Main = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Main, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.Preview = function (uri, option, bindingVisible) {
            this.AddLayout(W2LayoutType.Preview, uri, option, bindingVisible);
            return this;
        };
        W2LayoutBindingBehaviorBuilder.prototype.AddLayout = function (type, uri, option, bindingVisible) {
            var w2Behavior = this.CurrentBehavior;
            var parentId = w2Behavior.Element.attr("id");
            if (!parentId) {
                parentId = NewUid().Replace("-", "");
            }
            // div確保
            var identity = "panel-" + NewUid().Replace("-", "");
            var div = $("<div id=\"" + identity + "\" parent-id=\"" + parentId + "\" class=\"parent-size\"></div>");
            //div.css("z-index", $.GenerateZIndex());
            w2Behavior.Types[type] = { Uri: uri, Visibility: bindingVisible, Container: div, Option: option };
        };
        return W2LayoutBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.W2LayoutBindingBehaviorBuilder = W2LayoutBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildLayout = function () {
        var me = this;
        var behavior = me.Add(new W2LayoutBindingBehavior());
        behavior.NewAdd = function (x) { return me.Add(x); };
        var newMe = new W2LayoutBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = behavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Layout.js.map
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
    var __w2sidebarIdentity = "w2sidebar-id";
    var __w2sidebarDependencyPropertyAtt = "w2sidebar-dp";
    var W2SidebarBindingBehavior = /** @class */ (function (_super) {
        __extends(W2SidebarBindingBehavior, _super);
        function W2SidebarBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        W2SidebarBindingBehavior.BuildW2Node = function (value) {
            var id = value.Id;
            if (!id) {
                value.Id = id = "" + NewUid();
            }
            var node = {
                id: id,
                text: value.Title,
            };
            if (value.Image) {
                node.img = value.Image;
            }
            if (value.Icon) {
                node.icon = value.Icon;
            }
            if (value.Badge) {
                node.count;
            }
            if (value.Style) {
                node.style;
            }
            if (value.IsGroup) {
                node.group = value.IsGroup;
                node.expanded = true;
                node.collapsible = false;
                if (value.AllowShowHideGroupNode) {
                    node.groupShowHide = value.AllowShowHideGroupNode;
                }
            }
            if (value.Children) {
                node.nodes = W2SidebarBindingBehavior.RecursiveNode(value.Children);
            }
            return node;
        };
        W2SidebarBindingBehavior.RecursiveNode = function (value) {
            var w2Node = [];
            $.each(value, function (i, each) {
                w2Node.push(W2SidebarBindingBehavior.BuildW2Node(each));
            });
            return w2Node;
        };
        W2SidebarBindingBehavior.FindModel = function (value, id) {
            var result;
            $.each(value, function (i, each) {
                if (each.Id === id) {
                    result = each;
                    return false;
                }
                if (each.Children) {
                    result = W2SidebarBindingBehavior.FindModel(each.Children, id);
                    if (result) {
                        return false;
                    }
                }
            });
            return result;
        };
        W2SidebarBindingBehavior.prototype.Ensure = function () {
        };
        W2SidebarBindingBehavior.ItemsSource = DomBehind.Data.DependencyProperty.RegisterAttached(__w2sidebarDependencyPropertyAtt, function (el) {
            var key = el.attr(__w2sidebarDependencyPropertyAtt);
            return $.GetWindowDynamic(key);
        }, function (el, newValue) {
            var key = el.attr(__w2sidebarDependencyPropertyAtt);
            if (!key) {
                key = NewUid();
                el.attr(__w2sidebarDependencyPropertyAtt, key);
            }
            $.SetWindowDynamic(key, newValue);
            var id = el.attr("id");
            if (!id) {
                id = "id-" + NewUid();
                el.attr("id", id);
            }
            var behaviorId = el.attr(__w2sidebarIdentity);
            var behavior = $.GetWindowDynamic(behaviorId);
            if (behavior && (newValue instanceof DomBehind.Data.ListCollectionView)) {
                var viewStatus = newValue.ViewReflected;
                if (viewStatus === DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected) {
                    return;
                }
                // 反映済みのフラグを立てる
                newValue.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
                var option = {
                    name: id,
                    nodes: W2SidebarBindingBehavior.RecursiveNode(newValue.ToArray()),
                    onClick: function (e) {
                        var model = W2SidebarBindingBehavior.FindModel(newValue.ToArray(), e.target);
                        if (model) {
                            model.__nativeEvent = e;
                        }
                        behavior.ClickEvent.Raise(this, model);
                    },
                };
                if (behavior.AllowMenuExpand) {
                    option.flatButton = true;
                    option.onFlat = function (e) {
                        // サイドメニュー最小化
                        behavior.Element.css('width', (e.goFlat ? '35px' : '200px'));
                    };
                }
                var w2uiSb = el.w2sidebar(option);
                var current = newValue.Current;
                if (current) {
                    w2uiSb.select(current.Id);
                    behavior.ClickEvent.Raise(behavior, current);
                }
                // ListCollectionViewの変更通知を実装する
                newValue.PropertyChanged.AddHandler(function (sender, e) {
                    if (String.IsNullOrWhiteSpace(e.Name)) {
                        var obj = w2ui[id];
                        if (obj) {
                            obj.refresh();
                        }
                    }
                    else if (e.Name === "Current") {
                        var currentNode = newValue.Current;
                        w2ui[id].select(currentNode.Id);
                        behavior.ClickEvent.Raise(sender, currentNode);
                    }
                });
            }
        });
        return W2SidebarBindingBehavior;
    }(DomBehind.Data.BindingBehavior));
    DomBehind.W2SidebarBindingBehavior = W2SidebarBindingBehavior;
    var W2SidebarBindingBehaviorBuilder = /** @class */ (function (_super) {
        __extends(W2SidebarBindingBehaviorBuilder, _super);
        function W2SidebarBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        return W2SidebarBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.W2SidebarBindingBehaviorBuilder = W2SidebarBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildSidebar = function (bindingNodes, selectedAction, useCloseMenu) {
        var me = this;
        var behavior = me.Add(new W2SidebarBindingBehavior());
        // クリックイベント、ユニークキーの割り当て
        behavior.ClickEvent = new DomBehind.TypedEvent();
        behavior.ClickEvent.EventName = "NodeClick";
        behavior.Identity = NewUid();
        behavior.AllowMenuExpand = useCloseMenu;
        me.CurrentElement.attr(__w2sidebarIdentity, behavior.Identity);
        $.SetWindowDynamic(behavior.Identity, behavior);
        // nodeのリストをバインド
        var nodeBindingBehavior = me.Add(new DomBehind.Data.DataBindingBehavior());
        nodeBindingBehavior.Property = W2SidebarBindingBehavior.ItemsSource;
        nodeBindingBehavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, bindingNodes);
        // nodeのクリックイベントをバインド
        var actionBindingBehavior = this.Add(new DomBehind.Data.ActionBindingBehavior());
        actionBindingBehavior.Event = behavior.ClickEvent;
        actionBindingBehavior.Action = selectedAction;
        actionBindingBehavior.ActionParameterCount = selectedAction.length;
        actionBindingBehavior.AllowBubbling = false;
        // カレントを再設定
        this.CurrentBehavior = behavior;
        var newMe = new W2SidebarBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = behavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Sidebar.js.map
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
    var FieldType;
    (function (FieldType) {
        /* text */
        FieldType[FieldType["Text"] = 1] = "Text";
        /* int */
        FieldType[FieldType["Int"] = 2] = "Int";
        /* float */
        FieldType[FieldType["Double"] = 3] = "Double";
        /* date */
        FieldType[FieldType["Date"] = 4] = "Date";
        /* hex */
        FieldType[FieldType["Hex"] = 5] = "Hex";
        /* money */
        FieldType[FieldType["Money"] = 6] = "Money";
        /* currency */
        FieldType[FieldType["Currency"] = 7] = "Currency";
        /* percent */
        FieldType[FieldType["Percent"] = 8] = "Percent";
        /* alphanumeric */
        FieldType[FieldType["Alphanumeric"] = 9] = "Alphanumeric";
        /* time */
        FieldType[FieldType["Time"] = 10] = "Time";
        /* color */
        FieldType[FieldType["Color"] = 11] = "Color";
        /* list */
        FieldType[FieldType["List"] = 12] = "List";
    })(FieldType = DomBehind.FieldType || (DomBehind.FieldType = {}));
    /**
     * シンプルなカスタム表示
     * */
    var RenderType;
    (function (RenderType) {
        /* 三桁カンマ区切りで表示する数値表現 */
        RenderType[RenderType["Number"] = 1] = "Number";
        /* 10進表示(decimal) */
        RenderType[RenderType["Currency"] = 2] = "Currency";
        /* 金額表示 */
        RenderType[RenderType["Money"] = 3] = "Money";
        /* % 表示 */
        RenderType[RenderType["Percent"] = 4] = "Percent";
        /* 時間 */
        RenderType[RenderType["Time"] = 5] = "Time";
        /* 日付 */
        RenderType[RenderType["Date"] = 6] = "Date";
        /* 年齢 */
        RenderType[RenderType["Age"] = 7] = "Age";
        /* トグル */
        RenderType[RenderType["Toggle"] = 8] = "Toggle";
    })(RenderType = DomBehind.RenderType || (DomBehind.RenderType = {}));
    var EditableWrapper = /** @class */ (function () {
        function EditableWrapper(Owner) {
            this.Owner = Owner;
        }
        Object.defineProperty(EditableWrapper.prototype, "items", {
            get: function () {
                if (!this.itemSource)
                    return null;
                if (!this.__items) {
                    var exp = new DomBehind.LamdaExpression(this.Owner, this.itemSource);
                    this.__items = exp.GetValue();
                }
                return this.__items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditableWrapper.prototype, "type", {
            get: function () {
                if (!this.__type) {
                    this.__type = W2GridBindingBehavior.FieldTypeToString(this.fieldType);
                }
                return this.__type;
            },
            enumerable: true,
            configurable: true
        });
        return EditableWrapper;
    }());
    var W2GridBindingBehavior = /** @class */ (function (_super) {
        __extends(W2GridBindingBehavior, _super);
        function W2GridBindingBehavior() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Column = [];
            _this.__id = 0;
            return _this;
        }
        Object.defineProperty(W2GridBindingBehavior.prototype, "IsMultiSelect", {
            get: function () {
                if (this.GridOption && this.GridOption.multiSelect) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        W2GridBindingBehavior.prototype.GenerateRecId = function () {
            return ++this.__id;
        };
        Object.defineProperty(W2GridBindingBehavior.prototype, "SelectedObject", {
            get: function () {
                var ids = this.Grid.getSelection();
                if (!ids || ids.length === 0)
                    return null;
                var rows = [];
                $.each(this.Grid.records, function (i, each) {
                    if (ids.Any(function (x) { return x === each.recid; })) {
                        rows.push(each);
                    }
                });
                if (this.IsMultiSelect) {
                    return rows;
                }
                return rows.FirstOrDefault();
            },
            enumerable: true,
            configurable: true
        });
        W2GridBindingBehavior.prototype.AddColumn = function (binding) {
            this.Column.push(binding);
        };
        W2GridBindingBehavior.prototype.Ensure = function () {
            var _this = this;
            var id = this.Element.attr('id');
            if (!id) {
                id = NewUid();
                this.Element.attr('id', id);
            }
            $.each(this.Column, function (i, each) {
                if (each.renderType) {
                    each.render = W2GridBindingBehavior.RenderTypeToString(each.renderType);
                }
                if (each.editable) {
                    each.editable = $.extend(true, new EditableWrapper(_this.DataContext), each.editable);
                }
            });
            var w2GridOption = {
                name: id,
                columns: this.Column,
                show: {
                    selectColumn: false,
                },
                multiSelect: false,
                keyboard: true,
            };
            w2GridOption.onDblClick = function (e) { return _this.OnDoubleClick(_this.DataContext, e); };
            if (this.GridOption.footerOption) {
                w2GridOption.show.footer = true;
            }
            if (this.GridOption.headerOption) {
                w2GridOption.show.toolbar = true;
                // add
                if (this.GridOption.headerOption.add) {
                    w2GridOption.show.toolbarAdd = true;
                    w2GridOption.onAdd = function (e) { return _this.OnToolbarAdd(_this.DataContext, e); };
                }
                // edit
                if (this.GridOption.headerOption.edit) {
                    w2GridOption.show.toolbarEdit = true;
                    w2GridOption.onEdit = function (e) { return _this.OnToolbarEdit(_this.DataContext, e); };
                }
                // save
                if (this.GridOption.headerOption.save) {
                    w2GridOption.show.toolbarSave = true;
                    w2GridOption.onSave = function (e) { return _this.OnToolbarSave(_this.DataContext, e); };
                }
                // delete
                if (this.GridOption.headerOption.delete) {
                    w2GridOption.show.toolbarDelete = true;
                    w2GridOption.onDelete = function (e) { return _this.OnToolbarDelete(_this.DataContext, e); };
                }
            }
            if (this.GridOption.multiSelect) {
                w2GridOption.multiSelect = true;
            }
            if (this.GridOption.dragAndDropRow) {
                w2GridOption.reorderRows = true;
            }
            var advancedColumns = this.Column.Where(function (x) { return !Object.IsNullOrUndefined(x.advancedSearch); });
            if (advancedColumns.Any()) {
                w2GridOption.multiSearch = true;
                w2GridOption.searches = advancedColumns.Select(function (x) {
                    return {
                        field: x.field,
                        caption: x.caption,
                        type: W2GridBindingBehavior.FieldTypeToString(x.advancedSearch),
                    };
                });
            }
            // hack
            this.Grid = this.Element.w2grid(w2GridOption);
            var dp = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", function (el) {
            }, function (el, newValue) {
                if (newValue instanceof DomBehind.Data.ListCollectionView) {
                    _this.ListCollectionView = newValue;
                    var id_1 = el.attr("id");
                    var grid = w2ui[id_1];
                    if (grid) {
                        var rows = newValue.ToArray();
                        if (grid.records === rows)
                            return;
                        $.each(rows, function (i, value) {
                            _this.RowInjection(value);
                        });
                        grid.clear(true);
                        grid.records = rows;
                        grid.total = rows.length;
                        grid.refresh();
                        grid.onClick = function (ee) {
                            _this.OnSelect(_this.DataContext, ee);
                            // フォーカス用オブジェに合わせる
                            var gridFocus = $("#grid_" + id_1 + "_focus");
                            gridFocus.focus();
                        };
                        newValue.PropertyChanged.RemoveHandler(_this.OnCurrentChanged);
                        newValue.PropertyChanged.AddHandler(_this.OnCurrentChanged);
                    }
                }
            });
            var itemSource = this.NewAdd(new DomBehind.Data.DataBindingBehavior());
            itemSource.Property = dp;
            itemSource.PInfo = this.ItemsSource;
            itemSource.Element = this.Element;
            W2GridBindingBehavior.Refresh.AddHandler(function (sender, e) {
                try {
                    _this.Grid.refresh();
                }
                catch (e) {
                    // error free
                }
            });
        };
        W2GridBindingBehavior.prototype.SuppressListCollectionViewAction = function (action) {
            // 通知イベントを落とした状態で、モデルのカレントレコードを設定する
            this.ListCollectionView.Begin();
            action(this.ListCollectionView);
            this.ListCollectionView.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
            this.ListCollectionView.End();
        };
        W2GridBindingBehavior.prototype.OnSelect = function (sender, e) {
            if (!this.GridOption.onSelect) {
                return;
            }
            var recId = e.recid;
            var obj = this.Grid.get(recId);
            this.SuppressListCollectionViewAction(function (x) { return x.Current = obj; });
            this.GridOption.onSelect(sender, obj);
        };
        W2GridBindingBehavior.prototype.OnDoubleClick = function (sender, e) {
            if (this.GridOption && this.GridOption.onDoubleClick) {
                var id = this.Element.attr("id");
                var grid = w2ui[id];
                if (grid) {
                    var recId = e.recid;
                    var obj_1 = grid.get(recId);
                    this.SuppressListCollectionViewAction(function (x) { return x.Current = obj_1; });
                    this.GridOption.onDoubleClick(sender, obj_1);
                }
            }
        };
        W2GridBindingBehavior.prototype.OnToolbarAdd = function (sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.add) {
                var newRow = this.GridOption.headerOption.add(sender, e);
                if (newRow)
                    this.AddRow(newRow);
            }
        };
        W2GridBindingBehavior.prototype.AddRow = function (row) {
            this.RowInjection(row);
            this.Grid.records.push(row);
            this.Grid.total = this.Grid.records.length;
            this.SuppressListCollectionViewAction(function (x) { return x.Add(row); });
            this.Grid.refresh(row.recid);
            this.Grid.select(row.recid);
            this.Grid.scrollIntoView(row.recid);
        };
        W2GridBindingBehavior.prototype.OnToolbarEdit = function (sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.edit) {
                var recId = e.recid;
                var row = this.Grid.get(recId);
                this.GridOption.headerOption.edit(sender, row);
            }
        };
        W2GridBindingBehavior.prototype.OnToolbarSave = function (sender, e) {
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.save) {
                var recId = e.recid;
                var row = this.Grid.get(recId);
                this.GridOption.headerOption.save(sender, row);
            }
        };
        W2GridBindingBehavior.prototype.OnToolbarDelete = function (sender, e) {
            var _this = this;
            if (this.GridOption &&
                this.GridOption.headerOption &&
                this.GridOption.headerOption.delete) {
                // 消す直前に来る処理でバックアップを取得する
                if (!e.force) {
                    this._deleteTargets = this.SelectedObject;
                }
                if (e.done) {
                    e.done(function (x) {
                        _this.GridOption.headerOption.delete(sender, _this._deleteTargets);
                    });
                }
            }
        };
        W2GridBindingBehavior.prototype.OnCurrentChanged = function (sender, e) {
            // プロパティ未指定の場合は、リフレッシュする
            if (String.IsNullOrWhiteSpace(e.Name)) {
                if (this.Grid) {
                    this.Grid.refresh();
                }
            }
            else if (e.Name === "Current") {
                // カレント行が変更されたので、選択状態とする
            }
        };
        W2GridBindingBehavior.FieldTypeToString = function (type) {
            var result = "text";
            switch (type) {
                case FieldType.Text:
                    result = "text";
                    break;
                case FieldType.Int:
                    result = "int";
                    break;
                case FieldType.Double:
                    result = "float";
                    break;
                case FieldType.Date:
                    result = "date";
                    break;
                case FieldType.Hex:
                    result = "hex";
                    break;
                case FieldType.Money:
                    result = "money";
                    break;
                case FieldType.Currency:
                    result = "currency";
                    break;
                case FieldType.Percent:
                    result = "percent";
                    break;
                case FieldType.Alphanumeric:
                    result = "alphanumeric";
                    break;
                case FieldType.Time:
                    result = "time";
                    break;
                case FieldType.Color:
                    result = "color";
                    break;
                case FieldType.List:
                    result = "list";
                    break;
            }
            return result;
        };
        W2GridBindingBehavior.RenderTypeToString = function (type) {
            var result = "";
            switch (type) {
                case RenderType.Number:
                    result = "number";
                    break;
                case RenderType.Currency:
                    result = "currency";
                    break;
                case RenderType.Money:
                    result = "money";
                    break;
                case RenderType.Percent:
                    result = "percent";
                    break;
                case RenderType.Time:
                    result = "time";
                    break;
                case RenderType.Date:
                    result = "date";
                    break;
                case RenderType.Age:
                    result = "age";
                    break;
                case RenderType.Toggle:
                    result = "toggle";
                    break;
            }
            return result;
        };
        W2GridBindingBehavior.prototype.ParseCellStyles = function (value) {
            var json = JSON.parse(value);
            var styleArray = [];
            for (var each in json) {
                for (var i = 0; i < this.Column.length; i++) {
                    var c = this.Column[i];
                    // フィールド名が一致
                    if (c.field === each) {
                        styleArray[i] = json[each];
                        break;
                    }
                }
            }
            return styleArray;
        };
        W2GridBindingBehavior.prototype.RowInjection = function (value) {
            var _this = this;
            if (!value)
                return;
            if (!value.w2ui) {
                value.w2ui = {};
            }
            value.recid = this.GenerateRecId();
            // Row Style Binding
            if (this.RowStyleBinding) {
                // defaultStyle
                var defaultValue = this.RowStyleBinding(value);
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.style = defaultValue;
                }
                // build bind
                if (!value.__rowStyleObserver) {
                    var observable = DomBehind.Observable.Register(value, DomBehind.LamdaExpression.Path(this.RowStyleBinding));
                    observable.PropertyChanged.Clear();
                    observable.PropertyChanged.AddHandler(function (ss, ee) {
                        var id = ss.recid;
                        var style = _this.RowStyleBinding(ss);
                        value.w2ui.style = style;
                        _this.Grid.refreshRow(id);
                    });
                    value.__rowStyleObserver = observable;
                }
            }
            // Cell Style Binding
            if (this.CellStyleBinding) {
                // defaultStyle
                var defaultValue = this.CellStyleBinding(value);
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.style = this.ParseCellStyles(defaultValue);
                }
                // build bind
                var observable = DomBehind.Observable.Register(value, DomBehind.LamdaExpression.Path(this.CellStyleBinding));
                observable.PropertyChanged.Clear();
                observable.PropertyChanged.AddHandler(function (ss, ee) {
                    var id = ss.recid;
                    var style = _this.CellStyleBinding(ss);
                    value.w2ui.style = _this.ParseCellStyles(style);
                    _this.Grid.refreshRow(id);
                });
            }
            // css of record binding
            if (this.RowClassBinding) {
                // default style
                var defaultValue = this.RowClassBinding(value);
                if (!String.IsNullOrWhiteSpace(defaultValue)) {
                    value.w2ui.class = defaultValue;
                }
                // build bind
                var observable = DomBehind.Observable.Register(value, DomBehind.LamdaExpression.Path(this.RowClassBinding));
                observable.PropertyChanged.Clear();
                observable.PropertyChanged.AddHandler(function (ss, ee) {
                    var id = ss.recid;
                    var style = _this.RowClassBinding(ss);
                    value.w2ui.class = style;
                    _this.Grid.refreshRow(id);
                });
            }
            $.each(this.Column, function (i, v) {
                if (v.convertTarget) {
                    var filedInjection = DomBehind.Observable.RegisterAttached(value, {
                        marks: [v.field],
                        wrapper: function (x) { return v.convertTarget(x); }
                    });
                }
            });
        };
        W2GridBindingBehavior.Refresh = new DomBehind.TypedEvent();
        W2GridBindingBehavior.IsSpinningProperty = DomBehind.Data.DependencyProperty.RegisterAttached("w2ui.isSpinning", function (el) {
            //let value = el.attr("w2ui.isSpinning");
            //if (!value) return false;
            //return Boolean(value);
        }, function (el, newValue) {
            var oldValue = el.attr("w2ui.isSpinning");
            if (oldValue === "true" && newValue)
                return;
            if (oldValue === "false" && !newValue)
                return;
            el.attr("w2ui.isSpinning", String(newValue));
            var id = el.attr("id");
            var grid = w2ui[id];
            if (grid) {
                if (newValue) {
                    grid.lock("", true);
                }
                else {
                    grid.unlock();
                }
            }
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        return W2GridBindingBehavior;
    }(DomBehind.Data.BindingBehavior));
    DomBehind.W2GridBindingBehavior = W2GridBindingBehavior;
    var W2GridBindingBehaviorBuilder = /** @class */ (function (_super) {
        __extends(W2GridBindingBehaviorBuilder, _super);
        function W2GridBindingBehaviorBuilder(owner) {
            return _super.call(this, owner) || this;
        }
        Object.defineProperty(W2GridBindingBehaviorBuilder.prototype, "DefaultOption", {
            get: function () {
                return {
                    caption: '',
                    field: '',
                    size: null,
                    min: "15",
                    max: null,
                    hidden: false,
                    hideable: true,
                    sortable: true,
                    searchable: false,
                    resizable: true,
                    attr: '',
                    style: '',
                    render: null,
                    title: null,
                    editable: null,
                    frozen: false,
                    info: null,
                };
            },
            enumerable: true,
            configurable: true
        });
        W2GridBindingBehaviorBuilder.prototype.ColumnBinding = function (title, binding, option) {
            var op = $.extend(true, this.DefaultOption, option);
            op.caption = title;
            op.field = DomBehind.LamdaExpression.Path(binding);
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.AddColumn(op);
            return this;
        };
        /**
         * 行スタイルをバインドします。
         *
         * ラムダで指定されたプロパティに格納する例：
         *  "background-color: #FBFEC0"
         *
         *  注意点として、RowStyleBindingとCellStyleBindingはどちらかしか利用できません。
         *  Rowのスタイル適用　+　Cellに個別スタイルを適用する場合は、CellStyleBinding + RowCssBinding を利用してください。
         *
         * @param styleBinding　style属性値の文字列を示すプロパティ先をラムダで指定します。
         *
         */
        W2GridBindingBehaviorBuilder.prototype.RowStyleBinding = function (styleBinding) {
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.RowStyleBinding = styleBinding;
            return this;
        };
        /**
         * 任意のclass属性を行にバインドします
         *
         * @param classBinding css名の文字列を示すプロパティ先をラムダで指定します
         *
         */
        W2GridBindingBehaviorBuilder.prototype.RowCssBinding = function (classBinding) {
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.RowClassBinding = classBinding;
            return this;
        };
        /**
         * セルスタイルをバインドします。
         *
         * ラムダで指定されたプロパティに格納する例（SampleIDフィールド、SampleNameフィールドがあるとして）：
         *  '{ "SampleID": "background-color: #FBFEC0; color: red", "SampleName": "background-color: #FBFEC0" }'
         *
         *  注意点として、RowStyleBindingとCellStyleBindingはどちらかしか利用できません。
         *  Rowのスタイル適用　+　Cellに個別スタイルを適用する場合は、CellStyleBinding + RowCssBinding を利用してください。
         *
         * @param cellStyleBinding style属性値の文字列を示すプロパティ先をラムダで指定します。ただし、列を示すJSON形式です
         */
        W2GridBindingBehaviorBuilder.prototype.CellStyleBinding = function (cellStyleBinding) {
            var gridBehavior = this.CurrentBehavior;
            gridBehavior.CellStyleBinding = cellStyleBinding;
            return this;
        };
        return W2GridBindingBehaviorBuilder;
    }(DomBehind.BindingBehaviorBuilder));
    DomBehind.W2GridBindingBehaviorBuilder = W2GridBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildGrid = function (itemSource, option) {
        option = $.extend(true, {}, option);
        var me = this;
        var behavior = me.Add(new W2GridBindingBehavior());
        behavior.NewAdd = function (x) { return me.Add(x); };
        behavior.ItemsSource = new DomBehind.LamdaExpression(me.Owner.DataContext, itemSource);
        behavior.GridOption = option;
        if (option.isSpinning) {
            var b = me.Add(new DomBehind.Data.DataBindingBehavior());
            b.Property = W2GridBindingBehavior.IsSpinningProperty;
            b.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, option.isSpinning);
        }
        // カレントをDataBindingBehaviorに変える
        me.CurrentBehavior = behavior;
        var newMe = new W2GridBindingBehaviorBuilder(me.Owner);
        newMe.CurrentElement = me.CurrentElement;
        newMe.CurrentBehavior = me.CurrentBehavior;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Grid.js.map
var DomBehind;
(function (DomBehind) {
    // デフォルトのメッセージをW2UI+Bootstrapでカスタマイズする
    // MessaageBox.BuiltIn(() => MessageBox);
    var MessageBox = /** @class */ (function () {
        function MessageBox() {
        }
        MessageBox.prototype.ShowMessage = function (message, title, status) {
            //w2popup.message({
            //    title: title,
            //    width: 580,
            //    height: 350,                
            //    body: `<div class="w2ui-centered">${message}</div>`,
            //    buttons: '<button class="w2ui-btn">Ok</button>'
            //});
            w2popup.open({
                width: 580,
                height: 350,
                title: '  <div class="alert alert-success"><strong>Success!</strong> This alert box could indicate a successful or positive action.</div>',
                body: '<div class="w2ui-centered">This is text inside the popup</div>',
                buttons: '<button class="w2ui-btn" onclick="w2alert(\'alert\')">Alert</button>' +
                    '<button class="w2ui-btn" onclick="w2confirm(\'confirm\')">Confirm</button>' +
                    '<button class="w2ui-btn" onclick="counter = 0; show();">Message</button>',
                showMax: true
            });
        };
        MessageBox.prototype.ShowYesNo = function (message, title, option) {
        };
        MessageBox.prototype.ShowOkCancel = function (message, title, option) {
        };
        return MessageBox;
    }());
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=MessageBox.js.map
var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var Dropdown = /** @class */ (function () {
            function Dropdown() {
                this._engaged = false;
            }
            Dropdown.Register = function (behavior) {
                if (!behavior.Element)
                    return;
            };
            Dropdown.Rebuild = function (el, list) {
                var newArray = list.ToArray();
                if (newArray.SequenceEqual(list.__oldArray)) {
                    return false;
                }
                list.__oldArray = newArray;
                $.each(newArray, function (i, each) {
                    each.recid = i;
                });
                var items = newArray.Select(function (x) {
                    var text = x;
                    if (list.DisplayMemberPath) {
                        text = x[list.DisplayMemberPath];
                    }
                    return {
                        id: x.recid,
                        text: text,
                        obj: x,
                    };
                });
                var options = {
                    items: items,
                    selected: {},
                };
                if (list.Current != null) {
                    var id_1 = list.Current.recid;
                    var obj = items.FirstOrDefault(function (x) { return x.id === id_1; });
                    options.selected = obj;
                }
                el.w2field('list', options);
                return true;
            };
            Dropdown.prototype.OnCurrentChanged = function (sender, e) {
                if (this._engaged)
                    return;
                // プログラム上(ViewModel)からの反映を、Viewへ適用する
                var dd = sender.__element;
                var el = dd.Element;
                // プロパティ未指定の場合は、リフレッシュする
                if (String.IsNullOrWhiteSpace(e.Name)) {
                    Dropdown.Rebuild(el, sender);
                    el.data('w2field').refresh();
                }
                else if (e.Name === "Current") {
                    // カレント行が変更されたので、選択状態とする
                    var list = el.data('w2field');
                    var id_2 = sender.Current.recid;
                    var items = list.options.items;
                    if (items instanceof Array) {
                        var obj = items.FirstOrDefault(function (x) { return x.id === id_2; });
                        el.data('selected', obj);
                        list.refresh();
                    }
                }
            };
            Dropdown.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", function (el) {
                // UpdateSource
                // oneway なので、未実装で良い
            }, function (el, newValue) {
                // UpdaateTarget
                if (newValue instanceof DomBehind.Data.ListCollectionView) {
                    if (!Dropdown.Rebuild(el, newValue))
                        return;
                    // 
                    var dd_1 = newValue.__element;
                    if (!dd_1) {
                        dd_1 = newValue.__element = new Dropdown();
                    }
                    dd_1.Element = el;
                    dd_1.Items = newValue;
                    var list = el.data('w2field');
                    list.refresh();
                    list.__Dropdown = dd_1;
                    // UI上からの変更をデータソースへ反映する
                    el.off('change');
                    el.on('change', function (e) {
                        var selectedId = el.data("selected").id;
                        dd_1._engaged = true;
                        try {
                            // dd.Items.Begin();
                            var current = newValue.ToArray().FirstOrDefault(function (x) { return x.recid == selectedId; });
                            dd_1.Items.Select(current);
                            // dd.Items.End();
                        }
                        finally {
                            dd_1._engaged = false;
                        }
                    });
                    newValue.PropertyChanged.RemoveHandler(dd_1.OnCurrentChanged);
                    newValue.PropertyChanged.AddHandler(dd_1.OnCurrentChanged);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, function (behavior) {
                Dropdown.Register(behavior);
            });
            return Dropdown;
        }());
        Controls.Dropdown = Dropdown;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Dropdown.js.map
var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        var DatePicker = /** @class */ (function () {
            function DatePicker() {
            }
            DatePicker.SetValue = function (el, newValue) {
                var initialized = el.attr("DateFormatted");
                if (!initialized) {
                    el.attr("DateFormatted", "true");
                    var format = el.attr("DateFormat");
                    if (!format) {
                        format = "yyyy/MM/dd";
                    }
                    el.w2field("date", { format: format });
                }
                el.val(newValue);
            };
            DatePicker.FormatProperty = DomBehind.Data.DependencyProperty.RegisterAttached("DateFormat", function (el) {
            }, function (el, newValue) {
                el.attr("DateFormat", newValue);
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
            DatePicker.ValueProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", function (el) {
                return el.val();
            }, function (el, newValue) {
                DatePicker.SetValue(el, newValue);
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
            DatePicker.DateProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", function (el) {
                var text = el.val();
                return new Date(text);
            }, function (el, newValue) {
                if (newValue instanceof Date) {
                    var oldFormat = el.attr("DateFormat");
                    if (!oldFormat || oldFormat !== "yyyy/MM/dd") {
                        el.w2field("date", { format: "yyyy/MM/dd" });
                    }
                    var year = "" + newValue.getFullYear();
                    var month = new String("" + (newValue.getMonth() + 1)).PadLeft(2, "0");
                    var day = new String("" + newValue.getDate()).PadLeft(2, "0");
                    el.val(year + "/" + month + "/" + day);
                    if (oldFormat && oldFormat !== "yyyy/MM/dd") {
                        el.w2field("date", { format: oldFormat });
                    }
                }
                else {
                    DatePicker.SetValue(el, newValue);
                }
            }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
            return DatePicker;
        }());
        Controls.DatePicker = DatePicker;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DatePicker.js.map
var DomBehind;
(function (DomBehind) {
    var Application = /** @class */ (function () {
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
            //let me: any = this;
            //let appFactory = new TypedFactory(me);
            //let app = appFactory.CreateInstance();
            //Application._app = <Application>app;
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
        //Back Button in Browser using jquery?
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
    /**
     * It is the code behind the view
     * to promotes component-oriented developers
     */
    var BizView = /** @class */ (function () {
        function BizView() {
            // #region Container is HTML(JQuery)
            this._disposed = false;
            // #endregion
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
            // #endregion
            // #region DataContext is ViewModel
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
        // #endregion
        // #region may be inherited
        BizView.prototype.OnDataContextPropertyChanged = function (sender, e) {
            this.UpdateTarget(e.Name);
        };
        BizView.prototype.ViewLoaded = function (responseText, textStatus, XMLHttpRequest) { };
        // #endregion
        // #region Ensure
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
            // 利用ライブラリ固有のヴァリデーション方言を吸収する
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
        // #endregion
        // #region Event subscribe
        BizView.prototype.UnSubscribe = function () {
        };
        BizView.prototype.Subscribe = function () {
        };
        //#endregion
        /**
         * start the build of the binding
         */
        BizView.prototype.CreateBindingBuilder = function () {
            var builder = new DomBehind.BindingBehaviorBuilder(this);
            builder.Element(this.Container).BindingAction(DomBehind.UIElement.Initialize, function (vm) { return vm.Initialize(); });
            builder.Element(this.Container).BindingAction(DomBehind.UIElement.ViewLoaded, function (vm) { return vm.ViewLoaded(); });
            return builder;
        };
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        BizView.prototype.UpdateTarget = function (mark) {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateTarget(mark);
        };
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        BizView.prototype.UpdateSource = function (mark) {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateSource(mark);
        };
        // #endregion
        // #region Validate
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
            // サードパーティやNugetライブラリ拡張用
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
            // サードパーティやNugetライブラリ拡張用
            if (this.DependencyValidateClear) {
                this.DependencyValidateClear(mark);
            }
        };
        // #endregion
        // #region Dispose
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
    /**
     * ViewModel
     * to promotes component-oriented developers
     */
    var BizViewModel = /** @class */ (function (_super) {
        __extends(BizViewModel, _super);
        function BizViewModel() {
            var _this = _super.call(this) || this;
            // #endregion
            // #region IsWaiting
            // #endregion
            // #region Initialize
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
            // #region View Property
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
        /**
         * inherit if necessary ViewLoaded method.
         */
        BizViewModel.prototype.ViewLoaded = function () { };
        // #endregion 
        // #region Update
        /**
         * Forces a data transfer from the binding source property to the binding target property.
         * @param mark
         */
        BizViewModel.prototype.UpdateTarget = function (mark) {
            if (this.View) {
                this.View.UpdateTarget(mark);
            }
        };
        /**
         * Sends the current binding target value to the binding source property
         * @param mark
         */
        BizViewModel.prototype.UpdateSource = function (mark) {
            if (this.View) {
                this.View.UpdateSource(mark);
            }
        };
        // #endregion
        // #region
        BizViewModel.prototype.Validate = function (mark) {
            var result = false;
            if (this.View) {
                result = this.View.Validate(mark);
            }
            return result;
        };
        // #endregion
        // #region 
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
        // #endregion
        // IExceptionHandling 実装
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
            // #region IsEnabled
            get: function () {
                return this.GetProperty("IsEnabled", true);
            },
            set: function (value) {
                this.SetProperty("IsEnabled", value);
            },
            enumerable: true,
            configurable: true
        });
        // #endregion 
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
        // #region Dispose
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
var annotationCollection = /** @class */ (function () {
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
                // 消す（ポップする）
                _this.Remove(each.Selector, each.ResolveViewType, each.ResolveViewModelType);
            }
            // リトライ
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
        // other page or lazy loaded
        var ele = $(selector);
        if (ele.length === 0) {
            // 未登録の場合
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
    var Locator = /** @class */ (function () {
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
// デフォルトポリシーの上書き
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
            // 直近のFormからツリー検索
            var form = element.closest("form");
            var closet = form.find("[for=\"" + id + "\"]");
            if (closet.length != 0) {
                error.insertAfter(closet);
            }
            // エラー項目が明示的に指定していない場合は、デフォルトのエラー挿入に従う
            if (pre.length === 0 && post.length === 0 && closet.length === 0) {
                error.insertAfter(element);
            }
        }
    }
    // 上述の errorPlacement をコメントアウトして、下記を復帰するとポップアップスタイルのValidationが有効化する
    //,
    //showErrors: function (errorMap, errorList) {
    //    $.each(this.successList, function (index, value) {
    //        $(value).popover('hide');
    //    });
    //    $.each(errorList, function (index, value) {
    //        var _popover = $(value.element).popover({
    //            trigger: 'manual',
    //            placement: 'auto right',
    //            content: value.message,
    //            template: "<div class='popover popover-validation' role='tooltip'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div></div>"
    //        });
    //        _popover.data('bs.popover').options.content = value.message; // popover要素のテキストを更新する
    //        $(value.element).popover('show');
    //    });
    //}
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
        // name 属性、classに一意なIDを付与する
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
                // Jquery validatorの実装上、Name属性がない場合はエラー項目名が一意にならない
                var name = el.attr("name");
                if (String.IsNullOrWhiteSpace(name)) {
                    el.attr("name", "name-" + identity);
                }
                var funcName = "func-" + identity;
                // なぜか、jQuery.Validationの 1.11.1 だと ルート指定がcls名じゃないんだけど
                // js追っていくとそうなっているので暫定。もしかしたら、
                //let o = JSON.parse(`{ "${cls}": { "${funcName}": true } }`);
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
                    // HTML5 の required バリデーションが上書きするので、JqueryValidation使う場合は削除する
                    if (el.attr(validator.Attribute)) {
                        el.removeAttr(validator.Attribute);
                    }
                }
                el.valid();
            });
        });
        // デバックしやすいように...
        // let result = container.valid();
        // return result;
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