var result = [0, 0, 0, 0];

function calculator(op1, op2){
    // arguments.length permet que si nomes posem un numero faci l'arrel       
        if (arguments.length == 1 && typeof(op1) == "number"){
            // fem l'arrel i reduim els decimals, així com (parcefloat no entenc el seu funcionament)
            return parseFloat(Math.sqrt(op1).toFixed(3));
        }
        else if (typeof(op1) != "number" || typeof(op2) != "number"){
            return "This is not a number !";
        }
        else if (arguments.length > 2){
            return "You are asking too much of me !";
        }
        else { 
            // fem els calculs i despres ho posem bonic
            result[0] = op1 + op2;
            result[1] = op1 - op2;
            result[2] = op1 * op2;
            result[3] = op1 / op2;
            return "Results = [" + op1 + " + " + op2 + " = " + parseFloat(result[0].toFixed(3)) + ", " + 
            op1 + " - " + op2 + " = " + parseFloat(result[1].toFixed(3)) + ", " + 
            op1 + " * " + op2 + " = " + parseFloat(result[2].toFixed(3)) + ", " +
            op1 + " / " + op2 + " = " + parseFloat(result[3].toFixed(3)) + "]";
        }
}
calculator(10, 3);






// per limitar el num de decimals .toFixed(3)
