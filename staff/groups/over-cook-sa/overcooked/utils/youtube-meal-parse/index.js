/** 
 * ti splits youtube videos and uses the video id 
 * so we can show it in the App
 * 
 */

 const youtubeParse = link => {

    const youtube = link.split("=")
    
    return `https://www.youtube.com/embed/${youtube[1]}`
}