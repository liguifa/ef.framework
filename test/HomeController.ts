namespace ef.test{
    class HomeController extends ef.framework.Controller{
        public Name:string = "home-controller";

        public View():ef.framework.Scope{
            let scope = new HomeScope();
            scope.Name = "李贵发";
            scope.Test = function(){
                alert("我是test方式");
            }
            let i = 0;
            scope.Age = "";
            scope.Value = "MYYYY";
            // setInterval(function(){
            //     i++;
            //     //ef.framework.ServcieFactory.GetService<ITestService>().Test();
            //     let id = ef.framework.ServiceFactory.GetService<ef.service.IGuidService>("IGuidService").NewGuid();
            //     // ef.framework.ServiceFactory.GetService<ef.service.ILogService>("ILogService").Error("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
            //     // ef.framework.ServiceFactory.GetService<ef.service.ILogService>("ILogService").Warn("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
            //     // ef.framework.ServiceFactory.GetService<ef.service.ILogService>("ILogService").Info("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
            //     // ef.framework.ServiceFactory.GetService<ef.service.ILogService>("ILogService").Debug("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");

            //     scope.Age =  id.ToString();
                
            // },2000)
            ef.framework.ServiceFactory.GetService<ef.service.IHttpService>("IHttpService").Get("http://10.2.165.80:8090/test/test.html").then(function(data){
                alert(data);
            });
            return scope;
        }
    }

    class HomeScope extends ef.framework.Scope{
        public Name:string;
        public Age:string;
        public Test:Function;
        public Value:string;
    }

    ef.framework.Bootstrap.GetInstance().Controller(new HomeController());
}