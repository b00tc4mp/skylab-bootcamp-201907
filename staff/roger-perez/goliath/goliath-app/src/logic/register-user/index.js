import logic from '../index'
import call from '../../utils/call/index'
import validate from '../../utils/validate/index'

const registerUser = function(
    name,
    surname,
    instrument,
    description,
    email,
    password,
    repassword,
    drumkits,
    admin
  ) {
    validate.string(name, "name");
    validate.string(surname, "surname");
    validate.string(instrument, "instrument");
    validate.string(description, "description");
    validate.email(email, "email");
    validate.string(password, "password");
    validate.string(repassword, "password repeat");
    if (password !== repassword) throw new Error("passwords do not match");
    return call(
      "http://localhost:8080/api/users",
      "post",
      { "content-type": "application/json" },
      {
        name,
        surname,
        instrument,
        description,
        email,
        password,
        drumkits: [],
        admin: false
      }
    )
      .then(response => {
        return response;
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  export default registerUser