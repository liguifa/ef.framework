namespace ef.test{
    class TestService extends ef.framework.Service implements ITestService{
        public Test():void{
            console.log(`Hello`);
        }
    }

    export interface ITestService{
        Test():void;
    }

    ef.framework.Bootstrap.GetInstance().Service(new TestService());
}