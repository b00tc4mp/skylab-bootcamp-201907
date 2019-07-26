function salute(from, salutation, ...to) {
	//for (let i = 0; i < to.length; i++)
		//console.log(from + ': ' + salutation + ', ' + to[i] + '!')
	to.forEach(name => console.log(from + ': ' + salutation + ', ' + name + '!'))
}

//salute('Peter', 'Bye', 'John')

salute('Peter', 'Bye', 'John', 'Mary', 'James')