namespace ef.framework {
    let _classPool:Array<object> = new Array<object>();
    
    export function Service(...dependencies):Function{
        return function(constructor){
    
            console.log(constructor);
        }
    }
}