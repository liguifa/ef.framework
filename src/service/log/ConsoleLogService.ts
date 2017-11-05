/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />

namespace ef.service{
    class LogService implements ILogService{
        public Error(log:string):void{
            let date = new Date().toLocaleTimeString();
            console.error(`Error ${date} ${log}`);
        }

        public Warn(log:string):void{
            let date = new Date().toLocaleTimeString();
            console.warn(`Warn ${date} ${log}`);
        }
            
        public Info(log:string):void{
            let date = new Date().toLocaleTimeString();
            console.info(`Info ${date} ${log}`);           
        }
                        
        public Debug(log:string):void{
            let date = new Date().toLocaleTimeString();
            console.debug(`Debug ${date} ${log}`);                      
        }
    }

    framework.Bootstrap.GetInstance().Service(new LogService(),"ILogService");
}