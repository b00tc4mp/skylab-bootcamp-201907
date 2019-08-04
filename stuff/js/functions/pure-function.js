var result;

function sum(a, b) {
	result = a + b; // non-pure
	//var result = a + b; // pure (with shadowing)

	//return result;
	setTimeout(function() {
		console.log(result);
    }, 1000);
}

sum(1, 2);
result = 5;