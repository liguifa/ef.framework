namespace ef.service{
    export interface ITemplateService{
        Compile(template:string,data:object):string;
    }
}