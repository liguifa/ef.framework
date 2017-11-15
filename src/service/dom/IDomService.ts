namespace ef.service{
    export interface IDomService{
        Refresh(element:Element,template:string,scope:framework.Scope):void;

        Render(element:Element,template:string,scope:framework.Scope):void;
    }
}