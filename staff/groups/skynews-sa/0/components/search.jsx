function Search(props){
    return <>
     <select onChange={event=>{
        event.preventDefault()
        /* onSearch(event) */
        /* const{target:{value:value}}=this
        props.onSearch(value) */
        const{target:{value:value}}=event
        /* console.log(value) */

        /*TESTING VALUE */
        props.onSearch(value)
     }}>
        <option>Select a category</option>
        <option value="business">business</option>
        <option value="entertainment">entertainment</option>
        <option value="general">general</option>
        <option value="health">health</option>
        <option value="science">science</option>
        <option value="sports">sports</option>
        <option value="technology">technology</option>
        <option value="ad">sdf</option>
    </select>
    </>
}