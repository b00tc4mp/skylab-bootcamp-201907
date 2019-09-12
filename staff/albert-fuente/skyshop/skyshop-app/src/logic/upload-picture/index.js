import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (productId, file) {

    validate.string(productId, 'id')
    //validate.string(token, 'token')
    const formData = new window.FormData();

    formData.append('file', file);
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/products/${productId}/photo`, {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data'},
            body: formData
        })
        debugger
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }
    })()
}