namespace ef.framework {
    export abstract class Directive{
        protected abstract Name:string;

        public abstract View():Scope;

        public abstract Link(scope:Scope,element:Element):void;

        public Start():void{
            
        }
    }
}