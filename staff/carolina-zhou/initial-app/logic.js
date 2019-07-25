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

        if (user) throw new Error('There is already an account with the provided e-mail address.');

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

    if (errors) throw new Error(errors);
}

function firstLogin(password) {
    var errors = '';
    var lastUser = users[users.length -1];

    if (lastUser.password !== password) {
        errors += 'Wrong password. Try again.';
    }
    
    if (errors) throw new Error(errors);
}

function search(query) {
    var errors="";

    if (!query.trim()){
        errors += "Search is empty or blank."
    }
    if (errors) throw new Error(errors);
    
    
    var request = new XMLHttpRequest()
    request.open('get', 'http://duckling-api.herokuapp.com/api/search?q=' + query);
    request.onload = function() {
        var results = JSON.parse(request.responseText);
        var ul = document.getElementsByClassName('search__duck')[0];
        ul.innerHTML = '';
/*         var ul = document.createElement('ul');
        var searchSection = panels[6].children[0];
        searchSection.appendChild(ul); */
        
        results.forEach(function(item) { 
    
            var li = document.createElement('li');
            var h3 = document.createElement('h3');
    
            h3.innerText = item.title;
            li.appendChild(h3);
    
            var img = document.createElement('img');
    
            img.src = item.imageUrl;
            li.appendChild(img);
            ul.appendChild(li);

            li.className = "search__item";
            ul.className = "search__list";
            img.className = "search__image";
        });
    };
    request.send();
}