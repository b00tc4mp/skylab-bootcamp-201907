const calc = <form onSubmit={event => {
    event.preventDefault()

    const { target: { a: { value: a }, b: { value: b } } } = event

    console.log(Number(a) + Number(b))
}}>
    <input type="text" name="a"></input>
    <input type="text" name="b"></input>
    <button>=</button>
</form>

ReactDOM.render(calc, document.querySelector('#root'))