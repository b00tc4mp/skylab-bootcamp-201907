 /**
 * Cleans all the session storage.
 * 
 * @param {string} petId
 * @param {string} this.__token__ 
 * 
 * @returns {Promise}
 */

export default function () {
    sessionStorage.clear()
}