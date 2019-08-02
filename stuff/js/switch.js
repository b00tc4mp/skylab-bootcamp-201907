var age = 17

switch(true) {
	case age <= 1:
		console.log('baby')
		break
	case age > 1 && age <= 5:
		console.log('churrumbel')
		break
	case age > 5 && age < 13:
		console.log('youtuber, instagramer, egocentrico...')
		break
	case age >= 13 && age < 18:
		console.log('gilipollas y lo siguiente')
		break
	case age >= 18  && age < 25:
		console.log('engreido casi adulto')
		break
	case age >= 25:
		console.log('peazo persona')
}