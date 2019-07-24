'use strict';

/**
 * Business Logic
 */

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
    }

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors)
        throw new Error(errors);
    else{
        var user = users.find(function(user){
            return email === user.email;
        });

        if(user){
            throw new Error('This email is already registered.');
        } else{
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        }
    }
}


function login(email, password) {
    var errors = '';

    if (!email.trim()) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank.';
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

function showGallery(query){
    var parent = document.body.children[0].children[5];
    var container = document.body.children[0].children[5].children[1];
    
    var request = new XMLHttpRequest()

    request.open('get', 'http://duckling-api.herokuapp.com/api/search?q=' + query);

    request.onload = function() {
	    var results = JSON.parse(request.responseText);

	    var divGallery = document.createElement('div');
        divGallery.className = "gallery"
        container.appendChild(divGallery);


	results.forEach(function(item) { 
		var divImg = document.createElement('div');
        divImg.className = 'gallery__img';
        divGallery.appendChild(divImg)

		var h3 = document.createElement('h3');

		h3.innerText = item.title;

		divImg.appendChild(h3);

		var img = document.createElement('img');

		img.src = item.imageUrl;

		divImg.appendChild(img);

	});
};

request.send();
}