declare namespace DomBehind {
    interface BindingBehaviorBuilder<T> {
        InputType(inputType: InputType): BindingBehaviorBuilder<T>;
    }
    enum InputType {
        Hidden = 0,
        Text = 1,
        Search = 2,
        Tel = 3,
        Url = 4,
        Email = 5,
        Password = 6,
        DateTime = 7,
        Date = 8,
        Month = 9,
        Week = 10,
        Time = 11,
        DateTimeLocal = 12,
        Number = 13,
        Range = 14,
        Color = 15,
        Checkbox = 16,
        Radio = 17,
        File = 18,
        Submit = 19,
        Image = 20,
        Reset = 21,
        Button = 22
    }
}
