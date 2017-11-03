namespace ef.framework {
    export class ServcieFactory{
        private static mServices:Array<Service> = new Array<Service>();

        public static Register(service:Service):void{
            this.mServices.push(service);
        }

        public static GetService<T>():T{
            let services = this.mServices.filter(service=>{
                return (service as T) != null;
            })
            if(services && services.length>0){
                return services[0] as T;
            }
            return null;
        }
    }
}