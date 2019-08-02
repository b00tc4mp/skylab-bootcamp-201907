let num1, num2;
num1=prompt("Enter the number 1: ");
num2=prompt("Enter the number 2: ");
calculator(num1, num2)
function calculator(a,b){
    let result=[];
    let control;
    let operation={
        add:function(){
            return parseFloat(a)+parseFloat(b);
        },
        subs:function(){
            return parseFloat(a-b);
        },
        div:function(){
            return parseFloat(a/b);
        },
        mult:function(){
            return parseFloat(a*b);
        }
    }
    do{
        control=false;
        if((!isNaN(a)&&!isNaN(b))&&(a!=""&&b!="")){
            result[0]=a+"+"+b+"="+(operation.add().toFixed(3));
            result[1]=a+"-"+b+"="+(operation.subs().toFixed(3));
            result[2]=a+"/"+b+"="+(operation.div().toFixed(3));
            result[3]=a+"*"+b+"="+(operation.mult().toFixed(3));
            console.log("Hasta")
            return result;
        }else if((!isNaN(a))&&b==""&&a!=""){
            return result[0]=Math.sqrt(a).toFixed(3);
        }else if((!isNaN(b))&&a==""&&b!=""){
            return result[0]=Math.sqrt(b).toFixed(3);
        }else{
            console.log("ERROR");
            a=prompt("Enter the number 1: ");
            b=prompt("Enter the number 2: ");
            control=true;
        }
    }while(control);    
}