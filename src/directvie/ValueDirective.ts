/// <reference path="../framework/Directive.ts" />
/// <reference path="../framework/Scope.ts" />
/// <reference path="../framework/Bootstrap.ts" />

namespace ef.directive{
    export class ValueDirective extends framework.Directive{
        public Name:string = "ef-value";

        public View():framework.Scope{
            return null;
        }

        public Link(dScope:framework.Scope,element:Element,attribute:Attr,scope:framework.Scope):void{
            element.addEventListener("input",function(){
                scope[attribute.value] = (element as HTMLInputElement).value;
            });
            let monitor = new framework.Monitor();
            (element as HTMLInputElement).value =  scope[attribute.value];
            monitor.Watch(scope[attribute.value],function(){
                element.attributes["value"].value = scope[attribute.value];
            });
        }
    }

    framework.Bootstrap.GetInstance().Directive(new ValueDirective());
}