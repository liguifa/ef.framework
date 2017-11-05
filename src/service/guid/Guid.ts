namespace ef.service{
    export class Guid{
        private Id:string;

        public constructor(id:string){
            this.Id = id;
        }

        public ToString():string{
            if(this.Id){
                return this.Id;
            }
            return null;
        }
    }
}