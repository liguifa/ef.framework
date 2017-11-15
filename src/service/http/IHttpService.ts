namespace ef.service{
    export interface IHttpService{
        Get(url:string):Promise<any>;
    }
}