logic.getRandom = function (undefined, undefined, undefined) {
    return call(`https://api.giphy.com/v1/gifs/random?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, undefined, undefined, undefined)
        .then(randomGif => {
            if (randomGif.error) throw new Error(randomGif.error)
            return randomGif
        })
}