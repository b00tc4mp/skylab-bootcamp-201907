function calculatorPro(...numbers) {

    // No arguments passed
    if (numbers.length === 0) {
        return 'Please, provide at least one input number'
    }

    // Some arguments are not digits
    for (let num of numbers) {
        if (typeof num !== 'number') {
            return 'At least one argument provided is not a number. Please, try again.'
        }
    }

    // Square root if only one argument provided, 4 operations if 1+ argument provided
    return numbers.length === 1 ? squareRoot(numbers[0]) : fourOperations(numbers)

    function squareRoot(num) {
        return `The square root of ${num} is ${parseFloat(Math.sqrt(num).toFixed(3))}`
    }
    
    function fourOperations(numbers) {
        results = [
            `Sum: ${operation(numbers, '+')}`,
            `Subtraction: ${operation(numbers, '-')}`,
            `Multiplication: ${operation(numbers, '*')}`,
            `Division: ${operation(numbers, '/')}`,
        ]

        return results.join('\n')
    }
    
    function operation(numbers, operator) {
        const result =  numbers.reduce(function(a,b) {
            return eval(`${a} ${operator} ${b}`)
        })
        return parseFloat(result.toFixed(3))
    }
}

let n1 = 3.5
let n2 = 5.3
let result = calculatorPro(n1,n2)
console.log(result)

let answer = prompt('New numbers? y/n')
if (answer) {
    switch (answer.toLowerCase()) {
        case 'y':
            console.log(calculatorPro(n1, n2))
            break
        case 'n':
            console.log('Bye!')
            break
        default:
            console.log('Bye!')
            break
    }
} else {
    console.log('Bye!')
}


