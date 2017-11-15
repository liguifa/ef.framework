namespace ef.service{
    export interface IResponsibilityChanService{
        Start(name:string,scope:framework.Scope):void;

        Register(name:string,nodeName:string,func:Function):void;

        UnRegister(name:string,nodeName:string):void;
    }
}