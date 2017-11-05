namespace ef.framework {
    export class ServiceFactory{
        private static mServices:Array<ServiceInJect> = new Array<ServiceInJect>();

        public static Register(service:ServiceInJect):void{
            this.mServices.push(service);
        }

        public static GetService<T>(name:string):T{
            let services = this.mServices.filter(service=>{
                return service.Name == name;
            })
            if(services && services.length>0){
                return services[0].Service as T;
            }
            return null;
        }
    }

    export class ServiceInJect{
        public Name:string;

        public Service:any;

        public constructor(service:any,name:string){
            this.Name = name;
            this.Service = service;
        }
    }
}