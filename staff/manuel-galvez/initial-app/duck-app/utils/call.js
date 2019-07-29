call = (url, expression) => {
	const request = new XMLHttpRequest()

	request.open("get", url)
	request.onload = () => {
		const ducks = JSON.parse(request.responseText)
		expression([ducks, request])
	}
	request.send()
}
