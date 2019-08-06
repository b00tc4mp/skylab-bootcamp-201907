
 const youtubeParse = link => {

    const youtube = link.split("=")
    
    return `https://www.youtube.com/embed/${youtube[1]}`
}