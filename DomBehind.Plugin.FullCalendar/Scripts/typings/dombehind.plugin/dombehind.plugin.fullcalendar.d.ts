declare namespace DomBehind {
    interface ICalendarOption<T> {
        controller?: (vm: T) => Calendar;
        header?: ICalendarHeader;
        defaultDate?: Date;
        defaultView?: CalendarViewMode;
        businessHours?: boolean;
        editable?: boolean;
        theme?: boolean;
        buttonIcons?: {
            prev: string;
            next: string;
        };
        firstDay?: number;
        weekends?: boolean;
        scrollTime?: number;
        slotDuration?: number;
        lang?: string;
        dayClick?: (vm: T, args: ICalendarEventArgs) => void;
        eventClick?: (vm: T, args: ICalendarEventArgs) => void;
        viewModeClick?: (vm: T, args: ICalendarEventArgs) => void;
    }
    interface ICalendarEventArgs {
        sender?: Calendar;
        original?: any;
        event?: JQueryEventObject;
        view?: any;
        date?: Date;
        mode?: CalendarViewMode;
    }
    enum CalendarViewMode {
        month = 0,
        agendaWeek = 1,
        agendaDay = 2
    }
    enum CalendarHeaderButtons {
        prevYear = 1,
        prev = 2,
        next = 4,
        nextYear = 8,
        month = 16,
        agendaWeek = 32,
        agendaDay = 64,
        title = 128,
        today = 256
    }
    interface ICalendarHeader {
        left?: CalendarHeaderButtons;
        center?: CalendarHeaderButtons;
        right?: CalendarHeaderButtons;
    }
    class Calendar extends Data.DataBindingBehavior {
        static ItemsSourceProperty: Data.DependencyProperty;
        Option: ICalendarOption<any>;
        Ensure(): void;
        protected ParseCalendarHeaderButtons(status: CalendarHeaderButtons): string;
        protected HasFlag(status: CalendarHeaderButtons, flag: CalendarHeaderButtons): boolean;
        protected ParseCalendarViewMode(status: CalendarViewMode): string;
        protected ParseScrollTime(hour: number): any;
        protected ParseSlotDuration(minute: number): any;
        protected readonly DefaultOption: ICalendarOption<any>;
        ItemsSource: Data.ListCollectionView;
        RemoveAll(): void;
        CalendarBindings: {
            [key: string]: CalendarOption;
        };
        LastOption: CalendarOption;
    }
    interface CalendarOption {
        Expression?: (row: any) => any;
        ConvertTarget?: (value: any) => any;
    }
    class CalendarBindingBehaviorBuilder<T> extends BindingBehaviorBuilder<T> {
        constructor(owner: BizView);
        BindingIdentity(exp: (row: T) => string | number): CalendarBindingBehaviorBuilder<T>;
        BindingTitle(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T>;
        BindingStartDate(exp: (row: T) => string | Date): CalendarBindingBehaviorBuilder<T>;
        BindingEndDate(exp: (row: T) => string | Date): CalendarBindingBehaviorBuilder<T>;
        BindingAllDay(exp: (row: T) => boolean | string): CalendarBindingBehaviorBuilder<T>;
        BindingUrl(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T>;
        BindingClass(exp: (row: T) => string | Array<string>): CalendarBindingBehaviorBuilder<T>;
        BindingEditable(exp: (row: T) => boolean | string): CalendarBindingBehaviorBuilder<T>;
        BindingColor(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T>;
        BindingBackgroundColor(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T>;
        BindingBorderColor(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T>;
        BindingTextColor(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T>;
        BindingRendering(exp: (row: T) => string): CalendarBindingBehaviorBuilder<T>;
        BindingStartEditable(exp: (row: T) => boolean): CalendarBindingBehaviorBuilder<T>;
        BindingOverlap(exp: (row: T) => boolean): CalendarBindingBehaviorBuilder<T>;
        protected AddBinding(key: string, exp: any): CalendarBindingBehaviorBuilder<any>;
    }
    interface BindingBehaviorBuilder<T> {
        BuildCalendar<TRow>(itemsSource: (x: T) => any, option?: ICalendarOption<T>): CalendarBindingBehaviorBuilder<TRow>;
    }
}