namespace ef.test{
    class TestService implements ITestService{
        public Test():void{
            console.log(`Hello`);
        }
    }

    export interface ITestService{
        Test():void;
    }
}