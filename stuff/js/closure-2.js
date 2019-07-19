function calc(number) {
    return function (operator, number2) {
        switch (operator) {
            case '+':
                number += number2;
                break;
            case '-':
                number -= number2;
                break;
            case '*':
                number *= number2;
                break;
            case '/':
                number /= number2;
                break;
        }
        console.log(number);
    }
}

var c1 = calc(1);
var c2 = calc(2);

c1('+', 2);
c2('*', 100);
c1('*', 10);
c2('-', 1000);
c1('/', 3);
c1('-', 2.45);