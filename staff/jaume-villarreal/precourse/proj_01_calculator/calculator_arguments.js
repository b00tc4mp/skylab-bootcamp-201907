//CALCULATOR

// ..addition method
var sum = function(arguments){
    var result = 0;
    var currentString = '';
    for(num in arguments){
        if(num < arguments.length-1){
            currentString += `${arguments[num]} + `;
        }
        else{
            currentString += `${arguments[num]} =`;
        }
        result += arguments[num];
    }
    return (`Addition: ${currentString} ${result}`);
};

// ..substraction method
var rest = function(arguments){
    var result = arguments[0];
    var currentString = `${arguments[0]} - `;
    for(var i = 1 , argLength = arguments.length ; i<argLength ; i++){
        if(i < arguments.length-1){
            currentString += `${arguments[i]} - `;
        }
        else{
            currentString += `${arguments[i]} =`;
        }
        result -= arguments[i];
    }
    return (`Substraction: ${currentString} ${result}`);
};

// ..multiplication method
var mult = function(arguments){
    var result = 1;
    var currentString = '';
    for(num in arguments){
        if(num < arguments.length-1){
            currentString += `${arguments[num]} * `;
        }
        else{
            currentString += `${arguments[num]} =`;
        }
        result = result * arguments[num];
    }
    
    return (`Multiplication: ${currentString} ${result}`);
};

// ..division method
var div = function(arguments){
    var result = arguments[0];
    var currentString = `${arguments[0]} / `;
    for(var i = 1 , argLength = arguments.length ; i<argLength ; i++){
        if(i < arguments.length-1){
            currentString += `${arguments[i]} / `;
        }
        else{
            currentString += `${arguments[i]} =`;
        }
        result /= arguments[i];
    }
    return (`Division: ${currentString} ${result.toFixed(3)}`);
};

// ..check input method
var checkInput = function(arg){
    var flag = true;
    for(num in arg){
        if(isNaN(arg[num])){
            return !flag;
        };
    }
    return flag;
}

// ..calculator
var calculator = function(){
    var resultString = '';
    var flag = checkInput(arguments);
    if(flag){
        round++;
        if(arguments.length == 1){
            results.push(Math.sqrt(arguments[0]));
        }
        else{
            // results.push(sum(arguments) , '\n');
            // results.push(rest(arguments) , '\n');
            // results.push(mult(arguments) , '\n');
            // results.push(div(arguments) , '\n');
            resultString += `${sum(arguments)}\n${rest(arguments)}\n${mult(arguments)}\n${div(arguments)}\n`;
            
        }
        resultsArray.push(resultString);

        console.log(`============== Round #${round} ============== \n${resultsArray.join('\n')}`);
    
        insertNumbers();    
    }
    else{
        alert('ERROR: wrong data.')
    }
}

// ..insert question => PROMPT
let insertNumbers = () => {
    var question = prompt('Insert numbers? y/n');

    if(question === 'y'){
        var newNumbers = prompt('insert numbers separated by commas' , 'n1,n2,n3')
                .split(',')
                .map(n => parseInt(n));
        calculator(...newNumbers);
    }
    else{alert('Ciao!')}
};

// ..MAIN
const resultsArray = [];
let round = 0;
insertNumbers();
