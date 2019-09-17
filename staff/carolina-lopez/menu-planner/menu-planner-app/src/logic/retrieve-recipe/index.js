const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id) {
  return (async () => {
    const response = await fetch(`${REACT_APP_API_URL}/recipes/${id}`, {
      method: 'get',
      headers: {
        authorization: `bearer ${this.__token__}`
      }
    })
      if (response.status !== 200) {
        const { error } = await response.json()

        throw Error(error)
    }

    const { recipe } = await response.json()

    return recipe
    
  })()
}

