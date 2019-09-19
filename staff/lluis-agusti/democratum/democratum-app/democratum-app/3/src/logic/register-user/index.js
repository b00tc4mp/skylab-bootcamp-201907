/**
* Registers a new user.
*
* @param {String} cityId The id of the city.
* @param {String} name Name of the citizen.
* @param {String} surname Surname of the citizen.
* @param {String} address Address of the citizen.
* @param {String} documentId id of the citizen.
* @param {String} email email of the citizen.
* @param {String} password Password.
* @param {Array} participatedPolls ids of the polls where the user has participated.
* @param {Array} proposedPolls ids of the polls that the citizen has proposed.
* @param {String} userRole role: citizen or admin.
* 
*/


const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole) {

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}