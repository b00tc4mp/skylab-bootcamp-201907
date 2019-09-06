const {validate} = require('skyshop-utils')
const { models:{Item,Order} } = require('skyshop-data')


/**
 * 
 * @param {*} id 
 * @param {*} number 
 * @param {*} expiry 
 * 
 * @returns {Promise}
 */

module.exports = function(id, quantity) {
   
 /*    validate.string(id, 'id')
    validate.number(quantity, 'quantity')

    return(async()=>{
        const order = await Order.findOne({ id })
        const item = new Item({ quantity })
        _order=order
        item.product=id
        _order.items.push(item)
        return _order.save()
    })() */

   /*  return(async ()=>{
        let user=await User.findById(id)
            if (!user) throw Error('User does not exists.')
            const card = user.cards.find(card => card.number === number)
            if (card) throw Error('Card already exists')
            _user = user
            
            // date amb slash!!!!!
            const expiryDate = convertDate(expiry)
            const newCard = new Card({ number, expiry: expiryDate })
            cardId = newCard.id
            _user.cards.push(newCard)
           
            return _user.save()

            
    })() */
    
}


 

/* module.exports = function(id,quantity) {
    validate.string(id, 'id')
    validate.number(quantity, 'quantity')

    return(async()=>{
        const response = await Item.findOne({ id })
        if (response) throw new Error(`Product ${id} already exists.`)
        const item = new Item({ quantity })
        item.product=id
        await item.save()
        
        return item._id.toString()
    })()
    

} */







/* module.exports = function(id, number, expiry) {
    let _user, cardId
    validate.string(id, 'id')
    validate.string(number, 'number')
    validate.date(expiry, 'expiry date')
    
    return User.findById(id)
        .then(user => {
            if (!user) throw Error('User does not exists.')
            const card = user.cards.find(card => card.number === number)
            if (card) throw Error('Card already exists')
            _user = user
            
            const expiryDate = convertDate(expiry)
            const newCard = new Card({ number, expiry: expiryDate })
            cardId = newCard.id
            _user.cards.push(newCard)
            return _user.save()
        })
        .then(() => cardId)
} */
