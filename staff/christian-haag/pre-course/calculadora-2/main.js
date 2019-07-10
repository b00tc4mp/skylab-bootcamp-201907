//Calculadora-2
//Funcionalidad:
//Entrada de valores tanto por onClick como por Keypress.
//Extra: panel informativo que se activa introduciendo 8-7-2019 y Enter. Para que todo vuelva a su sitio, AC o tecla Supr. 
//------!important---------Para que showInfo() y hideInfo() se activen, el resultanto siempre tiene que ser -2020.


function numOp(val) {
	let doc = document.getElementById('screen').value;
	 if(doc === '0'){
		 document.getElementById('screen').value = '';
		 document.getElementById('screen').value += val;	
	 }else{
		 document.getElementById('screen').value += val;
	 }
} 

function sqrRoot(){
	let rootOf = document.getElementById('screen').value;
	let calcSqrt = Math.sqrt(rootOf).toFixed(2);
	let replaceFlpoint = calcSqrt.replace('.',',');
	document.getElementById('screen').value = replaceFlpoint;
}

function result() { 
	let val = document.getElementById('screen').value;
	let toEval = eval(val); 
	document.getElementById('screen').value = toEval;
	if(val === '-2018'){
		showInfo();
	}  
}
 
function clr() { 
	let val = document.getElementById('screen').value;
	if(val === '-2018'){
		hideInfo();
	}
	document.getElementById('screen').value = '0'; 
}

function bckSpace() {
	let val = document.getElementById('screen').value;
	let split = val.split('');
	let remove = split.pop();
	let joinVal = split.join('');
	document.getElementById('screen').value = joinVal; 
}

document.addEventListener('keypress', (val) => {
	let doc = document.getElementById('screen').value;
	
	if(event.keyCode !== 13){
		if(doc === '0'){
		document.getElementById('screen').value = '';
		}
		document.getElementById('screen').value += val.key;
		
	
	}else{
		let inputVal= document.getElementById('screen').value;
		let toEval = eval(inputVal);
		document.getElementById('screen').value = toEval;
		if(document.getElementById('screen').value=== '-2018'){
			showInfo();
		}
	}	
});

document.addEventListener('keydown', () => {
	if(event.keyCode == 8){
		bckSpace();
	}
})
	
document.addEventListener('keydown', () => {
	if(event.keyCode == 46){
		clr();
	}
})

function showInfo(){
	document.getElementById("info").style.transform = "translateX(350px)";
	moveCalculator();	
}
function hideInfo(){
	document.getElementById('screen').value = '0';
	document.getElementById('calculator').style.transform = "translateX(0)";
	document.getElementById('info').style.transform = "translateX(0)";
}

function moveCalculator(){
	document.getElementById('calculator').style.transform = "translateX(-100px)";
}