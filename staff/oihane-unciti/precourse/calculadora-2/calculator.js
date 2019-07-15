

function numberClicked(element) {

    var numberPresh = element.value;

   

    if (numberPresh === "=") {

        getNumber();
        operation();

    } else if (escape(numberPresh) === "%u2190") {


        screenNumber = screenNumber.slice(0, -1);

        document.getElementById("screen").value = screenNumber;

    } else if (numberPresh === "AC") {

        document.getElementById("screen").value = "";
        numberPresh = "";
        screenNumber = "";

    } else {

        document.getElementById("screen").value += numberPresh;
        screenNumber+=element.value;

    }


}

document.getElementById("screen").value = "";

var screenNumber= "";
var sign = [];
var number = [];



function getNumber() {
    var temp = "";
    var aux = "";

    for (var i = 0; i < screenNumber.length; i++) {
        if (screenNumber.charAt(i) == "+" || screenNumber.charAt(i) == "-" || screenNumber.charAt(i) == "x" || screenNumber.charAt(i) == "/") {
            sign.push(screenNumber.charAt(i));
            aux= parseFloat(temp)
            number.push(aux);
            temp = "" 

        } else {
            temp += screenNumber.charAt(i)

        }

    }
    aux= parseFloat(temp)
    number.push(aux);
}

function operation() {
    var result = ""
    result = number[0];

    for (var i = 1; i < number.length; i++) {

       switch (sign[i-1]) {
            case "+":
                result = result + number[i]
                break;

            case "-":
                result -= number[i]
                break;

            case "x":
                result *= number[i]
                break

            case "/":
                result /= number[i]
                break

        }
    }
    document.getElementById("screen").value = result;
    number=[];
    sign = []; 
}