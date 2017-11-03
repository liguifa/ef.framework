/// <reference path="../framework/Directive.ts" />
/// <reference path="../framework/Scope.ts" />

namespace ef.directive{
    class ClickDirective extends framework.Directive{
        public Name:string = "ef-click";

        public View():ClickScope{
            return new ClickScope();
        }

        public Link(scope:framework.Scope,element:Element):void{

        }
    }

    class ClickScope extends framework.Scope{
        
    }
}