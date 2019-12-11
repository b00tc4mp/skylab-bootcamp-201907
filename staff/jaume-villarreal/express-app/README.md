# EXPRESS-APP [documentation]

## **App object route methods**
These methods are derived from HTTP ones. They refer to the way to respond to a client request, being `get` and `post`the most usual ones. Route definition takes the followwing structure:
```javascript
app.METHOD( PATH , HANDLER)
```

* **app**: instance of `express()`
* **METHOD**: HTTP request method
* **PATH**: endpoint on the server 
* **HANDLER**: function executed when the route is matched. It uses to be defined as a `(request,response)` callback.

* app.**`get()`**: it requests a representation of a specified resourse. This kind of requests should only retrieve data and should have not other effect.
* app.**`post()`**: it requests that the server accepts data enclosed in the request as a new part of data stored in the `URI`.

## **Dependences**
### **Module session-express (middleware)**
Module `session-express` is able to invoke a function that receives as an argument an object to be declared and defined with the required properties:
* **`secret`**: type `string` property that uses a cryptographic algorithm to encrypt session `id's`.
* **`resave`**: defined as `true` it forces to save the session data to the DB, even if there has been no change
* **`saveUnitialized`**: defined as `true` it forces to save in the DB the object with the data of the session, although this one has not been initialized.

### **parseurl (from express())**
* install as devDependence (see `package.json` example below): `npm i -D jasmine`
```javascritp
"devDependencies": {
    "jasmine": "^3.4.0"
  },
  ```
* execute on terminal: `npx jasmine logic/**/**.spec.js`

### **Jasmine (testing)**
* install as devDependence (see `package.json` example below): `npm i -D jasmine`
```javascritp
"devDependencies": {
    "jasmine": "^3.4.0"
  },
  ```
* execute on terminal: `npx jasmine logic/**/**.spec.js`

## **Error handlig and data persistence on forms**
Error handling is managed in parallel from `index.js` file and from `register.js` and `login.js` files. In order to keep the consistency of data and the correct behaviour of the application, it's necessary to store form values in `request.session`. The following code can be an exemple for the rest of error handling cases in app.
#### /index.js
SIGN_UP `get()` path retrieves form values from `session`. These properties are deleted if `response` is succesful.
```
app.get(SIGN_UP, (req, res) => {
    const { session } = req

    session.view = SIGN_IN

    const { lang , error , name , surname , email , password } = session

    res.send(Html(Register(name , surname , email , password , lang , error)))

    delete session.name
    delete session.surname
    delete session.email
    delete session.password
})
```

SIGN_UP `post()` path retrieves form parser values from `body` and defines them as `session` properties. These properties are deleted if promise response is succesful. Otherwise, `message.error` is retrieved and the view is redirected again onto the same path.
```
app.post(SIGN_UP, formBodyParser, (req, res) => {
    // const { body, session:{lang} } = req
    const { body, session } = req
    const { lang } = session
    
    const { name, surname, email, password, repassword } = body

    session.name = name
    session.surname = surname
    session.email = email
    session.password = password

    try {
        logic.registerUser(session.name, session.surname, session.email, session.password, repassword)
            .then(() => {
                delete session.name
                delete session.surname
                delete session.email
                delete session.password
                res.send(Html(RegisterSuccess(lang)))
            })
            .catch(error => {
                session.error = error.message
                res.redirect(SIGN_UP)
            })
    } catch (error) {
        session.error = error.message
        res.redirect(SIGN_UP)
    }
})
```

### login/index.js
It retrieves params from `session`. The `value` attribute content depends on params value.
```
const literals = require('./i18n')
const { path, goBackPath } = require('./config')

module.exports = function (email , _password , lang ,  error) {
    const { signIn, goBack, password } = literals[lang]
    
    return `<h1 class="form-user form-user__header">${signIn}</h1>
        <form class="form-user" method="post" action="${path}">
            <label class="form-user__label">E-mail</label>
                <input class="form-user__input" type="email" name="email" value="${email || ''}"/>
            <label class="form-user__label">${password}</label>
                <input class="form-user__input" type="password" name="password" value="${_password || ''}"/>
            
            <button class="btn btn--form-user">${signIn}</button>
        </form>
        <a class="btn btn--back" href="${goBackPath}">${goBack}</a>
        
        ${error && `<p class = "feedback">${error}</p>` || `<span></span>`}`
}
```
### **About static content in `express`**
Public content [`css`and `favicon`] are stored in `public/`directory. All files in it will be used for `app` as static resources. In order to get them, the following code is declared:
```
app.use(express.static('public'))
```
It's important to emphasize that all these resources must be declared with a `/` just at the beginning of the string. Otherwise it can cause undesired effects. The following case is an example:
```
<link rel="stylesheet" href="/style.css" type="text/css">
```