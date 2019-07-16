function calculator(num1, num2){
	
	var results = [];
	
	if (typeof num1 === 'number' && typeof num2 === 'number'){
		
		var sum = function (){
			return num1 + num2;
		} 		 
		var s = sum().toFixed(3);
		results[0] = `${num1} + ${num2} = ${s}`;

		var res = function (){
			return num1 - num2;
		}
		var r = res().toFixed(3);
		results[1] = `${num1} - ${num2} = ${r}`;


		var mult = function (){
			return num1 * num2;
		} 
		var m = mult().toFixed(3);
		results[2] = `${num1} * ${num2} = ${m}`;
	

		var div = function (){
			return num1 / num2;
		} 
		var d = div().toFixed(3);	
		results[3] = `${num1} / ${num2} = ${d}`;


	} else if (typeof num1 === 'number' && typeof num2 !== 'number'){
		return Math.sqrt(num1);
	} else if (typeof num1 !== 'number' && typeof num2 === 'number'){
		return Math.sqrt(num2);
	} else {
		return 'error';
	}	
		
	console.log(results);

};


calculator(20,6);
