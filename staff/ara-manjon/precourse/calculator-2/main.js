
//------style nums display------
var activate;
var activateNegToPos;
var activateComa;
var x='-';
var lengthVal=0;
var n1=0;
var n2=0;
var elementCal;
var activateOperation;
var secondNum;
var keepNums;
var operator=0;

function op(num){
  //si la operación es de un segundo número
  if(secondNum===true){
    document.getElementById("screen").value='0';
    document.getElementById("screen").className='';
    activateNegToPos=null;
    acc=0;
    activateComa=null;
    x='-';
    var coma= document.getElementById("coma").value = ",";
    keepNums=true;
    secondNum=null;
    resetOperation();
  }

    activate=true;
    var a= document.getElementById("screen").value;
    var b=0;
    var c= document.getElementById("screen").value; 
  //si esta activado el cambio de signo
   if(activateNegToPos===true){
    if(activateComa===true){
      lengthValue();
      a=lengthVal;
      x='';
    } 
      if(a==='-0'&&c!='-0,'){
        document.getElementById("screen").value = '';
        b= document.getElementById("screen").value +=num;
        document.getElementById("screen").value = x+b;
      }else if(a.length<12){
        b= document.getElementById("screen").value +=num;
        document.getElementById("screen").value = x+b;    
      }
    introduceMilNeg();
    reduceNumsNeg();
    //si esta desactivado el cambio de signo
    }else if(activateNegToPos != true){
      if(activateComa===true){
        lengthValue();
        a=lengthVal;
      } 
      if(a==='0'&&c!='0,'){
        document.getElementById("screen").value = '';
        document.getElementById("screen").value += num;
      }else if(a.length<11){
        document.getElementById("screen").value += num;
      }
      if(activateComa != true){
      introduceMil(); 
      }reduceNums();  
  } 

  changeAC();
};

//función que introduce coma en miles
function introduceMil(){
  var b = document.getElementById("screen").value.replace(/\./g,'');
  if(!isNaN(b)){   
    b = b.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    b = b.split('').reverse().join('').replace(/^[\.]/,'');
    document.getElementById("screen").value = b;
  }  
};

function introduceMilNeg(){
  var b = document.getElementById("screen").value.replace(/\.|\-/gi,'');
  if(!isNaN(b)){
    b = b.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    b = b.split('').reverse().join('').replace(/^[\.]/,'');
    document.getElementById("screen").value = x+b;
  }  
};
//saber length de value cuando se ha activado coma
function lengthValue(){
  var b = document.getElementById("screen").value.replace(/\,|\./gi,'');
  if(!isNaN(b)){   
    b = b.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    b = b.split('').reverse().join('').replace(/^[\.]/,'');
    lengthVal = b;
  }  
}

//función que cambia fuente cuando los números no caben el display
function reduceNums(){
  if(activateComa===true){
    lengthValue();
    c=lengthVal;
  }
  var c= document.getElementById("screen").value;  
  if(c.length>7){
    document.getElementById("screen").className='small-text';
  }
  if(c.length>9 && c.length<11){
    document.getElementById("screen").className='small-text2';
  }
  if(c.length>=11 &&c.length<13){
    document.getElementById("screen").className='small-text3';
  }
};


function reduceNumsNeg(){
  if(activateComa===true){
    lengthValue();
    c=lengthVal;
  }
  var c= document.getElementById("screen").value;
  if(c.length>7){
    document.getElementById("screen").className='small-text';
  }
  if(c.length>9 && c.length<11){
    document.getElementById("screen").className='small-text2';
  }
  if(c.length>10 && c.length<12){
    document.getElementById("screen").className='small-text3';
  }
  if(c.length>=12&&c.length<14){
    document.getElementById("screen").className='small-text4';
  }
};

//función que cambia botón de AC a C cuando se introducen números
function changeAC(){
  var d= document.getElementById("ac-c");
  if(activate==true){
    document.getElementById("ac-c").innerHTML = 'C';
  }
};
//------------------------------ 
//------delate nums display------

function ac(){
  if(activateOperation===true&&activate!=true){
    elementCal=0;
    resetOperation();
  }else if(activateOperation===true&&activate===true){
    activate=null;
    var e= document.getElementById("ac-c")
    var d= document.getElementById("screen").value;
    if(activate!=true){
      document.getElementById("ac-c").innerHTML = 'AC';
      document.getElementById("screen").value='0';
      document.getElementById("screen").className='';
      activateNegToPos=null;
      acc=0;
      activateComa=null;
      x='-';
      var coma= document.getElementById("coma").value = ",";
    }
  }else{
  activate=null;
  var e= document.getElementById("ac-c")
  var d= document.getElementById("screen").value;
  if(activate!=true){
    document.getElementById("ac-c").innerHTML = 'AC';
    document.getElementById("screen").value='0';
    document.getElementById("screen").className='';
    activateNegToPos=null;
    acc=0;
    activateComa=null;
    x='-';
    var coma= document.getElementById("coma").value = ",";
  }
  }
}

//------------------------------ 
//------pos to neg nums display------

function posToNeg(){
  if(activateNegToPos!=true){
    activateNegToPos=true;
    var f= document.getElementById("screen").value;
    if(f==='0'){
      var nums=parseInt(f);
      document.getElementById("screen").value= '-'+nums;
    }else if(f.length<=12){
      document.getElementById("screen").value= '-'+f;
      reduceNumsNeg();   
    }   
  }else if(activateNegToPos===true){
    activateNegToPos=null;
    var b = document.getElementById("screen").value.replace(/\-/g,'');
    document.getElementById("screen").value= b;
    reduceNums(); 
  }
};
//función añadir coma
function coma(){
  if(activateComa != true){
    activateComa=true;
    var t= document.getElementById("screen").value;
    var split= t.split('');
    split.push(',')
    var joinVal= split.join('')
    document.getElementById("screen").value = joinVal;
  }else if(activateComa===true){
    var coma= document.getElementById("coma").value = '';
  }
}
//función result
function result(){
  var result=0;
  if(keepNums===true){
    n2=document.getElementById("screen").value;
  }else{
    n1=document.getElementById("screen").value;
  }
  var x = n1.replace(/\./g,'');
  x = x.replace(/\,/g,'.');

  var y= n2.replace(/\./g,'');
  y = y.replace(/\,/g,'.');

  if(operator === '/'){
    result= Math.round((parseFloat(x)/parseFloat(y))*1000)/1000;
  }else if(operator==='x'){
    result= Math.round((parseFloat(x)*parseFloat(y))*1000)/1000;
  }else if(operator==='-'){
    result= Math.round((parseFloat(x)-parseFloat(y))*1000)/1000;
  }else if(operator==='+'){
    result= Math.round((parseFloat(x)+parseFloat(y))*1000)/1000;
  }
  result= result.toString();
  result= result.replace(/\./g,',');
  result=document.getElementById("screen").value= result;   
}



//función operaciones

function cal(ele){
  if(activateOperation!=true){
  activateOperation=true;
  if(ele==='/'){
    elementCal= document.getElementById("div").value;
    document.getElementById("div").className='fix';
  }else if(ele==='*'){
    elementCal= document.getElementById("mult").value;
    document.getElementById("mult").className='fix';
  }else if(ele==='-'){
    elementCal= document.getElementById("rest").value;
    document.getElementById("rest").className='fix';
  }else if(ele==='+'){
    elementCal= document.getElementById("sum").value;
    document.getElementById("sum").className='fix';
  }/*else if(ele==='%'){
    elementCal= document.getElementById("perCent").value;
    document.getElementById("perCent").className='fix';
    n1=document.getElementById("screen").value;
    var x = n1.replace(/\./g,'');
    x = x.replace(/\,/g,'.');
    result=Math.round((parseFloat(x)*0.01)*1000)/1000;
    result= result.toString();
    result= result.replace(/\./g,',');
    result=document.getElementById("screen").value= result;
  }*/
}else if(activateOperation===true){
  resetOperation();
  this.cal(ele);
}
keepNum();
}

//function reset operation
function resetOperation(){

    var a= document.getElementById("div").value;
    document.getElementById("div").className='operation';

    var b= document.getElementById("mult").value;
    document.getElementById("mult").className='operation';

    var c= document.getElementById("rest").value;
    document.getElementById("rest").className='operation';

    var d= document.getElementById("sum").value;
    document.getElementById("sum").className='operation';

    var d= document.getElementById("perCent").value;
    document.getElementById("perCent").className='operation';
    activateOperation=null;
}

//function keep first number to operate

function keepNum(){
  secondNum=true;
  n1=document.getElementById("screen").value;
  operator=elementCal;
}
