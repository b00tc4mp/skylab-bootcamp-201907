function call(url, method, headers, body, expression) { // TODO swith from XHR to fetch
    fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => expression(undefined, res))
        .catch(error => expression(error))
}

      /* DEMOs from which to extract a common factor

      // register

        fetch('https://skylabcoders.herokuapp.com/api/user', {
	method: 'post',
	body: JSON.stringify({
      "name": "Manuel",
      "surname": "Barzi",
      "age": 41,
      "addict": false,
      "username": "manuelbarzi-2@gmail.com",
      "password": "123"
    }),
	headers: {
		'content-type': 'application/json'
    }
})
	.then(res => res.json())
    .then(res => console.log(res))
    
// authenticate

fetch('https://skylabcoders.herokuapp.com/api/auth', {
	method: 'post',
	body: JSON.stringify({
      "username": "manuelbarzi-2@gmail.com",
      "password": "123"
    }),
	headers: {
		'content-type': 'application/json'
    }
})
	.then(res => res.json())
    .then(res => console.log(res))
    

// retrieve user

fetch('https://skylabcoders.herokuapp.com/api/user/5d42edcc2bfd5e00095c7d8d', {
	method: 'get',
	headers: {
		'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDJlZGNjMmJmZDVlMDAwOTVjN2Q4ZCIsImlhdCI6MTU2NDY2NzY1OCwiZXhwIjoxNTY0NjcxMjU4fQ.-SvFkNRjE4fV4kL_GfRTDNPu2WeN96o4DNTg997_JIY'
     }
})
	.then(res => res.json())
	.then(res => console.log(res))

        */