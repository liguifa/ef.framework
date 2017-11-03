namespace ef.framework {
    export abstract class Widget{
        public abstract Name:string;

        public abstract Template:string;

        public abstract View():Scope;

        public abstract Link(scope:Scope,element:Element):void;

        private mMonitor:Monitor;

        private get Monitor():Monitor{
            if(this.mMonitor == null)
            {
                this.mMonitor = new Monitor();
            }
            return this.mMonitor;
        }

        public Start():void{
            let self = this;
            let elements = document.getElementsByTagName(this.Name);
            let scope = this.View();
            this.Monitor.Watch(scope,()=>
            {
                for (let key in elements) {
                    if (elements.hasOwnProperty(key)) {
                        var element = elements[key];
                        let newHtml = self.Template.replace(/{{(.+?)}}/g,(match,replaceStr)=>{
                            return scope[replaceStr];
                        });
                        element.innerHTML = newHtml;
                    }
                }
            });
            for (let key in elements) {
                if (elements.hasOwnProperty(key)) {
                    var element = elements[key];
                    let newHtml = self.Template.replace(/{{(.+?)}}/g,(match,replaceStr)=>{
                        return scope[replaceStr];
                    });
                    element.innerHTML = newHtml;
                }
            }
        }
    }
}