'use strict'
/**
 * All logic here
 */
let logic = {
    searchDucks: (query, expression) => {
        let error = ''
        if (!query.trim()) {
            error = 'Search bar is Empty'
        } else {

            call('http://duckling-api.herokuapp.com/api/search?q=' + query, expression)
        }

        if (error) {
            throw new Error(error)
        }
    },

    searchDuckDetails: (id, expression) => {
        call('http://duckling-api.herokuapp.com/api/ducks/' + id, expression)
    },

    register: (name, surname, email, password) => {
        let errors = ''

        let found = users.find(element => {
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
        } else if (/\S+@\S+\.\S+/.test(email) !== true) {
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




    resetFormAlerts: () => {
        let regiPanel = panels('register', 0).children[0]
        let logiPanel = panels('login', 0).children[0];
        let alerts = document.getElementsByClassName('alert')
        regiPanel.reset();
        logiPanel.reset();
        for (let i = 0; i < alerts.length; i++) {
            alerts[i].innerText = ''
        };
    },

    userName: email => {
        let name = document.getElementsByClassName('user-name')[0]
        let user = users.find(user => {
            return user.email === email
        })
        if (user) {
            name.innerText = ` ${user.name}`
        } else {
            name.innerText = ` ${user[user.length - 1].name}`
        }
    },

    hideSection: section => {
        section.result.hide();
        section.detail.hide()
        section.hide();
    },



    login: (email, password) => {
        let errors = ''

        if (!email.trim()) {
            if (errors) errors += '\n'
            errors += 'E-mail is empty or blank.'
        }

        if (!password.trim()) {
            if (errors) errors += '\n'
            errors += 'Password is empty or blank'
        }

        if (errors) throw new Error(errors)

        let user = users.find(user => {
            return user.email === email && user.password === password;
        });

        if (!user) throw new Error('Wrong credentials')

    }

}

