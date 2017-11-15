namespace ef.directive{
    class IfDirective extends framework.Directive{
        public Name:string = "ef-if";

        private mParentNode:Element;
        private mCurrentNode:Element;
        private mMonitor:framework.Monitor;

        public get Monitor():framework.Monitor{
            if(this.mMonitor == null){
                this.mMonitor = new framework.Monitor();
            }
            return this.mMonitor;
        }


        public View():framework.Scope{
            return new IfScope();
        }

        public Link(dScope:framework.Scope,element:Element,attribute:Attr,scope:framework.Scope):void{
            let self = this;
            this.Monitor.Watch(scope,function(){
                let isShow = scope[attribute.value] as boolean;
                self.Render(isShow,element);
            });
            this.mParentNode = element.parentElement;
            this.mCurrentNode = element;
        }

        private Render(isShow:boolean,element:Element):void{
            if(isShow){
                this.mParentNode.removeChild(element);
            } else {
                this.mParentNode.appendChild(this.mCurrentNode);
            }
        }
    }

    class IfScope extends framework.Scope{

    }

    framework.Bootstrap.GetInstance().Directive(new IfDirective());
}