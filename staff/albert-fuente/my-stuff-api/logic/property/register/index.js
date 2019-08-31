const validate = require('../../../utils/validate')
const { Property } = require('../../../models')

/**
 * 
 * @param {*} address 
 * @param {*} m2 
 * @param {*} year 
 * @param {*} cadastre 
 * @param {*} id 
 * 
 * @returns {Promise}
 */

module.exports = function(id, address, m2, year, cadastre) {

    validate.string(address, 'address')
    validate.number(m2, 'm2')
    validate.number(year, 'year')
    validate.string(cadastre, 'cadastre')

     return(async()=>{
        const response = await Property.findOne({ cadastre })
        if (response) throw new Error('Property already exists.')
        const property = await new Property({ address,m2, year, cadastre })
        property.owners.push(id)
        const _response= await property.save()
        return _response._id.toString()

    })() 
/* 
    return Property.findOne({ cadastre })
        .then(response => {
            if (response) throw new Error('Property already exists.')
            const property = new Property({ address,m2, year, cadastre })
            property.owners.push(id)
            return property.save()
        })
        .then(response => response._id.toString())  */
}    


// SI NO HO FAS AMB PROMISE ALL

/* return user.findById(id)
then(user => {
    if(!user)
    return Property.create({}) //crides al constructor i es guarda a la colleccio de bases de dades.
})
.then(property => {
    property.owners.push(id)
            return property.save()
})
 */

// PROMISE ALL SOLUTION !!!!! 

/* module.exports = function( userId , address , m2 , year , cadastre ){
    validate.string(userId , 'user id')
    validate.string(address , 'address')
    validate.number(m2 , 'm2')
    validate.number(year , 'year')
    validate.string(cadastre , 'cadastre')
    return Promise.all([ User.findOne({ _id : userId }) , Property.findOne({ cadastre }) ])
        .then(([ user , property ]) => {
            if(!user) throw new Error (`user with id ${userId} does not exist`)
            if(property) throw new Error(`property with cadastre ${cadastre} already exists`)
            const newProperty = new Property({ address , m2 , year , cadastre })
            newProperty.owners.push(user.id)
            return newProperty.save()
        })
}
 */

