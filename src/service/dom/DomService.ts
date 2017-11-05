/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
/// <reference path="../../framework/Ioc.ts" />
/// <reference path="../template/ITemplateService.ts" />

namespace ef.service{
    class DomService implements IDomService {
        public Refresh(element:Element,template:string,scope:framework.Scope):void{
            let innerHTML = framework.ServiceFactory.GetService<ITemplateService>("ITemplateService").Compile(template,scope);
            let velement = this.GenerateVirtualDOM(innerHTML);
            this.PatchCommit(element,velement);
        }

        private GenerateVirtualDOM(innerHTML:string):Element{
            let virtualRoot = document.createElement("div");
            virtualRoot.innerHTML = innerHTML;
            return virtualRoot;
        } 

        private PatchCommit(element:Element,velement:Element):void{
            if(!/controller/g.test(element.tagName)){
                if(element.nodeValue != velement.nodeValue){
                    element = velement;
                    return;
                }
            }
            for(let i in element.childNodes){
                this.PatchCommit(element.childNodes[i] as Element,velement.childNodes[i] as Element);
            }
        }
    }

    framework.Bootstrap.GetInstance().Service(new DomService(),"IDomService");
}