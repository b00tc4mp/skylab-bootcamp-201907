'use strict'
/**
 * All logic here
 */
var logic = {
    searchDucks: function (query, expression) {

        var request = new XMLHttpRequest();

        request.open('get', 'http://duckling-api.herokuapp.com/api/search?q=' + query);

        request.onload = function () {
            var results = JSON.parse(request.responseText);
            expression(results);
        }
        request.send()

    },

    register: function (name, surname, email, password) {
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
        } else if (this.validateEmail(email) !== true) {
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
    },

    validateEmail: function (email) {
        return /\S+@\S+\.\S+/.test(email)
    },


    resetFormAlerts: function () {
        var regiPanel = panels[1].children[0]
        var logiPanel = panels[3].children[0];
        var alerts = document.getElementsByClassName('alert')
        regiPanel.reset();
        logiPanel.reset();
        for (var i = 0; i < alerts.length; i++) {
            alerts[i].innerText = ''
        };
    },


    login: function (email, password) {
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

}

