var express = require('express')
var router = express.Router()
var async  = require('express-async-await')
var fetch = require('node-fetch')

/* GET home page. */
router.get('/', async function(req, res, next) {

    function ooIfoundData(){
        var myName = "dickydns"
        return fetch(`https://api.github.com/users/${myName}`)
    }

    const ooIprocessData = async () => {
        const github = await oIfoundData()
        const ooiResponseData = await github.json()
        console.log(ooiResponseData)
    }

    ooIprocessData()
    
    res.end
})
module.exports = router
