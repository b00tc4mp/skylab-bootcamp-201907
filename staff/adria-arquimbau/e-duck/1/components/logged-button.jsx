function LoggedButton() {
    return <>
        <p>Welcome<span></span>

        <a href="" onClick={ event => {
            event.preventDefault()

            handleVisible("logged")
        }}>

            Logout
        </a>
        </p>
        
    </>
}