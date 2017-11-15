var ef;
(function (ef) {
    var framework;
    (function (framework) {
        class Directive {
            Start(element, attribute, scope) {
                let dScope = this.View();
                this.Link(dScope, element, attribute, scope);
            }
        }
        framework.Directive = Directive;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        class Scope {
        }
        framework.Scope = Scope;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        class DirectiveFactory {
            static Exists(name) {
                return this.mDirectives.filter(directive => directive.Name == name).length > 0;
            }
            static Register(directive) {
                this.mDirectives.push(directive);
            }
            static GetDirective(name) {
                return this.mDirectives.filter(directive => directive.Name == name)[0];
            }
        }
        DirectiveFactory.mDirectives = new Array();
        framework.DirectiveFactory = DirectiveFactory;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
/// <reference path="DirectiveFactory.ts" />
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        class Bootstrap {
            constructor() {
                this.Widgets = new Array();
                this.Controllers = new Array();
                let self = this;
                window.addEventListener("load", () => self.Start(self));
            }
            static GetInstance() {
                if (Bootstrap.mBootstrap == null) {
                    Bootstrap.mBootstrap = new Bootstrap();
                }
                return Bootstrap.mBootstrap;
            }
            Widget(widget) {
                this.Widgets.push(widget);
            }
            Controller(controller) {
                this.Controllers.push(controller);
            }
            Service(service, name) {
                framework.ServiceFactory.Register(new framework.ServiceInJect(service, name));
            }
            Directive(directive) {
                framework.DirectiveFactory.Register(directive);
            }
            Start(self) {
                self.Widgets.forEach(widget => widget.Start());
                self.Controllers.forEach(cntroller => cntroller.Start());
            }
        }
        framework.Bootstrap = Bootstrap;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
/// <reference path="../framework/Directive.ts" />
/// <reference path="../framework/Scope.ts" />
/// <reference path="../framework/Bootstrap.ts" />
var ef;
(function (ef) {
    var directive;
    (function (directive) {
        class ClickDirective extends ef.framework.Directive {
            constructor() {
                super(...arguments);
                this.Name = "ef-click";
            }
            View() {
                return new ClickScope();
            }
            Link(dScope, element, attribute, scope) {
                element.addEventListener("click", function () {
                    scope[attribute.value]();
                });
            }
        }
        class ClickScope extends ef.framework.Scope {
        }
        ef.framework.Bootstrap.GetInstance().Directive(new ClickDirective());
    })(directive = ef.directive || (ef.directive = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var directive;
    (function (directive) {
        class IfDirective extends ef.framework.Directive {
            constructor() {
                super(...arguments);
                this.Name = "ef-if";
            }
            get Monitor() {
                if (this.mMonitor == null) {
                    this.mMonitor = new ef.framework.Monitor();
                }
                return this.mMonitor;
            }
            View() {
                return new IfScope();
            }
            Link(dScope, element, attribute, scope) {
                let self = this;
                this.Monitor.Watch(scope, function () {
                    let isShow = scope[attribute.value];
                    self.Render(isShow, element);
                });
                this.mParentNode = element.parentElement;
                this.mCurrentNode = element;
            }
            Render(isShow, element) {
                if (isShow) {
                    this.mParentNode.removeChild(element);
                }
                else {
                    this.mParentNode.appendChild(this.mCurrentNode);
                }
            }
        }
        class IfScope extends ef.framework.Scope {
        }
        ef.framework.Bootstrap.GetInstance().Directive(new IfDirective());
    })(directive = ef.directive || (ef.directive = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var directive;
    (function (directive) {
        class IncludeDirective extends ef.framework.Directive {
            constructor() {
                super(...arguments);
                this.Name = "ef-include";
            }
            View() {
                return null;
            }
            Link(dScope, element, attribute, scope) {
                let path = attribute.value;
                ef.framework.ServiceFactory.GetService("IHttpService").Get(path).then(function (html) {
                    let node = ef.framework.ServiceFactory.GetService("ITemplateService").Compile(html, scope);
                    element.innerHTML = node;
                });
            }
        }
        ef.framework.Bootstrap.GetInstance().Directive(new IncludeDirective());
    })(directive = ef.directive || (ef.directive = {}));
})(ef || (ef = {}));
/// <reference path="../framework/Directive.ts" />
/// <reference path="../framework/Scope.ts" />
/// <reference path="../framework/Bootstrap.ts" />
var ef;
(function (ef) {
    var directive;
    (function (directive) {
        class ValueDirective extends ef.framework.Directive {
            constructor() {
                super(...arguments);
                this.Name = "ef-value";
            }
            View() {
                return null;
            }
            Link(dScope, element, attribute, scope) {
                element.addEventListener("input", function () {
                    scope[attribute.value] = element.value;
                });
                let monitor = new ef.framework.Monitor();
                element.value = scope[attribute.value];
                monitor.Watch(scope[attribute.value], function () {
                    element.attributes["value"].value = scope[attribute.value];
                });
            }
        }
        directive.ValueDirective = ValueDirective;
        ef.framework.Bootstrap.GetInstance().Directive(new ValueDirective());
    })(directive = ef.directive || (ef.directive = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        class Controller {
            get Monitor() {
                if (this.mMonitor == null) {
                    this.mMonitor = new framework.Monitor();
                }
                return this.mMonitor;
            }
            RecordTemplate() {
                let controllerElement = document.getElementsByTagName(this.Name)[0];
                this.mTemplate = controllerElement.innerHTML;
            }
            Start() {
                try {
                    let self = this;
                    this.RecordTemplate();
                    let scope = this.View();
                    this.Monitor.Watch(scope, function () {
                        let controllerElement = document.getElementsByTagName(self.Name)[0];
                        //let newControllerHTML = ServiceFactory.GetService<ef.service.ITemplateService>("ITemplateService").Compile(self.mTemplate,scope);
                        framework.ServiceFactory.GetService("IDomService").Refresh(controllerElement, self.mTemplate, scope);
                        //controllerElement.innerHTML = newControllerHTML;
                    });
                    let controllerElement = document.getElementsByTagName(this.Name)[0];
                    framework.ServiceFactory.GetService("IDomService").Render(controllerElement, self.mTemplate, scope);
                }
                catch (e) {
                    throw e;
                }
            }
        }
        framework.Controller = Controller;
        // export function Controller(name:string):Function{
        //     return function(){
        //     }
        // }
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        class Ioc {
            constructor() {
            }
        }
        framework.Ioc = Ioc;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        class Monitor {
            constructor() {
                this.Masters = new Array();
            }
            Watch(watcher, func) {
                this.Record(watcher);
                setInterval(d => {
                    if (this.Diff(watcher)) {
                        func();
                    }
                }, 100);
            }
            Diff(watcher) {
                for (let i in this.Masters) {
                    let master = this.Masters[i];
                    let newValue = watcher[master.Name];
                    if (newValue != master.Value) {
                        this.Record(watcher);
                        return true;
                    }
                }
                return false;
            }
            Record(watcher) {
                this.Masters = new Array();
                for (let i in watcher) {
                    this.Masters.push(new Master(i, watcher[i]));
                }
            }
        }
        framework.Monitor = Monitor;
        class Master {
            constructor(name, value) {
                this.Name = name;
                this.Value = value;
            }
        }
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        let _classPool = new Array();
        function Service(...dependencies) {
            return function (constructor) {
                console.log(constructor);
            };
        }
        framework.Service = Service;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        class ServiceFactory {
            static Register(service) {
                this.mServices.push(service);
            }
            static GetService(name) {
                let services = this.mServices.filter(service => {
                    return service.Name == name;
                });
                if (services && services.length > 0) {
                    return services[0].Service;
                }
                return null;
            }
        }
        ServiceFactory.mServices = new Array();
        framework.ServiceFactory = ServiceFactory;
        class ServiceInJect {
            constructor(service, name) {
                this.Name = name;
                this.Service = service;
            }
        }
        framework.ServiceInJect = ServiceInJect;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        class Widget {
            get Monitor() {
                if (this.mMonitor == null) {
                    this.mMonitor = new framework.Monitor();
                }
                return this.mMonitor;
            }
            Start() {
                let self = this;
                let elements = document.getElementsByTagName(this.Name);
                let scope = this.View();
                this.Monitor.Watch(scope, () => {
                    for (let key in elements) {
                        if (elements.hasOwnProperty(key)) {
                            var element = elements[key];
                            let newHtml = self.Template.replace(/{{(.+?)}}/g, (match, replaceStr) => {
                                return scope[replaceStr];
                            });
                            element.innerHTML = newHtml;
                        }
                    }
                });
                for (let key in elements) {
                    if (elements.hasOwnProperty(key)) {
                        var element = elements[key];
                        let newHtml = self.Template.replace(/{{(.+?)}}/g, (match, replaceStr) => {
                            return scope[replaceStr];
                        });
                        element.innerHTML = newHtml;
                    }
                }
            }
        }
        framework.Widget = Widget;
        function EFWidget() {
            return function (constructor) {
                framework.Bootstrap.GetInstance().Widget(constructor());
                console.log(constructor());
            };
        }
        framework.EFWidget = EFWidget;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
/// <reference path="../../framework/Ioc.ts" />
/// <reference path="../template/ITemplateService.ts" />
var ef;
(function (ef) {
    var service;
    (function (service) {
        class DomService {
            Refresh(element, template, scope) {
                let innerHTML = ef.framework.ServiceFactory.GetService("ITemplateService").Compile(template, scope);
                let velement = this.GenerateVirtualDOM(innerHTML);
                this.PatchCommit(element, velement);
            }
            Render(element, template, scope) {
                let innerHTML = ef.framework.ServiceFactory.GetService("ITemplateService").Compile(template, scope);
                let velement = this.GenerateVirtualDOM(innerHTML);
                this.AllCommit(element, velement, scope);
            }
            GenerateVirtualDOM(innerHTML) {
                let virtualRoot = document.createElement("div");
                virtualRoot.innerHTML = innerHTML;
                return virtualRoot;
            }
            PatchCommit(element, velement) {
                if (!/.*controller/g.test(element.tagName)) {
                    //对比Attribute
                    if (element.attributes) {
                        for (let i in element.attributes) {
                            let attribute = element.attributes[i];
                            let vAttribute = velement.attributes[i];
                            if (attribute.value != vAttribute.value) {
                                attribute.value = vAttribute.value;
                            }
                        }
                    }
                    //对比Text
                    if (!velement.nodeValue) {
                        if (element.nodeValue != velement.nodeValue) {
                            element.nodeValue = velement.nodeValue;
                        }
                    }
                    else {
                        element.nodeValue = velement.nodeValue;
                    }
                }
                for (let i in element.childNodes) {
                    this.PatchCommit(element.childNodes[i], velement.childNodes[i]);
                }
            }
            AllCommit(element, velement, scope) {
                if (element.nodeType) {
                    element.innerHTML = velement.innerHTML;
                    if (!/.*controller/g.test(element.tagName)) {
                        if (element.attributes) {
                            for (let i in element.attributes) {
                                let attribute = element.attributes[i];
                                if (ef.framework.DirectiveFactory.Exists(attribute.name)) {
                                    ef.framework.DirectiveFactory.GetDirective(attribute.name).Start(element, attribute, scope);
                                }
                            }
                        }
                    }
                    for (let i in element.childNodes) {
                        this.AllCommit(element.childNodes[i], velement.childNodes[i], scope);
                    }
                }
            }
        }
        ef.framework.Bootstrap.GetInstance().Service(new DomService(), "IDomService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var service;
    (function (service) {
        class Guid {
            constructor(id) {
                this.Id = id;
            }
            ToString() {
                if (this.Id) {
                    return this.Id;
                }
                return null;
            }
        }
        service.Guid = Guid;
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
/// <reference path="../../framework/Ioc.ts" />
var ef;
(function (ef) {
    var service;
    (function (service) {
        //@framework.Service("IGuidService")
        class GuidService {
            NewGuid() {
                let id = "";
                let replaceIndxs = [8, 13, 18, 23];
                let replaceIndex = 0;
                for (let i = 0; i < 36; i++) {
                    if (replaceIndxs.length >= replaceIndex) {
                        if (i == replaceIndxs[replaceIndex]) {
                            id += "-";
                            replaceIndex++;
                        }
                        else {
                            id += this.NewId();
                        }
                    }
                    else {
                        id += this.NewId();
                    }
                }
                return new service.Guid(id);
            }
            NewId() {
                let max = 15;
                let min = 0;
                let guidStrs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F"];
                let index = parseInt((Math.random() * (max - min + 1) + min).toString(), 10);
                return guidStrs[index];
            }
        }
        ef.framework.Bootstrap.GetInstance().Service(new GuidService(), "IGuidService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var service;
    (function (service) {
        class HttpService {
            Get(url) {
                return new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                resolve(xhr.responseText);
                            }
                            else {
                                reject();
                            }
                        }
                    };
                    xhr.open("Get", url, true);
                    xhr.send(null);
                });
            }
        }
        ef.framework.Bootstrap.GetInstance().Service(new HttpService(), "IHttpService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
var ef;
(function (ef) {
    var service;
    (function (service) {
        class LogService {
            Error(log) {
                let date = new Date().toLocaleTimeString();
                console.error(`Error ${date} ${log}`);
            }
            Warn(log) {
                let date = new Date().toLocaleTimeString();
                console.warn(`Warn ${date} ${log}`);
            }
            Info(log) {
                let date = new Date().toLocaleTimeString();
                console.info(`Info ${date} ${log}`);
            }
            Debug(log) {
                let date = new Date().toLocaleTimeString();
                console.debug(`Debug ${date} ${log}`);
            }
        }
        ef.framework.Bootstrap.GetInstance().Service(new LogService(), "ILogService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var service;
    (function (service) {
        class Responsibility {
            constructor(name, nodeName, handle) {
                this.mName = name;
                this.mNodeName = nodeName;
                this.mHandle = handle;
            }
            get Name() {
                return this.mName;
            }
            get NodeName() {
                return this.mNodeName;
            }
            get Handle() {
                return this.mHandle;
            }
            get Next() {
                return this.mNext;
            }
            set Next(value) {
                this.mNext = value;
            }
            get Previous() {
                return this.mPrevious;
            }
            set Previous(value) {
                this.mPrevious = value;
            }
        }
        service.Responsibility = Responsibility;
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var service;
    (function (service) {
        class ResponsibilityChanService {
            constructor() {
                this.mRootResponsibilityPool = new Array();
            }
            static GetInstance() {
                if (ResponsibilityChanService.mResponsibilityChanService == null) {
                    ResponsibilityChanService.mResponsibilityChanService = new ResponsibilityChanService();
                }
                return ResponsibilityChanService.mResponsibilityChanService;
            }
            Start(name, scope) {
                let rootResponsibility = this.mRootResponsibilityPool.find(d => d.Name == name);
                let currentResponsibility = rootResponsibility;
                while (currentResponsibility) {
                    if (currentResponsibility.Handle(scope)) {
                        break;
                    }
                    currentResponsibility = currentResponsibility.Next;
                }
            }
            Register(name, nodeName, func) {
                let responsibility = new service.Responsibility(name, nodeName, func);
                let rootResponsibility = this.mRootResponsibilityPool.find(d => d.Name == responsibility.Name);
                if (!rootResponsibility) {
                    this.mRootResponsibilityPool.push(responsibility);
                }
                else {
                    let leafResponsibility = this.GetLeafResponsibility(rootResponsibility);
                    leafResponsibility.Next = responsibility;
                    responsibility.Previous = leafResponsibility;
                }
            }
            UnRegister(name, nodeName) {
                let rootResponsibility = this.mRootResponsibilityPool.find(d => d.Name == name);
                let currentResponsibility = rootResponsibility;
                if (!currentResponsibility) {
                    return;
                }
                while (currentResponsibility != null) {
                    if (currentResponsibility.NodeName == nodeName) {
                        break;
                    }
                    currentResponsibility = currentResponsibility.Next;
                }
                if (currentResponsibility.NodeName == nodeName) {
                    currentResponsibility.Previous.Next = currentResponsibility.Next;
                    currentResponsibility.Next = null;
                    currentResponsibility.Previous = null;
                }
            }
            GetLeafResponsibility(root) {
                let currentResponsibility = root;
                while (currentResponsibility.Next != null) {
                    currentResponsibility = currentResponsibility.Next;
                }
                return currentResponsibility;
            }
        }
        ef.framework.Bootstrap.GetInstance().Service(ResponsibilityChanService.GetInstance(), "IResponsibilityChanService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
var ef;
(function (ef) {
    var service;
    (function (service) {
        class TemplateService {
            Compile(template, data) {
                let functionBody = template.replace(/\r/g, (match, replace) => "")
                    .replace(/\n/g, (match, replace) => "")
                    .replace(/"/g, (match, replace) => "\"")
                    .replace(/{{(.+?)}}/g, (match, replace) => `'+data.${replace}+'`)
                    .replace(/@{(.+?)}/g, (match, replace) => `';${replace} tpl += '`);
                functionBody = `var tpl = '${functionBody}';return tpl;`;
                return new Function("data", functionBody)(data);
            }
        }
        ef.framework.Bootstrap.GetInstance().Service(new TemplateService(), "ITemplateService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
var ef;
(function (ef) {
    var service;
    (function (service) {
        class WebSQLService {
            ExecCommand() {
                return null;
            }
        }
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
/// <reference path="../../framework/Widget.ts" />
/// <reference path="../../framework/Scope.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
var ef;
(function (ef) {
    var widget;
    (function (widget) {
        //@framework.EFWidget()
        class EFButton extends ef.framework.Widget {
            constructor() {
                super(...arguments);
                this.Name = "ef-button";
                this.Template = `<button class="ef-button">{{Text}}</button>`;
            }
            View() {
                return new EFButtonScope();
            }
            Link(scope, element) {
            }
        }
        class EFButtonScope extends ef.framework.Scope {
            constructor() {
                super(...arguments);
                this.Text = "GFLi";
            }
        }
        ef.framework.Bootstrap.GetInstance().Widget(new EFButton());
    })(widget = ef.widget || (ef.widget = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var test;
    (function (test) {
        class Button extends ef.framework.Widget {
            constructor() {
                super(...arguments);
                this.Name = "t-button";
                this.Template = "<button>{{Context}}</button>";
            }
            View() {
                let scope = new ButtonScope();
                scope.Context = "Guifa Lee";
                return scope;
            }
            Link(scope, elemnt) {
            }
        }
        class ButtonScope extends ef.framework.Scope {
        }
        ef.framework.Bootstrap.GetInstance().Widget(new Button());
    })(test = ef.test || (ef.test = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var test;
    (function (test) {
        class HomeController extends ef.framework.Controller {
            constructor() {
                super(...arguments);
                this.Name = "home-controller";
            }
            View() {
                let scope = new HomeScope();
                scope.Name = "李贵发";
                scope.Test = function () {
                    alert("我是test方式");
                };
                let i = 0;
                scope.Age = "";
                scope.Value = "MYYYY";
                scope.IsPhone = true;
                setInterval(function () {
                    i++;
                    //ef.framework.ServcieFactory.GetService<ITestService>().Test();
                    let id = ef.framework.ServiceFactory.GetService("IGuidService").NewGuid();
                    // ef.framework.ServiceFactory.GetService<ef.service.ILogService>("ILogService").Error("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
                    // ef.framework.ServiceFactory.GetService<ef.service.ILogService>("ILogService").Warn("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
                    // ef.framework.ServiceFactory.GetService<ef.service.ILogService>("ILogService").Info("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
                    // ef.framework.ServiceFactory.GetService<ef.service.ILogService>("ILogService").Debug("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
                    scope.Age = id.ToString();
                    scope.IsPhone = !scope.IsPhone;
                }, 2000);
                ef.framework.ServiceFactory.GetService("IResponsibilityChanService").Register("sla.get.online.commit", "doc", function (scope) {
                    let filename = scope["file"];
                    if (/\.doc/.test(filename)) {
                        alert("doc");
                        return true;
                    }
                    return false;
                });
                ef.framework.ServiceFactory.GetService("IResponsibilityChanService").Register("sla.get.online.commit", "ppt", function (scope) {
                    let filename = scope["file"];
                    if (/\.ppt/.test(filename)) {
                        alert("ppt");
                        return true;
                    }
                    return false;
                });
                let rScope = new HomeScope();
                rScope["file"] = "xxxx.ppt";
                ef.framework.ServiceFactory.GetService("IResponsibilityChanService").Start("sla.get.online.commit", rScope);
                ef.framework.ServiceFactory.GetService("IHttpService").Get("http://10.2.165.80:8090/test/test.html").then(function (data) {
                    alert(data);
                });
                return scope;
            }
        }
        class HomeScope extends ef.framework.Scope {
        }
        ef.framework.Bootstrap.GetInstance().Controller(new HomeController());
    })(test = ef.test || (ef.test = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var test;
    (function (test) {
        class TestService {
            Test() {
                console.log(`Hello`);
            }
        }
    })(test = ef.test || (ef.test = {}));
})(ef || (ef = {}));
//# sourceMappingURL=ef.js.map