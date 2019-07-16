// create a result array where you store the results:
var result = "";
//function of calculator:
function calculator() {
  var numF = prompt("enter first number:");
  var num1 = Number(numF);
  var numS = prompt("enter second number:");
  //check if only 1 number is entered and gives its squareroot:
  if (numS === "") {
    var n = num1 * num1;
    var s = (num1 + "*" + num1 + "=" + (n % 1 ? n.toFixed(3) : n));
    result.push(s);
    console.log("num1*num1 = " + result);
  } else {
    var num2 = Number(numS);
    var operation = prompt("choose a function: + , - , / , *: or choose ALL");
    //checks each case:
    switch (operation) {
      case "+":
        var n = num1 + num2;
        var s = (" Operation of sum:"+num1 + " + " + num2 + " = " + (n % 1 ? n.toFixed(3) : n));
        result +=(s);
        break;

      case "-":
        var n = num1 - num2;
        var s = (" Operation of substraction:"+num1 + " - " + num2 + " = " + (n % 1 ? n.toFixed(3) : n));
        result +=(s);
        break;

      case "/":
        var n = num1 / num2;
        var s = (" Operation of Division:"+num1 + " / " + num2 + " = " + (n % 1 ? n.toFixed(3) : n));
        result +=(s);
        break;

      case "*":
        var n = num1 * num2;
        var s = (" Operation of Multiplying:"+num1 + " * " + num2 + " = " + (n % 1 ? n.toFixed(3) : n));
        result +=(s);
        break;
      case "ALL":
        var nSum = num1 + num2;
        var sSum = (num1 + " + " + num2 + " = " + (nSum % 1 ? nSum.toFixed(3) : nSum));
        var nSubstraction = num1 - num2;
        var sSubstraction = (num1 + " - " + num2 + " = " + (nSubstraction % 1 ? nSubstraction.toFixed(3) : nSubstraction));
        var nDivision = num1 / num2;
        var sDivision = (num1 + " / " + num2 + " = " + (nDivision % 1 ? nDivision.toFixed(3) : nDivision));
        var nTimes = num1 * num2;
        var sTimes = (num1 + " * " + num2 + " = " + (nTimes % 1 ? nTimes.toFixed(3) : nTimes));
        console.log(`Operation of sum= ${sSum},\nOperation of substraction= ${sSubstraction},\nOperation of Division: ${sDivision},\nOperation of Multiplying: ${sTimes}`);
        break;
      default:
        console.log("function wrongly choosen, please enter a correct function:");
        break;
    }
  }
}
//calls the Calculator:
var numberIntoArray = calculator();
console.log(result);
//Checks if more operations:
var repeat = prompt("more operations?: yes or no:");
if (repeat === "yes") {
  do {
    var numberIntoArray = calculator();
    console.log(result);
    var repeat = prompt("more operations?: yes or no:");
  }
  while (repeat === "yes");
  if (repeat === "no") {
    console.log("Goodbye");
  } else {
    console.log("Error");
  }
} else {
  console.log("Goodbye");
}
