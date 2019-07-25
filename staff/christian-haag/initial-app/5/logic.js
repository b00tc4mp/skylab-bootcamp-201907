'use strict'
/**
 * All logic here
 */
function searchQuery(query) {

    var error = ""

    if (!query.trim()) {
        error = 'Search bar is empty'

    } else {
        var request = new XMLHttpRequest();
        var imgPanel = document.getElementsByClassName('product__img')[0];
        imgPanel.innerHTML = '';

        request.open('get', 'http://duckling-api.herokuapp.com/api/search?q=' + query);

        request.onload = function () {
            var results = JSON.parse(request.responseText);

            var ul = document.createElement('ul');

            imgPanel.appendChild(ul);

            results.forEach(function (item) {

                var li = document.createElement('li');
                var h3 = document.createElement('h3');
                var p = document.createElement('p');

                h3.innerText = item.title;

                li.appendChild(h3);

                var img = document.createElement('img');

                img.src = item.imageUrl;
                img.style.borderBottom = `4px solid ${query}`
                li.appendChild(img);

                p.innerText = item.price
                li.appendChild(p)

                ul.appendChild(li);
            });
        }
        request.send()
    }

    if (error) {
        throw new Error(error);
    }
};

function register(name, surname, email, password) {
    var errors = ''

    var found = users.find(function (element) {
        return element.email === email
    });

    if (!name.trim()) {
        if (errors) errors += '\n'
        errors += 'Name is empty or blank.'
    }

    if (!surname.trim()) {
        if (errors) errors += '\n';
        errors += 'Surname is empty or blank.';
    }

    if (!email.trim()) {
        if (errors) errors += '\n'
        errors += 'E-mail is empty or blank.'
    } else if (email.length < 7) {
        if (errors) errors = '\n'
        errors = 'e-mail to short, minimum 7 charachters of length'
    } else if (validateEmail(email) !== true) {
        if (errors) errors = '\n'
        errors = 'Your e-mail format is not correct'
    } else if (found !== undefined) {
        errors = 'email already exists'
    }

    if (!password.trim()) {
        if (errors) errors += '\n'
        errors += 'Password is empty or blank';
    } else if (password.length < 8 || password.length >= 10) {
        errors = 'Password must be between 8 and 10 characters'
    }

    if (errors) {
        throw new Error(errors)
    } else {
        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    }


    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email)
    }
}

function resetFormAlerts() {
    var regiPanel = panels[1].children[0]
    var logiPanel = panels[3].children[0];
    var alerts = document.getElementsByClassName('alert')
    regiPanel.reset();
    logiPanel.reset();
    for (var i = 0; i < alerts.length; i++) {
        alerts[i].innerText = ''
    };
};


function login(email, password) {
    var errors = ''

    if (!email.trim()) {
        if (errors) errors += '\n'
        errors += 'E-mail is empty or blank.'
    }

    if (!password.trim()) {
        if (errors) errors += '\n'
        errors += 'Password is empty or blank'
    }

    if (errors) throw new Error(errors)

    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!user) throw new Error('Wrong credentials')
}

