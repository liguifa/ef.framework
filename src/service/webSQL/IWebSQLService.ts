namespace ef.service{
    export interface IWebSQLService{
        ExecCommand<T>():T;
    }
}