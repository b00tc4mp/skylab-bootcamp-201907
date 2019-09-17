const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (category) {
  return (async () => {
    
    const response = await fetch(`${REACT_APP_API_URL}/recipes/search/${category}`, {
      method: 'get',
      headers: {
        authorization: `bearer ${this.__token__}`
      }
    })
      if (response.status !== 201) {
        const { error } = await response.json()

        throw Error(error)
    }

    const { recipes } = await response.json()

    return recipes
    
  })()
}

