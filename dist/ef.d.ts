declare namespace ef.framework {
    abstract class Directive {
        abstract Name: string;
        abstract View(): Scope;
        abstract Link(dScope: Scope, element: Element, attribute: Attr, scope: framework.Scope): void;
        Start(element: Element, attribute: Attr, scope: framework.Scope): void;
    }
}
declare namespace ef.framework {
    abstract class Scope {
    }
}
declare namespace ef.framework {
    class DirectiveFactory {
        private static mDirectives;
        static Exists(name: string): boolean;
        static Register(directive: Directive): void;
        static GetDirective(name: string): Directive;
    }
}
declare namespace ef.framework {
    class Bootstrap {
        private static mBootstrap;
        private Widgets;
        private Controllers;
        private constructor();
        static GetInstance(): Bootstrap;
        Widget(widget: Widget): void;
        Controller(controller: Controller): void;
        Service(service: any, name: string): void;
        Directive(directive: Directive): void;
        private Start(self);
    }
}
declare namespace ef.directive {
}
declare namespace ef.directive {
    class ValueDirective extends framework.Directive {
        Name: string;
        View(): framework.Scope;
        Link(dScope: framework.Scope, element: Element, attribute: Attr, scope: framework.Scope): void;
    }
}
declare namespace ef.framework {
    abstract class Controller {
        private mMonitor;
        abstract Name: string;
        private mTemplate;
        private readonly Monitor;
        private RecordTemplate();
        Start(): void;
        abstract View(): Scope;
    }
}
declare namespace ef.framework {
    class Ioc {
        constructor();
    }
}
declare namespace ef.framework {
    class Monitor {
        private Masters;
        Watch(watcher: object, func: Function): void;
        private Diff(watcher);
        private Record(watcher);
    }
}
declare namespace ef.framework {
    function Service(...dependencies: any[]): Function;
}
declare namespace ef.framework {
    class ServiceFactory {
        private static mServices;
        static Register(service: ServiceInJect): void;
        static GetService<T>(name: string): T;
    }
    class ServiceInJect {
        Name: string;
        Service: any;
        constructor(service: any, name: string);
    }
}
declare namespace ef.framework {
    abstract class Widget {
        abstract Name: string;
        abstract Template: string;
        abstract View(): Scope;
        abstract Link(scope: Scope, element: Element): void;
        private mMonitor;
        private readonly Monitor;
        Start(): void;
    }
    function EFWidget(): Function;
}
declare namespace ef.service {
    interface ITemplateService {
        Compile(template: string, data: object): string;
    }
}
declare namespace ef.service {
}
declare namespace ef.service {
    interface IDomService {
        Refresh(element: Element, template: string, scope: framework.Scope): void;
        Render(element: Element, template: string, scope: framework.Scope): void;
    }
}
declare namespace ef.test {
    interface ITestService {
        Test(): void;
    }
}
declare namespace ef.service {
    class Guid {
        private Id;
        constructor(id: string);
        ToString(): string;
    }
}
declare namespace ef.service {
}
declare namespace ef.service {
    interface IGuidService {
        NewGuid(): Guid;
    }
}
declare namespace ef.service {
}
declare namespace ef.service {
    interface IHttpService {
        Get(url: string): Promise<any>;
    }
}
declare namespace ef.service {
}
declare namespace ef.service {
    interface ILogService {
        Error(log: string): void;
        Warn(log: string): void;
        Info(log: string): void;
        Debug(log: string): void;
    }
}
declare namespace ef.service {
}
declare namespace ef.service {
    interface IWebSQLService {
        ExecCommand<T>(): T;
    }
}
declare namespace ef.service {
}
declare namespace ef.widget {
}
declare namespace ef.test {
}
declare namespace ef.test {
}
