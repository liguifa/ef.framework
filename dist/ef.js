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
            Bootstrap.prototype.Service = function (service) {
                framework.ServcieFactory.Register(service);
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
                        var newControllerHTML = self_1.mTemplate.replace(/{{(.+?)}}/g, function (match, replaceStr) {
                            return scope_1[replaceStr];
                        });
                        controllerElement.innerHTML = newControllerHTML;
                    });
                    var controllerElement = document.getElementsByTagName(this.Name)[0];
                    var newControllerHTML = self_1.mTemplate.replace(/{{(.+?)}}/g, function (match, replaceStr) {
                        return scope_1[replaceStr];
                    });
                    controllerElement.innerHTML = newControllerHTML;
                }
                catch (e) {
                    throw e;
                }
            };
            return Controller;
        }());
        framework.Controller = Controller;
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
        var Service = /** @class */ (function () {
            function Service() {
            }
            return Service;
        }());
        framework.Service = Service;
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var framework;
    (function (framework) {
        var ServcieFactory = /** @class */ (function () {
            function ServcieFactory() {
            }
            ServcieFactory.Register = function (service) {
                this.mServices.push(service);
            };
            ServcieFactory.GetService = function () {
                var services = this.mServices.filter(function (service) {
                    return service != null;
                });
                if (services && services.length > 0) {
                    return services[0];
                }
                return null;
            };
            ServcieFactory.mServices = new Array();
            return ServcieFactory;
        }());
        framework.ServcieFactory = ServcieFactory;
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
    })(framework = ef.framework || (ef.framework = {}));
})(ef || (ef = {}));
var ef;
(function (ef) {
    var widget;
    (function (widget) {
        var EFButton = /** @class */ (function (_super) {
            __extends(EFButton, _super);
            function EFButton() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return EFButton;
        }(ef.
        ));
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
                scope.Age = 24;
                scope.Test = function () {
                    alert("test");
                };
                var i = 0;
                setInterval(function () {
                    scope.Age = +i;
                    i++;
                    ef.framework.ServcieFactory.GetService().Test();
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
        var TestService = /** @class */ (function (_super) {
            __extends(TestService, _super);
            function TestService() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TestService.prototype.Test = function () {
                console.log("Hello");
            };
            return TestService;
        }(ef.framework.Service));
        ef.framework.Bootstrap.GetInstance().Service(new TestService());
    })(test = ef.test || (ef.test = {}));
})(ef || (ef = {}));
//# sourceMappingURL=ef.js.map