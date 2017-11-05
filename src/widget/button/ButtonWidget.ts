/// <reference path="../../framework/Widget.ts" />
/// <reference path="../../framework/Scope.ts" />
/// <reference path="../../framework/Bootstrap.ts" />

namespace ef.widget{
    //@framework.EFWidget()
    class EFButton extends framework.Widget{
        public Name:string = "ef-button";

        public Template:string = `<button class="ef-button">{{Text}}</button>`;

        public View():EFButtonScope{
            return new EFButtonScope();
        }

        public Link(scope:EFButtonScope,element:Element):void{

        }
    }

    class EFButtonScope extends framework.Scope{
        public Text:string = "GFLi";
    }

    framework.Bootstrap.GetInstance().Widget(new EFButton());
}