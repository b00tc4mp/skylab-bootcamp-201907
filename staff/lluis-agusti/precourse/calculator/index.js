// Calculadora

function calculadora(num1, num2) {

  if (typeof(num1) != "number") {
      console.log("Ooops! Parece que el valor introducido no es un número.");
  }   else if (typeof(num1) === "number" && typeof(num2) == "string") {
      console.log("Ooops! De momento no opero con strings y números.");
  }   else if (typeof(num1) === "number" && typeof(num2) == "boolean") {
      console.log("Ooops! De momento no opero con booelanos y números.");
  }   else if (typeof(num1) === "number" && num2 === undefined) {
      var raizCuadrada = Math.sqrt(num1);
      var raizCuadradaToFixed3 = Number(raizCuadrada.toFixed(3));
      console.log("La raíz cuadrada de " + num1 + " es " + raizCuadradaToFixed3 + ".");
  }   else {
      var resultsArray = [num1 + num2, num1 - num2, num1 / num2, num1 * num2];
        for (var i = 0; i < resultsArray.length; i++) {
          if (i == 0) {
            console.log("Sumar " + num1 + " más " + num2 + " son " + Number(resultsArray[i].toFixed(3)) + ".");
            resultsArray[i] = " " + num1 + " + " + num2 + " = " + Number(resultsArray[i].toFixed(3));
          } else if (i == 1) {
            console.log("Restar " + num1 + " menos " + num2 + " son " + Number(resultsArray[i].toFixed(3)) + ".");
            resultsArray[i] = " " + num1 + " - " + num2 + " = " + Number(resultsArray[i].toFixed(3));
          } else if (i == 2) {
            console.log("Dividir " + num1 + " entre " + num2 + " son " + Number(resultsArray[i].toFixed(3)) + ".");
            resultsArray[i] = " " + num1 + " / " + num2 + " = " + Number(resultsArray[i].toFixed(3));
          } else if (i == 3) {
            console.log("Multiplicar " + num1 + " por " + num2 + " son " + Number(resultsArray[i].toFixed(3)) + ".");
            resultsArray[i] = " " + num1 + " * " + num2 + " = " + Number(resultsArray[i].toFixed(3));
          }
      }
    }
    if (resultsArray != undefined) {
      console.log("results = [" + resultsArray + " ]");
    }
}
  

calculadora(4, 5);