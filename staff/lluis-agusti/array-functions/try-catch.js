function login(user, pass) {
	if (typeof user !== 'string' || !user.length) throw TypeError(user + ' is not a string');
	if (typeof pass !== 'string' || !pass.length) throw TypeError(pass + ' is not a string');
	if (user !== 'pepito' || pass !== 'grillo') throw Error('cannot login')
}

var user = 'pepito', pass = 'grillo'; // WHAT if user = 'pepita'

try {
    login(user, pass); 
    console.log('continue... do bank transfer 1.000.000$');
} catch(error) {
    if (error instanceof TypeError)
        alert('wrong input (user or pass)');
    else alert('credentials error');
}