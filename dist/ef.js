var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        var Directive = /** @class */ (function () {
            function Directive() {
            }
            Directive.prototype.Start = function () {
            };
            return Directive;
        }());
        framework.Directive = Directive;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        var Scope = /** @class */ (function () {
            function Scope() {
            }
            return Scope;
        }());
        framework.Scope = Scope;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
/// <reference path="../framework/Directive.ts" />
/// <reference path="../framework/Scope.ts" />
var ef;
(function (ef) {
    var directive;
    (function (directive) {
        var ClickDirective = /** @class */ (function (_super) {
            __extends(ClickDirective, _super);
            function ClickDirective() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Name = "ef-click";
                return _this;
            }
            ClickDirective.prototype.View = function () {
                return new ClickScope();
            };
            ClickDirective.prototype.Link = function (scope, element) {
            };
            return ClickDirective;
        }(ef.framework.Directive));
        var ClickScope = /** @class */ (function (_super) {
            __extends(ClickScope, _super);
            function ClickScope() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ClickScope;
        }(ef.framework.Scope));
    })(directive = ef.directive || (ef.directive = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        var Bootstrap = /** @class */ (function () {
            function Bootstrap() {
                this.Widgets = new Array();
                this.Controllers = new Array();
                var self = this;
                window.addEventListener("load", function () { return self.Start(self); });
            }
            Bootstrap.GetInstance = function () {
                if (Bootstrap.mBootstrap == null) {
                    Bootstrap.mBootstrap = new Bootstrap();
                }
                return Bootstrap.mBootstrap;
            };
            Bootstrap.prototype.Widget = function (widget) {
                this.Widgets.push(widget);
            };
            Bootstrap.prototype.Controller = function (controller) {
                this.Controllers.push(controller);
            };
            Bootstrap.prototype.Service = function (service, name) {
                framework.ServiceFactory.Register(new framework.ServiceInJect(service, name));
            };
            Bootstrap.prototype.Start = function (self) {
                self.Widgets.forEach(function (widget) { return widget.Start(); });
                self.Controllers.forEach(function (cntroller) { return cntroller.Start(); });
            };
            return Bootstrap;
        }());
        framework.Bootstrap = Bootstrap;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        var Controller = /** @class */ (function () {
            function Controller() {
            }
            Object.defineProperty(Controller.prototype, "Monitor", {
                get: function () {
                    if (this.mMonitor == null) {
                        this.mMonitor = new framework.Monitor();
                    }
                    return this.mMonitor;
                },
                enumerable: true,
                configurable: true
            });
            Controller.prototype.RecordTemplate = function () {
                var controllerElement = document.getElementsByTagName(this.Name)[0];
                this.mTemplate = controllerElement.innerHTML;
            };
            Controller.prototype.Start = function () {
                try {
                    var self_1 = this;
                    this.RecordTemplate();
                    var scope_1 = this.View();
                    this.Monitor.Watch(scope_1, function () {
                        var controllerElement = document.getElementsByTagName(self_1.Name)[0];
                        //let newControllerHTML = ServiceFactory.GetService<ef.service.ITemplateService>("ITemplateService").Compile(self.mTemplate,scope);
                        framework.ServiceFactory.GetService("IDomService").Refresh(controllerElement, self_1.mTemplate, scope_1);
                        //controllerElement.innerHTML = newControllerHTML;
                    });
                    var controllerElement = document.getElementsByTagName(this.Name)[0];
                    var newControllerHTML = framework.ServiceFactory.GetService("ITemplateService").Compile(self_1.mTemplate, scope_1);
                    controllerElement.innerHTML = newControllerHTML;
                }
                catch (e) {
                    throw e;
                }
            };
            return Controller;
        }());
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
        var Ioc = /** @class */ (function () {
            function Ioc() {
            }
            return Ioc;
        }());
        framework.Ioc = Ioc;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        var Monitor = /** @class */ (function () {
            function Monitor() {
                this.Masters = new Array();
            }
            Monitor.prototype.Watch = function (watcher, func) {
                var _this = this;
                this.Record(watcher);
                setInterval(function (d) {
                    if (_this.Diff(watcher)) {
                        func();
                    }
                }, 100);
            };
            Monitor.prototype.Diff = function (watcher) {
                for (var i in this.Masters) {
                    var master = this.Masters[i];
                    var newValue = watcher[master.Name];
                    if (newValue != master.Value) {
                        this.Record(watcher);
                        return true;
                    }
                }
                return false;
            };
            Monitor.prototype.Record = function (watcher) {
                this.Masters = new Array();
                for (var i in watcher) {
                    this.Masters.push(new Master(i, watcher[i]));
                }
            };
            return Monitor;
        }());
        framework.Monitor = Monitor;
        var Master = /** @class */ (function () {
            function Master(name, value) {
                this.Name = name;
                this.Value = value;
            }
            return Master;
        }());
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        var _classPool = new Array();
        function Service() {
            var dependencies = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                dependencies[_i] = arguments[_i];
            }
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
        var ServiceFactory = /** @class */ (function () {
            function ServiceFactory() {
            }
            ServiceFactory.Register = function (service) {
                this.mServices.push(service);
            };
            ServiceFactory.GetService = function (name) {
                var services = this.mServices.filter(function (service) {
                    return service.Name == name;
                });
                if (services && services.length > 0) {
                    return services[0].Service;
                }
                return null;
            };
            ServiceFactory.mServices = new Array();
            return ServiceFactory;
        }());
        framework.ServiceFactory = ServiceFactory;
        var ServiceInJect = /** @class */ (function () {
            function ServiceInJect(service, name) {
                this.Name = name;
                this.Service = service;
            }
            return ServiceInJect;
        }());
        framework.ServiceInJect = ServiceInJect;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        var Widget = /** @class */ (function () {
            function Widget() {
            }
            Object.defineProperty(Widget.prototype, "Monitor", {
                get: function () {
                    if (this.mMonitor == null) {
                        this.mMonitor = new framework.Monitor();
                    }
                    return this.mMonitor;
                },
                enumerable: true,
                configurable: true
            });
            Widget.prototype.Start = function () {
                var self = this;
                var elements = document.getElementsByTagName(this.Name);
                var scope = this.View();
                this.Monitor.Watch(scope, function () {
                    for (var key in elements) {
                        if (elements.hasOwnProperty(key)) {
                            var element = elements[key];
                            var newHtml = self.Template.replace(/{{(.+?)}}/g, function (match, replaceStr) {
                                return scope[replaceStr];
                            });
                            element.innerHTML = newHtml;
                        }
                    }
                });
                for (var key in elements) {
                    if (elements.hasOwnProperty(key)) {
                        var element = elements[key];
                        var newHtml = self.Template.replace(/{{(.+?)}}/g, function (match, replaceStr) {
                            return scope[replaceStr];
                        });
                        element.innerHTML = newHtml;
                    }
                }
            };
            return Widget;
        }());
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
        var DomService = /** @class */ (function () {
            function DomService() {
            }
            DomService.prototype.Refresh = function (element, template, scope) {
                var innerHTML = ef.framework.ServiceFactory.GetService("ITemplateService").Compile(template, scope);
                var velement = this.GenerateVirtualDOM(innerHTML);
                this.PatchCommit(element, velement);
            };
            DomService.prototype.GenerateVirtualDOM = function (innerHTML) {
                var virtualRoot = document.createElement("div");
                virtualRoot.innerHTML = innerHTML;
                return virtualRoot;
            };
            DomService.prototype.PatchCommit = function (element, velement) {
                if (!/controller/g.test(element.tagName)) {
                    if (element.nodeValue != velement.nodeValue) {
                        element = velement;
                        return;
                    }
                }
                for (var i in element.childNodes) {
                    this.PatchCommit(element.childNodes[i], velement.childNodes[i]);
                }
            };
            return DomService;
        }());
        ef.framework.Bootstrap.GetInstance().Service(new DomService(), "IDomService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var service;
    (function (service) {
        var Guid = /** @class */ (function () {
            function Guid(id) {
                this.Id = id;
            }
            Guid.prototype.ToString = function () {
                if (this.Id) {
                    return this.Id;
                }
                return null;
            };
            return Guid;
        }());
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
        var GuidService = /** @class */ (function () {
            function GuidService() {
            }
            GuidService.prototype.NewGuid = function () {
                var id = "";
                var replaceIndxs = [8, 13, 18, 23];
                var replaceIndex = 0;
                for (var i = 0; i < 36; i++) {
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
            };
            GuidService.prototype.NewId = function () {
                var max = 15;
                var min = 0;
                var guidStrs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F"];
                var index = parseInt((Math.random() * (max - min + 1) + min).toString(), 10);
                return guidStrs[index];
            };
            return GuidService;
        }());
        ef.framework.Bootstrap.GetInstance().Service(new GuidService(), "IGuidService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
var ef;
(function (ef) {
    var service;
    (function (service) {
        var LogService = /** @class */ (function () {
            function LogService() {
            }
            LogService.prototype.Error = function (log) {
                var date = new Date().toLocaleTimeString();
                console.error("Error " + date + " " + log);
            };
            LogService.prototype.Warn = function (log) {
                var date = new Date().toLocaleTimeString();
                console.warn("Warn " + date + " " + log);
            };
            LogService.prototype.Info = function (log) {
                var date = new Date().toLocaleTimeString();
                console.info("Info " + date + " " + log);
            };
            LogService.prototype.Debug = function (log) {
                var date = new Date().toLocaleTimeString();
                console.debug("Debug " + date + " " + log);
            };
            return LogService;
        }());
        ef.framework.Bootstrap.GetInstance().Service(new LogService(), "ILogService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
var ef;
(function (ef) {
    var service;
    (function (service) {
        var TemplateService = /** @class */ (function () {
            function TemplateService() {
            }
            TemplateService.prototype.Compile = function (template, data) {
                var functionBody = template.replace(/\r/g, function (match, replace) { return ""; })
                    .replace(/\n/g, function (match, replace) { return ""; })
                    .replace(/"/g, function (match, replace) { return "\""; })
                    .replace(/{{(.+?)}}/g, function (match, replace) { return "'+data." + replace + "+'"; })
                    .replace(/@{(.+?)}/g, function (match, replace) { return "';" + replace + " tpl += '"; });
                functionBody = "var tpl = '" + functionBody + "';return tpl;";
                return new Function("data", functionBody)(data);
            };
            return TemplateService;
        }());
        ef.framework.Bootstrap.GetInstance().Service(new TemplateService(), "ITemplateService");
    })(service = ef.service || (ef.service = {}));
})(ef || (ef = {}));
/// <reference path="../../framework/Service.ts" />
/// <reference path="../../framework/Bootstrap.ts" />
var ef;
(function (ef) {
    var service;
    (function (service) {
        var WebSQLService = /** @class */ (function () {
            function WebSQLService() {
            }
            WebSQLService.prototype.ExecCommand = function () {
                return null;
            };
            return WebSQLService;
        }());
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
        var EFButton = /** @class */ (function (_super) {
            __extends(EFButton, _super);
            function EFButton() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Name = "ef-button";
                _this.Template = "<button class=\"ef-button\">{{Text}}</button>";
                return _this;
            }
            EFButton.prototype.View = function () {
                return new EFButtonScope();
            };
            EFButton.prototype.Link = function (scope, element) {
            };
            return EFButton;
        }(ef.framework.Widget));
        var EFButtonScope = /** @class */ (function (_super) {
            __extends(EFButtonScope, _super);
            function EFButtonScope() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Text = "GFLi";
                return _this;
            }
            return EFButtonScope;
        }(ef.framework.Scope));
        ef.framework.Bootstrap.GetInstance().Widget(new EFButton());
    })(widget = ef.widget || (ef.widget = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var test;
    (function (test) {
        var Button = /** @class */ (function (_super) {
            __extends(Button, _super);
            function Button() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Name = "t-button";
                _this.Template = "<button>{{Context}}</button>";
                return _this;
            }
            Button.prototype.View = function () {
                var scope = new ButtonScope();
                scope.Context = "Guifa Lee";
                return scope;
            };
            Button.prototype.Link = function (scope, elemnt) {
            };
            return Button;
        }(ef.framework.Widget));
        var ButtonScope = /** @class */ (function (_super) {
            __extends(ButtonScope, _super);
            function ButtonScope() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ButtonScope;
        }(ef.framework.Scope));
        ef.framework.Bootstrap.GetInstance().Widget(new Button());
    })(test = ef.test || (ef.test = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var test;
    (function (test) {
        var HomeController = /** @class */ (function (_super) {
            __extends(HomeController, _super);
            function HomeController() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.Name = "home-controller";
                return _this;
            }
            HomeController.prototype.View = function () {
                var scope = new HomeScope();
                scope.Name = "李贵发";
                scope.Test = function () {
                    alert("test");
                };
                var i = 0;
                scope.Age = "";
                setInterval(function () {
                    i++;
                    //ef.framework.ServcieFactory.GetService<ITestService>().Test();
                    var id = ef.framework.ServiceFactory.GetService("IGuidService").NewGuid();
                    ef.framework.ServiceFactory.GetService("ILogService").Error("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
                    ef.framework.ServiceFactory.GetService("ILogService").Warn("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
                    ef.framework.ServiceFactory.GetService("ILogService").Info("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
                    ef.framework.ServiceFactory.GetService("ILogService").Debug("Failed to load resource: net::ERR_BLOCKED_BY_CLIENT");
                    scope.Age = id.ToString();
                }, 2000);
                return scope;
            };
            return HomeController;
        }(ef.framework.Controller));
        var HomeScope = /** @class */ (function (_super) {
            __extends(HomeScope, _super);
            function HomeScope() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return HomeScope;
        }(ef.framework.Scope));
        ef.framework.Bootstrap.GetInstance().Controller(new HomeController());
    })(test = ef.test || (ef.test = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var test;
    (function (test) {
        var TestService = /** @class */ (function () {
            function TestService() {
            }
            TestService.prototype.Test = function () {
                console.log("Hello");
            };
            return TestService;
        }());
    })(test = ef.test || (ef.test = {}));
})(ef || (ef = {}));
//# sourceMappingURL=ef.js.map