const hello = 'World'

const chars = [...hello]

//

const nums = [1, 2, 3]

const nums2 = [...nums]

//

function salute(from, salutation, ...to) {
	to.forEach(name => console.log(from + ': ' + salutation + ', ' + name + '!'))
}

const params = ['Peter', 'Bye', 'John', 'Mary', 'James']

//salute.apply(undefined, params)
salute(...params)