/**
 * Retrieve a cover for an new Api
 * And return a jpg the cover album
 * If the user is already registered API returns an 'OK' status and user's id and token.
 * If the authentication goes wrong, API returns a 'KO' status and an error message.
 * 
 * @param {String} username Musicbrainz
 * 
 * @return {Object} Response: (cover)
 */



logic.coverRetrieve = function(mbid) {
    validate.string(mbid, 'mbid query', false)

    return call('http://skylabcoders.herokuapp.com/proxy?url=https://coverartarchive.org/release/' + mbid, 'get', undefined, undefined)
        .then(res => {
            const cover = res.images[0].image
            return cover
        })
}