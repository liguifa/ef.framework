namespace ef.test{
    class HomeController extends ef.framework.Controller{
        public Name:string = "home-controller";

        public View():ef.framework.Scope{
            let scope = new HomeScope();
            scope.Name = "李贵发";
            scope.Age = 24;
            scope.Test = function(){
                alert("test");
            }
            let i = 0;
            setInterval(function(){
                scope.Age =  + i;
                i++;
                ef.framework.ServcieFactory.GetService<ITestService>().Test();
            },2000)
            return scope;
        }
    }

    class HomeScope extends ef.framework.Scope{
        public Name:string;
        public Age:number;
        public Test:Function;
    }

    ef.framework.Bootstrap.GetInstance().Controller(new HomeController());
}