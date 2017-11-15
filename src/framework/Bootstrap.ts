/// <reference path="DirectiveFactory.ts" />

namespace ef.framework {
    export class Bootstrap{
        private static mBootstrap:Bootstrap;
        private Widgets:Array<Widget> = new Array<Widget>();
        private Controllers:Array<Controller> = new Array<Controller>();
        private constructor(){
            let self = this;
            window.addEventListener("load",()=>self.Start(self));
        }

        public static GetInstance():Bootstrap{
            if(Bootstrap.mBootstrap == null){
                Bootstrap.mBootstrap = new Bootstrap();
            }
            return Bootstrap.mBootstrap;
        }

        public Widget(widget:Widget):void{
            this.Widgets.push(widget);
        }

        public Controller(controller:Controller):void{
            this.Controllers.push(controller);
        }

        public Service(service:any,name:string):void{
            ServiceFactory.Register(new ServiceInJect(service,name));
        }

        public Directive(directive:Directive):void{
            DirectiveFactory.Register(directive);
        }

        private Start(self:Bootstrap):void{
            self.Widgets.forEach(widget=>widget.Start());
            self.Controllers.forEach(cntroller=>cntroller.Start());
        }
    }
}