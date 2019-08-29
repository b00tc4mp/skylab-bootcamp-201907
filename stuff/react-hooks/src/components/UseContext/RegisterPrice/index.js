import React, { useContext } from 'react';
import DemoContext from '../DemoContext' //you should import a context

function RegisterPrice(/* { setPrice } */) {  //****Props for the non-context version
    const { setPrice } = useContext(DemoContext) //useContext for Context version
    const handlePrice = (e) => {
        const { target: { value } } = e
        debugger
        setPrice(value)
    }

    return (
        <div >
            <input
                class="input is-info"
                name="price"
                placeholder="Please a price"
                onChange={handlePrice}
                required
            />
        </div>
    )

}

export default RegisterPrice;
