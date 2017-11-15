namespace ef.service{
    class HttpService implements IHttpService{
        public Get(url:string):Promise<any>{
            return new Promise((resolve,reject)=>{
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                        if(xhr.status == 200){
                            resolve(xhr.responseText)
                        } else {
                            reject();
                        }
                    }
                };
                xhr.open("Get",url,true);
                xhr.send(null);
            });

        }
    }

    framework.Bootstrap.GetInstance().Service(new HttpService(),"IHttpService");
}