namespace ef.service {
    class ResponsibilityChanService implements IResponsibilityChanService {
        private static mResponsibilityChanService;
        private mRootResponsibilityPool: Array<Responsibility> = new Array<Responsibility>();

        private constructor() {

        }

        public static GetInstance(): ResponsibilityChanService {
            if (ResponsibilityChanService.mResponsibilityChanService == null) {
                ResponsibilityChanService.mResponsibilityChanService = new ResponsibilityChanService();
            }
            return ResponsibilityChanService.mResponsibilityChanService;
        }

        public Start(name: string, scope: framework.Scope): void {
            let rootResponsibility = this.mRootResponsibilityPool.find(d => d.Name == name);
            let currentResponsibility = rootResponsibility;
            while (currentResponsibility) {
                if (currentResponsibility.Handle(scope)) {
                    break;
                } 
                currentResponsibility = currentResponsibility.Next;
            }
        }

        public Register(name: string, nodeName: string, func: Function): void {
            let responsibility = new Responsibility(name, nodeName, func);
            let rootResponsibility = this.mRootResponsibilityPool.find(d => d.Name == responsibility.Name);
            if (!rootResponsibility) {
                this.mRootResponsibilityPool.push(responsibility);
            } else {
                let leafResponsibility = this.GetLeafResponsibility(rootResponsibility);
                leafResponsibility.Next = responsibility;
                responsibility.Previous = leafResponsibility;
            }
        }

        public UnRegister(name: string, nodeName: string): void {
            let rootResponsibility = this.mRootResponsibilityPool.find(d => d.Name == name);
            let currentResponsibility = rootResponsibility;
            if(!currentResponsibility){
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

        private GetLeafResponsibility(root: Responsibility): Responsibility {
            let currentResponsibility = root;
            while (currentResponsibility.Next != null) {
                currentResponsibility = currentResponsibility.Next;
            }
            return currentResponsibility;
        }
    }

    framework.Bootstrap.GetInstance().Service(ResponsibilityChanService.GetInstance(),"IResponsibilityChanService");
}