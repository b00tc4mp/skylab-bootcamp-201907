logic.coverRetrieve = function(mbid) {
    // debugger
    validate.string(mbid, 'mbid query', false)

    return call('http://skylabcoders.herokuapp.com/proxy?url=https://coverartarchive.org/release/' + mbid, 'get', undefined, undefined)
        .then(res => {
            const cover = res.images[0].image
            return cover
        })
}