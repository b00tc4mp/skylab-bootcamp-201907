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

function search(searchValue){
    var request = new XMLHttpRequest()

    request.open('get', 'http://duckling-api.herokuapp.com/api/search?q=' + searchValue);

    request.onload = function() {
        var results = JSON.parse(request.responseText);
        if(results instanceof Array){
            //var ul = document.createElement('ul');
        var uls = document.getElementById("ul");
        uls.innerHTML = "";

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
        }else{
            ul.innerHTML = "";
        }
        
    };

    request.send();

}