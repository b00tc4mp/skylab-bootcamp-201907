'use strict';

/** BUSINESS LOGIC */

function registration(registerName,registerSurname,registerEmail,registerPw){
    var errors="";
    if (!registerName.trim()){
        errors += "Name is empty or blank";
    }else if(!registerSurname.trim()){
        errors += "Surname cannot be empty";
    }else if(!registerEmail.trim()){
        errors += "Email cannot be empty";
    }else if(!registerPw.trim()) {
        errors += "Password cannot be empty";
    } else {
        var found = allUsers.findTest(function (user) {
            return user.email == registerEmail && user.password == registerPw;
        });
        if (found) {
            errors += "Credentials error";
            throw new Error(errors)
        } else {
            var nextUser = new newUser(registerName.value, registerSurname.value, registerEmail.value, registerPw.value);
            console.log(nextUser);
            allUsers.pushTest(nextUser);
    
        }
    }

}