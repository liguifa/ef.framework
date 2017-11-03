namespace ef.framework {
    export class Monitor{
        private Masters:Array<Master> = new Array<Master>();

        public Watch(watcher:object,func:Function):void{
            this.Record(watcher);
            setInterval(d=>{
                if(this.Diff(watcher))
                {
                    func();
                }
            },100);
        }

        private Diff(watcher:object):boolean{
            for(let i in this.Masters)
            {
                let master = this.Masters[i];
                let newValue = watcher[master.Name];
                if(newValue != master.Value)
                {
                    this.Record(watcher);
                    return true;
                }
            }
            return false;
        }

        private Record(watcher:object){
            this.Masters = new Array<Master>();
            for(let i in watcher)
            {
                this.Masters.push(new Master(i,watcher[i]));
            }
        }
    }

    class Master{
        public Name:string;
        public Value:object;

        constructor(name,value)
        {
            this.Name = name;
            this.Value = value;
        }
    }
}