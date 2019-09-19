const logic = require("../../logic")

module.exports = function(req , res){
    const { body : { school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4 } } = req

    try{
        logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)
            .then( id => res.status(200).json({ message : "enrollment correctly registered" , id }))
            .catch(({ message }) => res.status(401).json({ error : message }))
    }catch({ message }){
        res.status(401).json({ error : message })
    }
}