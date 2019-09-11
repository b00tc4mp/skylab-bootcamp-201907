navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    onRegister(name, surname, email, password, longitude, latitude)
},
    function (error) {
        if (error.code === error.PERMISSION_DENIED) {
            alert('Not usin geolocation heavily limits wannadogs functionality, please relaunch the application if you want to activate it')
            let latitude = 0
            let longitude = 0
            onRegister(name, surname, email, password, longitude, latitude)
        }
    })

    < label for= "years" > Years</label >
        <select name="years">
            <option value="0"> 0</option>
            <option value="1"> 1</option>
            <option value="2"> 2</option>
            <option value="3"> 3</option>
            <option value="4"> 4</option>
            <option value="5"> 5</option>
            <option value="6"> 6</option>
            <option value="7"> 7</option>
            <option value="8"> 8</option>
            <option value="9"> 9</option>
            <option value="10"> 10</option>
            <option value="11"> 11</option>
            <option value="12"> 12</option>
            <option value="13"> 13</option>
            <option value="14"> 14</option>
            <option value="15"> 15</option>
            <option value="16"> 16</option>
            <option value="17"> 17</option>
            <option value="18"> 18</option>
        </select>

        <label for="age">Age</label>
        <select name="months">
            <option value="0"> 0</option>
            <option value="1"> 1</option>
            <option value="2"> 2</option>
            <option value="3"> 3</option>
            <option value="4"> 4</option>
            <option value="5"> 5</option>
            <option value="6"> 6</option>
            <option value="7"> 7</option>
            <option value="8"> 8</option>
            <option value="9"> 9</option>
            <option value="10"> 10</option>
            <option value="11"> 11</option>
            <option value="12"> 12</option>
        </select>