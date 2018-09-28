namespace DomBehind {

    export class Camera {

        public static PhotoUriProperty: Data.DependencyProperty =
            Data.DependencyProperty.RegisterAttached("photoUri",
                el => {
                    return el.attr(Camera.PhotoUriProperty.PropertyName);
                },
                (el, newValue) => {
                    
                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWayToSource,
                behavior => {
                    let el = behavior.Element;
                    if (!el.is("input")) {
                        return;
                    }
                    Camera.Ensure(el, false);
                });

        public static VideoUriProperty: Data.DependencyProperty =
            Data.DependencyProperty.RegisterAttached("videoUri",
                el => {
                    return el.attr(Camera.VideoUriProperty.PropertyName);
                },
                (el, newValue) => {

                },
                Data.UpdateSourceTrigger.Explicit,
                Data.BindingMode.OneWayToSource,
                behavior => {
                    let el = behavior.Element;
                    if (!el.is("input")) {
                        return;
                    }
                    Camera.Ensure(el, false);
                });


        public static Ensure(element: JQuery, isPhoto: boolean) {
            element.attr("type", "file");
            element.attr("accept", "image/*");

            if (isPhoto) {
                element.attr("capture", "camera");
            } else if (element.attr("capture")) {
                element.removeAttr("capture");
            }

            let name = isPhoto ? Camera.PhotoUriProperty.PropertyName : Camera.VideoUriProperty.PropertyName;
            element.change((e: any) => {
                try {
                    let file = e.target.files[0];
                    let uri = URL.createObjectURL(file);

                    element.attr(name, uri);
                } catch (e) {

                }
            });
        }
    }
}