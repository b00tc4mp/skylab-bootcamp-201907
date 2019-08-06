
 const youtubeParse = link => {
   
    youtube = link.split("=")

    return `https://www.youtube.com/embed/${youtube[1]}`
}