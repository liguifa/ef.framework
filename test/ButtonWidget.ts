namespace ef.test{
    class Button extends ef.framework.Widget{
        public Name:string = "t-button";

        public Template:string = "<button>{{Context}}</button>";

        public View():ef.framework.Scope{
            let scope = new ButtonScope();
            scope.Context = "Guifa Lee";
            return scope;
        }

        public Link(scope:ef.framework.Scope,elemnt:Element):void{

        }
    }

    class ButtonScope extends ef.framework.Scope{
        public Context:string;

        public Test:Function;
    }

    ef.framework.Bootstrap.GetInstance().Widget(new Button());
}