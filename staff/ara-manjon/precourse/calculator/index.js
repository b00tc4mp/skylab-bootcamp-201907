function calculator(n1,n2){
    if(typeof n1 === 'number' && typeof n2 === 'number'){
        var sum = Math.round((n1+n2)*100)/100;


        var rest = Math.round((n1-n2)*100)/100;


        var mult =Math.round((n1*n2)*100)/100;


        var div =Math.round((n1/n2)*100)/100;
        var result=[n1+'+'+n2+'= '+ sum, n1+'-'+n2+'= '+ rest, n1+'*'+n2+'= '+ mult,n1+'/'+n2+'= '+ div];
console.log(result)
    }
    else if(typeof n1 ==='number'&& n2 === undefined){
        console.log('La raiz cuadrada de '+n1+' es: '+Math.round((Math.sqrt(n1)*100)/100));
    }    
    else if(typeof n2 ==='number'&& n1 === undefined){
        console.log('La raiz cuadrada de '+n2+' es: '+Math.round((Math.sqrt(n2)*100)/100));
    }
    else{
        console.log('Debes introducir un número para que funcione!');
    }
}
calculator(4,4.6);