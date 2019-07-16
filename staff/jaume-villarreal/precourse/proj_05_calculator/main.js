const display = document.getElementById('display');
const buttonSet = document.getElementById('buttonSet');

let operationStatus = false;
let numbersArray = [];
let operationsArray = [];
let resultsArray = [];

display.textContent = "0";

const calculate = () => {
    buttonSet.addEventListener("click" , (e) => {
        const button = e.target;
        const data = button.dataset;

        // pressed number
        if(data.number){
            setupDisplay(data.number);
        };

        // pressed action
        if(data.action){
            setupAction(data.action);
        };

        // pressed operator
        if(data.operator){
            setupOperation(data.operator);
        }; 
    }); 
};

let setupDisplay = (number) => {
    if(display.textContent.length < 15){
        //minify font-size
        display.textContent.length>9
            ? display.classList.add('display-min')
            : display.classList.remove('display-min');

        display.textContent === "0" || operationStatus === true
        ? display.textContent = number
        : number === '.' && !display.textContent.includes(".")
            ? display.textContent += number
            : number != "."
                ? display.textContent += number
                : null;
        operationStatus = false;
    }
}

let setupOperation = (operation) =>{
    operationStatus = true;
    
    numbersArray.push(Number(display.textContent));
    operationsArray.push(operation);
    
    if(numbersArray.length === 1){
         display.textContent = numbersArray[0];
         resultsArray.push(Number(display.textContent));
    }
    else if(operationsArray[operationsArray.length-1]!=='equal'){
        let result;
         op = operationsArray[operationsArray.length-2];
         switch(op){
         case "sum":
             result = (resultsArray[resultsArray.length-1] + numbersArray[numbersArray.length-1]).toString();
             resultsArray.push(Number(result));
             display.textContent = resultsArray[resultsArray.length-1];
             break;
         case "rest":
                result = (resultsArray[resultsArray.length-1] - numbersArray[numbersArray.length-1]).toString();
                resultsArray.push(Number(result));
                display.textContent = resultsArray[resultsArray.length-1];
             break;
         case "mult":
                result = (resultsArray[resultsArray.length-1] * numbersArray[numbersArray.length-1]).toString();
                resultsArray.push(Number(result));
                display.textContent = resultsArray[resultsArray.length-1];
             break;
         case "div":
                if(numbersArray[numbersArray.length-1] === 0){
                    display.textContent = 'error';
                    resetValues();
                }
                else{
                    result = (resultsArray[resultsArray.length-1] + numbersArray[numbersArray.length-1]).toString();
                    resultsArray.push(Number(result));
                    display.textContent = resultsArray[resultsArray.length-1];
                }                 
             break;
        };  
    }
    else{
        display.textContent = resultsArray[resultsArray.length-1];
                display.classList.remove('display-min');
                resetValues();
    };
 };

let setupAction = (action) => {
    // clear behavior 
    if(action === "clear"){
        display.textContent = 0;
        display.classList.remove('display-min');
        resetValues();
    // undo behavior
    }else{
        if(display.textContent.substr(0 , display.textContent.length-1).length > '0'){
            display.textContent = display.textContent.substr(0 , display.textContent.length-1);
        }else{
            display.textContent = '0';
        }
    }
}

let resetValues = () => {
    numbersArray.length = 0;
    operationsArray.length = 0;
    resultsArray.length = 0;
}

calculate ();

