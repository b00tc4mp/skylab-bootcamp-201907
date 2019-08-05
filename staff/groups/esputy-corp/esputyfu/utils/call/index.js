// const call = (url, method, headers, body) => {
  
//     return fetch(url, {
//         method: method,
//         headers: headers
//     })
//     .then(res => {
        
//     return res.json()

//     })
    
//   };

  const call = (url, method, headers, body)  => {
  
    return fetch(url, {
        method,
        headers,
        body
    })
    .then(res => res.json())
    // .then(console.log)
  }
//   let url = 'https://accounts.spotify.com/api/token'
//   let method = 'post'
//   let body = {grant_type: 'client_credentials'}
//   let headers = {Authorization: 'Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk='}



//   .then(jsonResponse => {
//     const tracks = jsonResponse.tracks.items.map(track => ({
//     id: track.id,
//     name: track.name,
//     artist: track.artists[0].name,
//     album: track.album.name,
//     images: track.album.images,
//     extLink: track.album.external_urls
//     }))
//     console.log(tracks)
//     return tracks
//   })