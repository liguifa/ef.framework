namespace ef.service {
    export class Responsibility {
        private mName: string;
        private mNodeName: string;
        private mHandle: Function;
        private mNext: Responsibility;
        private mPrevious: Responsibility;

        constructor(name:string,nodeName:string,handle:Function){
            this.mName = name;
            this.mNodeName = nodeName;
            this.mHandle = handle;
        }

        public get Name(): string {
            return this.mName;
        }

        public get NodeName(): string {
            return this.mNodeName;
        }

        public get Handle(): Function {
            return this.mHandle;
        }

        public get Next(): Responsibility {
            return this.mNext;
        }

        public set Next(value: Responsibility) {
            this.mNext = value;
        }

        public get Previous(): Responsibility {
            return this.mPrevious;
        }

        public set Previous(value: Responsibility) {
            this.mPrevious = value;
        }
    }
}