namespace ef.service{
    export interface ILogService{
        Error(log:string):void;

        Warn(log:string):void;

        Info(log:string):void;

        Debug(log:string):void;
    }
}