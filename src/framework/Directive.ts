namespace ef.framework {
    export abstract class Directive{
        public abstract Name:string;

        public abstract View():Scope;

        public abstract Link(dScope:Scope,element:Element,attribute:Attr,scope:framework.Scope):void;

        public Start(element:Element,attribute:Attr,scope:framework.Scope):void{
            let dScope = this.View();
            this.Link(dScope,element,attribute,scope);
        }
    }
}