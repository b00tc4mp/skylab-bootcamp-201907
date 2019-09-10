class Compromise {
	constructor(expression) {
		const resolve = result => this.result = result
		const reject = result => this.error = new Error(result)

		expression(resolve, reject)
    }

	then(expression) {
		if(!this.error) {
			try {
				this.result = expression(this.result)
            } catch(error) {
				this.error = error
            }
        }
		
		return this
    }

	catch(expression) {
		this.error && expression(this.error)
	}
}

new Compromise((resolve, reject) => {
	resolve(10)
	//reject('error chungo')
})
	.then(num => {
		console.log(num)
		return num
	})
	.then(num => num * 10)
	.then(num => {
		console.log(num)
		throw Error('wtf')
		return num
	})
	.then(num => num / 4)
	.then(num => {
		console.log(num)
	})
	.catch(error => console.error(error.message))
//10
//100
//wtf

// now with promise

new Promise((resolve, reject) => {
	resolve(10)
	//reject('error chungo')
})
	.then(num => {
		console.log(num)
		return num
	})
	.then(num => num * 10)
	.then(num => {
		console.log(num)
		throw Error('wtf')
		return num
	})
	.then(num => num / 4)
	.then(num => {
		console.log(num)
	})
	.catch(error => console.error(error.message))

//10
//100
//wtf