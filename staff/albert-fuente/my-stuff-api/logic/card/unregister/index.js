const validate = require('../../../utils/validate')
const { Card, User } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/


module.exports = function(id,cardId) {   
    validate.string(id)
    return(async()=>{
        const user=await User.findById(id)
            if (!user) throw Error('User does not exists.')
            const card = user.cards.findIndex(card => card.id === cardId)
            if (card<0) throw Error(`Card with id ${cardId} does not exist.`)

            user.cards.splice(card) // son instancies del model User que es guarden a la colleccio users van en minuscules
            await user.save()
    })()
}


/* module.exports = function(id,cardId) {   
    validate.string(id)
    return User.findById(id)
        .then(user => {
            if (!user) throw Error('User does not exists.')
            const card = user.cards.findIndex(card => card.id === cardId)
            if (card<0) throw Error(`Card with id ${cardId} does not exist.`)

            user.cards.splice(card) // son instancies del model User que es guarden a la colleccio users van en minuscules
            user.save() //les promises retornen algu si vols que retornin pero en aquest cas fas una promise executes accions i si volguesim un altre then necesitem un RETURN
        })
} */