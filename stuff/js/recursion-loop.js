var arr = ['a', 'b', 'c'];
loop(arr, 0, arr.length, console.log);
//loop(arr, 0, 10, console.log);

//for (var i = 0; i < 10; i++) console.log(arr[i]);


function loop(array, start, end, callback) {
	//debugger
	//console.log(Error())
	//console.log(start, '->');
	console.log(alien(start));
  if (start < end) {
	callback(array[start]);

  	//loop(array, ++start, end, callback); // WARN this solution manipulates start (bad practice)
	loop(array, start + 1, end, callback);
  }
	//console.log(start, '<-');
	console.log(alien(start));
}

function alien(iteration) {
	var mouths = '(·(';

	for (var i = 0; i <= iteration; i++) mouths += '--<';

	return mouths;
}





