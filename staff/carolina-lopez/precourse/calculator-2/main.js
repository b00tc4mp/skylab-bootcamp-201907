
var input = document.getElementById('input-num');

var clear= document.getElementById('clear');
var del= document.getElementById('del');

var visor = '0';
var valorPte;
var calcArr = [];

var calcNumBtn = document.getElementsByClassName('num-button');
var calcOpBtn = document.getElementsByClassName('op-button');

for(var i = 0; i < calcNumBtn.length; i++){
  calcNumBtn[i].addEventListener('click', nuevoVisor);
}
for(var i = 0; i < calcOpBtn.length; i++){
  calcOpBtn[i].addEventListener('click', operaciones);
}

function nuevoVisor(clickObj){
  var btnText = clickObj.target.innerText;

  if(visor === '0'){
    visor = '';   
  }

  visor += btnText;
  input.innerText = visor;
}

function operaciones(clickObj){
  var ops = clickObj.target.innerText;

  switch(ops){
    case '+':
      valorPte = visor;
      visor = '0';
      input.innerText = visor;
      calcArr.push(valorPte);
      calcArr.push('+');
      break;
    
    case '-':
      valorPte = visor;
      visor = '0';
      input.innerText = visor;
      calcArr.push(valorPte);
      calcArr.push('-');
      break;

    case '*':
      valorPte = visor;
      visor = '0';
      input.innerText = visor;
      calcArr.push(valorPte);
      calcArr.push('*');
      break;

    case '/':
      valorPte = visor;
      visor = '0';
      input.innerText = visor;
      calcArr.push(valorPte);
      calcArr.push('/');
      break;

    case '=':
      calcArr.push(visor);
      var evalua = eval(calcArr.join(' '));
      visor =  evalua + '';
      input.innerText = visor;
      calcArr = [];
      break;
    
    default:
      break;
  }
}


clear.onclick = function(){
  visor = '0'; valorPte = undefined;
 calcArr = [];
  input.innerHTML = visor;
} 

del.onclick = function(){
  var lengthDispVal = visor.length;
  visor = visor.slice(0, lengthDispVal - 1);

  if(visor === ''){
    visor = '0';
  }

  input.innerText = visor;
}

decimal.onclick = function(){
  if(!visor.includes('.')){
    visor += '.'
  }
  input.innerHTML = visor;
} 