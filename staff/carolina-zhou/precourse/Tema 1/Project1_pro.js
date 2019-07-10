// PROYECTO 1: Calculator PRO!

function calculatorPro(nums) {
  
  if (nums.length > 1) {
    let sum = 0;
    for (num in nums) {
        sum += nums[num];
    }
    let resultSum = +(sum).toFixed(3)
  
    let res = nums[0];
    for (let i=1; i < nums.length; i++) {
        res -= nums[i];
    }
    let resultRes = +(res).toFixed(3)
  
    let div = nums[0];
    for (let j=1; j < nums.length; j++) {
        div /= nums[j];
    }
    let resultDiv = +(div).toFixed(3)
  
    let mult = 1;
    for (num in nums) {
        mult *= nums[num];
    }
    let resultMult = +(mult).toFixed(3)
  
    let results = [];
    results[0] = "La suma = " + resultSum;
    results[1] = "La resta = " + resultRes;
    results[2] = "La división = " + resultDiv;
    results[3] = "La multplicación = " + resultMult;
    console.log(results)
  }

  if (nums.length === 1) {
    let raiz = Math.sqrt(nums);
    resultRaiz = raiz.toFixed(3);
    console.log(resultRaiz);
  } 
};

function pregunta() {
  let response = confirm("¿Quieres calcular de nuevo? Sí (Aceptar) o No (Cancelar)");
  if (response === true){
    let num = prompt("Introduce tus números separados por comas");
    num = num.split(",").map(Number);	
    calculatorPro(num);
  } else {
    console.log("Ok. ¡Vuelve pronto!");
  }
};

pregunta();
