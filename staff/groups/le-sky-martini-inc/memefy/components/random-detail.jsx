function RandomDetail({ randomGif: { data: { title, images, bitly_url} }, onBack}) {
    return <>
        <h3>RANDOM: {title}</h3>
        <img src={images.downsized_large.url}/>
        <a href={bitly_url}>View on Gihpy</a>
        {onBack && <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>}
    </>
}