//namespace DomBehind {

//    export interface ICalendarOption<T> {
//        controller?: (vm: T) => Calendar;
//        header?: ICalendarHeader;
//        defaultDate?: Date;
//        defaultView?: CalendarViewMode;

//        businessHours?: boolean;
//        editable?: boolean;
//        theme?: boolean;
//        buttonIcons?: {
//            prev: string;
//            next: string;
//        };
//        firstDay?: number;
//        weekends?: boolean;
//        scrollTime?: number;
//        slotDuration?: number;
//        lang?: string,


//        dayClick?: (vm: T, args: ICalendarEventArgs) => void;
//        eventClick?: (vm: T, args: ICalendarEventArgs) => void;
//        viewModeClick?: (vm: T, args: ICalendarEventArgs) => void;

//    }
//    export interface ICalendarEventArgs {
//        sender?: Calendar;
//        original?: any;
//        event?: JQueryEventObject;
//        view?: any;

//        date?: Date;

//        mode?: CalendarViewMode;
//    }
//    export enum CalendarViewMode {
//        month, agendaWeek, agendaDay
//    }

//    export enum CalendarHeaderButtons {
//        prevYear = 1 << 0,
//        prev = 1 << 1,
//        next = 1 << 2,
//        nextYear = 1 << 3,
//        month = 1 << 4,
//        agendaWeek = 1 << 5,
//        agendaDay = 1 << 6,
//        title = 1 << 7,
//        today = 1 << 8,
//    }
//    export interface ICalendarHeader {
//        left?: CalendarHeaderButtons;
//        center?: CalendarHeaderButtons;
//        right?: CalendarHeaderButtons;
//    }

//    class EventDataWrapper implements FullCalendar.EventObject {
//        public EventData: any;
//        public CalendarBindings: { [key: string]: CalendarOption } = {};

//        public /* override */ get id(): string | number {
//            return this.GetValue("id");
//        }
//        public /* override */  get title(): string {
//            return this.GetValue("title");
//        }
//        public /* override */  get start(): moment.Moment {
//            let value = this.GetValue("start");
//            return moment(value);
//        }
//        public /* override */  get end(): moment.Moment {
//            let value = this.GetValue("end");
//            return moment(value);
//        }
//        public /* override */  get allDay(): boolean {
//            return this.GetValue("allDay");
//        }
//        public /* override */  get url(): string {
//            return this.GetValue("url");
//        }
//        public /* override */  get className(): string | Array<string> {
//            return this.GetValue("className");
//        }
//        public /* override */  get editable(): boolean {
//            return this.GetValue("editable", true);
//        }
//        public /* override */  get color(): string {
//            return this.GetValue("color");
//        }
//        public /* override */  get backgroundColor(): string {
//            return this.GetValue("backgroundColor");
//        }
//        public /* override */  get borderColor(): string {
//            return this.GetValue("borderColor");
//        }
//        public /* override */  get textColor(): string {
//            return this.GetValue("textColor");
//        }
//        public /* override */  get rendering(): string {
//            return this.GetValue("rendering");
//        }
//        public /* override */  get startEditable(): boolean {
//            return this.GetValue("startEditable", true);
//        }
//        public /* override */  get overlap(): boolean {
//            return this.GetValue("overlap", true);
//        }


//        protected GetValue(key: string, defaultValue?: any): any {
//            let option = this.CalendarBindings[key];
//            if (!option || !option.Expression) return defaultValue;

//            let value = option.Expression(this.EventData);
//            if (option.ConvertTarget) {
//                value = option.ConvertTarget(value);
//            }
//            return value;
//        }
//    }

//    export class Calendar extends Data.DataBindingBehavior {

//        public static ItemsSourceProperty: Data.DependencyProperty = Data.DependencyProperty.RegisterAttached("",
//            el => {

//            },
//            (el, newValue) => {
//                let identity = el.attr("fullCalendar-identity");
//                let calendar: Calendar = window[identity];
//                if (newValue instanceof Data.ListCollectionView) {
//                    calendar.ItemsSource = newValue;
//                } else {
//                    calendar.ItemsSource = new Data.ListCollectionView([]);
//                }
//            },
//            Data.UpdateSourceTrigger.Explicit,
//            Data.BindingMode.OneWay);

//        public Option: ICalendarOption<any>;

//        public /**/ Ensure() {
//            super.Ensure();

//            this.Option = $.extend(true, this.DefaultOption, this.Option);

//            // ユニークなIDを属性に付与した上で、グローバル管理
//            let identity = `id-${NewUid()}`;
//            this.Element.attr("fullCalendar-identity", identity);
//            window[identity] = this;

//            let option: FullCalendar.Options = {
//                header: {
//                    left: this.ParseCalendarHeaderButtons(this.Option.header.left),
//                    center: this.ParseCalendarHeaderButtons(this.Option.header.center),
//                    right: this.ParseCalendarHeaderButtons(this.Option.header.right)
//                },

//                defaultDate: this.Option.defaultDate,
//                businessHours: this.Option.businessHours,
//                editable: this.Option.editable,
//                theme: this.Option.theme,
//                defaultView: this.ParseCalendarViewMode(this.Option.defaultView),
//                scrollTime: this.ParseScrollTime(this.Option.scrollTime),
//                slotDuration: this.ParseSlotDuration(this.Option.slotDuration),
//            };

//            // patch
//            option.eventAfterAllRender = function (view) {

//            };

//            if (this.Option.eventClick) {
//                option.eventClick = (a: EventDataWrapper, b: any, c: FullCalendar.ViewObject) => {
//                    if (a.EventData) {
//                        let e: ICalendarEventArgs = {
//                            sender: this,
//                            original: a.EventData,
//                            event: b,
//                            view: c
//                        };
//                        Application.Current.SafeAction(() =>
//                            this.Option.eventClick(this.DataContext, e));
//                    }
//                }
//            }
//            if (this.Option.dayClick) {
//                // hack d.tsがjsの変更に追いついていない
//                option.dayClick = (date: any, jsEvent: any, view: any) => {
//                    let e: ICalendarEventArgs = {
//                        event: jsEvent,
//                        view: view,
//                        date: date && date.toDate() ? date.toDate() : date,
//                    };

//                    Application.Current.SafeAction(() =>
//                        this.Option.dayClick(this.DataContext, e));

//                }
//            }

//            let nativeOption = {
//                lang: this.Option.lang,
//                locale: this.Option.lang
//            }

//            option = $.extend(option, nativeOption);

//            this.Element.fullCalendar(option);

//            if (this.Option.viewModeClick) {
//                let monthButton = this.Element.find(".fc-month-button span");
//                if (monthButton.length !== 0) {
//                    monthButton.click(e => {
//                        let eventArgs: ICalendarEventArgs = {
//                            sender: this,
//                            mode: CalendarViewMode.month,
//                            original: e,
//                        };

//                        this.Option.viewModeClick(this.DataContext, eventArgs);

//                        //Application.Current.SafeAction((vm: any, option: ICalendarOption<any>, e: ICalendarEventArgs) => {
//                        //    option.viewModeClick(vm, e);
//                        //}, this.DataContext, this.DataContext, this.Option, eventArgs);
//                    });
//                }
//                let agendaWeekButton = this.Element.find(".fc-agendaWeek-button span");
//                if (agendaWeekButton.length !== 0) {

//                    agendaWeekButton.click(e => {
//                        let eventArgs: ICalendarEventArgs = {
//                            sender: this,
//                            mode: CalendarViewMode.agendaWeek,
//                            original: e,
//                        };

//                        this.Option.viewModeClick(this.DataContext, eventArgs);

//                    });

//                }
//                let agendaDayButton = this.Element.find(".fc-agendaDay-button span");
//                if (agendaDayButton.length !== 0) {

//                    agendaDayButton.click(e => {

//                        let eventArgs: ICalendarEventArgs = {
//                            sender: this,
//                            mode: CalendarViewMode.agendaDay,
//                            original: e,
//                        };

//                        this.Option.viewModeClick(this.DataContext, eventArgs);
//                    });
//                }
//            }
//        }

//        protected ParseCalendarHeaderButtons(status: CalendarHeaderButtons): string {
//            let list = new List<string>();

//            if (this.HasFlag(status, CalendarHeaderButtons.prevYear)) {
//                list.add("prevYear");
//            }
//            if (this.HasFlag(status, CalendarHeaderButtons.prev)) {
//                list.add("prev");
//            }
//            if (this.HasFlag(status, CalendarHeaderButtons.next)) {
//                list.add("next");
//            }
//            if (this.HasFlag(status, CalendarHeaderButtons.nextYear)) {
//                list.add("nextYear");
//            }
//            if (this.HasFlag(status, CalendarHeaderButtons.month)) {
//                list.add("month");
//            }
//            if (this.HasFlag(status, CalendarHeaderButtons.agendaWeek)) {
//                list.add("agendaWeek");
//            }
//            if (this.HasFlag(status, CalendarHeaderButtons.agendaDay)) {
//                list.add("agendaDay");
//            }
//            if (this.HasFlag(status, CalendarHeaderButtons.title)) {
//                list.add("title");
//            }
//            if (this.HasFlag(status, CalendarHeaderButtons.today)) {
//                list.add("today");
//            }
//            return list.toArray().join(",");
//        }
//        protected HasFlag(status: CalendarHeaderButtons, flag: CalendarHeaderButtons): boolean {
//            return ((status & flag) == flag);
//        }

//        protected ParseCalendarViewMode(status: CalendarViewMode): string {
//            if (status === CalendarViewMode.agendaDay) {
//                return "agendaDay";
//            } else if (status === CalendarViewMode.agendaWeek) {
//                return "agendaWeek";
//            } else {
//                return "month";
//            }
//        }
//        protected ParseScrollTime(hour: number): any {
//            return moment.duration(hour, "hour");
//        }
//        protected ParseSlotDuration(minute: number): any {
//            return moment.duration(minute, "minute");
//        }


//        protected get DefaultOption(): ICalendarOption<any> {
//            return {
//                header: {
//                    left: CalendarHeaderButtons.prev | CalendarHeaderButtons.today | CalendarHeaderButtons.next,
//                    center: CalendarHeaderButtons.title,
//                    right: CalendarHeaderButtons.month | CalendarHeaderButtons.agendaWeek | CalendarHeaderButtons.agendaDay
//                },
//                defaultDate: new Date(),
//                businessHours: true,
//                editable: true,
//                theme: false,
//                defaultView: CalendarViewMode.agendaWeek,
//                scrollTime: 9,
//                slotDuration: 15,
//                lang: "ja",
//            };
//        }

//        public set ItemsSource(newValue: Data.ListCollectionView) {
//            this.RemoveAll();

//            let events = new List<EventDataWrapper>();
//            $.each(newValue.ToArray(), (i, value) => {
//                let newValue = new EventDataWrapper();
//                newValue.EventData = value;
//                newValue.CalendarBindings = this.CalendarBindings;
//                events.add(newValue);
//            });

//            this.Element.fullCalendar("addEventSource", events.toArray());
//        }

//        public RemoveAll() {
//            this.Element.fullCalendar("removeEvents");
//        }

//        public CalendarBindings: { [key: string]: CalendarOption } = {};
//        public LastOption: CalendarOption;
//    }

//    export interface CalendarOption {
//        Expression?: (row: any) => any;
//        ConvertTarget?: (value: any) => any;
//    }

//    export class CalendarBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T>{
//        constructor(owner: BizView) {
//            super(owner);
//        }

//        public BindingIdentity(exp: (row: T) => string | number): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("id", exp);
//        }
//        public BindingTitle(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("title", exp);
//        }
//        public BindingStartDate(exp: (row: T) => string | Date): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("start", exp);
//        }
//        public BindingEndDate(exp: (row: T) => string | Date): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("end", exp);
//        }
//        public BindingAllDay(exp: (row: T) => boolean | string): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("allDay", exp);
//        }
//        public BindingUrl(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("url", exp);
//        }
//        public BindingClass(exp: (row: T) => string | Array<string>): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("className", exp);
//        }
//        public BindingEditable(exp: (row: T) => boolean | string): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("editable", exp);
//        }
//        public BindingColor(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("color", exp);
//        }
//        public BindingBackgroundColor(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("backgroundColor", exp);
//        }
//        public BindingBorderColor(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("borderColor", exp);
//        }
//        public BindingTextColor(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("textColor", exp);
//        }
//        public BindingRendering(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("rendering", exp);
//        }
//        public BindingStartEditable(exp: (row: T) => boolean): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("startEditable", exp);
//        }
//        public BindingOverlap(exp: (row: T) => boolean): CalendarBindingBehaviorBuilder<T> {
//            return this.AddBinding("overlap", exp);
//        }

//        protected AddBinding(key: string, exp: any): CalendarBindingBehaviorBuilder<any> {
//            let me: CalendarBindingBehaviorBuilder<any> = this;
//            if (me.CurrentBehavior instanceof Calendar) {
//                me.CurrentBehavior.CalendarBindings[key] = {
//                    Expression: exp,
//                };
//                me.CurrentBehavior.LastOption = me.CurrentBehavior.CalendarBindings[key];
//            }
//            return me;
//        }



//    }



//    export interface BindingBehaviorBuilder<T> {
//        BuildCalendar<TRow>(itemsSource: (x: T) => any, option?: ICalendarOption<T>): CalendarBindingBehaviorBuilder<TRow>;
//    }

//    BindingBehaviorBuilder.prototype.BuildCalendar = function (itemsSource: (x: any) => any, option?: ICalendarOption<any>) {
//        let me: BindingBehaviorBuilder<any> = this;

//        let behavior = me.Add(new Calendar());
//        behavior.Property = Calendar.ItemsSourceProperty;
//        behavior.PInfo = new LamdaExpression(me.Owner.DataContext, itemsSource);
//        behavior.Option = option;

//        let newMe = new CalendarBindingBehaviorBuilder<any>(me.Owner);
//        newMe.CurrentBehavior = me.CurrentBehavior;
//        newMe.CurrentElement = me.CurrentElement;
//        return newMe;
//    }

//}