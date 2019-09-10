var arr = [1, 2, 3, 4];
var result = sum(arr);

console.log(result);

function sum(array) {
	//debugger
    return (function recursivy(count) {
		//debugger
        if (count < array.length) {
            return array[count++] + recursivy(count);
        }

        return 0;
    })(0);
};