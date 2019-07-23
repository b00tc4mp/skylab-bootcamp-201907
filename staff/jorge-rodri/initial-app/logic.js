function register(name, surname, email, password){
    var errors='';

    if(!name.trim()){
        errors+='Name is empty or blank.';
    }

    if(!surname.trim()){
        if(errors) errors+='\n';

        errors+='Surname is empty or blank.';
    }

    if(!email.trim()){
        if(errors) errors+='\n';

        errors+='Email is empty or blank.';
    }

    if(!VALIDATE_EMAIL(email)){
        if(errors) errors+='\n';

        errors+='Email not valid.'
    }

    if(!comprobeEmail(email)){
        if(errors) errors
    }

    if(!password.trim()){
        if(errors) errors+='\n';

        errors+='Password is empty or blank.\n';
    }

    if(!VALIDATE_PASS(password)){
        if(errors) errors+='\n';

        errors+='Password is not valid, you need minimum 6 numerics digits.'
    }

    if(errors){
        throw new Error(errors);
    }
    var user= users.find(function(user){
        return user.email === email;
    });
    if(user)
        throw new Error('User already exist.')
    else
        users.push({
            name:name,
            surname:surname,
            email:email,
            password:password
        });
}

function login(email, password){
    var errors='';

    if(!email.trim()) {
        if (errors) errors += '\n';

        errors+='E-mail is empty or blank.';
    }

    if(!password.trim()){
        if(errors) errors+='\n';
        errors+='Password is empty or blank.';
    }

    if(errors)throw new Error(errors);

    var user= users.find(function(user){
        return user.email === email && user.password === password;
    });
    if(!user){
        throw new Error('Wrong credentials.')
    }
}


function VALIDATE_PASS(pass){
    var re=/^[0][0-9]\d{5}$|^[0-9]\d{5}$/
    return re.test(pass);
}

function VALIDATE_EMAIL(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}