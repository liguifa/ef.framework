/// <reference path="../framework/Directive.ts" />
/// <reference path="../framework/Scope.ts" />
/// <reference path="../framework/Bootstrap.ts" />

namespace ef.directive{
    class ClickDirective extends framework.Directive{
        public Name:string = "ef-click";

        public View():ClickScope{
            return new ClickScope();
        }

        public Link(dScope:framework.Scope,element:Element,attribute:Attr,scope:framework.Scope):void{
            element.addEventListener("click",function(){
                scope[attribute.value]();
            })
        }
    }

    class ClickScope extends framework.Scope{
        
    }

    framework.Bootstrap.GetInstance().Directive(new ClickDirective());
}