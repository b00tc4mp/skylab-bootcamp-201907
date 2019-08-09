 /**
 * Container to print the random item.
 */

function RandomDetail({ randomGif: { data: {images} }}) {
    return <div className={`random__group`}>
        <img className={`random__photo`} src={images.downsized_large.url}/>
    </div>
}