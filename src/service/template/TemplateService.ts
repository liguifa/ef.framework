/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />

namespace ef.service{
    class TemplateService implements ITemplateService{
        public Compile(template:string,data:object):string{
            let functionBody = template.replace(/\r/g,(match,replace)=>"")
                    .replace(/\n/g,(match,replace)=>"")
                    .replace(/"/g,(match,replace)=>"\"")
                    .replace(/{{(.+?)}}/g,(match,replace)=>`'+data.${replace}+'`)
                    .replace(/@{(.+?)}/g,(match,replace)=>`';${replace} tpl += '`);
            functionBody = `var tpl = '${functionBody}';return tpl;`;
            return new Function("data",functionBody)(data);
        }
    }

    framework.Bootstrap.GetInstance().Service(new TemplateService(),"ITemplateService");
}