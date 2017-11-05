/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
/// <reference path="../../framework/Ioc.ts" />

namespace ef.service{
    //@framework.Service("IGuidService")
    class GuidService implements IGuidService{
        public NewGuid():Guid{
            
            let id:string = "";
            let replaceIndxs = [8,13,18,23];
            let replaceIndex = 0;
            for(let i=0;i<36;i++){
                if(replaceIndxs.length>=replaceIndex){
                    if(i == replaceIndxs[replaceIndex]){
                        id += "-";
                        replaceIndex++;
                    } else {
                        id += this.NewId();
                    }
                } else {
                    id += this.NewId();
                }
            }
            return new Guid(id);
        }

        private NewId():string{
            let max = 15;
            let min = 0;
            let guidStrs = ["1","2","3","4","5","6","7","8","9","0","A","B","C","D","E","F"];
            let index = parseInt((Math.random()*(max-min+1)+min).toString(),10);
            return guidStrs[index];
        }
    }

    framework.Bootstrap.GetInstance().Service(new GuidService(),"IGuidService");
}