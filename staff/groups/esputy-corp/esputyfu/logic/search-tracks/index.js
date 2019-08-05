/**
 * puede si entre usuario logueado es para controlar favoritos.
 * caso de búsqueda a pelo
 * 
 * le metemos la query
 *  ** verificamos que la query se un string
 *  ** utilizamos el call
 *  ** controlar si no hay resultados return []
 *  ** en el caso de tener respuestas, devolver los tracks
 *  ** estaría bien añadir a cada grupo de canciones los favoritos
 */

 logic.searchTracks = (idUser, tokenUser, query) => {

    if(typeof query !== 'string') throw new Error(`query with value ${query} is not a string`)

    return call(`https://api.spotify.com/v1/search?q=${query}&type=track`, 'get', 
    { 'Authorization': `Bearer ${token}` }, 
    undefined,
    'spotify')
        .catch(error => new Error(error))
        .then(response => response.tracks.items.map(item => {
            
            const { album: { 
                        images:[{ url }], 
                        external_urls:{ spotify: linkAlbum }, 
                        name: nameAlbum, 
                        release_date },
                    artists: [{ 
                        external_urls:{ spotify: linkkArtist }, 
                        name: nameArtist}],
                    explicit, 
                    external_urls:{spotify: linkTrack}, 
                    id: idTrack, 
                    popularity, 
                    preview_url 
            } = item

            return { 
            // album
                url, 
                linkAlbum, 
                nameAlbum,
                release_date,
            // artist
                linkkArtist,
                nameArtist,
                explicit,
            // track
                linkTrack,
                idTrack,
                popularity,
                preview_url

        }}))
 }