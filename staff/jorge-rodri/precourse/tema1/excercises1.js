//a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.
function sayHello(name){
    console.log("Hello "+name);
}
//b) Intenta hacer el return los valores en lugar de usar console.log().
function sayHello(name){
    return "Hello "+name;
}
//c) Ahora, añade tu edad y concaténala al return.
function sayHello(name, age){
    return "Hello "+name+" you are "+age+ " old."
}
//d) Iguala tu function() a una variable y ejecútala.
var sayHello=function(name, age){
    return "Hello "+name+" you are "+age+ " old."
}
//e) Ahora declara otra function() que devuelva tu edad y asigna su resultado a otra variable, intenta imprimir sus dos resultados concatenados
var hello=function(name){
    return name;
}
var age=function(age){
    return age
}
hello("Jorge") + age(28);
//g) Intenta englobar todas las funciones en una sola función padre, el return de dicha function() padre deberá ser la llamada a las funciones hijas. 
//(En el ejemplo tenemos la function personData() que engloba la function name y age, cada una es una función hija o anidada dentro de la function personData()).
function personData(myName, myAge){
    var name=function(myName){
        return myName;
    }
    var age=function(myAge){
        return myAge;
    }
    return name(myName)+" "+age(myAge);
}
personData("Jorge", 28);
//h) Haz otra función hija que solo devuelva un número random, ese número random será el argumento que se pasará como parámetro a la 
//function age().
function personData(name){
    var num=function(){
        return (Math.random()*100);
    }
    var usName=function(name){
        return name;
    }
    
    var age=function(years=num()){
        return years;
    }
    return usName(name)+" "+age();
}
personData("Jorge");
//i) Al return de la function name(), concaténale otro mensaje.
function personData(name){
    var num=function(){
        return (Math.random()*100);
    }
    var usName=function(){
        return name;
    }
    var setUsName=function(newName){
        name=newName;
    }
    var age=function(){
        return arguments[0];
    }
    return usName()+" es tu nombre y "+age(num())+" es tu edad.";
}
personData("Jorge");
//k) Modifica la primera función y la función padre para, si el parámetro introducido no es tu nombre, 
//no siga con la segunda llamada
function personData(name){
    var usName;
    if("Jorge"===name){
        usName=function(){
            return name;
        }
    }
    var num=function(){
        return (Math.random()*100);
    }
    var setUsName=function(newName){
        name=newName;
    }
    var age=function(){
        return arguments[0];
    }
    return usName()+" es tu nombre y "+age(num())+" es tu edad.";
}
personData("Jorge");