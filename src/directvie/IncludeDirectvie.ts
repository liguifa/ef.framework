namespace ef.directive{
    class IncludeDirective extends framework.Directive{
        public Name:string  = "ef-include";

        public View():framework.Scope{
            return null;
        }

        public Link(dScope:framework.Scope,element:Element,attribute:Attr,scope:framework.Scope):void{
            let path = attribute.value;
            framework.ServiceFactory.GetService<ef.service.IHttpService>("IHttpService").Get(path).then(function(html){
                let node = framework.ServiceFactory.GetService<ef.service.ITemplateService>("ITemplateService").Compile(html,scope);
                element.innerHTML = node;
            });
        }
    }

    framework.Bootstrap.GetInstance().Directive(new IncludeDirective());
}