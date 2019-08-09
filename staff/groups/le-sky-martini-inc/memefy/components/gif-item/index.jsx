 /**
 * Listed item in Results component.
 */

function GifItem({ gif: { id, images, favorite }, onToggle }) {
    return <>
        <img className="results__image" src={images.downsized_large.url} />
        <FavButton active={favorite} onToggle={() => onToggle(id)} />
    </>
}



