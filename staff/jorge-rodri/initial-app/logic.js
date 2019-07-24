'use strict';

/**
 * Business Logic
 */

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function register(name, surname, email, password) {
    var errors = '';

    if (!name.trim()) {
        errors += 'Name is empty or blank.';
    }

    if (!surname.trim()) {
        if (errors) errors += '\n';

        errors += 'Surname is empty or blank.';
    }

    if (!email.trim()) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank.';
    } else if (!EMAIL_REGEX.test(email)) {
        if (errors) errors += '\n';

        errors += 'E-mail is not valid.';
    }

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors)
        throw new Error(errors);
    else {
        var user = users.find(function (user) {
            return user.email === email;
        });

        if (user) throw new Error('E-mail is already registered.');

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    }
}

function login(email, password) {
    var errors = '';

    if (!email.trim()) {
        errors += 'E-mail is empty or blank.';
    } else if (!EMAIL_REGEX.test(email)) {
        errors += 'E-mail is not valid.';
    }

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors) throw new Error(errors);

    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!user) throw new Error('Wrong credentials.');
}

function searchDuck(query){

var request = new XMLHttpRequest()//proporciona una forma facil de obtener info sin tener que 
//recargar la pantalla completa

//obj.open inicializa el pedido, primer parametro puede ser POST o GET, segundo url tambien acepta 
//user y password
request.open('get', 'http://duckling-api.herokuapp.com/api/search?q=' + query);


request.onload = function() {
	//JSON.parse analiza una cadena de texto como JSON el parametro es el texto que se
	//convertira a JSON
	var results = JSON.parse(request.responseText);//responseText es la respuesta al pedido de 
	//texto  del XMLHttpRequest

	var ul = document.createElement('ul');

	document.body.appendChild(ul);
	
	//console.log(results);
	results.forEach(function(item) { 
		//console.log(item.title, item.imageUrl);

		var li = document.createElement('li');

		var h3 = document.createElement('h3');

		h3.innerText = item.title;

		li.appendChild(h3);

		var img = document.createElement('img');

		img.src = item.imageUrl;

		li.appendChild(img);

		ul.appendChild(li);
	});
};

request.send();
}