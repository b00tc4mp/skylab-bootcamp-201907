let a;
let b;
let operacion;
let screen= document.getElementById("screen");
let rest= document.getElementById("rest");
let add= document.getElementById("add");
let sub= document.getElementById("sub");
let mul= document.getElementById("mul");
let div= document.getElementById("div");
let equal= document.getElementById("equal");
let n1= document.getElementById("n1");
let n2= document.getElementById("n2");
let n3= document.getElementById("n3");
let n4= document.getElementById("n4");
let n5= document.getElementById("n5");
let n6= document.getElementById("n6");
let n7= document.getElementById("n7");
let n8= document.getElementById("n8");
let n9= document.getElementById("n9");

function boton(){

	n1.onclick= function(e){
		screen.textContent = screen.textContent + "1";
	}
	n2.onclick= function(e){
		screen.textContent = screen.textContent + "2";
	}
	n3.onclick= function(e){
		screen.textContent = screen.textContent + "3";
	}
	n4.onclick= function(e){
		screen.textContent = screen.textContent + "4";
	}
	n5.onclick= function(e){
		screen.textContent = screen.textContent + "5";
	}
	n6.onclick= function(e){
		screen.textContent = screen.textContent + "6";
	}
	n7.onclick= function(e){
		screen.textContent = screen.textContent + "7";
	}
	n8.onclick= function(e){
		screen.textContent = screen.textContent + "8";
	}
	n9.onclick= function(e){
		screen.textContent = screen.textContent + "9";
	}
	n0.onclick= function(e){
		screen.textContent = screen.textContent + "0";
	}

	rest.onclick= function(e){
		reset();
	}
	add.onclick= function(e){
		a = screen.textContent;
		operacion = "+";
		remove();
	}
	equal.onclick= function(e){
		b = screen.textContent;
		result();
	}
	sub.onclick= function(e){
		a = screen.textContent;
		operacion = "-";
		remove();
	}
	mul.onclick= function(e){
		a = screen.textContent;
		operacion = "*";
		remove();
	}
	div.onclick= function(e){
		a = screen.textContent;
		operacion = "/";
		remove();
	}

}

function remove(){
	screen.textContent="";
}

function reset(){
	screen.textContent= " ";
	a = 0;
	b = 0;
	operacion = " ";
}

function result(){
	let res=0;
	switch(operacion){
		case "+":
			res = parseFloat(a) + parseFloat(b);
			break;

		case "-":
			res = parseFloat(a) - parseFloat(b);
			break;

		case "*":
			res = parseFloat(a) * parseFloat(b);
			break;

		case "/":
			res = parseFloat(a) / parseFloat(b);
			break;

	}
	reset();
	screen.textContent = res;

}






