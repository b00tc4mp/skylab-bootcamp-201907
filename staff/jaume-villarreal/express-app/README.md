# EXPRESS-APP [documentation]

## **App object route methods**
These methods are derived from HTTP ones. They refer to the way to respond to a client request, being `get` and `post`the most usual ones. Route definition takes the followwing structure:
```javascript
app.METHOD( PATH , HANDLER)
```

* **app**: instance of `express`
* **METHOD**: HTTP request method
* **PATH**: endpoint on the server 
* **HANDLER**: function executed when the route is matched. It uses to be defined as a `(request,response)` callback.

* app.**`get`**: it requests a representation of a specified resourse. This kind of requests should only retrieve data and should have not other effect.
* app.**`post`**: it requests that the server accepts data enclosed in the request as a new part of data stored in the `URI`.

## **Dependences**
### **Module session-express (middleware)**
Module `session-express` is able to invoke a function that receives as an argument an object to be declared and defined with the required properties:
* **`secret`**: type `string` property that uses a cryptographic algorithm to encrypt session `id's`.
* **`resave`**: defined as `true` it forces to save the session data to the DB, even if there has been no change
* **`saveUnitialized`**: defined as `true` it forces to save in the DB the object with the data of the session, although this one has not been initialized.

### **Jasmine (testing)**
* install as devDependence (see `package.json` below): `npm i -D jasmine`
```javascritp
"devDependencies": {
    "jasmine": "^3.4.0"
  },
  ```
* execute on terminal: `npx jasmine logic/**/*.spec.js`
`