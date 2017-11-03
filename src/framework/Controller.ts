namespace ef.framework {
    export abstract class Controller{
        private mMonitor:Monitor;
        
        public abstract Name:string;

        private mTemplate:string;

        private get Monitor():Monitor{
            if(this.mMonitor == null)
            {
                this.mMonitor = new Monitor();
            }
            return this.mMonitor;
        }

        private RecordTemplate():void{
            let controllerElement = document.getElementsByTagName(this.Name)[0];
            this.mTemplate = controllerElement.innerHTML;
        }

        public Start():void{
            try
            {
                let self = this;
                this.RecordTemplate();
                let scope = this.View();   
                this.Monitor.Watch(scope,function()
                {
                    let controllerElement = document.getElementsByTagName(self.Name)[0];
                    let newControllerHTML = self.mTemplate.replace(/{{(.+?)}}/g,(match,replaceStr)=>{
                        return scope[replaceStr];
                    });
                    controllerElement.innerHTML = newControllerHTML;
                });
                let controllerElement = document.getElementsByTagName(this.Name)[0];
                let newControllerHTML = self.mTemplate.replace(/{{(.+?)}}/g,(match,replaceStr)=>{
                    return scope[replaceStr];
                });
                controllerElement.innerHTML = newControllerHTML;
            }
            catch(e)
            {
                throw e;
            }
        }

        public abstract View():Scope;
    }
}