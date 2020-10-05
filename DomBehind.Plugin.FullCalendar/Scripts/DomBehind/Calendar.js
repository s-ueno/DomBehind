var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "title", {
            get: function () {
                return this.GetValue("title");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "start", {
            get: function () {
                var value = this.GetValue("start");
                return moment(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "end", {
            get: function () {
                var value = this.GetValue("end");
                return moment(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "allDay", {
            get: function () {
                return this.GetValue("allDay");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "url", {
            get: function () {
                return this.GetValue("url");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "className", {
            get: function () {
                return this.GetValue("className");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "editable", {
            get: function () {
                return this.GetValue("editable", true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "color", {
            get: function () {
                return this.GetValue("color");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "backgroundColor", {
            get: function () {
                return this.GetValue("backgroundColor");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "borderColor", {
            get: function () {
                return this.GetValue("borderColor");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "textColor", {
            get: function () {
                return this.GetValue("textColor");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "rendering", {
            get: function () {
                return this.GetValue("rendering");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "startEditable", {
            get: function () {
                return this.GetValue("startEditable", true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventDataWrapper.prototype, "overlap", {
            get: function () {
                return this.GetValue("overlap", true);
            },
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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