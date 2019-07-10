//Ejemplos Tema 1 Functions
function square(number){
    return number*number;
}
console.log(square(2));
//----
function myFunc(tObject){
    tObject.make="Toyota";
}
var myCar={make:"Honda", model:"Accord"};
console.log(myCar.make);
myFunc(myCar);
console.log(myCar.make);
//----
var uni=function(nombre) {return nombre+" Rodriguez"};
var completo=uni(prompt("Introduce nombre"));
console.log(completo)
//----
var uni=function asignation(name){return name+" Rodriguez"};
print(uni("Jorge"));
//---
var multi=function(x){return x*x*x;}
mapeo(multi, [0,1,2,3,4,5]);
function mapeo(f, a){
    let result=[];
    for (let i=0; i<a.length; i++){
        result[i]=multi(a[i]);
    }
    return result;
}
//Uso de arguments
sumAll(2,4,5,6);
function sumAll(){
    let sum=0;
    for(let i=0; i<arguments.length;i++){
        sum+=arguments[i];
    }
    return sum;
}
//Ambito de las funciones y variables
let x=2, y=5;
function square(number){
    return number*number;
}
function suma(a){
    let h=1;
    function otra(){
        return x+y+h+a//son conocidas ya que otra es hija de suma y suma es una funcion globar
    }
    return otra()+square(1);
}

let creacion=function(name, sex){
    return{
        getName:function(){
            return name;
        },
        getSex:function(){
            return sex;
        },
        setName:function(newName){
            name=newName;
        },
        setSex:function(newSex){
            sex=newSex;
        }
    }
}
person=creacion("Jorge", "Male");
person.getName;
person.getSex
person.setName("Mariel");
person.setSex("Female");
person.getName;
person.getSex

let adrees=function(){
    let direction=arguments[0];
    let number=arguments[1];
    let floor=arguments[2];
    return{
        getDirection:function(){
            return direction;
        },
        getNumber:function(){
            return number;
        },
        getFloor:function(){
            return floor;
        }
    }    
}
calle=adrees("Pizarro", "25", "3");

function mult(a=1,b=1){
    let result=a*b;
    return result;
}
mult(2);

var a=function(){
    par=[0,2,4,6];
    par=>par.length;
}
