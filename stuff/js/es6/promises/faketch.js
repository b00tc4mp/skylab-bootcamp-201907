function faketch(url) {
	return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open('get', url)

        xhr.onload = function () {
			try {
                if (xhr.status < 300) {
                    const results = JSON.parse(xhr.responseText)

                    //throw Error('wtf')

                    resolve(results)
                } else if(xhr.status >= 300) {
                    const error = new Error(xhr.status)

                    error.status = xhr.status

                    reject(error)
                }
            } catch(error) {
            	reject(error)
			}
        }

        xhr.onerror = function(error) {
            //reject(error)
			reject(new Error('error on connection'))
        }

        xhr.send()
    })
}


faketch('https://duckling-api.herokuapp.com/api/search?q=green')
//faketch('https://duckling-api.herokuapp.com/api/search?q=green') // WRONG url
	.then(console.log)
	.catch(error => console.error(0, error))
	.then(() => console.log('hello'))
	.then(() => { throw Error('$%&!') })
	.then(() => console.log('world'))
	//.catch(error => console.error(1, error))
	.catch(error => console.error(2, error))