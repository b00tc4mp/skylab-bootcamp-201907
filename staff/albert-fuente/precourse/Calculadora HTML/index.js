
var decimalBtn=document.getElementById("calc-decimal");
var clearBtn=document.getElementById("calc-clear");
var resetBtn=document.getElementById("calc-reset");
var displayValElement=document.getElementById("calc-display-val");


var displayVal="0";
var pendingVal;
var evalStringArray=[];

var calcNumBtns=document.getElementsByClassName("calc-btn-num");
var calcOperatorBtns=document.getElementsByClassName("calc-btn-operator");

// DETECTING BUTTON CLICKED ************************************************************
var updateDisplayVal=(clickObj)=>{
  var btnText=clickObj.target.innerText;
  if(displayVal==="0" || displayVal==="+" || displayVal==="-" || displayVal==="*" || displayVal==="/"){
    displayVal="";


  }

  displayVal+=btnText;
  displayValElement.innerText=displayVal;

};
//update the screen with the clicked number:
for(var i=0;i<calcNumBtns.length;i++){
  calcNumBtns[i].addEventListener("click", updateDisplayVal);
}
//clear to 0
clearBtn.onclick=()=>{
  displayVal="0";
  pendingVal=undefined;
  evalStringArray=[];
  displayValElement.innerText="0";
}
resetBtn.onclick=()=>{
  displayVal="0";
  pendingVal=undefined;
  evalStringArray=[];
  displayValElement.innerText="0";
}
decimalBtn.onclick=()=>{
  if(!displayVal.includes(",")){
    displayVal+=",";
    displayValElement.innerText=displayVal;
  }
}
let performOperation=(clickObj)=>{
  let operator=clickObj.target.innerText;
  switch (operator) {
    case "+":
      pendingVal=displayVal;
      displayVal="+";
      displayValElement.innerText=displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("+");
      break;
    case "-":
      pendingVal=displayVal;
      displayVal="-";
      displayValElement.innerText=displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("-");
      break;
    case "*":
      pendingVal=displayVal;
      displayVal="*";
      displayValElement.innerText=displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("*");
      break;
    case "/":
      pendingVal=displayVal;
      displayVal="/";
      displayValElement.innerText=displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("/");
      break;
    case "=":
      evalStringArray.push(displayVal);
      var evaluation= eval(evalStringArray.join(" ")); //joins the array[2,+,3];
      displayVal=evaluation+"";
      displayValElement.innerText=displayVal;
      evalStringArray=[];
      break;

    default:
      break;

  }
}
for(var j=0;j<calcOperatorBtns.length;j++){
  calcOperatorBtns[j].addEventListener("click", performOperation);
}


// DETECTING KEYBOARD PRESSED ************************************************************
var updateDisplayWithKeyboard= function(event){
  console.log(event);
  var keyText=event.key;
  if (keyText==1 || keyText==2 || keyText==3 || keyText==4 || keyText==5 || keyText==6 || keyText==7 || keyText==8 || keyText==9 || keyText=="0"){

    if(displayVal==="0" || displayVal==="+" || displayVal==="-" || displayVal==="*" || displayVal==="/"){
      displayVal="";
    }
    displayVal+=keyText;
    displayValElement.innerText=displayVal;
  }else if(keyText== "+"){
    pendingVal=displayVal;
    displayVal="+";
    displayValElement.innerText=displayVal;
    evalStringArray.push(pendingVal);
    evalStringArray.push("+");
  }else if(keyText== "-"){
    pendingVal=displayVal;
    displayVal="-";
    displayValElement.innerText=displayVal;
    evalStringArray.push(pendingVal);
    evalStringArray.push("-")
  }else if(keyText== "*"){
    pendingVal=displayVal;
    displayVal="*";
    displayValElement.innerText=displayVal;
    evalStringArray.push(pendingVal);
    evalStringArray.push("*")
  }else if(keyText== "/"){
    pendingVal=displayVal;
    displayVal="/";
    displayValElement.innerText=displayVal;
    evalStringArray.push(pendingVal);
    evalStringArray.push("/")
  }else if(keyText== "=" || keyText=="Enter"){
    evalStringArray.push(displayVal);
    var evaluation2=eval(evalStringArray.join(""));
    displayVal=evaluation2;
    displayValElement.innerText=displayVal;
    evalStringArray=[];
  }else if(keyText==","){
    if(!displayVal.includes(",")){
      displayVal+=",";
      displayValElement.innerText=displayVal;
    }
  }
}

document.addEventListener("keydown",updateDisplayWithKeyboard);
