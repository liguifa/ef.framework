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

        public Render(element:Element,template:string,scope:framework.Scope):void{
            let innerHTML = framework.ServiceFactory.GetService<ITemplateService>("ITemplateService").Compile(template,scope);
            let velement = this.GenerateVirtualDOM(innerHTML);
            this.AllCommit(element,velement,scope);
        }

        private GenerateVirtualDOM(innerHTML:string):Element{
            let virtualRoot = document.createElement("div");
            virtualRoot.innerHTML = innerHTML;
            return virtualRoot;
        } 

        private PatchCommit(element:Element,velement:Element):void{
            if(!/.*controller/g.test(element.tagName)){
                //对比Attribute
                if(element.attributes){
                    for(let i in element.attributes){
                        let attribute = element.attributes[i];
                        let vAttribute = velement.attributes[i];
                        if(attribute.value != vAttribute.value){
                            attribute.value = vAttribute.value;
                        }
                    }
                }
                //对比Text
                if(!velement.nodeValue){
                    if(element.nodeValue != velement.nodeValue){
                        element.nodeValue = velement.nodeValue;
                    }
                } else {
                    element.nodeValue = velement.nodeValue;
                }
            }
            for(let i in element.childNodes){
                this.PatchCommit(element.childNodes[i] as Element,velement.childNodes[i] as Element);
            }
        }

        private AllCommit(element:Element,velement:Element,scope:framework.Scope):void{
            if(element.nodeType){
                element.innerHTML = velement.innerHTML;
                if(!/.*controller/g.test(element.tagName)){
                    if(element.attributes){
                        for(let i in element.attributes){
                            let attribute = element.attributes[i];
                            if(framework.DirectiveFactory.Exists(attribute.name)){
                                framework.DirectiveFactory.GetDirective(attribute.name).Start(element,attribute,scope);
                            }
                        }
                    }
                }
                for(let i in element.childNodes){
                    this.AllCommit(element.childNodes[i] as Element,velement.childNodes[i] as Element,scope);
                }
            }
        }
    }

    framework.Bootstrap.GetInstance().Service(new DomService(),"IDomService");
}