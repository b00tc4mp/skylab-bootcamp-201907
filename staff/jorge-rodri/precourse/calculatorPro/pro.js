function calculator(){
    let result=[];
    let chain=arguments;
    let operation={
        add:function(){
            let resAdd=0;
            let aux="";
            for(num in chain){
                resAdd+=chain[num];
                aux+=chain[num]+"+";
            }
            return aux.slice(0,-1)+"="+resAdd.toFixed(3);
        },
        subs:function(){
            let resSub=chain[0];
            let aux=chain[0]+"-";
            for(let i=1;i<chain.length;i++){
                resSub-=chain[i];
                aux+=chain[i]+"-";
            }
            return aux.slice(0,-1)+"="+resSub.toFixed(3);
        },
        div:function(){
            let resDiv=chain[0];
            let aux=chain[0]+"/";
            for(let i=1;i<chain.length;i++){
                resDiv/=chain[i];
                aux+=chain[i]+"/";
            }
            return aux.slice(0,-1)+"="+resDiv.toFixed(3);
        },
        mult:function(){
            let resMult=1;
            let aux="";
            for(num in chain){
                resMult*=chain[num];
                aux+=chain[num]+"*";
            }
            return aux.slice(0,-1)+"="+resMult.toFixed(3);
        }
    }
    if(arguments.length==1){
        console.log(Math.sqrt(arguments[0]).toFixed(3));
    }
    if(arguments.length>1){
        result[0]=operation.add();
        result[1]=operation.subs();
        result[2]=operation.div();
        result[3]=operation.mult();
        console.log(result); 
    }
    let cond=prompt("New numbers?y, n.")
    switch (cond) {
        case "y":
        let a=parseFloat(prompt("Enter number 1: "));
        let b=parseFloat(prompt("Enter number 2: "));
        calculator(a,b);
        break;
        case "n":console.log("Bye.");
        break;
        default:
        break;
    }
}