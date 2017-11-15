namespace ef.framework{
    export class DirectiveFactory{
        private static mDirectives:Array<Directive> = new Array<Directive>();

        public static Exists(name:string):boolean{
            return this.mDirectives.filter(directive=>directive.Name == name).length>0;
        }

        public static Register(directive:Directive):void{
            this.mDirectives.push(directive);
        }

        public static GetDirective(name:string):Directive{
            return this.mDirectives.filter(directive=>directive.Name == name)[0];
        }
    }
}