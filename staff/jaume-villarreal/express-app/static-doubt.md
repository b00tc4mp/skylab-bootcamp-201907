# Sobre l'enrutament amb expres.js

Tenim una app que permet accedir a una API que retorna ànecs. Fa dues setmanes la vam fer amb **React** i ara l'estem refactoritzant per convertir-la en **Server Side Rendering**. Cadascuna de les vistes es renderitza com a resposta a la crida del mètode `get`, com la de l'exemple:

    app.get(SIGN_IN, (req, res) => {
        const { session } = req
    
        session.view = SIGN_IN
    
        const { lang } = session
    
        res.send(Html(Login(lang)))
    })

Els ànecs que retornen de la cerca es pinten en una llista. Al seu torn, cada ànec conté un element `<a>` que permet renderitzar-lo com a fitxa de detall. Per fer-ho, el seu atribut `href` redirigeix el flux cap a un `path` que conté el seu `id` com a paràmetre. Així doncs, el mètode get corresponent s'enruta de la següent manera:

    app.get(`${DETAIL}/:id/`, (req, res) => {
    	  const { params: { id: duckId }, session } = req
    }
En Manu (el profe) ens ha demanat que aquest weekend hi posem estils via `bem-sass` i ell mateix va obrir el fil. Concretament va fer el següent:
1. Crea un directori `/public` on hi ha col·locat el fitxer `style.css`. Al seu torn, aquest fitxer es traspila a partir del seu corresponent `index.sass`.
2. Per tal de donar accés a aquests recursos, el fitxer `index.js` que conté `const app = express()` fa la crida al mètode `static()` mitjançant `use()`, disponible per a la instància `app`:
```app.use(express.static('public'))``` 
   
3.  Estableix la crida al fitxer d'estils mitjançant el `<link>` corresponent. Ho fa d'aquesta manera: 
   ```<link rel="stylesheet" href="style.css" type="text/css">```
   ```<link rel="icon" href="favicon.ico" type="image/x-icon">```

Aquest és el flux que permet dotar d'estils l'aplicació, aparentment sense problemes. La qüestió és que només és aparentment, perquè fins ahir tot funcionava correctament però ara la fitxa individual no funciona.
Després de passar-me hores debugant (des del terminal, of course), ha acabat detectant que ```app.use(express.static('public'))```  sobreescriu la ruta `${DETAIL}/:id/`, de tal manera que quan s'activa l'enllaç d'un ànec, primer estableix la ruta correcta i després la canvia.
Això ho he descobert investigant què retornava la propietat `path`de l'objecte `request`. Primer crea la **`URL`** a partir de l'identificador  i després el mètode `use()` el substitueix per recurs estàtic que es requereix. El resultat quan es fa cada cop la crida és el següent:
```
request.path => /ducks/5c3853aebd1bde8520e66e11
request.path => /ducks/style.css
```
D'aquesta manera la fitxa no es carrega mai, ja que la funció està esperant recollir l'identificador de la `URL` però aquest no arriba mai. He estat llegint el *fucking manual* d'express i tots els stackoverflow haguts i per haver però no aconsegueixo entendre com enrutar de manera correcta aquest element, per tal d'evitar que `static()` sobreescrigui el `path` establert. 

> Qualsevol suggerència serà més que ben rebuda... ;o)

