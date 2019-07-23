function register(name, surname, email, password){
    var errors="";
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
    if(!password.trim()){
        if(errors) errors+='\n';
        errors+='Password is empty or blank.\n';
    }

    if(errors){
        throw new Error(errors);
    }else{
        users.push({
            name:name,
            surname:surnama,
            email:email,
            password:password
        });
    }
}

function login(email, password){
    var errors="";
    if(!email.trim()){
        errors+='Email is empty or blank';
    }
    if(!password.trim()){
        if(errors) errors+='\n';
        errors+='Password is empty or blank';
    }

    if(errors)throw new Error(errors);

    var user= ursers.find(function(){
        return users.email==email&&users.password==password;
    });
    if(!user){
        throw new Error('Wrong credentials.')
    }
}



function comprobeEmail(email){
if(users.length==0){
    return false;
}
for(var i=0;i<users.length;i++){
    if(users[i].email==email){
        return true
    }
}
return false;
}
function validatePass(pass){
var re=/^[0][1-9]\d{5}$|^[1-9]\d{5}$/
return re.test(pass);
}
function validateEmail(email) {
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(email);
}