// with callback

function searchFullDucks(query, expression) {
    fetch(`https://duckling-api.herokuapp.com/api/search?q=${query}`)
        .then(res => res.json())
        .then(ducks => {
            const details = ducks.map(duck =>
                fetch(`https://duckling-api.herokuapp.com/api/ducks/${duck.id}`)
                    .then(res => res.json())
            )

            return Promise.all(details)
        })
        .then(fullDucks => expression(undefined, fullDucks))
        .catch(error => expression(error))
}

searchFullDucks('yellow', (error, ducks) => {
    if (error) console.error(error)
    else console.log(ducks)
})

// with promise

function searchFullDucks(query, expression) {
	return new Promise((resolve, reject) => {
        fetch(`https://duckling-api.herokuapp.com/api/search?q=${query}`)
        .then(res => res.json())
        .then(ducks => {
            const details = ducks.map(duck => 
                fetch(`https://duckling-api.herokuapp.com/api/ducks/${duck.id}`)
                    .then(res => res.json())
            )

            return Promise.all(details)
        })
        .then(fullDucks => resolve(fullDucks))
        .catch(error => reject(error))
    })
}

searchFullDucks('yellow')
	.then(console.log)
	.catch(console.error)
	