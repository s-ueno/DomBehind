namespace Biz.WebApp.Portal {

    export class PortalView extends DomBehind.BizView {
        public BuildBinding(): void {
            let builder = this.CreateBindingBuilder<PortalViewModel>();

            builder.Element("#PortalLayout")
                .BuildLayout()
                .Top("Portal/TitleBar", { size: 50, resizable: false })  
                .Left("Portal/SideMenu", { size: 220, resizable: true }) 
                .Preview(x => x.BottomContentSource, { size: 475, resizable: true }, x => x.IsVisibleBottomContent)
                .Right(x => x.RightContentSource, { size: 350, resizable: true }, x => x.IsVisibleRightContent)
                .Main(x => x.MainContentSource, { style: `overflow-x:auto;` });
        }
    }
}